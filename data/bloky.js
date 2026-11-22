/* Stránka „Bloky“: obvodové bloky ze sbírky se schématem, funkcí, vzorci a variantami.
   Schémata se kreslí z několika značek níže; souřadnice jsou v px viewBoxu, barva přes currentColor (světlý i tmavý vzhled). */
(function () {
const R = String.raw;
var SW = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
function P(d, w) { return '<path d="' + d + '" ' + (w ? SW.replace('stroke-width="1.6"', 'stroke-width="' + w + '"') : SW) + "/>"; }
function W() { var a = [].slice.call(arguments); return P("M" + a.map(function (p) { return p[0] + "," + p[1]; }).join(" L")); }
function dot(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="2.3" fill="currentColor"/>'; }
function T(x, y, s, a) { return '<text x="' + x + '" y="' + y + '" font-size="10" fill="currentColor" text-anchor="' + (a || "start") + '" font-family="system-ui,Segoe UI,Arial">' + s + "</text>"; }
/* NPN, base on the left (flip: base on the right). Terminals: B (x∓18, y), C (x±14, y−28), E (x±14, y+28) */
function npn(x, y, flip) {
  return '<g transform="translate(' + x + " " + y + ")" + (flip ? " scale(-1 1)" : "") + '">' + P("M0,-12V12", 2.6) + P("M-18,0H0M0,-6L14,-15V-28M0,6L14,15V28") +
    '<polygon points="13,14.4 6.3,13.7 9.6,8.6" fill="currentColor"/></g>';
}
function resV(x, y1, y2) { var a = y1 + 6, b = y2 - 6, h = (b - a) / 6, d = "M" + x + "," + y1 + "V" + a; for (var i = 0; i < 6; i++) d += "L" + (x + (i % 2 ? -5 : 5)) + "," + (a + h * (i + 0.5)); return P(d + "L" + x + "," + b + "V" + y2); }
function resH(x1, x2, y) { var a = x1 + 6, b = x2 - 6, h = (b - a) / 6, d = "M" + x1 + "," + y + "H" + a; for (var i = 0; i < 6; i++) d += "L" + (a + h * (i + 0.5)) + "," + (y + (i % 2 ? -5 : 5)); return P(d + "L" + b + "," + y + "H" + x2); }
function gnd(x, y) { return P("M" + x + "," + y + "v6M" + (x - 8) + "," + (y + 6) + "h16M" + (x - 5) + "," + (y + 9) + "h10M" + (x - 2) + "," + (y + 12) + "h4"); }
function vcc(x1, x2, y) { return P("M" + x1 + "," + y + "H" + x2) + T((x1 + x2) / 2, y - 3, "Vcc", "middle"); }
/* current source, circle r 9 with an arrow (down unless up) */
function isrc(x, y, up) { var s = up ? -1 : 1; return '<circle cx="' + x + '" cy="' + y + '" r="9" ' + SW + "/>" + P("M" + x + "," + (y - 5 * s) + "V" + (y + 2 * s)) + '<polygon points="' + x + "," + (y + 6 * s) + " " + (x - 3) + "," + (y + 1 * s) + " " + (x + 3) + "," + (y + 1 * s) + '" fill="currentColor"/>'; }
function cap(x, y) { return P("M" + (x - 9) + "," + (y - 3) + "h18M" + (x - 9) + "," + (y + 3) + "h18", 2.2); }
/* op-amp / comparator triangle, inputs at (x, y−12) and (x, y+12), output at (x+50, y); top input is "−" unless plusTop */
function amp(x, y, plusTop) { return P("M" + x + "," + (y - 25) + "L" + (x + 50) + "," + y + "L" + x + "," + (y + 25) + "Z") + T(x + 4, y - 8, plusTop ? "+" : "−") + T(x + 4, y + 16, plusTop ? "−" : "+"); }
function box(x, y, w, h, s) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" ' + SW + "/>" + T(x + w / 2, y + h / 2 + 3.5, s, "middle"); }
function S(w, h, body) { return '<svg viewBox="0 0 ' + w + " " + h + '" role="img">' + body + "</svg>"; }

/* proudové zrcadlo: kind = "simple" | "widlar" | "deg" */
function mirror(kind) {
  var b = npn(60, 75, true) + npn(120, 75) + W([78, 75], [102, 75]) + W([46, 47], [46, 31]) + W([46, 38], [90, 38], [90, 75]) + dot(46, 38) + dot(90, 75) +
    isrc(46, 22) + W([46, 13], [46, 8]) + P("M38,8H54") + W([134, 47], [134, 14]) + T(140, 24, "Iout ↓") + T(8, 26, "Iref") + T(14, 79, "Q1") + T(146, 79, "Q2");
  b += kind === "deg" ? resV(46, 103, 128) + T(30, 120, "R1") : W([46, 103], [46, 128]);
  b += kind === "simple" ? W([134, 103], [134, 128]) : resV(134, 103, 128) + T(144, 120, "R2");
  return S(176, 144, b + W([46, 128], [134, 128]) + gnd(90, 128));
}
var SCH = {
  mir: [[mirror("simple"), "jednoduché"], [mirror("widlar"), "Widlarovo (R jen ve výstupu)"], [mirror("deg"), "s emitorovou degenerací"]],
  vbe: [[S(186, 150, npn(70, 100) + npn(110, 50) + W([84, 72], [84, 50], [92, 50]) + dot(84, 50) + W([84, 10], [84, 21]) + isrc(84, 30) + W([84, 39], [84, 50]) + P("M76,10H92") +
    W([124, 78], [124, 88]) + W([124, 88], [40, 88], [40, 100], [52, 100]) + W([124, 88], [152, 88]) + resV(152, 88, 128) + dot(124, 88) + W([84, 128], [152, 128]) + gnd(118, 128) +
    W([124, 22], [124, 6]) + T(130, 14, "Iout ↓") + T(158, 112, "R") + T(28, 132, "Q1") + T(138, 56, "Q2") + T(46, 84, "VBE na R")), ""]],
  ptat: [[S(184, 150, box(30, 12, 120, 20, "zrcadlo 1 : 1") + npn(60, 80, true) + npn(120, 80) + W([78, 80], [102, 80]) + W([46, 32], [46, 52]) + W([46, 46], [90, 46], [90, 80]) + dot(46, 46) + dot(90, 80) +
    W([134, 32], [134, 52]) + W([46, 108], [46, 134]) + resV(134, 108, 134) + W([46, 134], [134, 134]) + gnd(90, 134) + T(10, 84, "1×") + T(146, 84, "N×") + T(144, 124, "R")), ""]],
  bg: [[S(184, 170, box(26, 10, 128, 22, "zesilovač: I1 = I2") + npn(60, 80, true) + npn(120, 80) + W([78, 80], [102, 80]) + W([46, 32], [46, 52]) + W([134, 32], [134, 52]) +
    W([90, 32], [90, 80]) + dot(90, 80) + T(96, 72, "VBG") + resV(46, 108, 128) + W([134, 108], [134, 128]) + W([46, 128], [134, 128]) + dot(90, 128) + resV(90, 128, 152) + gnd(90, 152) +
    T(8, 84, "N×") + T(146, 84, "1×") + T(26, 122, "R1") + T(98, 146, "R2")), "Brokaw"]],
  vbem: [[S(140, 136, npn(80, 70) + W([94, 42], [94, 30]) + W([50, 30], [94, 30]) + W([94, 30], [94, 14]) + resV(50, 30, 70) + W([62, 70], [50, 70]) + dot(50, 70) + resV(50, 70, 110) +
    W([50, 110], [94, 110]) + W([94, 98], [94, 110]) + W([94, 110], [94, 126]) + dot(94, 30) + dot(94, 110) + T(100, 18, "+") + T(100, 128, "−") + T(30, 54, "R1") + T(30, 94, "R2") + T(106, 74, "V")), ""]],
  dif: [[S(200, 156, vcc(70, 130, 12) + resV(84, 12, 42) + resV(116, 12, 42) + npn(70, 70) + npn(130, 70, true) + W([84, 98], [84, 106], [116, 106], [116, 98]) + dot(100, 106) +
    W([100, 106], [100, 113]) + isrc(100, 122) + W([100, 131], [100, 138]) + gnd(100, 138) + W([52, 70], [28, 70]) + W([148, 70], [172, 70]) + T(8, 74, "v1") + T(176, 74, "v2") +
    T(60, 40, "vo1") + T(122, 40, "vo2") + T(112, 126, "ISS")), ""]],
  hyst: [[S(200, 126, amp(80, 60) + W([80, 48], [30, 48]) + T(8, 52, "vin") + W([60, 72], [80, 72]) + resH(22, 60, 72) + T(2, 76, "Vref") + T(34, 64, "R1") + dot(60, 72) +
    W([130, 60], [172, 60]) + T(174, 64, "vout") + dot(155, 60) + W([155, 60], [155, 108], [130, 108]) + resH(90, 130, 108) + W([90, 108], [60, 108], [60, 72]) + T(104, 100, "R2")), "invertující, s kladnou zpětnou vazbou"]],
  tmr: [[S(190, 110, vcc(32, 48, 10) + W([40, 10], [40, 21]) + isrc(40, 30) + W([40, 39], [40, 74]) + dot(40, 60) + cap(40, 77) + W([40, 80], [40, 92]) + gnd(40, 92) + T(54, 34, "I") + T(52, 84, "C") +
    W([40, 60], [100, 60], [100, 48], [110, 48]) + amp(110, 60, true) + W([110, 72], [92, 72]) + T(64, 76, "Vref") + W([160, 60], [182, 60]) + T(162, 54, "out")), "nabíjení proudem, práh komparátoru"]],
  vi: [[S(184, 158, amp(40, 75, true) + W([40, 63], [12, 63]) + T(4, 58, "vin") + W([90, 75], [106, 75]) + npn(124, 75) + W([138, 103], [138, 112]) + resV(138, 112, 140) + gnd(138, 140) +
    W([138, 112], [26, 112], [26, 87], [40, 87]) + dot(138, 112) + W([138, 47], [138, 18]) + T(144, 26, "Iout ↓") + T(148, 130, "R")), ""]],
  div: [[S(120, 130, T(46, 10, "Vin") + W([40, 14], [40, 22]) + resV(40, 22, 62) + W([40, 62], [40, 68]) + dot(40, 66) + W([40, 66], [86, 66]) + T(90, 70, "Vout") + resV(40, 68, 108) + gnd(40, 108) +
    T(52, 44, "R1") + T(52, 92, "R2")), ""]],
  fol: [[S(140, 148, vcc(64, 84, 12) + W([74, 12], [74, 32]) + npn(60, 60) + W([42, 60], [20, 60]) + T(4, 64, "vin") + W([74, 88], [74, 100]) + dot(74, 100) + W([74, 100], [112, 100]) + T(114, 104, "vout") +
    resV(74, 100, 128) + gnd(74, 128) + T(84, 118, "RE")), ""]]
};

window.BLOKY = [
{k: "mir", g: {re: /zrcadl|→|\d\s*:\s*\d|\(\d+\)\s*:|jedn\.\)/}, name: "Proudové zrcadlo", sch: SCH.mir, pat: ["mir"],
 d: R`Kopíruje proud. Tranzistor zapojený jako dioda (Q1) převede $I_{ref}$ na napětí $V_{BE}$; stejné $V_{BE}$ na Q2 dá stejný (nebo N× větší) proud. Výstup se chová jako zdroj proudu s velkým výstupním odporem.`,
 f: [R`I_{out}=N\,I_{ref}\;\;\text{(ideálně)}`, R`I_{out}=\frac{N\,I_{ref}}{1+\frac{1+N}{\beta}}\;\;\text{(s proudy bází)}`, R`R_{out}\approx r_o=\frac{V_A}{I_{out}}`],
 v: [
  {n: "Poměr N : 1", d: R`výstupní tranzistor má N× větší plochu (N emitorů, M = N)`, f: R`I_{out}=N\,I_{ref}`},
  {n: "S emitorovou degenerací", d: R`R v obou emitorech; poměr určují rezistory (když $IR\gg V_T$), vyšší $R_{out}$`, f: R`\frac{I_{out}}{I_{ref}}\approx\frac{R_1}{R_2}`},
  {n: "Widlarovo", d: R`R jen ve výstupním emitoru: malý proud bez velkého rezistoru`, f: R`I_{out}R_2=V_T\ln\frac{I_{ref}}{I_{out}}`},
  {n: "Wilsonovo", d: R`zpětná vazba třetím tranzistorem; chyba proudů bází jen $\approx 2/\beta^2$`, f: R`R_{out}\approx\frac{\beta r_o}{2}`},
  {n: "Kaskódové", d: R`druhý tranzistor nad výstupem drží stálé $V_{CE}$`, f: R`R_{out}\approx\beta r_o\;\text{(BJT)},\;\;g_m r_o^2\;\text{(MOS)}`},
  {n: "MOS zrcadlo", d: R`hradlo nebere proud, poměr dává W/L`, f: R`\frac{I_{out}}{I_{ref}}=\frac{(W/L)_2}{(W/L)_1}`},
  {n: "Více výstupů", d: R`další tranzistory na společné bázi, každý se svým poměrem`}
 ]},
{k: "vbe", g: {pat: ["vbe"]}, name: "Zdroj proudu z VBE", sch: SCH.vbe, pat: ["vbe", "ztc"],
 d: R`Q1 drží na rezistoru R napětí rovné svému $V_{BE}$ (smyčka Q1–Q2), proud rezistoru teče přes Q2 na výstup. Proud je daný jen $V_{BE}$ a R, skoro nezávislý na napájení. $V_{BE}$ s teplotou klesá, takže proud také (CTAT).`,
 f: [R`I_{out}\approx\frac{V_{BE}}{R}\approx\frac{0{,}65\,\text{V}}{R}`, R`\frac{dV_{BE}}{dT}\approx-2\,\text{mV/K}`],
 v: [
  {n: "Rezistor paralelně k diodě", d: R`bez smyčky; proud rezistoru $V_{BE}/R$, ale závisí na napájecím proudu diody`},
  {n: "S MOS", d: R`stejný princip s $V_{GS}$`, f: R`I\approx\frac{V_{GS}}{R}`},
  {n: "Součet s PTAT", d: R`CTAT + PTAT proud ve vhodném poměru dá proud s nulovým TC (viz vzor)`}
 ]},
{k: "ptat", g: {pat: ["ptat"]}, name: "PTAT zdroj proudu", sch: SCH.ptat, pat: ["ptat"],
 d: R`Zrcadlo vnutí oběma tranzistorům stejný proud, ale Q2 má N× větší plochu, takže mu stačí o $\Delta V_{BE}$ menší $V_{BE}$. Tento rozdíl leží na R, a protože $V_T=kT/q$, proud roste úměrně absolutní teplotě.`,
 f: [R`\Delta V_{BE}=V_T\ln N`, R`I_{PTAT}=\frac{V_T\ln N}{R}`, R`\frac{1}{I}\frac{dI}{dT}=\frac{1}{T}\approx+0{,}33\,\%/\text{K}\;\;(300\,\text{K})`],
 v: [
  {n: "Poměr proudů místo ploch", d: R`stejné tranzistory, různé proudy`, f: R`\Delta V_{BE}=V_T\ln\frac{I_1}{I_2}`},
  {n: "Křížová čtveřice Q0–Q3", d: R`varianta ve sbírce, stejný $\Delta V_{BE}$ na rezistoru`},
  {n: "MOS ve slabé inverzi", d: R`místo $V_T$ je $nV_T$`, f: R`\Delta V_{GS}=nV_T\ln N`}
 ]},
{k: "bg", g: {pat: ["bg"]}, name: "Bandgap reference", sch: SCH.bg, pat: ["bg", "nvbg", "div"],
 d: R`Zesilovač (se zrcadlem) vyrovná proudy oběma tranzistory. Na $R_1$ je $\Delta V_{BE}$ (PTAT), oběma proudy teče $R_2$, takže na bázích je $V_{BE}$ (klesá s teplotou) + $V_{R2}$ (roste s teplotou). Při zhruba 1,25 V se teplotní změny vyruší.`,
 f: [R`V_{BG}=V_{BE}+2\frac{R_2}{R_1}V_T\ln N\approx1{,}25\,\text{V}`, R`R_2=\frac{V_{BG}-V_{BE}}{2V_T\ln N}\,R_1`],
 v: [
  {n: "Brokawova buňka", d: R`zapojení na obrázku; výstup přímo na bázích`},
  {n: "Widlarova bandgap", d: R`stejný princip $V_{BE}+K\,\Delta V_{BE}$, PTAT úbytek vzniká na rezistoru jinde ve smyčce`},
  {n: "Násobek V_BG", d: R`m přechodů BE + PTAT úbytek`, f: R`mV_{BE}+I_{PTAT}R=mV_{BG}`},
  {n: "Výstupní dělič", d: R`Vref1, Vref2 z $V_{BG}$ už jen Ohmovým zákonem (příklad 2.1)`}
 ]},
{k: "vbem", g: {re: /[23]·VBE/}, name: "Násobič VBE", sch: SCH.vbem, pat: ["nvbg"],
 d: R`Tranzistor udrží na $R_2$ napětí $V_{BE}$; stejný proud (proud báze zanedbán) teče i $R_1$. Z jednoho tranzistoru tak vznikne libovolný násobek $V_{BE}$, třeba pro posun úrovně nebo předpětí.`,
 f: [R`V=V_{BE}\left(1+\frac{R_1}{R_2}\right)`, R`\frac{dV}{dT}=\left(1+\frac{R_1}{R_2}\right)(-2\,\text{mV/K})`],
 v: [{n: "m diod v sérii", d: R`jen celé násobky`, f: R`V=m\,V_{BE}`}]},
{k: "dif", g: {re: /dif\. pár|OTA|\(vstup\)|\(gm1\)|\(dif\. pár\)/}, name: "Diferenciální pár", sch: SCH.dif, pat: ["sig", "offc", "oz"],
 d: R`Dělí ocasní proud $I_{SS}$ mezi dva tranzistory podle rozdílu vstupů $v_d=v_1-v_2$. Zesiluje rozdíl a potlačuje společný signál. Je na vstupu každého OZ i komparátoru; lineárně jen pro $|v_d|\lesssim 2V_T\approx50$ mV.`,
 f: [R`I_{C1}-I_{C2}=I_{SS}\tanh\frac{v_d}{2V_T}`, R`g_m=\frac{I_{SS}}{2V_T}\;\;\text{(jeden tranzistor, celý stupeň)}`, R`\frac{\Delta I_{C1}}{v_d}=\frac{I_{SS}}{4V_T}\;\;\text{(polovina)}`, R`A_d=\frac{I_{SS}R_C}{2V_T}\;\;\text{(rozdílový výstup)}`],
 v: [
  {n: "Zrcadlo jako zátěž", d: R`nesymetrický výstup bez ztráty zisku`, f: R`A=g_m\,(r_{o2}\parallel r_{o4})`},
  {n: "S emitorovou degenerací", d: R`větší lineární rozsah ($\pm I_{SS}R_E/2$)`, f: R`G_m\approx\frac{1}{R_E}`},
  {n: "MOS pár", d: R`každý tranzistor vede $I_{SS}/2$`, f: R`g_m=\sqrt{k_p\frac{W}{L}I_{SS}}`},
  {n: "Offset z nesouběhu", d: R`viz vzor σ`, f: R`\sigma_{V_{OS}}=V_T\,\sigma_{I1/I2}`}
 ]},
{k: "hyst", g: {re: /kompar|COMP/i}, name: "Komparátor s hysterezí", sch: SCH.hyst, pat: ["hyst", "offc", "uvlo"],
 d: R`Komparátor porovná $v_{in}$ s napětím na vstupu +. Kladná zpětná vazba přes $R_2$ posouvá tento práh podle stavu výstupu, takže vzniknou dva prahy a šum kolem prahu nerozkmitá výstup.`,
 f: [R`V_+=V_{ref}\frac{R_2}{R_1+R_2}+V_{out}\frac{R_1}{R_1+R_2}`, R`\Delta V_H=(V_{OH}-V_{OL})\frac{R_1}{R_1+R_2}`],
 v: [
  {n: "Neinvertující zapojení", d: R`$v_{in}$ přes $R_1$ na +, $V_{ref}$ na −`, f: R`\Delta V_H=(V_{OH}-V_{OL})\frac{R_1}{R_2}`},
  {n: "Hystereze proudem", d: R`výstup přepíná proud do rezistoru u prahu (časté v IO)`},
  {n: "Úmyslný offset", d: R`viz vzor`, f: R`V_{OS}=IR\;\;\text{nebo}\;\;V_T\ln(\text{poměr})`}
 ]},
{k: "tmr", g: {pat: ["cap", "osc"]}, name: "Časovač: proud + kondenzátor + komparátor", sch: SCH.tmr, pat: ["cap", "osc"],
 d: R`Konstantní proud nabíjí C lineárně, komparátor přepne, když napětí dojde na práh. Vybíjecí spínač (reset) vrátí C na začátek. Základ časovačů, oscilátorů a zpoždění.`,
 f: [R`\frac{dV}{dt}=\frac{I}{C}`, R`T=\frac{C\,\Delta V}{I}`, R`f=\frac{1}{T_1+T_2},\;\;DC=\frac{T_H}{T_1+T_2}`],
 v: [
  {n: "Oscilátor se dvěma C a RS", d: R`střídavě nabíjí $C_1$ a $C_2$, klopný obvod RS přepíná`},
  {n: "Nabíjení přes rezistor", d: R`exponenciála místo přímky`, f: R`T=RC\ln\frac{V-V_0}{V-V_p}`},
  {n: "Řízení proudem", d: R`kmitočet úměrný nabíjecímu proudu (oscilátor řízený FB)`, f: R`f\propto I`}
 ]},
{k: "vi", g: {pat: ["vi"]}, name: "V–I převodník", sch: SCH.vi, pat: ["vi"],
 d: R`OZ ve smyčce vnutí napětí $v_{in}$ na rezistor R (přes emitor tranzistoru). Proud R teče kolektorem ven: výstupní proud řízený napětím, nezávislý na zátěži.`,
 f: [R`I_{out}\approx\frac{v_{in}}{R}`, R`I_O=\frac{V_{IN}-V_{Ro}-mV_{BE}}{R_s}\;\;\text{(tvar ze sbírky)}`],
 v: [
  {n: "MOS místo BJT", d: R`bez chyby proudem báze`},
  {n: "Bez OZ", d: R`jen emitorový sledovač; posun o $V_{BE}$ i s jeho TC`, f: R`I=\frac{v_{in}-V_{BE}}{R}`}
 ]},
{k: "div", name: "Dělič napětí", sch: SCH.div, pat: ["div"],
 d: R`Nejjednodušší způsob, jak z napětí udělat menší. Ve sbírce hlavně výstupní dělič za bandgapem (Vref1, Vref2).`,
 f: [R`V_{out}=V_{in}\frac{R_2}{R_1+R_2}`, R`R_{out}=R_1\parallel R_2`],
 v: [
  {n: "Se zátěží", d: R`zátěž je paralelně k $R_2$`, f: R`R_2\to R_2\parallel R_L`},
  {n: "Odbočka s proudem", d: R`když z uzlu teče proud (báze, další dělič), počítej Kirchhoffem`},
  {n: "Dělič ve zpětné vazbě", d: R`neinvertující zesilovač`, f: R`A=1+\frac{R_1}{R_2}`}
 ]},
{k: "fol", g: {re: /sledovač/}, name: "Emitorový sledovač", sch: SCH.fol, pat: [],
 d: R`Kopíruje vstupní napětí posunuté o $V_{BE}$, ale s malým výstupním odporem. Oddělovač (buffer) a posun úrovně.`,
 f: [R`v_{out}=v_{in}-V_{BE}`, R`A=\frac{g_mR_E}{1+g_mR_E}\approx1`, R`R_{out}\approx\frac{1}{g_m}+\frac{R_s}{\beta}`, R`R_{in}\approx\beta\left(\frac{1}{g_m}+R_E\right)`],
 v: [
  {n: "Se zdrojem proudu v emitoru", d: R`stálý proud, tedy stálé $V_{BE}$: přesnější posun`},
  {n: "MOS (source follower)", d: R``, f: R`v_{out}=v_{in}-V_{GS}`},
  {n: "Darlington", d: R`dva sledovače za sebou: posun o dvě $V_{BE}$`, f: R`\beta\approx\beta_1\beta_2`}
 ]}
];
})();
