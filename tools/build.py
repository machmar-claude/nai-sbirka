#!/usr/bin/env python3
"""Regenerates data/ and img/ of the site from the two source HTML files.

Usage: python tools/build.py NAI_pruvodce_priklady.html MPC-NAI_priklady_po_krocich.html [out_dir]

- data/nai.js       NAI explanation examples (object literals sliced verbatim)
- data/patterns.js  NAI PATTERNS and TAHAK (verbatim)
- data/mpc.js       MPC practice problems (verbatim except base64 images -> file paths)
- data/link.js      LINK table from tools/link.json (practice step -> explanation step)
- img/              schematics and plots extracted from base64
Fails loudly (non-zero exit) when LINK does not match the step counts.
"""
import base64, json, pathlib, re, struct, sys

if len(sys.argv) < 3:
    sys.exit(__doc__)
nai_path, mpc_path = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
root = pathlib.Path(sys.argv[3]) if len(sys.argv) > 3 else pathlib.Path(__file__).resolve().parent.parent
(root / "data").mkdir(exist_ok=True)
(root / "img").mkdir(exist_ok=True)

nai = nai_path.read_text(encoding="utf8")
mpc = mpc_path.read_text(encoding="utf8")
HEAD = "(function () {\nconst R = String.raw;\n"
TAIL = "\n})();\n"
problems = []


def fail(msg):
    problems.append(msg)


# ---------- NAI: images ----------
m = re.search(r"window\.IMG=(\{.*?\});\s*window\.DIM", nai, re.S)
nai_img = json.loads(m.group(1))
if len(nai_img) != 61:
    fail("expected 61 NAI images, got %d" % len(nai_img))
png_dim = {}
for k, uri in nai_img.items():
    head, b64 = uri.split(",", 1)
    assert head == "data:image/png;base64", k
    raw = base64.b64decode(b64)
    png_dim[k] = struct.unpack(">II", raw[16:24])
    (root / "img" / (k + ".png")).write_bytes(raw)

# ---------- NAI: patterns, cheat sheet, examples (verbatim) ----------
a = nai.index("window.PATTERNS={")
b = nai.index("window.TAHAK=[")
c = nai.index("EXAMPLES.push(")
patterns = nai[a:b].strip()
tahak = nai[b:c].strip()
(root / "data" / "patterns.js").write_text(HEAD + patterns + "\n" + tahak + TAIL, encoding="utf8")

chunks = []
pos = 0
while True:
    s = nai.find("EXAMPLES.push(", pos)
    if s < 0:
        break
    s += len("EXAMPLES.push(")
    e = nai.index("\n);", s)
    chunk = nai[s:e].strip().rstrip(",")
    chunks.append(chunk)
    pos = e
nai_body = ",\n".join(chunks)
(root / "data" / "nai.js").write_text(HEAD + "window.NAI_EX=[\n" + nai_body + "\n];" + TAIL, encoding="utf8")

nai_steps = {}
for part in re.split(r"(?m)^(?=\{id:')", nai_body)[1:]:
    pid = re.match(r"\{id:'([^']+)'", part).group(1)
    nai_steps[pid] = len(re.findall(r"(?m)^\{t:'", part))
if len(nai_steps) != 61:
    fail("expected 61 NAI examples, got %d" % len(nai_steps))

# ---------- MPC: problems (verbatim, images to files) ----------
i0 = mpc.index("var PROBLEMS = [") + len("var PROBLEMS = [")
i1 = mpc.index("\n  ];", i0)
body = mpc[i0:i1]
cur = [None]
nimg = [0]


def sub(mo):
    if mo.group(1):
        cur[0] = mo.group(1)
        return mo.group(0)
    field, mime, b64 = mo.group(2), mo.group(3), mo.group(4)
    num = cur[0]
    low = num.lower()
    raw = base64.b64decode(b64)
    if field == "plot":
        name = low + "-plot." + ("jpg" if mime == "jpeg" else mime)
    elif "." in num:
        name = low + ".png"  # 2.x-4.x use the NAI image (overlay coordinates were made for it)
        raw = None
    else:
        name = low + "." + ("jpg" if mime == "jpeg" else mime)
    if raw is not None:
        (root / "img" / name).write_bytes(raw)
    nimg[0] += 1
    return '%s: "img/%s"' % (field, name)


body = re.sub(r'num: "([^"]+)"|\b(img|plot): "data:image/(\w+);base64,([A-Za-z0-9+/=]+)"', sub, body)
assert "base64" not in body
(root / "data" / "mpc.js").write_text(HEAD + "window.MPC = [" + body + "\n];" + TAIL, encoding="utf8")

mpc_steps, mpc_dim = {}, {}
for part in re.split(r"(?m)^\s*(?:,\s*)?\{\s*\n?\s*id: ", body)[1:]:
    num = re.search(r'num: "([^"]+)"', part).group(1)
    mpc_steps[num] = len(re.findall(r"\{ q: ", part))
    wh = re.search(r"\bw: (\d+), h: (\d+)", part)
    mpc_dim[num] = (int(wh.group(1)), int(wh.group(2)))
if len(mpc_steps) != 72:
    fail("expected 72 MPC problems, got %d" % len(mpc_steps))

for k, (pw, ph) in png_dim.items():
    w, h = mpc_dim.get(k, (0, 0))
    if not w or abs(pw / ph - w / h) > 0.01 * (pw / ph):
        fail("image aspect ratio differs for %s: png %sx%s, mpc %sx%s" % (k, pw, ph, w, h))

# ---------- LINK ----------
link = json.loads((root / "tools" / "link.json").read_text(encoding="utf8"))
for k in nai_steps:
    if k not in link:
        fail("LINK missing for %s" % k)
        continue
    arr = link[k]
    if k not in mpc_steps:
        fail("no MPC problem %s" % k)
    elif len(arr) != mpc_steps[k]:
        fail("LINK[%s] has %d entries, MPC has %d steps" % (k, len(arr), mpc_steps[k]))
    bad = [x for x in arr if not isinstance(x, int) or x < 0 or x >= nai_steps[k]]
    if bad:
        fail("LINK[%s] out of range %s (NAI has %d steps)" % (k, bad, nai_steps[k]))
for k in link:
    if k not in nai_steps:
        fail("LINK has unknown problem %s" % k)

if problems:
    print("BUILD FAILED:")
    for p in problems:
        print("  -", p)
    sys.exit(1)

order = sorted(link, key=lambda k: tuple(int(x) for x in k.split(".")))
lines = ['  "%s": %s' % (k, json.dumps(link[k])) for k in order]
(root / "data" / "link.js").write_text("window.LINK = {\n" + ",\n".join(lines) + "\n};\n", encoding="utf8")
print("OK: %d NAI examples, %d MPC problems, %d images referenced, LINK for %d problems" % (len(nai_steps), len(mpc_steps), nimg[0], len(link)))
