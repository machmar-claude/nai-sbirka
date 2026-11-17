# NAI · sbírka příkladů

Webová aplikace ke studiu předmětu MPC-NAI (Metody návrhu analogových IO). Spojuje dvě původní pomůcky do jedné:

- **Pochopit**: vysvětlení příkladu po krocích. Ke každému kroku se ve schématu zvýrazní součástky a proudy, kterých se týká.
- **Procvičit**: stejný příklad po krocích k samostatnému výpočtu. Zadáš číslo, aplikace ho zkontroluje (tolerance 2 %), k dispozici je nápověda a odkrytí řešení.

Každá otázka v Procvičit odkazuje na krok vysvětlení, ze kterého vychází, a naopak. Při procvičování se ve schématu zvýrazňují součástky z odpovídajícího kroku. Příklady K1 až K11 (kmitočtové charakteristiky RC článků) jsou jen k procvičování, bez vysvětlení a zvýraznění.

Dále jsou tu stránky **Vzory** (opakující se zapojení a postupy) a **Co na tahák** (vzorce podle důležitosti).

## Použití

- Otevři stránku, vyber příklad v seznamu (nebo ho vyhledej podle čísla, názvu či vzoru) a přepínej Pochopit / Procvičit.
- Klávesy v režimu Pochopit: šipka vpravo nebo mezerník další krok, šipka vlevo předchozí krok, `J` další příklad, `K` předchozí příklad.
- Každý příklad má vlastní adresu (`#p2-1`, `#k1`), takže na něj můžeš poslat odkaz.
- Tlačítko ◐ přepíná světlý a tmavý vzhled.

## Ukládání postupu

Postup (vyřešené kroky, odkrytá řešení, zadané hodnoty, značky „umím“, poslední příklad) se průběžně ukládá **v tvém prohlížeči** (localStorage, klíč `nai-sbirka-v1`). Nikam se neodesílá. Po zavření stránky tam zůstane, ale nepřenáší se mezi prohlížeči a zmizí při smazání dat webu.

V levém panelu dole je záloha:

- **Exportovat postup** stáhne soubor JSON.
- **Importovat postup** soubor načte a sloučí s tím, co už v prohlížeči máš.
- **Smazat postup** smaže vše (po potvrzení).

## Struktura

- `index.html`, `app.css`, `app.js`: aplikace bez build kroku.
- `data/`: data jako obyčejné skripty (`nai.js` vysvětlení, `patterns.js` vzory a tahák, `mpc.js` procvičování, `link.js` vazba otázek na kroky vysvětlení).
- `img/`: schémata a grafy.
- `tools/build.py`: z obou zdrojových HTML souborů znovu vygeneruje `data/` a `img/`. Tabulka vazeb je v `tools/link.json`; skript selže, pokud nesedí počty kroků.

```
python tools/build.py NAI_pruvodce_priklady.html MPC-NAI_priklady_po_krocich.html
```

## Zdroje

- sbírka příkladů MPC-NAI, FEKT VUT, 2023
- P. Kadaňka, RC_EXPLAIN, 2025 (příklady K1 až K11)
