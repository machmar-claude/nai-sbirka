(function () {
const R = String.raw;
window.NAI_EX=[
/* ================= 2.1 ================= */
{id:'2.1',ch:2,title:'Brokawova reference: R2, Vd, Vref1, Vref2, Ii',
task:R`Určete hodnotu odporu $R_2$ tak, aby napětí $V_d$, $V_{ref2}$ a $V_{ref1}$ byla teplotně kompenzovaná. Vypočítejte hodnoty napětí $V_d$, $V_{ref1}$ a $V_{ref2}$. Vypočítejte hodnotu proudu $I_i$.`,
pat:['bg','ptat','div','vbe'],
idea:R`Q4 (8×) a Q5 (1×) vedou stejný proud, takže na $R_1$ je $\Delta V_{BE}$. $R_2$ zvolíš tak, aby na bázích bylo přesně $V_{BG}=1{,}25$ V — a zbytek je jen Ohmův zákon na děliči R3–R6.`,
parts:{Q4:{b:[56,55,11,13],c:'r',t:'Q4 (N=8)'},Q5:{b:[72,55,9,13],c:'r',t:'Q5 (1×)'},R1:{b:[57,68,10,11],c:'o',t:'R1 18k'},R2:{b:[57,81,10,13],c:'p',t:'R2 = ?'},M23:{b:[58,33,21,13],c:'s',t:'zrcadlo M2/M3'},
R3:{b:[84,81,9,13],c:'b',t:'R3 25k'},R4:{b:[84,63,9,13],c:'b',t:'R4 100k'},R5:{b:[84,46,9,12],c:'g',t:'R5 125k'},R6:{b:[84,34,9,12],c:'g',t:'R6 150k'},
VBG:{n:[85.5,61.5],c:'p',t:'VBG'},I4:{a:[[59.8,46],[59.8,79]],c:'r',t:'I'},I5:{a:[[74.5,46],[74.5,80.5],[61.5,80.5]],c:'r',t:'I'},I2:{a:[[59.8,82],[59.8,95]],c:'p',t:'2I'},
IR:{a:[[85.5,33],[85.5,95]],c:'b',t:'IR'},Q0:{b:[10,75,12,12],c:'g',t:'Q0'},Q1:{b:[18,67,12,12],c:'g',t:'Q1'},Rd:{b:[22,82,9,12],c:'g',t:'Rd 80k'},Ii:{a:[[25,20],[25,95]],c:'g',t:'Ii'}},
steps:[
{t:'Co je to za obvod?',h:['Q4','Q5','M23','VBG'],x:R`<p>Je to <b>Brokawova bandgap reference</b>. Zrcadlo M2/M3 nutí oba tranzistory Q4 a Q5 vést <b>stejný proud $I$</b>. Q4 má ale 8 emitorů (N = 8), takže pro stejný proud stačí menší $V_{BE}$.</p><p>Zesilovač (Q3, Q2, M4) dorovnává napětí $V_d$ tak dlouho, až je zrcadlo v rovnováze. Uzel bází (fialový) pak sedí přesně na napětí $V_{BG}$.</p>`,m:R`Brokaw = 1× a N× tranzistor + $R_1$ v emitoru většího + společný $R_2$.`},
{t:'Na R1 je rozdíl VBE (PTAT)',h:['Q4','Q5','R1','I4','I5'],x:R`<p>Báze obou tranzistorů jsou spojené. Q5 má emitor přímo na horním konci $R_2$, Q4 má mezi emitorem a tímtéž uzlem ještě $R_1$. Proto $V_{BE5}=V_{BE4}+V_{R1}$, tedy na $R_1$ je rozdíl obou $V_{BE}$:</p>`,g:[R`\Delta V_{BE}=V_T\ln\frac{I}{I_S}-V_T\ln\frac{I}{8I_S}=V_T\ln N`],eq:[R`I=\frac{V_T\ln N}{R_1}=\frac{26\cdot10^{-3}\ln 8}{18\cdot10^{3}}\approx3{,}0\,\mu\text{A}`],r:R`Každou větví teče $I\approx3\,\mu$A (sbírka to nepočítá, ale pomůže to pochopit $2I$ v $R_2$).`},
{t:'Návrh R2 — teplotní kompenzace',h:['R1','R2','I2','Q5','VBG'],x:R`<p>Oba proudy se potkají v $R_2$ → teče jím $2I$. Napětí na bázích je $V_{BE}$ (Q5) plus úbytek na $R_2$ — viz šedý vzorec.</p><p>$V_{BE}$ klesá zhruba −2 mV/K, člen s $V_T$ roste (PTAT). Když jejich součet nastavíš na $V_{BG}=1{,}25$ V, změny se přesně vyruší → <b>TC = 0</b>.</p>`,g:[R`V_{BG}=V_{BE}+2I R_2=V_{BE}+2\frac{R_2}{R_1}V_T\ln N`,R`\Rightarrow R_2=\frac{V_{BG}-V_{BE}}{2V_T\ln N}R_1`],eq:[R`R_2=\frac{1{,}25-0{,}65}{2\cdot26\cdot10^{-3}\ln8}\cdot18\cdot10^3=100\,\text{k}\Omega`],r:R`$R_2=100\,\text{k}\Omega$`,m:R`Faktor 2 je tam proto, že $R_2$ nese proud <b>obou</b> větví.`},
{t:'Proud děličem IR',h:['VBG','R3','R4','IR'],x:R`<p>Uzel $V_{BG}$ je spojený s odbočkou mezi R5 a R4 (báze neberou proud, β → ∞). Pod ním jsou jen R4 + R3 do země, takže:</p>`,g:[R`I_R=\frac{V_{BG}}{R_3+R_4}`],eq:[R`I_R=\frac{1{,}25}{125\cdot10^3}=10\,\mu\text{A}`],r:R`$I_R=10\,\mu$A`},
{t:'Napětí Vref1, Vref2, Vd — jen Ohm',h:['R3','R4','R5','R6','IR'],x:R`<p>Celým děličem teče stejný $I_R$. Každé napětí = $I_R$ × odpor pod danou odbočkou.</p><p><b>Proč jsou teplotně kompenzovaná?</b> $V=V_{BG}\cdot\frac{R_{pod}}{R_3+R_4}$ — poměr dvou odporů stejného typu nemá TC a $V_{BG}$ ho má nulový.</p>`,eq:[R`V_{ref1}=I_RR_3=10\,\mu\cdot25\,\text{k}=0{,}25\,\text{V}`,R`V_{ref2}=I_R(R_3+R_4+R_5)=10\,\mu\cdot250\,\text{k}=2{,}5\,\text{V}`,R`V_d=I_R(R_3+R_4+R_5+R_6)=10\,\mu\cdot400\,\text{k}=4\,\text{V}`],r:R`$V_{ref1}=0{,}25$ V, $V_{ref2}=2{,}5$ V, $V_d=4$ V`,m:R`Napětí odvozené z $V_{BG}$ děličem je stejně stabilní jako $V_{BG}$.`},
{t:'Proud Ii — zdroj z VBE',h:['Q0','Q1','Rd','Ii'],x:R`<p>Vlevo dole: báze Q0 je na horním konci $R_d$, emitor na zemi → přechod BE tranzistoru Q0 <b>visí přímo na $R_d$</b>. Zpětná vazba přes Q1 udrží $V_{Rd}=V_{BE}$. Proud $R_d$ teče přes Q1 a zrcadlo M0 → to je $I_i$.</p>`,g:[R`I_i=\frac{V_{BE}}{R_d}`],eq:[R`I_i=\frac{0{,}65}{80\cdot10^3}=8{,}125\,\mu\text{A}`],r:R`$I_i=8{,}125\,\mu$A`}
],
res:R`$R_2=100\,\text{k}\Omega$, $I_R=10\,\mu$A, $V_{ref1}=0{,}25$ V, $V_{ref2}=2{,}5$ V, $V_d=4$ V, $I_i=8{,}125\,\mu$A`,
tk:[[R`\Delta V_{BE}=V_T\ln N`,'T'],[R`V_{BG}=V_{BE}+2\frac{R_2}{R_1}V_T\ln N`,'T'],[R`R_2=\frac{V_{BG}-V_{BE}}{2V_T\ln N}R_1`,'+','přeskládaný Brokaw'],[R`V_{BG}\approx1{,}25\,\text{V}`,'+'],[R`I=\frac{V_{BE}}{R}`,'d']]},

/* ================= 2.2 ================= */
{id:'2.2',ch:2,title:'Trojnásobný bandgap: Rx, Rb, Vd, Vref',
task:R`Určete hodnoty odporů $R_X$ a $R_b$ tak, aby napětí $V_d$ a $V_{ref}$ byla teplotně kompenzovaná. Vypočítejte hodnoty napětí $V_d$ a $V_{ref}$.`,
pat:['ptat','nvbg','bg','mir','div'],
idea:R`Křížová čtveřice Q0–Q3 vyrobí PTAT proud $I_{ref}$. Dvojnásobek ($2I_{ref}$) teče přes $R_X$ a tři diody → $V_d=3V_{BE}+2I_{ref}R_X$, a to chceš rovné $3V_{BG}$. Brokawova buňka Q9/Q10 se navrhne stejně jako v 2.1.`,
parts:{core:{b:[10,54,26,27],c:'r',t:'Q0–Q3 (Q3: M=4)'},R1:{b:[27,81,10,13],c:'r',t:'R1 7,2k'},Iref:{a:[[30,20],[30,96]],c:'r',t:'Iref'},M:{b:[28,7,28,11],c:'s',t:'M0 → M1+M2 (2×)'},I2:{a:[[46.5,19],[46.5,96]],c:'o',t:'2·Iref'},Rx:{b:[43,40,10,12],c:'o',t:'Rx = ?'},D3:{b:[43,52,13,42],c:'y',t:'Q6–Q8 = 3·VBE'},Q45:{b:[43,22,20,12],c:'s',t:'Q4/Q5 (VBE se odečtou)'},
Q9:{b:[57,57,10,12],c:'p',t:'Q9 (N=4)'},Q10:{b:[70,57,10,12],c:'p',t:'Q10'},Ra:{b:[57,69,10,11],c:'p',t:'Ra 18k'},Rb:{b:[57,81,10,13],c:'p',t:'Rb = ?'},R2:{b:[86,67,9,11],c:'b',t:'R2 50k'},R1r:{b:[86,81,9,14],c:'b',t:'R1 200k'},VBG:{n:[88.5,64.5],c:'p',t:'VBG'},Vd:{n:[60,36],c:'o',t:'Vd'},Vref:{n:[88.5,81],c:'b',t:'Vref'}},
steps:[
{t:'PTAT proud z křížové čtveřice',h:['core','R1','Iref'],x:R`<p>Q0–Q3 jsou zapojené „křížem“. Ve smyčce přechodů BE se tři $V_{BE}$ vyruší a zbude rozdíl mezi normálním tranzistorem a Q3, který je 4× větší (M = 4). Tento rozdíl visí na $R_1$:</p>`,g:[R`I_{ref}=\frac{\Delta V_{BE}}{R_1}=\frac{V_T\ln N}{R_1}`],eq:[R`I_{ref}=\frac{26\cdot10^{-3}\ln4}{7{,}2\cdot10^3}=5\,\mu\text{A}`],r:R`$I_{ref}=5\,\mu$A`},
{t:'Návrh Rx → Vd = 3·VBG',h:['M','I2','Rx','D3','Q45','Vd'],x:R`<p>M1 + M2 (dvě jednotky) zrcadlí z M0 dvojnásobek → přes $R_X$ a diody Q6–Q8 teče $2I_{ref}$. Q4 je dioda (o $V_{BE}$ dolů) a Q5 sledovač (o $V_{BE}$ nahoru) — ty dva se vyruší. Takže</p>`,g:[R`V_d=3V_{BE}+2I_{ref}R_X\stackrel{!}{=}3V_{BG}`],eq:[R`R_X=\frac{3V_{BG}-3V_{BE}}{2I_{ref}}=\frac{3{,}75-1{,}95}{10\cdot10^{-6}}=180\,\text{k}\Omega`],r:R`$R_X=180\,\text{k}\Omega$`,m:R`Každá dioda potřebuje svůj PTAT „doplněk“ $V_{BG}-V_{BE}=0{,}6$ V. Tři diody → 1,8 V na $R_X$.`},
{t:'Návrh Rb (Brokaw, N = 4)',h:['Q9','Q10','Ra','Rb','VBG'],x:R`<p>Q9 (N = 4) a Q10 s $R_a$ a $R_b$ jsou stejná Brokawova buňka jako v 2.1, jen s N = 4. Báze jsou spojené s horním koncem R2 → tam je $V_{BG}$.</p>`,g:[R`R_b=\frac{V_{BG}-V_{BE}}{2V_T\ln N}R_a`],eq:[R`R_b=\frac{1{,}25-0{,}65}{2\cdot26\cdot10^{-3}\ln4}\cdot18\cdot10^3=150\,\text{k}\Omega`],r:R`$R_b=150\,\text{k}\Omega$`},
{t:'Vd a Vref',h:['Vd','VBG','R2','R1r','Vref'],x:R`<p>$V_d$ máme z předchozího kroku. $V_{ref}$ je dělič z uzlu $V_{BG}$ (R2 nahoře, R1 = 200k dole):</p>`,eq:[R`V_d=3V_{BG}=3{,}75\,\text{V}`,R`V_{ref}=V_{BG}\frac{R_1}{R_1+R_2}=1{,}25\cdot\frac{200}{250}=1\,\text{V}`],r:R`$V_d=3{,}75$ V, $V_{ref}=1$ V`,w:R`Ve schématu jsou dva různé rezistory „R1“ (7,2 k v PTAT jádru a 200 k v děliči). Nepleť si je.`}
],
res:R`$R_X=180\,\text{k}\Omega$, $R_b=150\,\text{k}\Omega$, $V_d=3{,}75$ V, $V_{ref}=1$ V`,
tk:[[R`I_{PTAT}=\frac{V_T\ln N}{R}`,'T'],[R`mV_{BE}+I_{PTAT}R=mV_{BG}`,'+','násobek VBG'],[R`R_2=\frac{V_{BG}-V_{BE}}{2V_T\ln N}R_1`,'+'],[R`V=V_i\frac{R_b}{R_a+R_b}`,'d']]},

/* ================= 2.3 ================= */
{id:'2.3',ch:2,title:'Brokaw obráceně: R2, R5, R6, Vref1',
task:R`Určete hodnotu odporu $R_2$ tak, aby napětí $V_d$, $V_{ref2}$ a $V_{ref1}$ byla teplotně kompenzovaná. Vypočítejte hodnoty $R_5$ a $R_6$ tak, aby napětí $V_{ref2}$ bylo 2,5 V a napětí $V_d$ bylo 4 V. Vypočítejte hodnotu napětí $V_{ref1}$.`,
pat:['bg','div'],
idea:R`Stejný obvod jako 2.1, jen pozpátku: uzel $V_{BG}$ = 1,25 V je pevný bod, od něj počítáš proud děliče a pak odpory nahoru.`,
parts:{Q4:{b:[56,55,10,12],c:'r',t:'Q4 (N=8)'},Q5:{b:[69,55,10,12],c:'r',t:'Q5'},R1:{b:[56,67,8,11],c:'o',t:'R1 18k'},R2:{b:[56,81,8,13],c:'p',t:'R2 = ?'},R3:{b:[80,81,8,13],c:'b',t:'R3 25k'},R4:{b:[80,66,8,11],c:'b',t:'R4 100k'},R5:{b:[80,49,8,11],c:'g',t:'R5 = ?'},R6:{b:[80,34,8,11],c:'g',t:'R6 = ?'},VBG:{n:[83,62],c:'p',t:'VBG'},IR:{a:[[83,33],[83,95]],c:'b',t:'Iref'},I4:{a:[[58.5,45],[58.5,79]],c:'r',t:'I'},I5:{a:[[72.5,45],[72.5,80],[60,80]],c:'r',t:'I'},I2:{a:[[58.5,81],[58.5,95]],c:'p',t:'2I'}},
steps:[
{t:'R2 — úplně stejně jako v 2.1',h:['Q4','Q5','R1','R2','I4','I5','I2','VBG'],x:R`<p>Q4 (N = 8), Q5, $R_1=18$ k → stejné hodnoty jako v 2.1, tedy i stejný $R_2$.</p>`,g:[R`R_2=\frac{V_{BG}-V_{BE}}{2V_T\ln N}R_1`],eq:[R`R_2=\frac{1{,}25-0{,}65}{2\cdot26\cdot10^{-3}\ln8}\cdot18\cdot10^3=100\,\text{k}\Omega`],r:R`$R_2=100\,\text{k}\Omega$`},
{t:'Proud děličem',h:['VBG','R3','R4','IR'],x:R`<p>Ve schématu je přímo popsáno, že báze jsou na uzlu $V_{BG}$ (mezi R5 a R4). Pod ním R4 + R3:</p>`,eq:[R`I_{ref}=\frac{V_{BG}}{R_3+R_4}=\frac{1{,}25}{125\cdot10^3}=10\,\mu\text{A}`],r:R`$I_{ref}=10\,\mu$A`},
{t:'Vref1',h:['R3','IR'],eq:[R`V_{ref1}=I_{ref}R_3=10\,\mu\cdot25\,\text{k}=0{,}25\,\text{V}`],r:R`$V_{ref1}=0{,}25$ V`},
{t:'R5 a R6 — rozdíl napětí / proud',h:['R5','R6','IR','VBG'],x:R`<p>Na R5 je rozdíl mezi $V_{ref2}$ a $V_{BG}$, na R6 rozdíl mezi $V_d$ a $V_{ref2}$. Proud je všude $I_{ref}$.</p>`,eq:[R`R_5=\frac{V_{ref2}-V_{BG}}{I_{ref}}=\frac{2{,}5-1{,}25}{10\cdot10^{-6}}=125\,\text{k}\Omega`,R`R_6=\frac{V_d-V_{ref2}}{I_{ref}}=\frac{4-2{,}5}{10\cdot10^{-6}}=150\,\text{k}\Omega`],r:R`$R_5=125\,\text{k}\Omega$, $R_6=150\,\text{k}\Omega$`,m:R`Uzel $V_{BG}$ je kotva — od ní počítáš nahoru i dolů.`}
],
res:R`$R_2=100\,\text{k}\Omega$, $R_5=125\,\text{k}\Omega$, $R_6=150\,\text{k}\Omega$, $V_{ref1}=0{,}25$ V`,
tk:[[R`R_2=\frac{V_{BG}-V_{BE}}{2V_T\ln N}R_1`,'+']]},

/* ================= 2.4 ================= */
{id:'2.4',ch:2,title:'Zdroj proudu z VBE: R2',
task:R`Určete hodnotu odporu $R_2$ tak, aby proud $I_r$ byl 10 µA.`,
pat:['vbe'],
idea:R`Přechod BE tranzistoru Q0 je připojený přímo na $R_2$ → na $R_2$ je vždy $V_{BE}$, takže $I_r=V_{BE}/R_2$.`,
parts:{Q0:{b:[24,59,18,19],c:'r',t:'Q0'},Q1:{b:[44,49,18,18],c:'s',t:'Q1'},R2:{b:[46,72,16,18],c:'r',t:'R2 = ?'},R1:{b:[25,17,15,18],c:'g',t:'R1 2M'},Ir:{a:[[56,30],[56,90]],c:'o',t:'Ir'},IR1:{a:[[32,30],[32,57]],c:'g',t:'IR1'}},
steps:[
{t:'Jak obvod funguje',h:['Q0','Q1','R2','R1','IR1'],x:R`<p>Báze Q0 je na horním konci $R_2$, emitor Q0 na zemi → $V_{R2}=V_{BE0}$. Zpětná vazba: kdyby $I_r$ vzrostl, vzroste $V_{R2}$, Q0 se víc otevře, stáhne bázi Q1 dolů a Q1 proud zase sníží.</p><p>$R_1$ jen dodává proud do kolektoru Q0 a báze Q1 — na výsledek nemá vliv.</p>`,m:R`„B-E na rezistoru“ = rezistor má napětí $V_{BE}$.`},
{t:'Výpočet R2',h:['R2','Ir'],g:[R`I_r=\frac{V_{BE}}{R_2}`],eq:[R`R_2=\frac{V_{BE}}{I_r}=\frac{0{,}65}{10\cdot10^{-6}}=65\,\text{k}\Omega`],r:R`$R_2=65\,\text{k}\Omega$`,w:R`Takový proud má záporný TC (protože $V_{BE}$ klesá s teplotou) — proto se jinde kombinuje s PTAT.`}
],
res:R`$R_2=65\,\text{k}\Omega$`,tk:[[R`I=\frac{V_{BE}}{R}`,'d']]},

/* ================= 2.5 ================= */
{id:'2.5',ch:2,title:'Teplotně kompenzovaný proud: Vref a R0',
task:R`Navrhněte hodnotu napětí $V_{ref}$ a hodnotu odporu $R_0$ tak, aby $I_{ref}$ byl teplotně kompenzovaný proud $I_{ref}=5\,\mu$A. Teplotní koeficient $V_{be}$ je −2 mV/K, teplotní koeficient $TC(R)$ odporu $R_0$ je 0,002/K. Navrhněte obvod kompenzace bázového proudu $I_b$.`,
pat:['ztc'],
idea:R`$V_{BE}$ s teplotou klesá → napětí na $R_0$ roste. $R_0$ s teplotou roste také. Když rostou relativně stejně rychle, proud $V_{R0}/R_0$ se nezmění.`,
parts:{Q1:{b:[68,33,18,18],c:'s',t:'Q1'},Ro:{b:[73,61,17,20],c:'r',t:'R0 = ?'},Vref:{b:[12,39,8,10],c:'b',t:'Vref = ?'},Iref:{a:[[79,4],[79,90]],c:'o',t:'Iref'},VRo:{n:[79,56],c:'r',t:'VR0'}},
steps:[
{t:'Co přesně chceme',h:['Vref','Q1','Ro','VRo'],x:R`<p>Emitor je o $V_{BE}$ níž než báze: $V_{R0}=V_{ref}-V_{BE}$ a $I_{ref}=V_{R0}/R_0$. $V_{ref}$ je stálé (z bandgapu). Když $V_{BE}$ klesne o 2 mV/K, $V_{R0}$ o 2 mV/K <b>vzroste</b>.</p>`},
{t:'Odvození podmínky nulového TC',h:['Ro','VRo'],x:R`<p>Zderivuj $I=V_R/R$ podle teploty a vyděl $I$. Proud se nemění, když relativní změna napětí = relativní změně odporu:</p>`,g:[R`\frac{1}{I}\frac{dI}{dT}=\frac{1}{V_R}\frac{dV_R}{dT}-\frac{1}{R}\frac{dR}{dT}=0`,R`\frac{-TC(V_{BE})}{V_R}=TC(R)\Rightarrow V_R=-\frac{TC(V_{BE})}{TC(R)}`],eq:[R`V_{R0}=\frac{2\cdot10^{-3}}{0{,}002}=1\,\text{V}`],r:R`$V_{R0}=1$ V`,m:R`$V_R=-TC(V_{BE})/TC(R)$ — vychází i v 2.11, 2.22, 2.24.`},
{t:'Vref a R0',h:['Vref','Ro','Iref'],eq:[R`V_{ref}=V_{BE}+V_{R0}=0{,}65+1=1{,}65\,\text{V}`,R`R_0=\frac{V_{R0}}{I_{ref}}=\frac{1}{5\cdot10^{-6}}=200\,\text{k}\Omega`],r:R`$V_{ref}=1{,}65$ V, $R_0=200\,\text{k}\Omega$`},
{t:'Kompenzace bázového proudu (myšlenka)',h:['Vref','Q1'],x:R`<p>Do báze Q1 teče $I_b=I_{ref}/\beta$ a ten by zatěžoval zdroj $V_{ref}$. Řešení (stejně jako v příkladu 2.6): replika — tranzistor se stejným kolektorovým proudem, jehož bázový proud změří PMOS dioda, a PMOS zrcadlo ho vstříkne do báze Q1. Zdroj $V_{ref}$ pak nedodává nic.</p>`}
],
res:R`$V_{ref}=1{,}65$ V, $R_0=200\,\text{k}\Omega$`,
tk:[[R`V_R=-\frac{TC(V_{BE})}{TC(R)}`,'+','nulový TC proudu']]},

/* ================= 2.6 ================= */
{id:'2.6',ch:2,title:'Multi-výstupní zdroj + kompenzace Ib: R0, Iref1, N',
task:R`Určete hodnotu odporu $R_0$ tak, aby proud $I_{ref2}$ byl 2 µA. Jaká je potom hodnota proudu $I_{ref1}$? Kolik segmentů tranzistoru M1 musíme použít, aby byl eliminován bázový proud tranzistorů Q1, Q2, Q3 a Q4?`,
pat:['mir','vbe'],
idea:R`Q1–Q4 mají společné báze i emitory → každý vede stejný proud. $R_0$ nese součet všech čtyř. Bázový proud jednoho tranzistoru změří Q0 + M0, M1 ho vynásobí počtem tranzistorů.`,
parts:{Q1:{b:[39,40,10,12],c:'r',t:'Q1'},Q23:{b:[54,36,18,16],c:'o',t:'Q2+Q3 → Iref1'},Q4:{b:[76,36,10,16],c:'b',t:'Q4 → Iref2'},R0:{b:[41,68,10,17],c:'r',t:'R0 = ?'},Q0:{b:[37,20,12,12],c:'g',t:'Q0 (kaskoda)'},M0:{b:[30,10,10,14],c:'g',t:'M0'},M1:{b:[15,10,10,14],c:'k',t:'M1 (N = ?)'},Vref:{b:[2,40,10,12],c:'s',t:'Vref 1,15V'},IR0:{a:[[45,55],[45,90]],c:'r',t:'4·Iref2'},Ir1:{a:[[66,4],[66,34]],c:'o',t:'Iref1'},Ir2:{a:[[83,4],[83,34]],c:'b',t:'Iref2'},Ib:{a:[[18.5,25],[18.5,43],[38,43]],c:'k',t:'N·Ib'}},
steps:[
{t:'Stejné VBE → stejný proud na jednotku',h:['Q1','Q23','Q4'],x:R`<p>Báze Q1–Q4 jsou spojené (na $V_{ref}$) a emitory také (na $R_0$). Každý tranzistor má tedy stejné $V_{BE}$ → stejný proud. $I_{ref1}$ vedou <b>dva</b> tranzistory (Q2+Q3), $I_{ref2}$ jen Q4.</p>`,eq:[R`I_{ref1}=2I_{ref2}=4\,\mu\text{A}`],r:R`$I_{ref1}=4\,\mu$A`},
{t:'R0 nese čtyři jednotky',h:['R0','IR0','Vref'],x:R`<p>Na $R_0$ je $V_{ref}-V_{BE}$ a teče jím součet proudů Q1 + Q2 + Q3 + Q4 = $4I_{ref2}$.</p>`,eq:[R`R_0=\frac{V_{ref}-V_{BE}}{4I_{ref2}}=\frac{1{,}15-0{,}65}{4\cdot2\cdot10^{-6}}=62{,}5\,\text{k}\Omega`],r:R`$R_0=62{,}5\,\text{k}\Omega$`},
{t:'Kolik segmentů M1?',h:['Q0','M0','M1','Ib'],x:R`<p>Q0 sedí nad Q1 (kaskoda) a vede stejný proud jako Q1 → jeho bázový proud je přesně jeden $I_b$. Ten teče z diody M0. M1 se N segmenty dodá $N\cdot I_b$ do uzlu bází. Báze Q1–Q4 potřebují $4I_b$, aby je nemusel dodávat zdroj $V_{ref}$:</p>`,eq:[R`N\cdot I_b=4I_b\Rightarrow N=4`],r:R`$N=4$`,m:R`Replika + zrcadlo: změř bázový proud jednoho tranzistoru a vynásob ho počtem tranzistorů.`}
],
res:R`$R_0=62{,}5\,\text{k}\Omega$, $I_{ref1}=4\,\mu$A, $N=4$`,tk:[[R`I_{out}=\frac{M_{out}}{M_{in}}I_{in}`,'d']]},

/* ================= 2.7 ================= */
{id:'2.7',ch:2,title:'Časovač: Vri pro T = 100 µs',
task:R`Určete hodnotu napětí $V_{ri}$ tak, aby perioda $T$ byla $T=100\,\mu$s.`,
pat:['cap','mir'],
idea:R`Po náběhu START se $C_o$ nabíjí konstantním proudem $I_c$, dokud nedosáhne $V_{ref}=4$ V. Z času spočítáš $I_c$, ze zrcadla 3:1 proud $R_i$ a z něj $V_{ri}$.`,
parts:{OZ:{b:[13,49,18,17],c:'b',t:'OZ + M0 = sledovač'},M0:{b:[26,51,9,12],c:'b',t:'M0'},Ri:{b:[27,75,10,13],c:'b',t:'Ri 600k'},Vri:{b:[1,50,8,7],c:'b',t:'Vri = ?'},Mm:{b:[27,7,34,12],c:'s',t:'M1+M2+M3 : M4 = 3 : 1'},Co:{b:[53,75,11,13],c:'o',t:'Co 25p'},cmp:{b:[60,32,14,16],c:'p',t:'komparátor'},Vref:{b:[1,42,8,7],c:'p',t:'Vref 4V'},M5:{b:[44,65,10,13],c:'g',t:'M5 (vybíjí Co)'},I3:{a:[[31,20],[31,88]],c:'b',t:'3·Ic'},Ic:{a:[[56.5,18],[56.5,75]],c:'o',t:'Ic'}},
steps:[
{t:'Jak časovač funguje',h:['M5','Co','cmp','Vref'],x:R`<p>START = L → přes invertor je M5 sepnutý a drží $C_o$ vybitý. Náběh START → M5 se rozepne a $C_o$ se začne nabíjet proudem $I_c$. Jakmile napětí na $C_o$ dosáhne $V_{ref}=4$ V, komparátor překlopí OUT do L. Doba mezi tím = $T$.</p>`},
{t:'Nabíjecí proud',h:['Co','Ic','Vref'],g:[R`Q=C\,U=I\,T\Rightarrow T=\frac{C\,V_{ref}}{I_c}`],eq:[R`I_c=\frac{V_{ref}C_o}{T}=\frac{4\cdot25\cdot10^{-12}}{100\cdot10^{-6}}=1\,\mu\text{A}`],r:R`$I_c=1\,\mu$A`,m:R`$T=C\Delta V/I$ — nejčastější vzorec celé kapitoly 2.`},
{t:'Zrcadlo 3 : 1',h:['Mm','I3','Ic'],x:R`<p>M1, M2, M3 jsou diody zapojené paralelně = 3 jednotky, M4 je 1 jednotka. Výstup je třetina vstupu → $R_i$ musí vést $3I_c$.</p>`,eq:[R`I_{Ri}=3I_c=3\,\mu\text{A}`]},
{t:'Napětí Vri',h:['OZ','M0','Ri','Vri','I3'],x:R`<p>OZ s tranzistorem M0 je sledovač: vnutí horní konec $R_i$ na napětí $V_{ri}$. Proud $R_i$ je tedy $V_{ri}/R_i$.</p>`,eq:[R`V_{ri}=3I_cR_i=3\cdot1\cdot10^{-6}\cdot600\cdot10^3=1{,}8\,\text{V}`],r:R`$V_{ri}=1{,}8$ V`}
],
res:R`$I_c=1\,\mu$A, $V_{ri}=1{,}8$ V`,tk:[[R`T=\frac{C\Delta V}{I}`,'+']]},

/* ================= 2.8 ================= */
{id:'2.8',ch:2,title:'Časová prodleva T (PTAT + 2·VBG)',
task:R`Vypočítejte časovou prodlevu $T$ mezi změnou H → L signálu START a změnou výstupního stavu OUT komparátoru COMP.`,
pat:['ptat','nvbg','cap','mir'],
idea:R`PTAT jádro dá $I_{ref}$. M1 ho pošle do $R_2$ + dvou diod (to je práh $V_{ref}$), M2 (10× menší) nabíjí $C$ proudem $I_{ref}/10$. $T=V_{ref}C/(I_{ref}/10)$.`,
parts:{core:{b:[11,33,18,34],c:'r',t:'Q0–Q3 (Q3: N=6)'},R1:{b:[22,75,8,15],c:'r',t:'R1 9,2k'},Ip:{a:[[25,22],[25,92]],c:'r',t:'Iref'},M:{b:[23,9,28,13],c:'s',t:'M0 (10) : M1 (10) : M2 (1)'},R2:{b:[34,34,8,14],c:'o',t:'R2 240k'},D2:{b:[31,50,11,36],c:'y',t:'Q5+Q6 = 2·VBE'},Ir:{a:[[37,22],[37,92]],c:'o',t:'Iref'},Vref:{n:[37,30],c:'o',t:'Vref'},C:{b:[44,70,10,17],c:'b',t:'C 20p'},Ic:{a:[[47.5,22],[47.5,70]],c:'b',t:'Iref/10'},M3:{b:[52,69,9,17],c:'g',t:'M3 (START)'},cmp:{b:[52,24,10,22],c:'p',t:'COMP'}},
steps:[
{t:'PTAT proud',h:['core','R1','Ip'],x:R`<p>Křížová čtveřice, Q3 má N = 6. Na $R_1$ je $\Delta V_{BE}=V_T\ln6$.</p>`,g:[R`I_{ref}=\frac{V_T\ln N}{R_1}`],eq:[R`I_{ref}=\frac{26\cdot10^{-3}\ln6}{9{,}2\cdot10^3}=5\,\mu\text{A}`],r:R`$I_{ref}=5\,\mu$A`},
{t:'Prahové napětí Vref',h:['M','R2','D2','Ir','Vref'],x:R`<p>M1 má stejnou velikost jako M0 (M = 10) → do $R_2$ a diod Q5, Q6 teče $I_{ref}$.</p>`,eq:[R`V_{ref}=I_{ref}R_2+2V_{BE}=5\,\mu\cdot240\,\text{k}+1{,}3=2{,}5\,\text{V}`],r:R`$V_{ref}=2{,}5$ V (= 2·$V_{BG}$, je teplotně stabilní)`},
{t:'Nabíjecí proud',h:['M','Ic','C','M3'],x:R`<p>M2 je jedna jednotka proti deseti v M0 → $I_{ref}/10=0{,}5\,\mu$A. Při START H → L se M3 vypne a $C$ se začne nabíjet.</p>`},
{t:'Doba T',h:['C','Ic','cmp','Vref'],x:R`<p>Komparátor překlopí, když napětí na $C$ dosáhne $V_{ref}$:</p>`,g:[R`T=\frac{V_{ref}C}{I_{ref}/10}`],eq:[R`T=\frac{10\cdot2{,}5\cdot20\cdot10^{-12}}{5\cdot10^{-6}}=100\,\mu\text{s}`],r:R`$T=100\,\mu$s`}
],
res:R`$I_{ref}=5\,\mu$A, $V_{ref}=2{,}5$ V, $T=100\,\mu$s`,tk:[[R`I_{PTAT}=\frac{V_T\ln N}{R}`,'T'],[R`T=\frac{C\Delta V}{I}`,'+']]},

/* ================= 2.9 ================= */
{id:'2.9',ch:2,title:'Oscilátor: kmitočet a střída',
task:R`Spočítejte kmitočet a střídu (duty cycle) tohoto oscilátoru.`,
pat:['osc','cap','mir'],
idea:R`$I_o=V_{ref}/R_o$. $C_{o1}$ se nabíjí proudem $2I_o$ (M2+M3), $C_{o2}+C_{o3}$ proudem $I_o$ (M4). Perioda = součet obou nabíjecích dob.`,
parts:{OZ:{b:[8,49,14,16],c:'b',t:'OZ'},Ro:{b:[19,76,8,12],c:'b',t:'Ro 400k'},Vref:{b:[3,45,5,6],c:'b',t:'Vref 2V'},Io:{a:[[25,20],[25,90]],c:'b',t:'Io'},M23:{b:[31,8,10,11],c:'o',t:'M2+M3 = 2·Io'},M4:{b:[58,8,6,11],c:'g',t:'M4 = Io'},Co1:{b:[32,76,9,12],c:'o',t:'Co1 10p'},Co23:{b:[53,74,14,14],c:'g',t:'Co2+Co3 20p'},I2:{a:[[34.5,21],[34.5,76]],c:'o',t:'2·Io'},I1:{a:[[61,17],[61,74]],c:'g',t:'Io'},cmp:{b:[68,18,11,33],c:'p',t:'komparátory'},rs:{b:[80,23,9,25],c:'p',t:'RS (NAND)'}},
steps:[
{t:'Referenční proud',h:['OZ','Ro','Vref','Io'],x:R`<p>OZ s M0 vnutí na $R_o$ napětí $V_{ref}$:</p>`,eq:[R`I_o=\frac{V_{ref}}{R_o}=\frac{2}{400\cdot10^3}=5\,\mu\text{A}`],r:R`$I_o=5\,\mu$A`},
{t:'Jak oscilátor kmitá',h:['cmp','rs','Co1','Co23'],x:R`<p>RS klopný obvod (dva NAND) vždy jeden kondenzátor drží vybitý a druhý nechá nabíjet. Když nabíjený dosáhne $V_{ref}$, jeho komparátor překlopí RS a role se prohodí. Jedna perioda = nabití $C_{o1}$ + nabití $C_{o2}+C_{o3}$.</p>`},
{t:'Doba T1 (Co1, proud 2·Io)',h:['M23','I2','Co1'],eq:[R`T_1=\frac{V_{ref}C_{o1}}{2I_o}=\frac{2\cdot10\cdot10^{-12}}{2\cdot5\cdot10^{-6}}=2\,\mu\text{s}`],r:R`$T_1=2\,\mu$s`},
{t:'Doba T2 (Co2+Co3, proud Io)',h:['M4','I1','Co23'],x:R`<p>$C_{o2}$ a $C_{o3}$ jsou paralelně → sečti je.</p>`,eq:[R`T_2=\frac{V_{ref}(C_{o2}+C_{o3})}{I_o}=\frac{2\cdot20\cdot10^{-12}}{5\cdot10^{-6}}=8\,\mu\text{s}`],r:R`$T_2=8\,\mu$s`},
{t:'Kmitočet a střída',eq:[R`f=\frac{1}{T_1+T_2}=\frac{1}{10\,\mu\text{s}}=100\,\text{kHz}`,R`DC=\frac{T_2}{T_1+T_2}\cdot100=80\,\%`],r:R`$f=100$ kHz, $DC=80$ %`,w:R`Která fáze je na OUT „H“, záleží na zapojení klopného obvodu. Sbírka bere jako střídu podíl $T_2$.`}
],
res:R`$f=100$ kHz, $DC=80$ %`,tk:[[R`T=\frac{C\Delta V}{I}`,'+'],[R`f=\frac{1}{T_1+T_2}`,'+']]},

/* ================= 2.10 ================= */
{id:'2.10',ch:2,title:'Oscilátor s RS: kmitočet a střída',
task:R`Vypočítejte kmitočet a duty cycle (střídu) tohoto oscilátoru. Všechny tranzistory mají jednotkovou velikost.`,
pat:['osc','cap','mir'],
idea:R`Stejný princip jako 2.9: $C_0+C_1$ nabíjí M1 proudem $I_o$, $C_2$ nabíjí M2+M3 proudem $2I_o$.`,
parts:{Is:{b:[9,57,6,13],c:'b',t:'Io 2,5µA'},M1:{b:[20,8,6,11],c:'g',t:'M1 = Io'},M23:{b:[30,8,11,12],c:'o',t:'M2+M3 = 2·Io'},C01:{b:[19,79,12,12],c:'g',t:'C0+C1 8p'},C2:{b:[34,79,7,12],c:'o',t:'C2 4p'},I1:{a:[[23,18],[23,79]],c:'g',t:'Io'},I2:{a:[[38,24],[38,79]],c:'o',t:'2·Io'},cmp:{b:[47,24,17,32],c:'p',t:'komparátory'},rs:{b:[69,28,15,26],c:'p',t:'RSff'},Vref:{b:[3,34,5,6],c:'b',t:'Vref 2,5V'}},
steps:[
{t:'Kdo co nabíjí',h:['Is','M1','M23','C01','C2','I1','I2'],x:R`<p>M0 je dioda se zdrojem $I_o$. Všechny tranzistory jsou jednotkové → M1 dá $I_o$, M2 + M3 paralelně $2I_o$. $C_0$ a $C_1$ jsou paralelně (8 pF).</p>`},
{t:'T1 a T2',h:['C01','C2','I1','I2'],eq:[R`T_1=\frac{V_{ref}(C_0+C_1)}{I_o}=\frac{2{,}5\cdot8\cdot10^{-12}}{2{,}5\cdot10^{-6}}=8\,\mu\text{s}`,R`T_2=\frac{V_{ref}C_2}{2I_o}=\frac{2{,}5\cdot4\cdot10^{-12}}{5\cdot10^{-6}}=2\,\mu\text{s}`],r:R`$T_1=8\,\mu$s, $T_2=2\,\mu$s`},
{t:'Kmitočet a střída',h:['cmp','rs'],eq:[R`f=\frac{1}{T_1+T_2}=100\,\text{kHz}`,R`DC=\frac{T_1}{T_1+T_2}\cdot100=80\,\%`],r:R`$f=100$ kHz, $DC=80$ %`}
],
res:R`$f=100$ kHz, $DC=80$ %`,tk:[[R`T=\frac{C\Delta V}{I}`,'+']]},
/* ================= 2.11 ================= */
{id:'2.11',ch:2,title:'Teplotně nezávislá perioda: Vri a T',
task:R`Určete hodnotu napětí $V_{Ri}$ tak, aby perioda $T$ byla teplotně nezávislá. Vypočítejte čas periody $T$. Hodnota činitele β bipolárního tranzistoru je nekonečná.`,
pat:['ztc','cap','mir','div'],
idea:R`$T=V_{ref}C/I_c$ a $V_{ref}$ i $C$ jsou stálé → stačí, aby byl stálý proud $I_c$. Ten vzniká na $R_i$ (TC 0,002/K) v emitoru Q0 → stejná podmínka jako v 2.5: na $R_i$ musí být 1 V.`,
parts:{Ra:{b:[8,48,7,7],c:'k',t:'Ra 74k'},Rb:{b:[15,59,8,13],c:'k',t:'Rb 100k'},Q0:{b:[26,45,7,13],c:'r',t:'Q0'},Ri:{b:[27,58,9,14],c:'r',t:'Ri 400k (TC 0,002)'},M02:{b:[27,8,21,17],c:'s',t:'M0+M1+M2 (3) : M3 (1)'},M3:{b:[50,8,7,14],c:'o',t:'M3'},C:{b:[51,74,8,13],c:'o',t:'C 10p'},cmp:{b:[58,22,11,17],c:'p',t:'komparátor (Vref 2V)'},IQ:{a:[[30.5,24],[30.5,89]],c:'r',t:'3·Ic'},Ic:{a:[[53.3,20],[53.3,74]],c:'o',t:'Ic'},VB:{n:[30,52],c:'k',t:'báze Q0'}},
steps:[
{t:'Kdy je T teplotně nezávislá?',h:['C','cmp','Ic'],x:R`<p>Perioda je doba nabití $C$ až na $V_{ref}$: $T=V_{ref}C/I_c$. $V_{ref}$ i $C$ jsou dané a stálé — <b>teplotně stálý musí být $I_c$</b>.</p>`},
{t:'Kde vzniká Ic',h:['Q0','Ri','M02','M3','IQ','Ic'],x:R`<p>Q0 vede proud $(V_B-V_{BE})/R_i$. Ten teče diodami M0+M1+M2 (3 jednotky), M3 (1 jednotka) z něj dá třetinu → $I_c=I_{Q0}/3$.</p>`},
{t:'Podmínka nulového TC',h:['Ri','VB'],x:R`<p>Stejně jako v 2.5: napětí na $R_i$ musí být $-TC(V_{BE})/TC(R)$:</p>`,g:[R`V_{Ri}=-\frac{TC(V_{BE})}{TC(R)}`],eq:[R`V_{Ri}=\frac{2\cdot10^{-3}}{2\cdot10^{-3}}=1\,\text{V}\Rightarrow V_B=V_{BE}+1=1{,}6\,\text{V}`],r:R`napětí na bázi Q0: $V_B=1{,}6$ V`},
{t:'Proud a perioda',h:['Ri','IQ','Ic','C'],eq:[R`I_C=\frac{V_B-V_{BE}}{3R_i}=\frac{1}{3\cdot400\cdot10^3}=833\,\text{nA}`,R`T=\frac{V_{ref}C}{I_C}=\frac{2\cdot10\cdot10^{-12}}{833\cdot10^{-9}}=24\,\mu\text{s}`],r:R`$I_C=833$ nA, $T=24\,\mu$s`},
{t:'A co dělič Ra/Rb?',h:['Ra','Rb','VB'],x:R`<p>Sbírka jako výsledek uvádí 1,6 V. To je ale napětí na <b>bázi</b> Q0. Vstup $V_{ri}$ jde přes dělič $R_a/R_b$ (β → ∞, báze nebere proud):</p>`,eq:[R`V_{ri}=V_B\frac{R_a+R_b}{R_b}=1{,}6\cdot\frac{174}{100}\approx2{,}78\,\text{V}`],w:R`Sbírka píše „$V_{Ri}=1{,}6$ V“ — myslí napětí za děličem. Kdyby se u zkoušky ptali na vstupní svorku, je to ≈ 2,78 V.`}
],
res:R`$V_B=1{,}6$ V (na svorce $V_{ri}\approx2{,}78$ V), $I_C=833$ nA, $T=24\,\mu$s`,
tk:[[R`V_R=-\frac{TC(V_{BE})}{TC(R)}`,'+'],[R`T=\frac{C\Delta V}{I}`,'+']]},

/* ================= 2.12 ================= */
{id:'2.12',ch:2,title:'Offset OZ ve zpětné vazbě: Vos',
task:R`Určete hodnotu nesymetrie $V_{OS}$ tak, aby proud $I_f$ byl 20 µA.`,
pat:['offc'],
idea:R`Ideální OZ se zpětnou vazbou srovná svoje vstupy. Mezi „−“ a horním koncem $R_s$ je ale $V_{OS}$, takže na $R_s$ je $V_{FB}-V_{OS}$.`,
parts:{OZ:{b:[35,13,30,37],c:'b',t:'OZ'},M8:{b:[75,25,11,14],c:'s',t:'M8'},Rs:{b:[77,75,9,16],c:'r',t:'Rs 100k'},Vos:{b:[20,49,14,18],c:'p',t:'Vos = ?'},FB:{b:[12,18,9,8],c:'b',t:'FB 3V'},If:{a:[[81,5],[81,92]],c:'r',t:'If'}},
steps:[
{t:'Co udělá smyčka',h:['OZ','FB','Vos','M8'],x:R`<p>OZ řídí M8 tak, aby napětí na jeho „−“ vstupu bylo rovné „+“ vstupu = 3 V. Mezi „−“ vstupem a horním koncem $R_s$ je zdroj $V_{OS}$, takže horní konec $R_s$ je na $3-V_{OS}$.</p>`,m:R`Offset se chová jako baterie v sérii se vstupem — posune napětí, které smyčka vnutí.`},
{t:'Výpočet',h:['Rs','If','Vos'],eq:[R`V_{Rs}=R_SI_f=100\cdot10^3\cdot20\cdot10^{-6}=2\,\text{V}`,R`V_{OS}=V_{FB}-V_{Rs}=3-2=1\,\text{V}`],r:R`$V_{OS}=1$ V`}
],
res:R`$V_{OS}=1$ V`,tk:[]},

/* ================= 2.13 ================= */
{id:'2.13',ch:2,title:'Úmyslný offset komparátoru (R v jedné větvi)',
task:R`Určete offset (vstupní napěťovou nesymetrii) tohoto komparátoru. Teplotní koeficienty proudu $I_r$ a odporu $R$ jsou nulové. Všechny tranzistory mají jednotkovou velikost.`,
pat:['offc','mir'],
idea:R`Oba vstupy jdou na pár M8/M9 přes stejné sledovače (M6, M12). V cestě IN+ je navíc $R$, kterým teče $I_{os}=I_r/3$ → offset $=R\cdot I_{os}$.`,
parts:{Ir:{b:[9,17,7,16],c:'s',t:'Ir 15µA'},M01:{b:[9,66,18,15],c:'s',t:'M0 → M1'},M24:{b:[17,6,25,13],c:'o',t:'M2+M3+M4 (3 jedn.)'},M5:{b:[43,6,7,13],c:'g',t:'M5'},M11:{b:[70,6,9,13],c:'r',t:'M11'},M6:{b:[40,44,9,13],c:'g',t:'M6 (sledovač IN−)'},M12:{b:[69,55,10,13],c:'r',t:'M12 (sledovač IN+)'},R:{b:[72,41,9,14],c:'r',t:'R 80k'},M89:{b:[49,33,25,14],c:'p',t:'dif. pár M8/M9'},Ios:{a:[[75.5,18],[75.5,88]],c:'r',t:'Ios'},I5:{a:[[46.5,18],[46.5,88]],c:'g',t:'Ir/3'},I1:{a:[[26,25],[26,88]],c:'o',t:'Ir'}},
steps:[
{t:'Rozdělení proudů',h:['Ir','M01','M24','I1','M5','M11','Ios','I5'],x:R`<p>M0 → M1 zrcadlí $I_r$ 1:1. M1 ho táhne ze <b>tří</b> diodových PMOS M2–M4 → každá jednotka nese $I_r/3$. M5 a M11 (1 jednotka) proto dodají také $I_r/3$.</p>`,eq:[R`I_{OS}=\frac{I_r}{3}=\frac{15\,\mu\text{A}}{3}=5\,\mu\text{A}`]},
{t:'Dvě cesty ke gatům páru',h:['M6','M12','R','M89'],x:R`<p>IN− → sledovač M6 → gate M8: $V_{G8}=V_{IN-}+|V_{GS}|$.</p><p>IN+ → sledovač M12 → přes $R$ → gate M9: $V_{G9}=V_{IN+}+|V_{GS}|+R I_{OS}$.</p><p>M6 a M12 jsou stejné a vedou stejný proud → mají stejné $V_{GS}$, které se odečte.</p>`},
{t:'Offset',h:['R','Ios'],x:R`<p>Komparátor překlápí, když se gaty rovnají → vstupy se musí lišit právě o $R I_{OS}$:</p>`,eq:[R`V_{OS}=R\cdot I_{OS}=R\frac{I_r}{3}=80\cdot10^3\cdot\frac{15\cdot10^{-6}}{3}=0{,}4\,\text{V}`],r:R`$V_{OS}=0{,}4$ V`,m:R`Úmyslný offset = rezistor v jedné větvi × proud, který jím teče.`}
],
res:R`$V_{OS}=0{,}4$ V`,tk:[[R`V_{OS}=I\cdot R`,'+']]},

/* ================= 2.14 ================= */
{id:'2.14',ch:2,title:'Teplotně stabilní proud If: RA a RB',
task:R`Určete hodnoty odporů $R_A$ a $R_B$ tak, aby proud $I_f$ byl teplotně stabilní a aby jeho hodnota byla $I_f=20\,\mu$A. Všechny odpory mají nulový teplotní koeficient.`,
pat:['ptat','nvbg','vi','mir'],
idea:R`Řetězec Q4 + $R_B$ + Q5 nese $2I_{PTAT}$ a $R_B$ zvolíš tak, aby měl úbytek přesně $2V_{BG}$. OZ drží horní konec řetězce na $V_{ref}=3{,}5$ V, takže na $R_A$ zbude stálé $V_{ref}-2V_{BG}=1$ V.`,
parts:{core:{b:[19,43,25,30],c:'r',t:'Q0–Q3 (Q3: N=6)'},Rs:{b:[39,74,8,12],c:'r',t:'Rs 9,2k'},Ip:{a:[[41,24],[41,90]],c:'r',t:'Iptat'},M12:{b:[61,9,14,12],c:'o',t:'M1+M2 = 2·Iptat'},I2:{a:[[69,25],[69,90]],c:'o',t:'2·Iptat'},Q4:{b:[61,41,11,11],c:'y',t:'Q4 (dioda)'},RB:{b:[66,55,8,13],c:'o',t:'RB = ?'},Q5:{b:[64,68,10,11],c:'y',t:'Q5 (PNP)'},OZ:{b:[50,24,16,18],c:'b',t:'OZ (+ = 3,5 V)'},M3:{b:[79,27,9,11],c:'s',t:'M3'},RA:{b:[82,76,7,13],c:'g',t:'RA = ?'},If:{a:[[96,17],[84.5,17],[84.5,90]],c:'g',t:'If'},X:{n:[61,49],c:'b',t:'= Vref'}},
steps:[
{t:'PTAT proud a jeho dvojnásobek',h:['core','Rs','Ip','M12','I2'],eq:[R`I_{PTAT}=\frac{V_T\ln6}{R_s}=\frac{26\cdot10^{-3}\cdot1{,}79}{9{,}2\cdot10^3}=5{,}06\,\mu\text{A}`],x:R`<p>M1 + M2 (2 jednotky) zrcadlí z M0 → do řetězce Q4–$R_B$–Q5 teče $2I_{PTAT}$.</p>`},
{t:'Co dělá OZ',h:['OZ','X','Q4','M3'],x:R`<p>Vstup „−“ OZ je připojený na bázi/kolektor diody Q4. Virtuální zkrat → tento uzel je na $V_{ref}=3{,}5$ V. OZ přitom řídí M3, který krmí $R_A$ a bázi Q5.</p>`},
{t:'Návrh RB → úbytek řetězce = 2·VBG',h:['Q4','RB','Q5','I2'],x:R`<p>Od uzlu dolů: přechod BE Q4, $R_B$, přechod EB tranzistoru Q5 (PNP, báze na horním konci $R_A$). Chceme stálý úbytek $2V_{BG}$:</p>`,g:[R`2V_{BE}+2I_{PTAT}R_B=2V_{BG}`],eq:[R`R_B=\frac{2V_{BG}-2V_{BE}}{2I_{PTAT}}=\frac{R_s(2V_{BG}-2V_{BE})}{2V_T\ln N}=\frac{9{,}2\cdot10^3\cdot1{,}2}{2\cdot26\cdot10^{-3}\ln6}=118{,}5\,\text{k}\Omega`],r:R`$R_B=118{,}5\,\text{k}\Omega$`},
{t:'Návrh RA',h:['RA','If','M3'],x:R`<p>Na $R_A$ zbývá $V_{ref}-2V_{BG}$ — obě složky jsou stálé a $R_A$ má nulový TC → $I_f$ je stálý.</p>`,eq:[R`R_A=\frac{V_{ref}-2V_{BG}}{I_f}=\frac{3{,}5-2{,}5}{20\cdot10^{-6}}=50\,\text{k}\Omega`],r:R`$R_A=50\,\text{k}\Omega$`,m:R`Stálý proud = stálé napětí / rezistor s nulovým TC.`}
],
res:R`$R_A=50\,\text{k}\Omega$, $R_B=118{,}5\,\text{k}\Omega$`,tk:[[R`I_{PTAT}=\frac{V_T\ln N}{R}`,'T'],[R`mV_{BE}+I_{PTAT}R=mV_{BG}`,'+']]},

/* ================= 2.15 ================= */
{id:'2.15',ch:2,title:'V–I převodník se stabilním Io: Ro, Io',
task:R`Vypočítejte hodnotu odporu $R_O$ tak, aby proud $I_O$ byl teplotně stabilní. Vypočítejte hodnotu proudu $I_O$. Teplotní koeficient $T_{CR}$ odporu $R_S$ je nulový.`,
pat:['vi','ptat','nvbg','div','mir'],
idea:R`Smyčka (OTA M6/M7 + M14) drží horní konec $R_o$ na $V_d$. Úbytek $R_o$ + dvou $V_{BE}$ navrhneš na $2V_{BG}$ → na $R_s$ zbude stálé $V_d-2V_{BG}$.`,
parts:{core:{b:[10,21,16,25],c:'r',t:'Q0–Q3 (Q0: N=4)'},Re:{b:[20,8,7,11],c:'r',t:'Re 9k'},Ra:{b:[33,26,6,11],c:'b',t:'Ra 25k'},Rb:{b:[33,44,6,11],c:'b',t:'Rb 100k'},Vd:{n:[35,38.5],c:'b',t:'Vd'},ota:{b:[47,32,16,14],c:'p',t:'OTA M6/M7'},Ro:{b:[79,43,7,13],c:'o',t:'Ro = ?'},Q45:{b:[78,56,9,25],c:'y',t:'Q4+Q5 = 2·VBE'},Rs:{b:[85,78,6,13],c:'g',t:'Rs 75k'},M14:{b:[83,25,8,9],c:'s',t:'M14'},Io:{a:[[87.5,8],[87.5,91]],c:'g',t:'Io'},IRo:{a:[[80.5,22],[80.5,55]],c:'o',t:'IRo'},Mm:{b:[69,9,16,12],c:'s',t:'M11+M12+M13'}},
steps:[
{t:'PTAT proud do Ro',h:['core','Re','Mm','IRo'],x:R`<p>PTAT jádro (Q0 má N = 4, v emitoru $R_e$). Řetěz zrcadel má celkový převod 3/2 (M0+M1 → M2 → M10 → M11+M12+M13), takže do $R_o$ teče</p>`,eq:[R`I_{Ro}=\frac32\frac{\Delta V_{BE}}{R_e}=\frac32\frac{V_T\ln N}{R_e}=\frac32\cdot\frac{26\cdot10^{-3}\ln4}{9\cdot10^3}=6\,\mu\text{A}`],r:R`$I_{Ro}=6\,\mu$A`},
{t:'Ro tak, aby řetězec měl 2·VBG',h:['Ro','Q45','IRo'],x:R`<p>Pod $R_o$ jsou dva přechody BE (Q4 dioda, Q5). Aby byl celý úbytek teplotně stálý, musí $R_o$ dodat oběma $V_{BE}$ jejich PTAT doplněk:</p>`,g:[R`I_{Ro}R_O+2V_{BE}=2V_{BG}`],eq:[R`R_O=\frac{2(V_{BG}-V_{BE})}{I_{Ro}}=\frac{1{,}2}{6\cdot10^{-6}}=200\,\text{k}\Omega`],r:R`$R_O=200\,\text{k}\Omega$`},
{t:'Vstupní napětí z děliče',h:['Ra','Rb','Vd'],eq:[R`V_d=V_i\frac{R_b}{R_a+R_b}=5\cdot\frac{100}{125}=4\,\text{V}`]},
{t:'Výstupní proud',h:['ota','M14','Ro','Q45','Rs','Io'],x:R`<p>OTA (M6/M7) porovnává $V_d$ s horním koncem $R_o$ a přes M14 dorovná rozdíl → horní konec $R_o$ = $V_d$. Dolů odečteš $2V_{BG}$, zbytek visí na $R_s$. Proud $I_O$ teče z OUT přes M14 do $R_s$.</p>`,eq:[R`I_O=\frac{V_{Rs}}{R_S}=\frac{V_d-2V_{BG}}{R_S}=\frac{4-2{,}5}{75\cdot10^3}=20\,\mu\text{A}`],r:R`$I_O=20\,\mu$A`,m:R`V–I převodník: smyčka vnutí napětí, odečti úbytky řetězce, zbytek / $R_s$.`}
],
res:R`$I_{Ro}=6\,\mu$A, $R_O=200\,\text{k}\Omega$, $V_d=4$ V, $I_O=20\,\mu$A`,tk:[[R`I_{PTAT}=\frac{V_T\ln N}{R}`,'T'],[R`mV_{BE}+I_{PTAT}R=mV_{BG}`,'+'],[R`I_O=\frac{V_{IN}-V_{Ro}-mV_{BE}}{R_s}`,'+','postup']]},

/* ================= 2.16 ================= */
{id:'2.16',ch:2,title:'V–I převodník: Io',
task:R`Vypočítejte hodnotu proudu $I_O$ tohoto V → I převodníku.`,
pat:['vi','ptat','div'],
idea:R`Úplně stejná topologie jako 2.15. $V_{IN}$ z děliče, $V_{Ro}$ z PTAT proudu, odečti dvě $V_{BE}$ → zbytek na $R_s$.`,
parts:{core:{b:[11,21,16,30],c:'r',t:'Q0–Q3 (Q0: N=4)'},Re:{b:[21,9,6,12],c:'r',t:'Re 9k'},Ra:{b:[33,25,6,12],c:'b',t:'Ra 30k'},Rb:{b:[33,43,6,13],c:'b',t:'Rb 90k'},VIN:{n:[35,41],c:'b',t:'VIN'},ota:{b:[47,36,16,11],c:'p',t:'OTA M6/M7'},Ro:{b:[79,43,7,13],c:'o',t:'Ro 200k'},Q45:{b:[78,58,9,22],c:'y',t:'Q4+Q5 = 2·VBE'},Rs:{b:[85,78,7,13],c:'g',t:'Rs 62,5k'},M14:{b:[84,28,7,10],c:'s',t:'M14'},Io:{a:[[88,8],[88,90]],c:'g',t:'Io'},IRo:{a:[[81,22],[81,57]],c:'o',t:'IRo'}},
steps:[
{t:'VIN z děliče',h:['Ra','Rb','VIN'],eq:[R`V_{IN}=V_i\frac{R_b}{R_a+R_b}=5\cdot\frac{90}{120}=3{,}75\,\text{V}`],r:R`$V_{IN}=3{,}75$ V`},
{t:'Úbytek na Ro',h:['core','Re','Ro','IRo'],x:R`<p>Do $R_o$ teče stejně jako v 2.15 proud $\frac32V_T\ln N/R_e$:</p>`,eq:[R`V_{Ro}=R_o\frac32\frac{V_T\ln N}{R_e}=200\cdot10^3\cdot\frac32\cdot\frac{26\cdot10^{-3}\ln4}{9\cdot10^3}=1{,}2\,\text{V}`],r:R`$V_{Ro}=1{,}2$ V`},
{t:'Io',h:['ota','Ro','Q45','Rs','M14','Io'],x:R`<p>Smyčka: horní konec $R_o$ = $V_{IN}$. Dolů: −$V_{Ro}$, −2$V_{BE}$:</p>`,eq:[R`I_O=\frac{V_{IN}-V_{Ro}-2V_{BE}}{R_s}=\frac{3{,}75-1{,}2-1{,}3}{62{,}5\cdot10^3}=20\,\mu\text{A}`],r:R`$I_O=20\,\mu$A`}
],
res:R`$V_{IN}=3{,}75$ V, $V_{Ro}=1{,}2$ V, $I_O=20\,\mu$A`,tk:[[R`I_O=\frac{V_{IN}-V_{Ro}-mV_{BE}}{R_s}`,'+']]},

/* ================= 2.17 ================= */
{id:'2.17',ch:2,title:'V–I převodník: Io (jedno VBE)',
task:R`Vypočítejte hodnotu proudu $I_O$ tohoto V → I převodníku.`,
pat:['vi','ptat','div'],
idea:R`Stejný postup jako 2.16, ale pod $R_o$ je jen <b>jeden</b> tranzistor Q4 → odečítáš jen jedno $V_{BE}$. PTAT proud do $R_o$ je tady $2V_T\ln N/R_p$.`,
parts:{core:{b:[12,37,15,30],c:'r',t:'Q0–Q3 (Q3: N=4)'},Rp:{b:[22,68,6,12],c:'r',t:'Rp 7,2k'},Ra:{b:[29,43,6,12],c:'b',t:'Ra 30k'},Rb:{b:[29,68,6,12],c:'b',t:'Rb 90k'},VIN:{n:[31,57],c:'b',t:'VIN'},ota:{b:[50,51,16,11],c:'p',t:'OTA M4/M5'},Ro:{b:[79,58,6,11],c:'o',t:'Ro 60k'},Q4:{b:[79,70,8,12],c:'y',t:'Q4 (−VBE)'},Rs:{b:[85,77,6,12],c:'g',t:'Rs 70k'},M14:{b:[84,43,7,12],c:'s',t:'M14'},Io:{a:[[88,18],[88,90]],c:'g',t:'Io'}},
steps:[
{t:'VIN',h:['Ra','Rb','VIN'],eq:[R`V_{IN}=V_i\frac{R_b}{R_a+R_b}=4\cdot\frac{90}{120}=3\,\text{V}`]},
{t:'Úbytek na Ro',h:['core','Rp','Ro'],x:R`<p>Zrcadla dávají do $R_o$ dvojnásobek PTAT proudu jádra:</p>`,eq:[R`V_{Ro}=R_o\cdot2\frac{V_T\ln N}{R_p}=60\cdot10^3\cdot2\cdot\frac{26\cdot10^{-3}\ln4}{7{,}2\cdot10^3}=0{,}6\,\text{V}`]},
{t:'Io',h:['ota','Ro','Q4','Rs','M14','Io'],eq:[R`I_O=\frac{V_{IN}-V_{Ro}-V_{BE}}{R_s}=\frac{3-0{,}6-0{,}65}{70\cdot10^3}=25\,\mu\text{A}`],r:R`$I_O=25\,\mu$A`,m:R`Spočítej si přechody BE v řetězci — tady je jen jeden.`}
],
res:R`$V_{IN}=3$ V, $V_{Ro}=0{,}6$ V, $I_O=25\,\mu$A`,tk:[[R`I_O=\frac{V_{IN}-V_{Ro}-mV_{BE}}{R_s}`,'+']]},

/* ================= 2.18 ================= */
{id:'2.18',ch:2,title:'V–I převodník se vstupním PNP sledovačem: Io',
task:R`Spočítejte hodnotu proudu $I_O$.`,
pat:['vi','ptat','div'],
idea:R`Q4 (PNP sledovač) posune $V_{IN}$ o $V_{BE}$ <b>nahoru</b>, Q5 + Q6 pod $R_o$ ho sníží o $2V_{BE}$ → netto odečteš jen jedno $V_{BE}$.`,
parts:{core:{b:[13,48,15,27],c:'r',t:'Q0–Q3 (Q3: N=4)'},Rp:{b:[24,78,5,12],c:'r',t:'Rp 7,2k'},Ra:{b:[31,44,5,12],c:'b',t:'Ra 45k'},Rb:{b:[31,70,5,12],c:'b',t:'Rb 90k'},VIN:{n:[33,62.5],c:'b',t:'VIN'},Q4:{b:[46,57,8,11],c:'k',t:'Q4 (+VBE)'},ota:{b:[52,42,16,11],c:'p',t:'OTA M7/M8'},Ro:{b:[78,49,6,11],c:'o',t:'Ro 60k'},Q56:{b:[75,58,11,22],c:'y',t:'Q5+Q6 (−2·VBE)'},Rs:{b:[85,78,6,12],c:'g',t:'Rs 150k'},M14:{b:[84,32,6,11],c:'s',t:'M14'},Io:{a:[[87,20],[87,90]],c:'g',t:'Io'}},
steps:[
{t:'VIN',h:['Ra','Rb','VIN'],eq:[R`V_{IN}=V_i\frac{R_b}{R_a+R_b}=3\cdot\frac{90}{135}=2\,\text{V}`]},
{t:'Úbytek na Ro',h:['core','Rp','Ro'],eq:[R`V_{Ro}=R_o\cdot2\frac{V_T\ln N}{R_p}=60\cdot10^3\cdot2\cdot\frac{26\cdot10^{-3}\ln4}{7{,}2\cdot10^3}=0{,}6\,\text{V}`]},
{t:'Bilance VBE',h:['Q4','Q56'],x:R`<p>Q4 je PNP sledovač: jeho emitor (gate M7) je o $V_{BE}$ <b>výš</b> než $V_{IN}$. Pod $R_o$: Q5 dioda (−$V_{BE}$) a Q6 PNP (−$V_{BE}$, báze na $R_s$). Celkem $+1-2=-1$ $V_{BE}$.</p>`},
{t:'Io',h:['ota','Ro','Q56','Rs','M14','Io'],eq:[R`I_O=\frac{V_{IN}-V_{Ro}-V_{BE}}{R_s}=\frac{2-0{,}6-0{,}65}{150\cdot10^3}=5\,\mu\text{A}`],r:R`$I_O=5\,\mu$A`,w:R`Každý přechod BE „dolů“ = −$V_{BE}$, PNP sledovač na vstupu = +$V_{BE}$. Tohle se u zkoušky plete nejčastěji.`}
],
res:R`$V_{IN}=2$ V, $V_{Ro}=0{,}6$ V, $I_O=5\,\mu$A`,tk:[[R`I_O=\frac{V_{IN}-V_{Ro}-mV_{BE}}{R_s}`,'+']]},

/* ================= 2.19 ================= */
{id:'2.19',ch:2,title:'Offset komparátoru: 4× plocha + Ro',
task:R`Vypočítejte offset tohoto komparátoru.`,
pat:['offc','mir'],
idea:R`Gate M5 = (−IN) + $V_{BE}$ čtyř paralelních tranzistorů, gate M6 = (+IN) + $V_{BE}$ jednoho tranzistoru + $R_oI_i$. Oba při stejném proudu $I_i$ → offset $=V_T\ln4+R_oI_i$.`,
parts:{Ii:{b:[13,25,6,13],c:'s',t:'Ii 15µA'},Q03:{b:[30,46,27,18],c:'r',t:'Q0–Q3 paralelně (4·Is)'},M3:{b:[52,8,6,13],c:'r',t:'M3 → Ii'},M9:{b:[81,8,7,13],c:'o',t:'M9 → Ii'},Ro:{b:[82,45,6,12],c:'o',t:'Ro 13k'},Q4:{b:[82,57,10,11],c:'o',t:'Q4 (1·Is)'},M56:{b:[58,36,25,12],c:'p',t:'dif. pár M5/M6'},Ia:{a:[[55,18],[55,45]],c:'r',t:'Ii'},Ib:{a:[[84,18],[84,66]],c:'o',t:'Ii'}},
steps:[
{t:'Gate M5 (strana −IN)',h:['Q03','M3','Ia'],x:R`<p>Q0–Q3 jsou čtyři stejné tranzistory paralelně = jeden se 4× plochou. Do jejich emitorů teče $I_i$ z M3.</p>`,eq:[R`V_{G5}=V_{-IN}+V_T\ln\frac{I_i}{4I_S}`]},
{t:'Gate M6 (strana +IN)',h:['Q4','Ro','M9','Ib'],x:R`<p>Q4 je jeden tranzistor, nad ním $R_o$, celé to napájí M9 proudem $I_i$:</p>`,eq:[R`V_{G6}=V_{+IN}+V_T\ln\frac{I_i}{I_S}+R_oI_i`]},
{t:'Offset = rozdíl',h:['M56','Q03','Q4','Ro'],x:R`<p>Komparátor překlápí při $V_{G5}=V_{G6}$:</p>`,eq:[R`V_{OS}=V_{BE4}+R_OI_i-V_{BE}=V_T\ln\frac{I_i}{I_S}+R_OI_i-V_T\ln\frac{I_i}{4I_S}`,R`V_{OS}=V_T\ln4+R_OI_i=26\cdot10^{-3}\ln4+13\cdot10^3\cdot15\cdot10^{-6}=231\,\text{mV}`],r:R`$V_{OS}=231$ mV`,m:R`Stejný proud, 4× větší plocha → $V_{BE}$ menší o $V_T\ln4\approx36$ mV.`}
],
res:R`$V_{OS}=231$ mV`,tk:[[R`V_{OS}=V_T\ln(\text{poměr})+IR`,'+']]},

/* ================= 2.20 ================= */
{id:'2.20',ch:2,title:'V–I převodník s Iptat: Io',
task:R`Vypočítejte hodnotu proudu $I_O$.`,
pat:['vi','div','mir'],
idea:R`$V_{IN}$ z děliče, do $R_o$ teče $2I_{PTAT}$, pod $R_o$ dvě $V_{BE}$ (Q0, Q1) → zbytek na $R_s$.`,
parts:{Ra:{b:[11,25,5,11],c:'b',t:'Ra 25k'},Rb:{b:[11,43,5,12],c:'b',t:'Rb 100k'},VIN:{n:[13,40],c:'b',t:'VIN'},ota:{b:[29,34,21,12],c:'p',t:'OTA M4/M5'},Ip:{b:[20,47,5,13],c:'r',t:'Iptat 10µA'},Ro:{b:[72,43,6,12],c:'o',t:'Ro 60k'},Q01:{b:[71,55,9,26],c:'y',t:'Q0+Q1 (−2·VBE)'},Rs:{b:[81,77,5,12],c:'g',t:'Rs 75k'},M11:{b:[79,26,6,11],c:'s',t:'M11'},Io:{a:[[83,8],[83,90]],c:'g',t:'Io'},IRo:{a:[[74,25],[74,55]],c:'o',t:'2·Iptat'}},
steps:[
{t:'VIN',h:['Ra','Rb','VIN'],eq:[R`V_{IN}=V_i\frac{R_b}{R_a+R_b}=5\cdot\frac{100}{125}=4\,\text{V}`]},
{t:'Úbytek na Ro',h:['Ip','Ro','IRo'],x:R`<p>Zrcadla pošlou do $R_o$ dvojnásobek $I_{PTAT}$:</p>`,eq:[R`V_{Ro}=R_o\cdot2I_{PTAT}=60\cdot10^3\cdot2\cdot10\cdot10^{-6}=1{,}2\,\text{V}`]},
{t:'Io',h:['ota','Ro','Q01','Rs','M11','Io'],eq:[R`I_O=\frac{V_{IN}-V_{Ro}-2V_{BE}}{R_s}=\frac{4-1{,}2-1{,}3}{75\cdot10^3}=20\,\mu\text{A}`],r:R`$I_O=20\,\mu$A`}
],
res:R`$V_{IN}=4$ V, $V_{Ro}=1{,}2$ V, $I_O=20\,\mu$A`,tk:[[R`I_O=\frac{V_{IN}-V_{Ro}-mV_{BE}}{R_s}`,'+']]},
/* ================= 2.21 ================= */
{id:'2.21',ch:2,title:'Oscilátor řízený FB: f pro VFB = 0,5 V a 2 V',
task:R`Spočítejte kmitočet tohoto oscilátoru pro $V_{FB}=0{,}5$ V a pro $V_{FB}=2$ V. Předpokládejte nulové TC pro proud $I_S$ a pro všechny odpory, zanedbejte vliv body efektu.`,
pat:['osc','cap','offc','mir'],
idea:R`$I_S$ na $R_o$ vytvoří úmyslný práh $V_{OS}=1$ V. Pod prahem běží oscilátor na základní proud $I_S$, nad prahem přibude $(V_{FB}-V_{OS})/R_s$. Kmitočet je úměrný proudu.`,
parts:{Is:{b:[5,33,4,10],c:'r',t:'Is 5µA'},FB:{b:[0,57,5,7],c:'b',t:'FB'},Ro:{b:[37,54,5,13],c:'r',t:'Ro 200k'},Rs:{b:[42,74,5,13],c:'b',t:'Rs 100k'},IRo:{a:[[39,51],[39,95]],c:'r',t:'Is'},IRs:{a:[[44,70],[44,95]],c:'b',t:'(VFB−Vos)/Rs'},M1617:{b:[55,9,9,10],c:'o',t:'M16+M17 = 2·Iosc'},M18:{b:[68,9,5,10],c:'g',t:'M18 = Iosc'},Co1:{b:[54,82,6,11],c:'o',t:'Co1 10p'},Co23:{b:[69,82,12,11],c:'g',t:'Co2+Co3 20p'},cmp:{b:[74,18,22,34],c:'p',t:'komparátory + RS'},I1:{a:[[56.5,17],[56.5,82]],c:'o',t:'2·Iosc'},I2:{a:[[71,17],[71,82]],c:'g',t:'Iosc'}},
steps:[
{t:'Úmyslný práh Vos',h:['Is','Ro','IRo'],x:R`<p>Zrcadla pošlou proud $I_S$ přes $R_o$. Úbytek na něm je zabudovaný offset vstupního zesilovače — FB začne „něco dělat“ až nad ním.</p>`,eq:[R`V_{OS}=I_SR_o=5\cdot10^{-6}\cdot200\cdot10^3=1\,\text{V}`],r:R`$V_{OS}=1$ V`},
{t:'Proud oscilátoru',h:['FB','Rs','IRs'],x:R`<p>Když $V_{FB}>V_{OS}$, smyčka vnutí na $R_s$ napětí $V_{FB}-V_{OS}$ a tento proud se přičte k $I_S$. Když $V_{FB}\lt V_{OS}$, je na $R_s$ nula.</p>`,g:[R`I_{OSC}=I_S+\frac{V_{FB}-V_{OS}}{R_s}\quad(V_{FB}>V_{OS}),\qquad I_{OSC}=I_S\;\text{jinak}`]},
{t:'Kmitočet obecně',h:['M1617','M18','Co1','Co23','I1','I2','cmp'],x:R`<p>Jako v 2.9: $C_{o1}=C_o$ nabíjí $2I_{OSC}$, $C_{o2}+C_{o3}=2C_o$ nabíjí $I_{OSC}$:</p>`,g:[R`T=\frac{V_{ref}C_o}{2I_{OSC}}+\frac{V_{ref}\,2C_o}{I_{OSC}}=\frac{5V_{ref}C_o}{2I_{OSC}}\Rightarrow f=\frac{2I_{OSC}}{5V_{ref}C_o}`]},
{t:'VFB = 0,5 V (pod prahem)',h:['Is','I1','I2'],eq:[R`f=\frac{2I_S}{5V_{ref}C_o}=\frac{2\cdot5\cdot10^{-6}}{5\cdot2\cdot10\cdot10^{-12}}=100\,\text{kHz}`],r:R`$f=100$ kHz`},
{t:'VFB = 2 V (nad prahem)',h:['Rs','IRs','I1','I2'],eq:[R`I_{OSC}=5\,\mu+\frac{2-1}{100\,\text{k}}=15\,\mu\text{A}`,R`f=\frac{2\cdot15\cdot10^{-6}}{5\cdot2\cdot10\cdot10^{-12}}=300\,\text{kHz}`],r:R`$f=300$ kHz`,m:R`Pod prahem = základní kmitočet, nad prahem roste lineárně s $V_{FB}$.`}
],
res:R`$V_{OS}=1$ V; $f(0{,}5\,\text{V})=100$ kHz; $f(2\,\text{V})=300$ kHz`,tk:[[R`f=\frac{1}{T_1+T_2}`,'+'],[R`I_{osc}=I_S+\frac{V_{FB}-V_{OS}}{R_s}`,'+']]},

/* ================= 2.22 ================= */
{id:'2.22',ch:2,title:'Teplotně stabilní prodleva: R1, R2, T',
task:R`Určete hodnoty odporů $R_1$ a $R_2$ tak, aby časová prodleva $T$ mezi změnou H → L signálu START a změnou výstupního stavu komparátoru byla teplotně stabilní. Určete délku této časové prodlevy. $TC(V_{BE})=-2$ mV/K, $V_{BE}=0{,}65$ V, $TC(R)=4\cdot10^{-3}$/K, TC kapacity C je nulový.`,
pat:['ztc','cap','bg','nvbg','mir'],
idea:R`$T=2V_{BG}C/I_c$; $V_{BG}$ i $C$ stálé → stálý musí být $I_c$. Ten dělá Q7 s emitorovým $R_k$ → podmínka nulového TC: na $R_k$ musí být $-TC(V_{BE})/TC(R)=0{,}5$ V.`,
parts:{core:{b:[12,57,13,24],c:'r',t:'Q0–Q3 (N=6)'},Rs:{b:[21,79,6,12],c:'r',t:'Rs 9,2k'},Rb:{b:[30,50,6,9],c:'y',t:'Rb 120k'},Ra:{b:[30,70,6,10],c:'y',t:'Ra 120k'},VBG:{n:[32,70],c:'p',t:'VBG'},V2:{n:[32,48.5],c:'p',t:'2·VBG'},M6:{b:[58,55,7,11],c:'b',t:'M6 (sledovač VBG)'},R1:{b:[59,70,6,10],c:'b',t:'R1 = ?'},R2:{b:[59,80,6,10],c:'b',t:'R2 = ?'},Ir:{a:[[61,64],[61,93]],c:'b',t:'Ir 5µA'},Q7:{b:[64,76,7,10],c:'o',t:'Q7'},Rk:{b:[67,84,6,10],c:'o',t:'Rk 500k'},IQ7:{a:[[68.3,47],[68.3,93]],c:'o',t:'10·Ic'},M78:{b:[65,37,16,10],c:'s',t:'M7 (10) : M8 (1)'},C:{b:[75,78,7,11],c:'g',t:'C 20p'},Ic:{a:[[77,47],[77,78]],c:'g',t:'Ic'},cmp:{b:[83,46,9,12],c:'p',t:'komparátor'},M9:{b:[80,78,7,12],c:'s',t:'M9 (START)'}},
steps:[
{t:'Princip časovače',h:['M9','C','Ic','cmp','V2'],x:R`<p>START H → L vypne M9 a $C$ se nabíjí proudem $I_c$. Komparátor překlopí, až napětí na $C$ dosáhne $2V_{BG}$ (uzel nad $R_b$).</p>`,g:[R`T=\frac{2V_{BG}C}{I_c}`],x2:''},
{t:'Odkud je Ic',h:['Q7','Rk','IQ7','M78','Ic'],x:R`<p>Báze Q7 je na odbočce mezi $R_1$ a $R_2$ (napětí $V_{R2}$), v emitoru $R_k$. M7 (10×) : M8 (1×) → na $C$ jde desetina:</p>`,g:[R`I_c=\frac{V_{R2}-V_{BE}}{10R_k}`]},
{t:'Podmínka TC = 0',h:['Rk','Q7'],x:R`<p>$V_{R2}-V_{BE}$ je napětí na $R_k$ (rezistor s TC) → stejná podmínka jako v 2.5:</p>`,eq:[R`V_{R2}=\frac{-TC(V_{BE})}{TC(R)}+V_{BE}=\frac{2\cdot10^{-3}}{4\cdot10^{-3}}+0{,}65=1{,}15\,\text{V}`],r:R`$V_{R2}=1{,}15$ V`},
{t:'Dělič R1/R2',h:['M6','R1','R2','Ir','VBG'],x:R`<p>M6 přenese $V_{BG}$ na horní konec $R_1$, děličem teče $I_r=5\,\mu$A:</p>`,eq:[R`R_2=\frac{V_{R2}}{I_r}=\frac{1{,}15}{5\cdot10^{-6}}=230\,\text{k}\Omega`,R`R_1=\frac{V_{BG}-V_{R2}}{I_r}=\frac{0{,}1}{5\cdot10^{-6}}=20\,\text{k}\Omega`],r:R`$R_1=20\,\text{k}\Omega$, $R_2=230\,\text{k}\Omega$`},
{t:'Délka prodlevy',h:['C','Ic','cmp'],eq:[R`I_C=\frac{V_{R2}-V_{BE}}{10R_k}=\frac{0{,}5}{10\cdot500\cdot10^3}=100\,\text{nA}`,R`T=\frac{2V_{BG}C}{I_C}=\frac{2\cdot1{,}25\cdot20\cdot10^{-12}}{100\cdot10^{-9}}=500\,\mu\text{s}`],r:R`$T=500\,\mu$s`,m:R`Stejný trik jako 2.5 / 2.11: napětí na rezistoru s TC = $-TC(V_{BE})/TC(R)$.`}
],
res:R`$R_1=20\,\text{k}\Omega$, $R_2=230\,\text{k}\Omega$, $I_C=100$ nA, $T=500\,\mu$s`,tk:[[R`V_R=-\frac{TC(V_{BE})}{TC(R)}`,'+'],[R`T=\frac{C\Delta V}{I}`,'+']]},

/* ================= 2.23 ================= */
{id:'2.23',ch:2,title:'Oscilátor řízený FB: střída a kmitočet',
task:R`Spočítejte střídu (duty cycle) a kmitočet tohoto oscilátoru pro $V_{FB}=0{,}5$ V a pro $V_{FB}=2$ V.`,
pat:['osc','ptat','offc','cap'],
idea:R`Totéž jako 2.21, jen základní proud je PTAT ($I_{ref}$) a práh je $2I_{ref}R_o+V_{BE}$.`,
parts:{core:{b:[6,49,13,30],c:'r',t:'Q0–Q3 (N=4)'},R0:{b:[14,77,5,13],c:'r',t:'R0 14,4k'},Ip:{a:[[15,20],[15,92]],c:'r',t:'Iref'},Ro:{b:[44,53,5,10],c:'o',t:'Ro 120k'},Q4:{b:[44,65,7,11],c:'o',t:'Q4 (VBE)'},Rs:{b:[49,70,5,13],c:'b',t:'Rs 300k'},FB:{b:[0,45,5,6],c:'b',t:'FB'},Co1:{b:[59,79,5,12],c:'o',t:'Co1 10p'},Co23:{b:[71,79,11,12],c:'g',t:'Co2+Co3 20p'},cmp:{b:[76,19,16,32],c:'p',t:'komparátory + RS'},Iosc:{a:[[54,10],[54,27]],c:'g',t:'Iosc'}},
steps:[
{t:'PTAT proud',h:['core','R0','Ip'],eq:[R`I_{ref}=\frac{V_T\ln N}{R_0}=\frac{26\cdot10^{-3}\ln4}{14{,}4\cdot10^3}=2{,}5\,\mu\text{A}`]},
{t:'Práh Vos',h:['Ro','Q4'],x:R`<p>Přes $R_o$ teče $2I_{ref}$ a pod ním je přechod BE Q4:</p>`,eq:[R`V_{OS}=2I_{ref}R_o+V_{BE}=2\cdot2{,}5\,\mu\cdot120\,\text{k}+0{,}65=1{,}25\,\text{V}`],r:R`$V_{OS}=1{,}25$ V`},
{t:'VFB = 0,5 V',h:['Iosc','Co1','Co23'],eq:[R`f=\frac{2I_{ref}}{5V_{ref}C_o}=\frac{2\cdot2{,}5\cdot10^{-6}}{5\cdot2\cdot10\cdot10^{-12}}=50\,\text{kHz}`],r:R`$f=50$ kHz`},
{t:'VFB = 2 V',h:['FB','Rs','Iosc'],eq:[R`I_{OSC}=I_{ref}+\frac{V_{FB}-V_{OS}}{R_S}=2{,}5\,\mu+\frac{0{,}75}{300\,\text{k}}=5\,\mu\text{A}`,R`f=\frac{2\cdot5\cdot10^{-6}}{5\cdot2\cdot10\cdot10^{-12}}=100\,\text{kHz}`],r:R`$f=100$ kHz`},
{t:'Střída',h:['Co1','Co23'],x:R`<p>$T_1=V_{ref}C_o/(2I_{OSC})$, $T_2=V_{ref}2C_o/I_{OSC}$ → poměr je pořád 1 : 4 bez ohledu na proud:</p>`,eq:[R`DC=\frac{T_2}{T_1+T_2}=\frac{2}{0{,}5+2}=80\,\%`],r:R`$DC=80$ % v obou případech`,w:R`Sbírka střídu explicitně nepočítá — vyplývá z poměru kondenzátorů a proudů, proud oscilátoru ji nemění.`}
],
res:R`$I_{ref}=2{,}5\,\mu$A, $V_{OS}=1{,}25$ V; $f(0{,}5\,\text{V})=50$ kHz, $f(2\,\text{V})=100$ kHz; $DC=80$ %`,tk:[[R`I_{osc}=I_S+\frac{V_{FB}-V_{OS}}{R_s}`,'+']]},

/* ================= 2.24 ================= */
{id:'2.24',ch:2,title:'Teplotně stabilní prodleva (Rt): R1, R2, T',
task:R`Určete hodnoty odporů $R_1$ a $R_2$ tak, aby časová prodleva $T$ mezi změnou H → L signálu START a změnou výstupního stavu komparátoru COMP byla teplotně stabilní. Určete délku této časové prodlevy. $TC(V_{be})=-2$ mV/K, TC odporu $4\cdot10^{-3}$/K, TC kapacity $C_T$ je nulový.`,
pat:['ztc','cap','bg','mir'],
idea:R`Tentýž obvod jako 2.22. Na $R_t$ musí být 0,5 V → $I_c=1\,\mu$A, na $C_t$ jde desetina.`,
parts:{core:{b:[12,42,13,29],c:'r',t:'Q0–Q3 (N=6)'},Rs:{b:[21,71,6,14],c:'r',t:'Rs 9,2k'},Rb:{b:[31,29,5,9],c:'y',t:'Rb 120k'},Ra:{b:[31,60,5,10],c:'y',t:'Ra 120k'},VBG:{n:[33,57.5],c:'p',t:'VBG'},V2:{n:[33,26],c:'p',t:'2·VBG'},M6:{b:[57,40,7,10],c:'b',t:'M6'},R1:{b:[58,59,5,10],c:'b',t:'R1 = ?'},R2:{b:[58,73,5,12],c:'b',t:'R2 = ?'},Ir:{a:[[60,49],[60,92]],c:'b',t:'Ir'},Q7:{b:[63,65,7,10],c:'o',t:'Q7'},Rt:{b:[65,78,5,11],c:'o',t:'Rt 500k'},IQ:{a:[[67,20],[67,92]],c:'o',t:'Ic'},M78:{b:[64,5,16,12],c:'s',t:'M7 (10) : M8 (1)'},Ct:{b:[74,65,7,12],c:'g',t:'Ct 20p'},Ich:{a:[[77,20],[77,65]],c:'g',t:'Ic/10'},cmp:{b:[83,22,9,17],c:'p',t:'COMP'}},
steps:[
{t:'Napětí na Rt',h:['Q7','Rt'],x:R`<p>Proud $I_c=V_{Rt}/R_t$ — stálý, když</p>`,eq:[R`V_{Rt}=\frac{-TC(V_{BE})}{TC(R)}=\frac{2\cdot10^{-3}}{4\cdot10^{-3}}=0{,}5\,\text{V}`]},
{t:'R2 a R1',h:['R1','R2','Ir','M6','VBG','Q7'],x:R`<p>Báze Q7 = $V_{Rt}+V_{BE}$ = napětí na $R_2$. Horní konec $R_1$ je na $V_{BG}$.</p>`,eq:[R`R_2=\frac{V_{Rt}+V_{BE}}{I_r}=\frac{0{,}5+0{,}65}{5\cdot10^{-6}}=230\,\text{k}\Omega`,R`R_1=\frac{V_{BG}-V_{Rt}-V_{BE}}{I_r}=\frac{1{,}25-0{,}5-0{,}65}{5\cdot10^{-6}}=20\,\text{k}\Omega`],r:R`$R_1=20\,\text{k}\Omega$, $R_2=230\,\text{k}\Omega$`},
{t:'Proud a prodleva',h:['IQ','M78','Ich','Ct','cmp','V2'],eq:[R`I_c=\frac{V_{Rt}}{R_t}=\frac{0{,}5}{500\cdot10^3}=1\,\mu\text{A}`,R`T=\frac{2V_{BG}C_t}{I_c/10}=\frac{20\cdot1{,}25\cdot20\cdot10^{-12}}{1\cdot10^{-6}}=500\,\mu\text{s}`],r:R`$T=500\,\mu$s`,m:R`2.22 a 2.24 jsou tentýž obvod — jen jinak pojmenované proudy.`}
],
res:R`$R_1=20\,\text{k}\Omega$, $R_2=230\,\text{k}\Omega$, $I_c=1\,\mu$A, $T=500\,\mu$s`,tk:[[R`V_R=-\frac{TC(V_{BE})}{TC(R)}`,'+']]},

/* ================= 2.25 ================= */
{id:'2.25',ch:2,title:'V–I převodník, Rp a Ro v souběhu: Io',
task:R`Spočítejte hodnotu proudu $I_O$, odpory $R_P$ a $R_O$ jsou v souběhu.`,
pat:['vi','ptat','div'],
idea:R`M5 a M15 jsou stejné → jejich $V_{GS}$ se vyruší. Pod $R_o$ zůstane jen Q4 → odečti jedno $V_{BE}$.`,
parts:{core:{b:[14,48,14,28],c:'r',t:'Q0–Q3 (N=4)'},Rp:{b:[24,77,6,12],c:'r',t:'Rp 7,2k'},Ra:{b:[32,44,5,12],c:'b',t:'Ra 45k'},Rb:{b:[32,69,5,12],c:'b',t:'Rb 90k'},VIN:{n:[34,62.5],c:'b',t:'VIN'},M5:{b:[48,57,6,10],c:'k',t:'M5'},M15:{b:[80,72,8,10],c:'k',t:'M15'},Ro:{b:[81,48,5,10],c:'o',t:'Ro 60k'},Q4:{b:[78,58,8,10],c:'y',t:'Q4 (−VBE)'},Rs:{b:[88,78,5,12],c:'g',t:'Rs 150k'},M16:{b:[86,32,7,10],c:'s',t:'M16'},Io:{a:[[90,17],[90,91]],c:'g',t:'Io'}},
steps:[
{t:'VIN',h:['Ra','Rb','VIN'],eq:[R`V_{IN}=V_i\frac{R_b}{R_a+R_b}=3\cdot\frac{90}{135}=2\,\text{V}`]},
{t:'Úbytek na Ro',h:['core','Rp','Ro'],x:R`<p>„V souběhu“ = stejný typ rezistoru, poměr $R_o/R_p$ nemá TC. Do $R_o$ jde dvojnásobek proudu jádra:</p>`,eq:[R`V_{Ro}=R_o\cdot2\frac{V_T\ln N}{R_p}=60\cdot10^3\cdot2\cdot\frac{26\cdot10^{-3}\ln4}{7{,}2\cdot10^3}=0{,}6\,\text{V}`]},
{t:'Io',h:['M5','M15','Q4','Rs','M16','Io'],x:R`<p>M5 a M15 jsou stejné tranzistory se stejným proudem → stejné $V_{GS}$ → vyruší se. Zbývá jen Q4:</p>`,eq:[R`I_O=\frac{V_{IN}-V_{Ro}-V_{BE}}{R_s}=\frac{2-0{,}6-0{,}65}{150\cdot10^3}=5\,\mu\text{A}`],r:R`$I_O=5\,\mu$A`}
],
res:R`$V_{IN}=2$ V, $V_{Ro}=0{,}6$ V, $I_O=5\,\mu$A`,tk:[[R`I_O=\frac{V_{IN}-V_{Ro}-mV_{BE}}{R_s}`,'+']]},

/* ================= 2.26 ================= */
{id:'2.26',ch:2,title:'Hystereze komparátoru',
task:R`Spočítejte hodnotu hystereze tohoto komparátoru.`,
pat:['hyst','mir'],
idea:R`Po překlopení M5 připojí Q5 paralelně ke Q3 → zrcadlo zátěže se změní z 1:1 na 1:2. Vstup musí „přetlačit“ přidaný proud $I_b/2$.`,
parts:{M02:{b:[19,9,51,13],c:'s',t:'M0 → M1 (Ib)'},Ib:{b:[18,59,6,13],c:'s',t:'Ib 5µA'},Q01:{b:[25,30,30,13],c:'r',t:'Q0/Q1 (dif. pár)'},Q23:{b:[29,59,21,13],c:'b',t:'Q2 (dioda) → Q3'},Q5:{b:[54,59,7,13],c:'o',t:'Q5'},M5:{b:[54,75,10,12],c:'o',t:'M5 (spínač)'},tail:{a:[[40,22],[40,27]],c:'r',t:'Ib'},I0:{a:[[31.5,42],[31.5,90]],c:'b',t:'I0'},I1:{a:[[48,42],[48,90]],c:'b',t:'I1'},I5:{a:[[58,57],[58,75]],c:'o',t:'+Q5'}},
steps:[
{t:'Bez hystereze (M5 vypnutý)',h:['Q01','Q23','tail','I0','I1'],x:R`<p>Q2 (dioda) a Q3 tvoří zrcadlo 1:1 → komparátor je v rovnováze, když $I_0=I_1=I_b/2$, tj. při $V_{in}=V_{ref}$.</p>`},
{t:'Po překlopení (M5 sepne)',h:['Q5','M5','I5','Q23'],x:R`<p>Q5 se připojí paralelně ke Q3 → zátěž odebírá $2I_0$. Na výstupním uzlu tak přibude proud $I_a=I_b/2$, který musí vstup vyrovnat.</p>`,eq:[R`I_a=I_b-\frac{I_b}{2}=2{,}5\,\mu\text{A}`]},
{t:'Efektivní transkonduktance',h:['Q01'],x:R`<p>Malá změna $V_{in}$ změní $I_1$ o $+g_m/2\cdot v$ a $I_0$ o $-g_m/2\cdot v$. Změna $I_0$ se zrcadlem 1:2 projeví dvakrát:</p>`,g:[R`g_{m}=\frac{I_b}{2V_T}\;\;\text{(jeden tranzistor při }I_b/2)`],eq:[R`g_{mh}=\frac{g_m}{2}+2\frac{g_m}{2}=\frac32g_m=\frac32\cdot\frac{5\cdot10^{-6}}{2\cdot26\cdot10^{-3}}=144{,}2\,\mu\text{A/V}`]},
{t:'Hystereze',eq:[R`V_H=\frac{I_a}{g_{mh}}=\frac{2{,}5\cdot10^{-6}}{144{,}2\cdot10^{-6}}=17{,}33\,\text{mV}`],r:R`$V_H=17{,}33$ mV`,x:R`<p><b>Kontrola přesně:</b> nová rovnováha $I_1=2I_0$ → $\Delta V=V_T\ln2=18$ mV. Lineární odhad sbírky (17,3 mV) je velmi blízko.</p>`,m:R`Hystereze ≈ $V_T\ln(\text{nový poměr zrcadla})$.`}
],
res:R`$g_{mh}=144{,}2\,\mu$A/V, $V_H=17{,}33$ mV (přesně $V_T\ln2=18$ mV)`,tk:[[R`g_m=\frac{I_C}{V_T}`,'T'],[R`V_H\approx V_T\ln(\text{poměr})`,'+']]},

/* ================= 2.27 ================= */
{id:'2.27',ch:2,title:'Offset z nesymetrie (N = 2, M = 4)',
task:R`Vypočítejte offset tohoto komparátoru.`,
pat:['offc','mir'],
idea:R`Rovnováha nastane, když M7 (4×) dodá právě proud Q2 → $I_2=4I_1$. Q1 je navíc 2× větší. Offset $=V_T\ln(4\cdot2)=V_T\ln8$.`,
parts:{Ir:{b:[15,28,5,12],c:'s',t:'Ir 15µA'},Q1:{b:[49,40,8,11],c:'r',t:'Q1 (N=2)'},Q2:{b:[65,40,8,11],c:'b',t:'Q2 (1×)'},M6:{b:[51,20,7,12],c:'r',t:'M6 (1×, dioda)'},M7:{b:[64,20,9,12],c:'b',t:'M7 (M=4)'},M5:{b:[57,81,7,12],c:'s',t:'M5 → ISS'},M4:{b:[39,53,7,11],c:'g',t:'M4'},M9:{b:[73,53,9,11],c:'g',t:'M9'},I1:{a:[[53.5,31],[53.5,53]],c:'r',t:'ISS/5'},I2:{a:[[67,31],[67,53]],c:'b',t:'4·ISS/5'},tail:{a:[[60,54],[60,95]],c:'s',t:'ISS'}},
steps:[
{t:'Sledovače M4, M9 offset nedělají',h:['M4','M9'],x:R`<p>Oba vstupy jdou přes stejné sledovače se stejným proudem → stejný posun → v rozdílu se vyruší.</p>`},
{t:'Kdy je komparátor v rovnováze',h:['M6','M7','I1','I2','tail'],x:R`<p>M6 (dioda, 1×) měří proud Q1, M7 (4×) dodává $4I_1$. Rovnováha výstupního uzlu: $I_2=4I_1$. Spolu tvoří $I_{SS}$:</p>`,eq:[R`I_1+I_2=I_{SS}\Rightarrow I_1=\frac{I_{SS}}{5},\;I_2=\frac{4I_{SS}}{5}`]},
{t:'Rozdíl VBE',h:['Q1','Q2'],x:R`<p>Q1 má 2× větší plochu ($2I_S$):</p>`,eq:[R`V_{OS}=V_{BE2}-V_{BE1}=V_T\ln\frac{4I_{SS}}{5I_S}-V_T\ln\frac{I_{SS}}{5\cdot2I_S}=V_T\ln8`,R`V_{OS}=26\cdot10^{-3}\ln8=54\,\text{mV}`],r:R`$V_{OS}=54$ mV`,m:R`Offset z nesymetrie = $V_T\ln$(součin všech poměrů) — tady 4 (zrcadlo) × 2 (plocha) = 8.`}
],
res:R`$V_{OS}=V_T\ln8=54$ mV`,tk:[[R`V_{OS}=V_T\ln(\text{poměr})`,'+']]},

/* ================= 2.28 ================= */
{id:'2.28',ch:2,title:'Offset z rozdílných rezistorů R0, R1',
task:R`Vypočítejte offset tohoto komparátoru.`,
pat:['offc','mir'],
idea:R`Obě větve vedou stejný proud $I_r$, ale mají jiný rezistor → báze Q1 a Q2 se liší o $I_r(R_0-R_1)$.`,
parts:{M3:{b:[42,9,6,12],c:'r',t:'M3 → Ir'},M8:{b:[72,9,6,12],c:'b',t:'M8 → Ir'},R1:{b:[40,43,7,11],c:'r',t:'R1 20k'},R0:{b:[73,43,8,11],c:'b',t:'R0 40k'},M4:{b:[39,55,7,11],c:'r',t:'M4 (IN−)'},M9:{b:[75,55,8,11],c:'b',t:'M9 (IN+)'},Q12:{b:[49,35,21,13],c:'p',t:'Q1/Q2'},I1:{a:[[44.5,20],[44.5,96]],c:'r',t:'Ir'},I0:{a:[[76,20],[76,96]],c:'b',t:'Ir'}},
steps:[
{t:'Dvě cesty k bázím',h:['M3','M8','R1','R0','M4','M9','I1','I0'],x:R`<p>Báze Q1 = $V_{IN-}+|V_{GS4}|+I_rR_1$. Báze Q2 = $V_{IN+}+|V_{GS9}|+I_rR_0$. M4 a M9 jsou stejné se stejným proudem → $V_{GS}$ se vyruší.</p>`},
{t:'Offset',h:['Q12','R1','R0'],eq:[R`V_{OS}=I_rR_0-I_rR_1=15\cdot10^{-6}(40-20)\cdot10^3=0{,}3\,\text{V}`],r:R`$V_{OS}=0{,}3$ V`}
],
res:R`$V_{OS}=0{,}3$ V`,tk:[[R`V_{OS}=I\cdot\Delta R`,'+']]},

/* ================= 2.29 ================= */
{id:'2.29',ch:2,title:'UVLO s tranzistorem: R1, R2',
task:R`Určete hodnoty odporů $R_1$ a $R_2$ pro blok generování signálu nuv. Signál nuv mění svoji úroveň z L do H při $V_{CC}=6$ V. Při změně úrovně signálu nuv je $V_{GS}$ tranzistoru M0 rovno $V_{GSN}=1$ V. Součet odporů $R_1+R_2=1{,}8$ MΩ.`,
pat:['uvlo','div'],
idea:R`Dělič $R_2/R_1$ sleduje $V_{CC}$. Při $V_{CC}=6$ V musí být na $R_1$ přesně $V_{GSN}=1$ V.`,
parts:{R2:{b:[30,11,8,17],c:'b',t:'R2 = ?'},R1:{b:[30,65,8,18],c:'b',t:'R1 = ?'},IR:{a:[[34,8],[34,88]],c:'b',t:'IR'},M0:{b:[48,54,10,14],c:'r',t:'M0 (VGSN = 1V)'},M1:{b:[63,38,11,15],c:'o',t:'M1'},R3:{b:[51,11,8,17],c:'s',t:'R3 1M'},R4:{b:[66,11,8,17],c:'s',t:'R4 1M'},nuv:{b:[83,31,13,7],c:'o',t:'nuv'}},
steps:[
{t:'Jak blok funguje',h:['R1','R2','M0','M1','nuv'],x:R`<p>Při nízkém $V_{CC}$ je M0 vypnutý, gate M1 je přes $R_3$ nahoře → M1 vede → nuv = L. Jakmile napětí na $R_1$ dosáhne $V_{GSN}$, M0 sepne, stáhne gate M1 dolů, M1 vypne a $R_4$ vytáhne nuv do H.</p>`},
{t:'Proud děličem při VCC = 6 V',h:['R1','R2','IR'],eq:[R`I_R=\frac{V_{CC}}{R_1+R_2}=\frac{6}{1{,}8\cdot10^6}=3{,}33\,\mu\text{A}`]},
{t:'R1 a R2',h:['R1','R2','M0'],eq:[R`R_1=\frac{V_{GSN}}{I_R}=\frac{1}{3{,}33\cdot10^{-6}}=300\,\text{k}\Omega`,R`R_2=1{,}8\cdot10^6-300\cdot10^3=1{,}5\,\text{M}\Omega`],r:R`$R_1=300\,\text{k}\Omega$, $R_2=1{,}5\,\text{M}\Omega$`,m:R`UVLO: práh na odbočce = $V_{CC}\cdot R_{pod}/R_{celk}$.`}
],
res:R`$R_1=300\,\text{k}\Omega$, $R_2=1{,}5\,\text{M}\Omega$`,tk:[[R`V=V_{CC}\frac{R_{pod}}{R}`,'d']]},

/* ================= 2.30 ================= */
{id:'2.30',ch:2,title:'UVLO se třemi prahy: RA, RB, RC, RD',
task:R`Určete hodnoty odporů $R_A$, $R_B$, $R_C$ a $R_D$ tak, aby signál nuv (změna jeho úrovně) byl generován pro $V_{CC}=5$ V, signál $U_{Low}$ pro $V_{CC}=10$ V a signál $U_{High}$ pro $V_{CC}=15$ V. Součet $R=R_A+R_B+R_C+R_D=800$ kΩ. $V_{gsth}$ je gate napětí tranzistoru Qm, při němž se mění úroveň napětí na jeho drainu.`,
pat:['uvlo','div','nvbg','ptat'],
idea:R`Jeden dělič se třemi odbočkami. Nejnižší odbočka jde na Qm (práh 0,625 V), dvě vyšší na komparátory s $V_{REF}=2{,}5$ V. Čím níž odbočka, tím vyšší $V_{CC}$ potřebuje.`,
parts:{core:{b:[14,45,17,33],c:'r',t:'Q0–Q3 (N=4)'},Rs:{b:[26,80,6,13],c:'r',t:'Rs 1,8k'},Ip:{a:[[29,19],[29,96]],c:'r',t:'Iptat'},M12:{b:[38,4,12,15],c:'o',t:'M1+M2 = 2·Iptat'},R1:{b:[39,49,6,12],c:'o',t:'R1 30k'},Q45:{b:[35,60,9,31],c:'y',t:'Q4+Q5 = 2·VBE'},I2:{a:[[41.5,19],[41.5,96]],c:'o',t:'2·Iptat'},VREF:{n:[41.5,46],c:'o',t:'VREF'},RD:{b:[54,5,6,12],c:'b',t:'RD'},RC:{b:[54,29,6,12],c:'b',t:'RC'},RB:{b:[54,63,6,12],c:'b',t:'RB'},RA:{b:[54,80,6,13],c:'g',t:'RA'},IR:{a:[[56.5,3],[56.5,96]],c:'b',t:'IR = VCC/R'},Qm:{b:[64,73,9,12],c:'g',t:'Qm (0,625 V)'},cL:{b:[76,16,13,22],c:'p',t:'cmp_uvloL'},cH:{b:[76,41,13,22],c:'p',t:'cmp_uvloH'},nRB:{n:[56.5,59],c:'p',t:'→ uvloH'},nRC:{n:[56.5,21],c:'p',t:'→ uvloL'},nRA:{n:[56.5,79.5],c:'g',t:'→ Qm'}},
steps:[
{t:'Princip děliče',h:['RD','RC','RB','RA','IR'],x:R`<p>Děličem (800 k) teče $I_R=V_{CC}/R$. Napětí odbočky = $V_{CC}\cdot$(součet odporů pod ní)$/R$.</p>`},
{t:'nuv při VCC = 5 V → RA',h:['RA','nRA','Qm','IR'],eq:[R`R_A=\frac{V_{GSth}}{I_R}=\frac{V_{GSth}R}{V_{CC}}=\frac{0{,}625\cdot800\cdot10^3}{5}=100\,\text{k}\Omega`],r:R`$R_A=100\,\text{k}\Omega$`},
{t:'Referenční napětí VREF',h:['core','Rs','Ip','M12','R1','Q45','I2','VREF'],x:R`<p>PTAT jádro (N = 4, $R_s$), M1 + M2 dají $2I_{PTAT}$ do $R_1$ a dvou diod:</p>`,eq:[R`V_{REF}=2V_{BE}+2R_1\frac{V_T\ln N}{R_s}=1{,}3+30\cdot10^3\cdot2\cdot\frac{26\cdot10^{-3}\ln4}{1{,}8\cdot10^3}=2{,}5\,\text{V}`],r:R`$V_{REF}=2{,}5$ V (= 2·$V_{BG}$)`},
{t:'U_High při 15 V → RB',h:['RB','RA','nRB','cH'],x:R`<p>Odbočka nad $R_B$ jde na cmp_uvloH. Dosáhne $V_{REF}$ při 15 V:</p>`,eq:[R`R_B=\frac{V_{REF}R}{V_{CC15}}-R_A=\frac{2{,}5\cdot800\cdot10^3}{15}-100\cdot10^3=33{,}3\,\text{k}\Omega`],r:R`$R_B=33{,}3\,\text{k}\Omega$`},
{t:'U_Low při 10 V → RC, zbytek RD',h:['RC','RD','nRC','cL'],eq:[R`R_C=\frac{V_{REF}R}{V_{CC10}}-R_A-R_B=\frac{2{,}5\cdot800\cdot10^3}{10}-133{,}3\cdot10^3=66{,}7\,\text{k}\Omega`,R`R_D=R-R_A-R_B-R_C=800-200=600\,\text{k}\Omega`],r:R`$R_C=66{,}7\,\text{k}\Omega$, $R_D=600\,\text{k}\Omega$`,m:R`Čím níž je odbočka, tím vyšší $V_{CC}$ potřebuje k dosažení prahu.`}
],
res:R`$R_A=100$ k, $R_B=33{,}3$ k, $R_C=66{,}7$ k, $R_D=600$ k; $V_{REF}=2{,}5$ V`,tk:[[R`mV_{BE}+I_{PTAT}R=mV_{BG}`,'+'],[R`V=V_{CC}\frac{R_{pod}}{R}`,'d']]},
/* ================= 3.1 ================= */
{id:'3.1',ch:3,title:'Řetěz zrcadel: Io a jeho rozptyl',
task:R`Vypočítejte hodnotu výstupního proudu $I_O$ a jeho rozptyl (definovaný standardní odchylkou $\sigma_O$), když znáte hodnoty přenosu jednotlivých proudových zrcadel a jejich standardní odchylky.`,
pat:['sig','mir'],
idea:R`Proud se zrcadly násobí: $I_O=k_1k_2k_3I_i$. Chyba každého zrcadla se násobí zbývajícími přenosy, a protože jsou chyby nezávislé, sčítají se kvadraticky.`,
parts:{Ii:{b:[14,25,5,16],c:'s',t:'Ii 1µA'},k1:{b:[14,65,26,26],c:'r',t:'k1 = 3 (σ1)'},k2:{b:[36,17,26,18],c:'o',t:'k2 = 2 (σ2)'},k3:{b:[57,65,26,26],c:'b',t:'k3 = 4 (σ3)'},a0:{a:[[16.3,10],[16.3,94]],c:'s',t:'Ii'},a1:{a:[[37.8,10],[37.8,94]],c:'r',t:'3·Ii'},a2:{a:[[59.3,10],[59.3,94]],c:'o',t:'6·Ii'},a3:{a:[[78,45],[78,94]],c:'b',t:'Io'}},
steps:[
{t:'Výstupní proud',h:['Ii','k1','k2','k3','a0','a1','a2','a3'],eq:[R`I_O=k_1k_2k_3I_i=3\cdot2\cdot4\cdot1\,\mu\text{A}=24\,\mu\text{A}`],r:R`$I_O=24\,\mu$A`},
{t:'Příspěvek každého zrcadla',h:['k1','k2','k3'],x:R`<p>Citlivost $I_O$ na $k_1$ je $\partial I_O/\partial k_1=k_2k_3I_i$ → chyba prvního zrcadla se násobí přenosem všech ostatních. Stejně pro $k_2$, $k_3$:</p>`,eq:[R`\sigma_{Ok1}=\sigma_1k_2k_3I_i=0{,}0026\cdot2\cdot4\cdot1\,\mu=20{,}8\,\text{nA}`,R`\sigma_{Ok2}=k_1\sigma_2k_3I_i=3\cdot0{,}0018\cdot4\cdot1\,\mu=21{,}6\,\text{nA}`,R`\sigma_{Ok3}=k_1k_2\sigma_3I_i=3\cdot2\cdot0{,}0057\cdot1\,\mu=34{,}2\,\text{nA}`]},
{t:'Kvadratický součet',x:R`<p>Chyby jednotlivých zrcadel jsou nezávislé (každé zrcadlo má vlastní nesouběh), proto:</p>`,eq:[R`\sigma_O=\sqrt{\sigma_{Ok1}^2+\sigma_{Ok2}^2+\sigma_{Ok3}^2}=10^{-9}\sqrt{20{,}8^2+21{,}6^2+34{,}2^2}=45{,}5\,\text{nA}`],r:R`$\sigma_O=45{,}5$ nA`,m:R`Nezávislé chyby: $\sigma=\sqrt{\sigma_1^2+\sigma_2^2+\dots}$, nikdy prostý součet.`,w:R`Sbírka má u třetího členu překlep v indexu ($\sigma_{Ok1}$ místo $\sigma_{Ok3}$).`}
],
res:R`$I_O=24\,\mu$A, $\sigma_O=45{,}5$ nA`,tk:[[R`\sigma=\sqrt{\sum\sigma_k^2}`,'+']]},

/* ================= 3.2 ================= */
{id:'3.2',ch:3,title:'σVos: chyba poměru proudů + 2. stupeň',
task:R`Vypočítejte rozptyl vstupní napěťové nesymetrie ($\sigma_{Vos}$). Sigma vstupní napěťové nesymetrie $\sigma_{Vos2}$ druhého stupně je 5 mV. Pokud jsou vstupy IN+ a IN− na stejném potenciálu, je sigma chyby poměru proudů $I_1$ a $I_2$ $\sigma_{I1/I2}=0{,}019$. Zanedbejte chybu poměru odporů $R_C$.`,
pat:['sig'],
idea:R`Dvě nezávislé chyby: (1) proudová chyba prvního stupně → na vstup dělíš $g_m$; (2) offset druhého stupně → na vstup dělíš ziskem prvního stupně. Pak kvadraticky.`,
parts:{Ri:{b:[23,7,6,12],c:'s',t:'Ri 1,325M'},Rc1:{b:[34,7,6,12],c:'r',t:'Rc 130k'},Rc2:{b:[51,7,6,12],c:'r',t:'Rc 130k'},Q23:{b:[31,43,31,15],c:'r',t:'Q2/Q3 (gm)'},Q01:{b:[23,71,26,17],c:'s',t:'Q0 → Q1 (ISS)'},OZ:{b:[71,22,14,23],c:'b',t:'2. stupeň'},sv:{b:[17,46,8,11],c:'p',t:'σVos = ?'},sv2:{b:[61,22,7,9],c:'b',t:'σVos2 5mV'},Iss:{a:[[25.5,19],[25.5,73]],c:'s',t:'ISS'},I1:{a:[[37,19],[37,58]],c:'r',t:'I1'},I2:{a:[[54,19],[54,58]],c:'r',t:'I2'},tail:{a:[[45.5,62],[45.5,73]],c:'s',t:'ISS'}},
steps:[
{t:'Klidový proud',h:['Ri','Q01','Iss','tail'],x:R`<p>$R_i$ napájí diodu Q0, Q1 zrcadlí do páru:</p>`,eq:[R`I_{SS}=\frac{V_C-V_{BE}}{R_i}=\frac{6-0{,}7}{1{,}325\cdot10^6}=4\,\mu\text{A}`]},
{t:'Proudová chyba',h:['Q23','I1','I2'],x:R`<p>Každou větví teče $I_{SS}/2$; relativní chyba poměru $\sigma_{I1/I2}$ znamená absolutní chybu</p>`,eq:[R`\sigma_I=\sigma_{I1/I2}\frac{I_{SS}}{2}=0{,}019\cdot\frac{4\cdot10^{-6}}{2}=38\,\text{nA}`]},
{t:'Transkonduktance a zisk 1. stupně',h:['Q23','Rc1','Rc2'],eq:[R`g_m=\frac{I_{SS}}{2V_T}=\frac{4\cdot10^{-6}}{2\cdot26\cdot10^{-3}}=76{,}92\,\mu\text{A/V}`,R`A_1=g_mR_C=76{,}92\cdot10^{-6}\cdot130\cdot10^3=10`]},
{t:'Přepočet na vstup a součet',h:['sv','sv2','OZ'],x:R`<p>Proudovou chybu „převedeš“ na napětí dělením $g_m$. Offset 2. stupně je za ziskem $A_1$, na vstup se zmenší $A_1$-krát:</p>`,eq:[R`\sigma_{Vos}=\sqrt{\left(\frac{\sigma_I}{g_m}\right)^2+\left(\frac{\sigma_{Vos2}}{A_1}\right)^2}=\sqrt{\left(\frac{38\cdot10^{-9}}{76{,}92\cdot10^{-6}}\right)^2+\left(\frac{5\cdot10^{-3}}{10}\right)^2}=702{,}9\,\mu\text{V}`],r:R`$\sigma_{Vos}=702{,}9\,\mu$V`,m:R`Chybu proudu dělíš $g_m$, chybu napětí za zesilovačem dělíš jeho ziskem.`}
],
res:R`$I_{SS}=4\,\mu$A, $\sigma_I=38$ nA, $g_m=76{,}92\,\mu$A/V, $A_1=10$, $\sigma_{Vos}=702{,}9\,\mu$V`,tk:[[R`\sigma_I=\sigma_{I1/I2}\frac{I_{SS}}{2}`,'+'],[R`\sigma_{Vos}=\sqrt{\left(\frac{\sigma_I}{g_m}\right)^2+\left(\frac{\sigma_{Vos2}}{A_1}\right)^2}`,'+'],[R`g_m=\frac{I_{SS}}{2V_T}`,'T']]},

/* ================= 3.3 ================= */
{id:'3.3',ch:3,title:'σVost: odpory + 2. stupeň + VBE',
task:R`Vypočítejte rozptyl vstupní napěťové nesymetrie ($\sigma_{Vost}$). Sigma $\sigma_{Vos2}$ druhého stupně je 0,5 mV. Sigma $\sigma_{Rc1/Rc2}$ chyby poměru proudů $R_{C1}$ a $R_{C1}$ je 0,019. Sigma daná nesouběhem $V_{BE}$ tranzistorů Q2 a Q3 je $\sigma_{Vos1}=54\,\mu$V.`,
pat:['sig'],
idea:R`Jako 3.2, jen přibude třetí nezávislá složka — nesouběh $V_{BE}$ ($\sigma_{Vos1}$), která už je přímo na vstupu.`,
parts:{Ri:{b:[22,9,5,12],c:'s',t:'Ri 1,325M'},Rc1:{b:[37,9,5,12],c:'r',t:'Rc1 130k'},Rc2:{b:[54,9,5,12],c:'r',t:'Rc2 130k'},Q23:{b:[33,46,29,12],c:'r',t:'Q2/Q3 (σVos1 54µV)'},Q01:{b:[22,75,28,14],c:'s',t:'Q0 → Q1'},OZ:{b:[72,24,13,22],c:'b',t:'2. stupeň'},sv:{b:[16,49,6,7],c:'p',t:'σVost'},sv1:{b:[26,49,5,7],c:'r',t:'σVos1'},sv2:{b:[63,24,5,6],c:'b',t:'σVos2'},Iss:{a:[[24.5,20],[24.5,75]],c:'s',t:'ISS'},I1:{a:[[38.5,20],[38.5,63]],c:'r',t:'I1'},I2:{a:[[55.5,20],[55.5,63]],c:'r',t:'I2'}},
steps:[
{t:'ISS, σI, gm, A1',h:['Ri','Q01','Iss','I1','I2','Rc1','Rc2','Q23'],eq:[R`I_{SS}=\frac{6-0{,}7}{1{,}325\cdot10^6}=4\,\mu\text{A}`,R`\sigma_I=\sigma_{Rc1/Rc2}\frac{I_{SS}}{2}=0{,}0019\cdot2\,\mu=3{,}8\,\text{nA}`,R`g_m=\frac{I_{SS}}{2V_T}=76{,}92\,\mu\text{A/V},\quad A_1=g_mR_C=10`],x:R`<p>Nesouběh kolektorových odporů se chová jako chyba poměru proudů — přepočítá se stejně.</p>`},
{t:'Odpory + 2. stupeň na vstupu',h:['sv2','OZ'],eq:[R`\sigma_{Vos}=\sqrt{\left(\frac{3{,}8\cdot10^{-9}}{76{,}92\cdot10^{-6}}\right)^2+\left(\frac{0{,}5\cdot10^{-3}}{10}\right)^2}=70{,}3\,\mu\text{V}`]},
{t:'Přidej nesouběh VBE',h:['sv','sv1','Q23'],eq:[R`\sigma_{Vost}=\sqrt{\sigma_{Vos}^2+\sigma_{Vos1}^2}=10^{-6}\sqrt{70{,}3^2+54^2}=88{,}65\,\mu\text{V}`],r:R`$\sigma_{Vost}=88{,}65\,\mu$V`,w:R`V zadání je $\sigma_{Rc1/Rc2}=0{,}019$, ve schématu i výpočtu 0,0019. Výsledek sbírky odpovídá 0,0019.`}
],
res:R`$\sigma_{Vos}=70{,}3\,\mu$V, $\sigma_{Vost}=88{,}65\,\mu$V`,tk:[[R`\sigma=\sqrt{\sum\sigma_k^2}`,'+']]},

/* ================= 3.4 ================= */
{id:'3.4',ch:3,title:'σVos OZ: zrcadlo + ΔVBE',
task:R`Vypočítejte offset $\sigma_{Vos}$ tohoto OZ. Sigma $\sigma_{I1/I2}$ chyby poměru proudů $I_1$ a $I_2$ proudového zrcadla aktivní zátěže je 3,5e-3. Sigma daná nesouběhem $V_{BE}$ tranzistorů Q4 a Q5 je $\sigma_{dVbe}=85\,\mu$V.`,
pat:['sig','ptat','mir'],
idea:R`Tail proud je 3/2 PTAT proudu. Chybu zrcadla M5/M6 převedeš na napětí dělením $g_m$ a kvadraticky přičteš nesouběh $V_{BE}$.`,
parts:{Rs:{b:[33,14,6,12],c:'s',t:'Rs 9k'},core:{b:[18,27,21,31],c:'s',t:'Q0–Q3 (Q0: N=4)'},tail:{b:[53,74,18,15],c:'o',t:'M2+M3+M4 (3 jedn.)'},M01:{b:[34,74,13,15],c:'s',t:'M0+M1 (2 jedn.)'},Q45:{b:[48,55,29,14],c:'b',t:'Q4/Q5 (σdVbe)'},M56:{b:[50,13,24,14],c:'p',t:'M5/M6 (σI1/I2)'},sv:{b:[10,58,7,9],c:'g',t:'σVos = ?'},I1:{a:[[52.3,26],[52.3,66]],c:'p',t:'ISS/2'},I2:{a:[[72,26],[72,66]],c:'p',t:'ISS/2'},It:{a:[[62,70],[62,90]],c:'o',t:'ISS'}},
steps:[
{t:'Tail proud',h:['Rs','core','M01','tail','It'],x:R`<p>PTAT jádro dá $\Delta V_{BE}/R_s$ do M0+M1 (2 jednotky). Tail M2+M3+M4 jsou 3 jednotky → převod 3/2:</p>`,eq:[R`I_{SS}=\frac32\frac{V_T\ln N}{R_s}=\frac32\cdot\frac{26\cdot10^{-3}\ln4}{9\cdot10^3}=6\,\mu\text{A}`]},
{t:'gm vstupního páru',h:['Q45'],eq:[R`g_m=\frac{I_{SS}}{2V_T}=\frac{6\cdot10^{-6}}{2\cdot26\cdot10^{-3}}=115{,}4\,\mu\text{A/V}`]},
{t:'Chyba zrcadla na vstupu',h:['M56','I1','I2'],eq:[R`\sigma_{Vos1}=\frac{\sigma_{I1/I2}\frac{I_{SS}}{2}}{g_m}=\frac{3{,}5\cdot10^{-3}\cdot3\cdot10^{-6}}{115{,}4\cdot10^{-6}}=91\,\mu\text{V}`]},
{t:'Celkem',h:['Q45','sv'],eq:[R`\sigma_{Vos}=\sqrt{\sigma_{Vos1}^2+\sigma_{dVbe}^2}=\sqrt{91^2+85^2}\,\mu\text{V}=124{,}5\,\mu\text{V}`],r:R`$\sigma_{Vos}=124{,}5\,\mu$V`}
],
res:R`$I_{SS}=6\,\mu$A, $g_m=115{,}4\,\mu$A/V, $\sigma_{Vos}=124{,}5\,\mu$V`,tk:[[R`\sigma_V=\frac{\sigma_I}{g_m}`,'+']]},

/* ================= 3.5 ================= */
{id:'3.5',ch:3,title:'OZ ve slabé inverzi: A0, f0, fT, Sr, σVos',
task:R`Vypočítejte $A_0$, $f_0$, $f_t$ a rychlost přeběhu $S_r$ tohoto operačního zesilovače. Vypočítejte $\sigma_{Vos}$ vstupní napěťové nesymetrie (vstupní chybu), když víte, že chyba přenosu zrcadla v prvním stupni je $\sigma_{I1/I2}=0{,}02$.`,
pat:['oz','sig','mir'],
idea:R`Dva stupně, oba MOS ve slabé inverzi ($g_m=I/(nV_T)$). $C_k$ je Millerova kapacita přes 2. stupeň → $f_0$ dělí ještě $A_2$. Chyba zrcadla ve slabé inverzi dá krásně jednoduché $\sigma_{I1/I2}\,n_pV_T$.`,
parts:{Ri:{b:[16,9,5,12],c:'s',t:'Ri 1M'},Vgs:{b:[10,65,8,24],c:'s',t:'Vgs 1V'},M45:{b:[37,32,24,14],c:'r',t:'M4/M5 slabá inv. np=2,9'},M67:{b:[39,71,19,14],c:'k',t:'M6/M7 (σI1/I2)'},rd1:{n:[41,57],c:'r',t:'rd1 8,4M'},M8:{b:[69,49,9,13],c:'b',t:'M8 slabá inv. nn=2,2'},rd2:{n:[75,32],c:'b',t:'rd2 1,2M'},Ck:{b:[64,44,12,7],c:'o',t:'Ck 10p'},sv:{b:[21,36,7,8],c:'g',t:'σVos = ?'},IRi:{a:[[18.3,20],[18.3,88]],c:'s',t:'IRi'},It:{a:[[48.5,20],[48.5,30]],c:'r',t:'IRi'},I2:{a:[[41,46],[41,88]],c:'r',t:'IRi/2'},I1:{a:[[56,46],[56,88]],c:'r',t:'IRi/2'},I3:{a:[[75,23],[75,88]],c:'b',t:'3·IRi'}},
steps:[
{t:'Proudy',h:['Ri','Vgs','IRi','It','I3'],eq:[R`I_{Ri}=\frac{V_{CC}-V_{GS}}{R_i}=\frac{5-1}{1\cdot10^6}=4\,\mu\text{A}`],x:R`<p>M3 dá $I_{Ri}$ do páru (každý tranzistor $I_{Ri}/2$), M9+M10+M11 dají $3I_{Ri}$ do M8.</p>`},
{t:'Zesílení A0',h:['M45','rd1','M8','rd2'],x:R`<p>Slabá inverze: $g_m=I_D/(nV_T)$ (tahák).</p>`,g:[R`A_0=g_{m1}r_{d1}\cdot g_{m2}r_{d2}=\frac{I_{Ri}}{2n_pV_T}r_{d1}\cdot\frac{3I_{Ri}}{n_nV_T}r_{d2}`],eq:[R`A_0=\frac{4\cdot10^{-6}}{2\cdot2{,}9\cdot26\cdot10^{-3}}\cdot8{,}4\cdot10^6\cdot\frac{3\cdot4\cdot10^{-6}}{2{,}2\cdot26\cdot10^{-3}}\cdot1{,}2\cdot10^6=56092`],r:R`$A_0=56\,092$`},
{t:'Dominantní pól (Miller)',h:['Ck','rd1','M8'],x:R`<p>$C_k$ je zapojený mezi vstup a výstup 2. stupně → z uzlu $r_{d1}$ se jeví $A_2$-krát větší.</p>`,g:[R`f_0=\frac{1}{2\pi r_{d1}A_2C_k}`],eq:[R`f_0=\frac{1}{2\pi\cdot8{,}4\cdot10^6\cdot\frac{3\cdot4\cdot10^{-6}}{2{,}2\cdot26\cdot10^{-3}}\cdot1{,}2\cdot10^6\cdot10\cdot10^{-12}}=7{,}53\,\text{Hz}`],r:R`$f_0=7{,}53$ Hz`},
{t:'fT a Sr',h:['Ck','It'],eq:[R`f_T=A_0f_0=56092\cdot7{,}53=422{,}4\,\text{kHz}`,R`S_r=\frac{I_{Ri}}{C_k}=\frac{4\cdot10^{-6}}{10\cdot10^{-12}}=0{,}4\,\text{V}/\mu\text{s}`],x:R`<p>$S_r$: celý tail proud prvního stupně nabíjí $C_k$.</p>`},
{t:'σVos z chyby zrcadla',h:['M67','sv','M45'],x:R`<p>Proudová chyba $\sigma_{I1/I2}\cdot I_{Ri}/2$ děleno $g_{m1}=I_{Ri}/(2n_pV_T)$ — proud se zkrátí:</p>`,eq:[R`\sigma_{Vos2I}=\frac{\sigma_{I1/I2}\frac{I_{Ri}}{2}}{g_m}=\sigma_{I1/I2}\,n_pV_T=0{,}02\cdot2{,}9\cdot26\cdot10^{-3}=1{,}5\,\text{mV}`],r:R`$\sigma_{Vos}=1{,}5$ mV`,m:R`Slabá inverze: $\sigma_{Vos}=\sigma_{I1/I2}\cdot n\cdot V_T$ — proud vůbec nepotřebuješ.`}
],
res:R`$A_0=56\,092$, $f_0=7{,}53$ Hz, $f_T=422{,}4$ kHz, $S_r=0{,}4$ V/µs, $\sigma_{Vos}=1{,}5$ mV`,tk:[[R`g_m=\frac{I_D}{nV_T}`,'T'],[R`f_0=\frac{1}{2\pi r_dAC}`,'T'],[R`f_T=A_0f_0,\;S_r=\frac{I}{C}`,'T'],[R`\sigma_{Vos}=\sigma_{I1/I2}nV_T`,'+']]},

/* ================= 3.6 ================= */
{id:'3.6',ch:3,title:'OZ ve slabé inverzi + nesouběh M4/M5',
task:R`Vypočítejte $A_0$, $f_0$, $f_t$ a $S_r$ tohoto OZ. Vypočítejte $\sigma_{Vos}$, když víte, že chyba přenosu zrcadla v prvním stupni je $\sigma_{I1/I2}=0{,}01$ a složka $\sigma_{Vosi}$ způsobená nesouběhem tranzistorů M4 a M5 je $\sigma_{Vosi}=0{,}8$ mV.`,
pat:['oz','sig'],
idea:R`Stejný OZ jako 3.5 (stejné $A_0$, $f_0$, $f_T$, $S_r$). Do σ přibude nesouběh vstupního páru.`,
parts:{Ri:{b:[17,8,5,12],c:'s',t:'Ri 1M'},M45:{b:[38,32,24,13],c:'r',t:'M4/M5 (σVosi 0,8mV)'},rd1:{n:[41.5,57],c:'r',t:'rd1 8,4M'},M67:{b:[40,70,17,12],c:'k',t:'M6/M7 (σI1/I2 0,01)'},M8:{b:[70,52,7,10],c:'b',t:'M8'},rd2:{n:[74.5,32],c:'b',t:'rd2 1,2M'},Ck:{b:[63,44,11,6],c:'o',t:'Ck 10p'},sv:{b:[22,36,5,8],c:'g',t:'σVos = ?'},IRi:{a:[[18.5,18],[18.5,88]],c:'s',t:'IRi'},It:{a:[[49,20],[49,30]],c:'r',t:'IRi'},I2:{a:[[41.5,45],[41.5,88]],c:'r',t:'IRi/2'},I1:{a:[[56,45],[56,88]],c:'r',t:'IRi/2'},I3:{a:[[74.5,20],[74.5,88]],c:'b',t:'3·IRi'}},
steps:[
{t:'A0, f0, fT, Sr — jako 3.5',h:['IRi','M45','rd1','M8','rd2','Ck'],eq:[R`I_{Ri}=4\,\mu\text{A},\quad A_0=\frac{I_{Ri}}{2n_pV_T}r_{d1}\cdot\frac{3I_{Ri}}{n_nV_T}r_{d2}=56092`,R`f_0=\frac{1}{2\pi r_{d1}A_2C_k}=7{,}53\,\text{Hz},\quad f_T=422{,}4\,\text{kHz},\quad S_r=0{,}4\,\text{V}/\mu\text{s}`]},
{t:'Chyba zrcadla',h:['M67','I1','I2'],eq:[R`\sigma_I=\sigma_{I1/I2}\frac{I_{Ri}}{2}=0{,}01\cdot2\cdot10^{-6}=20\,\text{nA}`,R`\sigma_{VosI}=\frac{\sigma_I}{g_m}=\frac{\sigma_I\,2n_pV_T}{I_{Ri}}=\frac{20\cdot10^{-9}\cdot2\cdot2{,}9\cdot26\cdot10^{-3}}{4\cdot10^{-6}}=0{,}754\,\text{mV}`],x:R`<p>(Totéž jako zkratka $\sigma_{I1/I2}n_pV_T=0{,}01\cdot2{,}9\cdot26\,\text{m}=0{,}754$ mV.)</p>`},
{t:'Celkem',h:['M45','sv'],eq:[R`\sigma_{Vos}=\sqrt{\sigma_{Vosi}^2+\sigma_{VosI}^2}=10^{-3}\sqrt{0{,}754^2+0{,}8^2}=1{,}1\,\text{mV}`],r:R`$\sigma_{Vos}=1{,}1$ mV`}
],
res:R`$A_0=56\,092$, $f_0=7{,}53$ Hz, $f_T=422{,}4$ kHz, $S_r=0{,}4$ V/µs, $\sigma_{Vos}=1{,}1$ mV`,tk:[[R`\sigma_{Vos}=\sigma_{I1/I2}nV_T`,'+']]},

/* ================= 3.7 ================= */
{id:'3.7',ch:3,title:'σVost: dva stupně',
task:R`Vypočítejte $\sigma_{Vost}$ vstupní napěťové nesymetrie OZ. Vstupní chyba 1. stupně je $\sigma_{Vos1}=100\,\mu$V a vstupní chyba 2. stupně je $\sigma_{Vos2}=4$ mV.`,
pat:['sig'],
idea:R`Spočítej zisk 1. stupně, offset 2. stupně jím vyděl a kvadraticky přičti offset 1. stupně.`,
parts:{Ri:{b:[15,7,6,12],c:'s',t:'Ri 1M'},Rc:{b:[37,7,6,12],c:'r',t:'Rc1 650k'},Rc2:{b:[50,7,6,12],c:'r',t:'Rc1 650k'},Q01:{b:[35,57,22,12],c:'r',t:'Q0/Q1 (σVos1 100µV)'},M3:{b:[43,76,7,13],c:'s',t:'M3 → ISS'},Q23:{b:[63,34,18,14],c:'b',t:'2. stupeň (σVos2 4mV)'},sv:{b:[21,59,5,8],c:'g',t:'σVost = ?'},Iss:{a:[[17.5,18],[17.5,94]],c:'s',t:'ISS'},I1:{a:[[39,18],[39,70]],c:'r',t:'ISS/2'},I2:{a:[[52,18],[52,70]],c:'r',t:'ISS/2'}},
steps:[
{t:'Zisk 1. stupně',h:['Ri','Iss','Q01','Rc','Rc2','I1','I2'],eq:[R`I_{SS}=\frac{V_C-V_{GS}}{R_i}=\frac{5-1}{1\cdot10^6}=4\,\mu\text{A}`,R`A_1=\frac{I_{SS}}{2V_T}R_{C1}=\frac{4\cdot10^{-6}}{2\cdot26\cdot10^{-3}}\cdot650\cdot10^3=50`]},
{t:'Offset 2. stupně na vstupu',h:['Q23'],eq:[R`\sigma_{Vost2}=\frac{\sigma_{Vos2}}{A_1}=\frac{4\cdot10^{-3}}{50}=80\,\mu\text{V}`]},
{t:'Celkem',h:['Q01','sv'],eq:[R`\sigma_{Vost}=\sqrt{\sigma_{Vost2}^2+\sigma_{Vos1}^2}=10^{-6}\sqrt{80^2+100^2}=128\,\mu\text{V}`],r:R`$\sigma_{Vost}=128\,\mu$V`}
],
res:R`$A_1=50$, $\sigma_{Vost}=128\,\mu$V`,tk:[[R`\sigma_{Vos}=\sqrt{\sigma_{Vos1}^2+\left(\frac{\sigma_{Vos2}}{A_1}\right)^2}`,'+']]},

/* ================= 3.8 ================= */
{id:'3.8',ch:3,title:'BJT + slabá inverze: A0, f0, fT, Sr, σVos',
task:R`Vypočítejte $A_0$, $f_0$, $f_T$ a $S_r$ tohoto OZ. Vypočítejte $\sigma_{Vos}$. Vstupní chyba $\sigma_{Vos1}$ 1. stupně je 1 mV, vstupní chyba $\sigma_{Vos2}$ 2. stupně je 20 mV. Chybu vzniklou nesouběhem rezistorů zanedbejte.`,
pat:['oz','sig'],
idea:R`1. stupeň BJT ($g_m=I/V_T$) s $R_C$, 2. stupeň MOS ve slabé inverzi s $r_d$. $C_k$ je tady přímo z uzlu $r_d$ na zem → $f_0=1/(2\pi r_dC_k)$ bez Millera.`,
parts:{Ri:{b:[9,8,5,13],c:'s',t:'Ri 1M'},Rc:{b:[28,8,6,13],c:'r',t:'Rc 325k'},Rc2:{b:[40,8,6,13],c:'r',t:'Rc 325k'},Q01:{b:[27,57,19,13],c:'r',t:'Q0/Q1 (σVos1 1mV)'},M3:{b:[33,76,6,13],c:'s',t:'M3'},M910:{b:[64,43,19,12],c:'b',t:'M9/M10 slabá inv. n=2,9'},M8:{b:[69,17,7,13],c:'b',t:'M8 → IRi'},rd:{n:[78.5,75],c:'b',t:'rd 10M'},Ck:{b:[81,76,6,14],c:'o',t:'Ck 40p'},sv2:{b:[43,38,6,9],c:'b',t:'σVos2 20mV'},sv:{b:[14,59,6,9],c:'g',t:'σVos = ?'},IRi:{a:[[11.3,20],[11.3,94]],c:'s',t:'IRi'},I8:{a:[[73,28],[73,40]],c:'b',t:'IRi'}},
steps:[
{t:'Proud a zisk 1. stupně',h:['Ri','IRi','Q01','Rc','Rc2'],eq:[R`I_{Ri}=\frac{5-1}{1\cdot10^6}=4\,\mu\text{A}`,R`A_1=g_{m1}R_C=\frac{I_{Ri}}{2V_T}R_C=\frac{4\cdot10^{-6}}{2\cdot26\cdot10^{-3}}\cdot325\cdot10^3=25`]},
{t:'Zisk 2. stupně (slabá inverze)',h:['M8','I8','M910','rd'],x:R`<p>Tail M8 = $I_{Ri}$, každý tranzistor $I_{Ri}/2$, $g_m=I/(nV_T)$:</p>`,eq:[R`A_2=\frac{I_{Ri}}{2nV_T}r_d=\frac{4\cdot10^{-6}}{2\cdot2{,}9\cdot26\cdot10^{-3}}\cdot10\cdot10^6=265`,R`A_0=A_1A_2=25\cdot265=6625`],r:R`$A_0=6625$`},
{t:'f0, fT, Sr',h:['rd','Ck'],x:R`<p>$C_k$ je zapojený z uzlu $r_d$ na zem → žádný Miller:</p>`,eq:[R`f_0=\frac{1}{2\pi r_dC_k}=\frac{1}{2\pi\cdot10\cdot10^6\cdot40\cdot10^{-12}}=398\,\text{Hz}`,R`f_T=A_0f_0=6625\cdot398=2{,}64\,\text{MHz}`,R`S_r=\frac{I_{Ri}}{C_k}=\frac{4\cdot10^{-6}}{40\cdot10^{-12}}=0{,}1\,\text{V}/\mu\text{s}`]},
{t:'σVos',h:['sv','sv2','Q01'],eq:[R`\sigma_{Vos}=\sqrt{\sigma_{Vos1}^2+\left(\frac{\sigma_{Vos2}}{A_1}\right)^2}=10^{-3}\sqrt{1^2+\left(\frac{20}{25}\right)^2}=1{,}28\,\text{mV}`],r:R`$\sigma_{Vos}=1{,}28$ mV`,w:R`Kam je připojený $C_k$, rozhoduje o vzorci pro $f_0$: na zem → $1/(2\pi r_dC_k)$; přes 2. stupeň → Miller s $A_2$.`}
],
res:R`$A_0=6625$, $f_0=398$ Hz, $f_T=2{,}64$ MHz, $S_r=0{,}1$ V/µs, $\sigma_{Vos}=1{,}28$ mV`,tk:[[R`f_0=\frac{1}{2\pi r_dC}`,'T'],[R`\sigma_{Vos}=\sqrt{\sigma_{Vos1}^2+(\sigma_{Vos2}/A_1)^2}`,'+']]},

/* ================= 3.9 ================= */
{id:'3.9',ch:3,title:'OZ s PTAT biasem: A0, f0, fT, Sr, σVos',
task:R`Vypočítejte $A_0$, $f_0$, $f_T$ a $S_r$ tohoto OZ. Vypočítejte $\sigma_{Vos}$, když víte, že chyba přenosu zrcadla v prvním stupni je $\sigma_{I1/I2}=0{,}003$ a složka $\sigma_{Vosi}$ způsobená nesouběhem tranzistorů Q4 a Q5 je $\sigma_{Vosi}=80\,\mu$V.`,
pat:['oz','sig','ptat','mir'],
idea:R`PTAT jádro dá $I_{REF}$. Tail M4 má poloviční velikost proti M0+M1 → $0{,}5I_{REF}$, každý vstupní tranzistor $I_{REF}/4$. 2. stupeň (M7) ve slabé inverzi s Millerovou $C_k$.`,
parts:{core:{b:[12,40,17,30],c:'s',t:'Q0–Q3 (N=4)'},Rs:{b:[24,71,6,12],c:'s',t:'Rs 7,2k'},M4:{b:[52,9,7,12],c:'r',t:'M4 → IREF/2'},Q45:{b:[45,33,22,14],c:'r',t:'Q4/Q5 (σVosi 80µV)'},M56:{b:[48,71,17,14],c:'k',t:'M5/M6 (σI1/I2)'},rd1:{n:[49.5,57.5],c:'r',t:'rd1 3M'},M7:{b:[73,51,8,12],c:'b',t:'M7 slabá inv. nn=2,2'},rd2:{n:[77.5,33],c:'b',t:'rd2 1,2M'},Ck:{b:[68,44,10,7],c:'o',t:'Ck 30p'},sv:{b:[31,37,6,8],c:'g',t:'σVos = ?'},Ip:{a:[[26.5,20],[26.5,88]],c:'s',t:'IREF'},It:{a:[[56,20],[56,31]],c:'r',t:'IREF/2'},I2:{a:[[49.5,47],[49.5,88]],c:'r',t:'IREF/4'},I1:{a:[[62.5,47],[62.5,88]],c:'r',t:'IREF/4'}},
steps:[
{t:'Proudy',h:['core','Rs','Ip','M4','It'],eq:[R`I_{REF}=\frac{V_T\ln N}{R_s}=\frac{26\cdot10^{-3}\ln4}{7{,}2\cdot10^3}=5\,\mu\text{A}`],x:R`<p>M0+M1 (2 jednotky) nesou $I_{REF}$, tail M4 (1 jednotka) → $0{,}5I_{REF}$.</p>`},
{t:'A0',h:['Q45','rd1','M7','rd2'],eq:[R`A_0=\frac{0{,}5I_{REF}}{2V_T}r_{d1}\cdot\frac{I_{REF}}{n_nV_T}r_{d2}=\frac{2{,}5\cdot10^{-6}}{2\cdot26\cdot10^{-3}}\cdot3\cdot10^6\cdot\frac{5\cdot10^{-6}}{2{,}2\cdot26\cdot10^{-3}}\cdot1{,}2\cdot10^6=15129`],r:R`$A_0=15\,129$`},
{t:'f0 (Miller), fT, Sr',h:['Ck','rd1','M7','It'],eq:[R`f_0=\frac{1}{2\pi r_{d1}A_2C_k}=\frac{1}{2\pi\cdot3\cdot10^6\cdot104{,}9\cdot30\cdot10^{-12}}=16{,}86\,\text{Hz}`,R`f_T=A_0f_0=255{,}1\,\text{kHz},\quad S_r=\frac{0{,}5I_{REF}}{C_k}=\frac{2{,}5\cdot10^{-6}}{30\cdot10^{-12}}=0{,}083\,\text{V}/\mu\text{s}`]},
{t:'σVos',h:['M56','Q45','sv','I1','I2'],x:R`<p>Každou větví teče $I_{REF}/4$:</p>`,eq:[R`\sigma_I=\sigma_{I1/I2}\frac{I_{REF}}{4}=0{,}003\cdot1{,}25\,\mu=3{,}75\,\text{nA}`,R`\sigma_{VosI}=\frac{\sigma_I}{g_m}=\frac{\sigma_I2V_T}{0{,}5I_{REF}}=\frac{3{,}75\cdot10^{-9}\cdot2\cdot26\cdot10^{-3}}{2{,}5\cdot10^{-6}}=78\,\mu\text{V}`,R`\sigma_{Vos}=\sqrt{\sigma_{Vosi}^2+\sigma_{VosI}^2}=10^{-6}\sqrt{80^2+78^2}=112\,\mu\text{V}`],r:R`$\sigma_{Vos}=112\,\mu$V`}
],
res:R`$A_0=15\,129$, $f_0=16{,}86$ Hz, $f_T=255{,}1$ kHz, $S_r=0{,}083$ V/µs, $\sigma_{Vos}=112\,\mu$V`,tk:[[R`I_{PTAT}=\frac{V_T\ln N}{R}`,'T'],[R`\sigma_V=\frac{\sigma_I}{g_m}`,'+']]},

/* ================= 3.10 ================= */
{id:'3.10',ch:3,title:'σVos: chyba zrcadla ve 2. stupni',
task:R`Vypočítejte $\sigma_{Vos}$, když víte, že chyba přenosu zrcadla ve druhém stupni je $\sigma_{I1/I2}=0{,}02$ a složka $\sigma_{Vosi}$ druhého stupně způsobená nesouběhem M10 a M11 je $\sigma_{Vosi}=2$ mV. Nesymetrie prvního stupně (Q0, Q1) je $\sigma_{Vos1}=0{,}2$ mV.`,
pat:['sig'],
idea:R`Nejdřív slož σ druhého stupně (zrcadlo + nesouběh páru), pak ho vyděl ziskem 1. stupně a přičti σ prvního stupně.`,
parts:{Ri:{b:[8,7,5,12],c:'s',t:'Ri 2M'},Rc:{b:[28,7,5,12],c:'r',t:'Rc 130k'},Rc2:{b:[39,7,5,12],c:'r',t:'Rc 130k'},Q01:{b:[26,53,19,12],c:'r',t:'Q0/Q1 (σVos1 0,2mV)'},M89:{b:[67,16,11,12],c:'b',t:'M8/M9 → 2·IRi'},M1011:{b:[64,40,19,13],c:'b',t:'M10/M11 slabá inv. (σVosi 2mV)'},M1213:{b:[65,72,15,14],c:'k',t:'M12/M13 (σI1/I2 0,02)'},sv:{b:[14,55,6,8],c:'g',t:'σVos = ?'},IRi:{a:[[10.5,18],[10.5,88]],c:'s',t:'IRi'},I2r:{a:[[73,28],[73,37]],c:'b',t:'2·IRi'}},
steps:[
{t:'Chyba zrcadla 2. stupně',h:['M89','I2r','M1213','M1011'],x:R`<p>Tail 2. stupně $2I_{Ri}$, každý tranzistor $I_{Ri}$; slabá inverze → zkratka:</p>`,eq:[R`I_{Ri}=\frac{5-1}{2\cdot10^6}=2\,\mu\text{A}`,R`\sigma_{Vos2I}=\frac{\sigma_{I1/I2}\frac{2I_{Ri}}{2}}{g_m}=\sigma_{I1/I2}nV_T=0{,}02\cdot2{,}9\cdot26\cdot10^{-3}=1{,}51\,\text{mV}`]},
{t:'σ celého 2. stupně',h:['M1011'],eq:[R`\sigma_{Vos2}=\sqrt{\sigma_{Vosi}^2+\sigma_{Vos2I}^2}=10^{-3}\sqrt{2^2+1{,}51^2}=2{,}5\,\text{mV}`]},
{t:'Zisk 1. stupně',h:['Q01','Rc','Rc2'],eq:[R`A_1=\frac{I_{Ri}}{2V_T}R_C=\frac{2\cdot10^{-6}}{2\cdot26\cdot10^{-3}}\cdot130\cdot10^3=5`]},
{t:'Celkem na vstupu',h:['sv','Q01'],eq:[R`\sigma_{Vos}=\sqrt{\sigma_{Vos1}^2+\left(\frac{\sigma_{Vos2}}{A_1}\right)^2}=10^{-3}\sqrt{0{,}2^2+\left(\frac{2{,}5}{5}\right)^2}=0{,}54\,\text{mV}`],r:R`$\sigma_{Vos}=0{,}54$ mV`}
],
res:R`$\sigma_{Vos2}=2{,}5$ mV, $A_1=5$, $\sigma_{Vos}=0{,}54$ mV`,tk:[[R`\sigma_{Vos}=\sigma_{I1/I2}nV_T`,'+']]},

/* ================= 3.11 ================= */
{id:'3.11',ch:3,title:'σVos z nesouběhu Rc a aktivní zátěže; A0, f0, fT',
task:R`Vypočítejte $\sigma_{Vos}$. Chyba poměru odporů $R_{C1}$ a $R_{C2}$ je $\sigma_{Rc1/Rc2}=0{,}00385$, chyba přenosu aktivní zátěže druhého stupně je $\sigma_I=46$ nA. Vypočítejte $A_0$, $f_0$, $f_T$ tohoto OZ.`,
pat:['sig','oz','mir'],
idea:R`Nesouběh $R_C$ u BJT páru: rovnováha nastane, když $I_1R_{C1}=I_2R_{C2}$ → $\Delta V_{BE}=V_T\ln(1+\sigma)\approx V_T\sigma$. Chybu zátěže 2. stupně převedeš na vstup 2. stupně ($/g_{m2}$) a pak na vstup OZ ($/A_1$).`,
parts:{Ri:{b:[16,5,6,13],c:'s',t:'Ri 1M'},M2:{b:[28,14,7,16],c:'s',t:'M2 (N=4)'},Rc1:{b:[38,5,6,13],c:'r',t:'Rc1 390k'},Rc2:{b:[51,5,6,13],c:'r',t:'Rc2 390k'},Q01:{b:[35,55,22,13],c:'r',t:'Q0/Q1 (gm1)'},M3:{b:[43,77,7,13],c:'s',t:'M3 → IRi'},M4:{b:[69,15,7,12],c:'b',t:'M4 → IRi/4'},Q23:{b:[63,33,20,14],c:'b',t:'Q2/Q3 (gm2)'},M56:{b:[65,74,15,15],c:'k',t:'M5/M6 (σI 46nA)'},rd:{n:[78,70.5],c:'b',t:'rd 2M'},Ck:{b:[81,78,6,13],c:'o',t:'Ck 60p'},sv:{b:[22,58,6,9],c:'g',t:'σVos = ?'},IRi:{a:[[18,17],[18,94]],c:'s',t:'IRi'},I4:{a:[[73,27],[73,32]],c:'b',t:'IRi/4'},Ia:{a:[[39.7,17],[39.7,72]],c:'r',t:'IRi/2'},Ib:{a:[[52.7,17],[52.7,72]],c:'r',t:'IRi/2'}},
steps:[
{t:'Proudy a transkonduktance',h:['Ri','IRi','M3','Ia','Ib','M2','M4','I4','Q01','Q23'],x:R`<p>1. stupeň: tail $I_{Ri}$. 2. stupeň: M4 je 4× menší než M2 → tail $I_{Ri}/4$.</p>`,eq:[R`I_{Ri}=4\,\mu\text{A},\quad g_{m1}=\frac{I_{Ri}}{2V_T}=76{,}92\,\mu\text{A/V},\quad g_{m2}=\frac{I_{Ri}}{4\cdot2V_T}=19{,}23\,\mu\text{A/V}`]},
{t:'Nesouběh Rc',h:['Rc1','Rc2','Q01'],x:R`<p>Výstup 1. stupně je vyvážený při $I_1R_{C1}=I_2R_{C2}$, tedy $I_1/I_2=1+\sigma_{Rc1/Rc2}$. Takový poměr proudů potřebuje rozdíl $V_{BE}$:</p>`,eq:[R`\sigma_{Vos(\sigma_R)}=V_T\ln(1+\sigma_{Rc1/Rc2})=26\cdot10^{-3}\ln(1{,}00385)=100\,\mu\text{V}`]},
{t:'Chyba zátěže 2. stupně',h:['M56','Q23','Rc1'],x:R`<p>$\sigma_I$ / $g_{m2}$ = napětí na vstupu 2. stupně; to je za ziskem $A_1=g_{m1}R_C=30$:</p>`,eq:[R`\sigma_{Vos(\sigma_I)}=\frac{\sigma_I/g_{m2}}{A_1}=\frac{46\cdot10^{-9}/19{,}23\cdot10^{-6}}{76{,}92\cdot10^{-6}\cdot390\cdot10^3}=80\,\mu\text{V}`]},
{t:'Celkem',h:['sv'],eq:[R`\sigma_{Vos}=10^{-6}\sqrt{100^2+80^2}=128\,\mu\text{V}`],r:R`$\sigma_{Vos}=128\,\mu$V`},
{t:'A0, f0, fT',h:['rd','Ck','Q23'],x:R`<p>$C_k$ je z uzlu $r_d$ na zem (bez Millera):</p>`,eq:[R`A_0=g_{m1}R_C\cdot g_{m2}r_d=30\cdot19{,}23\cdot10^{-6}\cdot2\cdot10^6=1154`,R`f_0=\frac{1}{2\pi r_dC_k}=\frac{1}{2\pi\cdot2\cdot10^6\cdot60\cdot10^{-12}}=1326\,\text{Hz}`,R`f_T=A_0f_0=1154\cdot1326=1{,}53\,\text{MHz}`],r:R`$A_0=1154$, $f_0=1326$ Hz, $f_T=1{,}53$ MHz`,m:R`Nesouběh kolektorových odporů BJT páru: $\sigma_{Vos}\approx V_T\cdot\sigma_R$.`}
],
res:R`$\sigma_{Vos}=128\,\mu$V, $A_0=1154$, $f_0=1326$ Hz, $f_T=1{,}53$ MHz`,tk:[[R`\sigma_{Vos}\approx V_T\sigma_R`,'+'],[R`g_m=\frac{I_{SS}}{2V_T}`,'T']]},

/* ================= 3.12 ================= */
{id:'3.12',ch:3,title:'BG reference + zesilovač: Vd, Vo a σo',
task:R`Vypočítejte hodnotu napětí $V_d$ a $V_O$. Určete rozptyl výstupního napětí ($\sigma_O$), když víte, že rozptyl výstupního napětí BG reference je $\sigma_{VBG}=2{,}6$ mV a zpětnovazební zisk zesilovače má odchylku $\sigma_A=3{,}2\cdot10^{-3}$.`,
pat:['nvbg','ptat','sig','bg'],
idea:R`$V_d$ = 3 diody + PTAT úbytek na $R_p$ (= 3·$V_{BG}$). $V_O=V_{BG}\cdot A$ s $A=(R_4+R_3)/R_3$. Chyba $V_O$ má dvě nezávislé příčiny: chybu $V_{BG}$ (násobí se $A$) a chybu $A$ (násobí se $V_{BG}$).`,
parts:{core:{b:[6,54,15,25],c:'s',t:'Q0–Q3 (Q3: 4×)'},Rs:{b:[16,80,5,11],c:'s',t:'Rs 3,6k'},M01:{b:[16,5,12,10],c:'s',t:'M0 : M1 = 1 : 2'},IR2:{a:[[17.8,15],[17.8,92]],c:'s',t:'IREF/2'},IR:{a:[[27.2,15],[27.2,92]],c:'r',t:'IREF'},Rp:{b:[25,26,7,11],c:'r',t:'Rp 90k'},D3:{b:[25,38,8,48],c:'y',t:'Q5, Q6, Q7 = 3·VBE'},Vd:{n:[40,28],c:'r',t:'Vd'},Q1112:{b:[38,51,17,10],c:'p',t:'BG Q11 (8×)/Q12'},VBG:{n:[61.5,57],c:'p',t:'VBG (σ 2,6mV)'},M45:{b:[64,42,17,11],c:'b',t:'zesilovač M4/M5 (σA)'},R4:{b:[85,36,6,9],c:'b',t:'R4 150k'},R3:{b:[85,51,6,9],c:'b',t:'R3 250k'},Vo:{n:[88,34],c:'b',t:'Vo'}},
steps:[
{t:'Referenční proud',h:['core','Rs','M01','IR2','IR'],x:R`<p>PTAT jádro dá $V_T\ln4/R_s=10\,\mu$A $=I_{REF}/2$. M1 je 2× větší → $I_{REF}$:</p>`,eq:[R`I_{REF}=\frac{2V_T\ln4}{R_s}=\frac{2\cdot26\cdot10^{-3}\ln4}{3{,}6\cdot10^3}=20\,\mu\text{A}`]},
{t:'Napětí Vd',h:['Rp','D3','IR','Vd'],x:R`<p>Q4 (dolů) a Q8 (sledovač nahoru) se vyruší, zbudou tři diody a $R_p$:</p>`,eq:[R`V_d=3V_{BE}+R_pI_{REF}=1{,}95+90\cdot10^3\cdot20\cdot10^{-6}=3{,}75\,\text{V}`],r:R`$V_d=3{,}75$ V (= 3·$V_{BG}$)`},
{t:'Napětí Vo',h:['VBG','M45','R4','R3','Vo'],x:R`<p>Neinvertující zesilovač: M4 má na gate $V_{BG}$, M5 je na děliči $R_4/R_3$ → $V_O=V_{BG}(R_4+R_3)/R_3$:</p>`,eq:[R`V_O=1{,}25\cdot\frac{400}{250}=2\,\text{V}`],r:R`$V_O=2$ V`},
{t:'σ od reference',h:['VBG','R4','R3'],eq:[R`\sigma_{OVBG}=\sigma_{VBG}\frac{R_4+R_3}{R_3}=2{,}6\cdot10^{-3}\cdot1{,}6=4{,}16\,\text{mV}`]},
{t:'σ od zisku',h:['M45'],x:R`<p>$\partial V_O/\partial A=V_{BG}$, takže</p>`,eq:[R`\sigma_{OA}=V_{BG}\sigma_A=1{,}25\cdot3{,}2\cdot10^{-3}=4\,\text{mV}`],w:R`$\sigma_A$ je tu absolutní odchylka zisku $A=1{,}6$ (proto se násobí $V_{BG}$, ne $V_O$).`},
{t:'Celkem',h:['Vo'],eq:[R`\sigma_O=\sqrt{\sigma_{OVBG}^2+\sigma_{OA}^2}=10^{-3}\sqrt{4{,}16^2+4^2}=5{,}77\,\text{mV}`],r:R`$\sigma_O=5{,}77$ mV`}
],
res:R`$I_{REF}=20\,\mu$A, $V_d=3{,}75$ V, $V_O=2$ V, $\sigma_O=5{,}77$ mV`,tk:[[R`mV_{BE}+I_{PTAT}R=mV_{BG}`,'+'],[R`\sigma=\sqrt{\sum\sigma_k^2}`,'+']]},
/* ================= 4.1 ================= */
{id:'4.1',ch:4,title:'Šumový proud zrcadla 1 : 5',
task:R`Určete hodnotu výstupního šumového proudu $i_{no}$ v oblasti bílého šumu. Zanedbejte šumový proud referenčního proudového zdroje $I_i$. Silná inverze: $k_p=67\,\mu$A/V², $w=5\,\mu$m, $l=20\,\mu$m.`,
pat:['nmos','mir'],
idea:R`Všech 6 tranzistorů vede stejný proud → stejné $g_m$ a stejný šum. Šum M0 se zrcadlem zesílí 5×, šum M1–M5 se jen sečte.`,
parts:{M0:{b:[14,49,10,28],c:'b',t:'M0 (referenční)'},M15:{b:[37,49,53,28],c:'r',t:'M1–M5 (5× paralelně)'},Ii:{a:[[16,4],[16,48]],c:'b',t:'Ii 5µA'},Io:{a:[[87,4],[87,40]],c:'r',t:'Io 25µA'}},
steps:[
{t:'gm jednoho tranzistoru',h:['M0','M15','Ii'],x:R`<p>Všechny tranzistory mají stejné $W/L$ a vedou $I_i=5\,\mu$A (proto $I_o=5I_i$). Silná inverze (tahák):</p>`,g:[R`g_m=\sqrt{2I_Dk_p\frac{W}{L}}`],eq:[R`g_m=\sqrt{2\cdot5\cdot10^{-6}\cdot67\cdot10^{-6}\cdot\frac{5}{20}}=12{,}94\,\mu\text{A/V}`]},
{t:'Šumový proud jednoho tranzistoru',g:[R`i_n=\sqrt{4kTg_m}`],eq:[R`i_n=\sqrt{4\cdot1{,}38\cdot10^{-23}\cdot300\cdot12{,}94\cdot10^{-6}}=0{,}463\,\text{pA}/\sqrt{\text{Hz}}`],w:R`Sbírka používá $i_n=\sqrt{4kTg_m}$ (bez faktoru 2/3 z učebnic). U zkoušky se drž sbírky.`},
{t:'Sečtení na výstupu',h:['M0','M15','Io'],x:R`<p>Šum M0 se chová jako šum vstupního proudu → zrcadlo ho zesílí 5× (výkon 25×). M1–M5 má každý vlastní nezávislý šum → výkony se sečtou (5×):</p>`,eq:[R`i_{no}=\sqrt{25i_n^2+5i_n^2}=5i_n\sqrt{1+\frac15}=5\cdot0{,}463\cdot10^{-12}\sqrt{1{,}2}=2{,}54\,\text{pA}/\sqrt{\text{Hz}}`],r:R`$i_{no}=2{,}54$ pA/√Hz`,m:R`Šum reference se násobí jako proud ($k^2i^2$), šum výstupních tranzistorů jen sčítáš ($k\cdot i^2$).`}
],
res:R`$g_m=12{,}94\,\mu$A/V, $i_n=0{,}463$ pA/√Hz, $i_{no}=2{,}54$ pA/√Hz`,tk:[[R`g_m=\sqrt{2I_Dk_p\frac WL}`,'T'],[R`i_n=\sqrt{4kTg_m}`,'+'],[R`4kT=1{,}656\cdot10^{-20}`,'+']]},

/* ================= 4.2 ================= */
{id:'4.2',ch:4,title:'Jednoduchý CMOS OZ: šum + A0, f0, fT, Sr',
task:R`Vypočítejte spektrální hustotu vstupního šumového napětí v oblasti bílého šumu. Vypočítejte integrální hodnotu vstupního šumového napětí v pásmu 10 Hz – 100 kHz, když lomová frekvence 1/f šumu je $f_K=4$ kHz. Vypočítejte $A_0$, $f_0$, $f_T$ a $S_r$ tohoto OZ.`,
pat:['nmos','nref','nint','oz'],
idea:R`Čtyři šumící tranzistory 1. stupně (2× NMOS vstup, 2× PMOS zrcadlo) pošlou šumové proudy do výstupního uzlu → sečti kvadraticky → vyděl $g_m$ vstupního NMOS.`,
parts:{Ri:{b:[9,17,6,14],c:'s',t:'Ri 380k'},M45:{b:[30,17,32,14],c:'o',t:'M4/M5 PMOS (gmP)'},M23:{b:[26,46,37,15],c:'r',t:'M2/M3 NMOS (gmN, vstup)'},M1:{b:[41,75,8,14],c:'s',t:'M1 → ISS'},rd:{n:[59,37.5],c:'b',t:'rd 2,73M'},Ck:{b:[69,65,7,14],c:'b',t:'Ck 20p'},Iss:{a:[[11.5,30],[11.5,92]],c:'s',t:'ISS'},It:{a:[[45.5,64],[45.5,92]],c:'s',t:'ISS'},Ia:{a:[[32.3,30],[32.3,62]],c:'r',t:'ISS/2'},Ib:{a:[[58.5,30],[58.5,62]],c:'r',t:'ISS/2'}},
steps:[
{t:'Klidové proudy',h:['Ri','Iss','M1','It','Ia','Ib'],eq:[R`I_{SS}=\frac{V_{CC}-V_{GS}}{R_i}=\frac{5-1{,}2}{380\cdot10^3}=10\,\mu\text{A}`],x:R`<p>Každá větev vede $I_{SS}/2$.</p>`},
{t:'gm vstupu a zátěže',h:['M23','M45'],x:R`<p>$g_m=\sqrt{2I_Dk_pW/L}$ s $I_D=I_{SS}/2$ dá $\sqrt{I_{SS}k_pW/L}$:</p>`,eq:[R`g_{mN}=\sqrt{10\cdot10^{-6}\cdot67\cdot10^{-6}\cdot\tfrac{80}{10}}=73{,}2\,\mu\text{A/V}`,R`g_{mP}=\sqrt{10\cdot10^{-6}\cdot27\cdot10^{-6}\cdot\tfrac{10}{5}}=23{,}24\,\mu\text{A/V}`]},
{t:'Šumové proudy',h:['M23','M45'],eq:[R`i_{nN}=\sqrt{4kTg_{mN}}=1{,}1\,\text{pA}/\sqrt{\text{Hz}},\quad i_{nP}=\sqrt{4kTg_{mP}}=0{,}62\,\text{pA}/\sqrt{\text{Hz}}`,R`i_{nT}=\sqrt{2i_{nN}^2+2i_{nP}^2}=10^{-12}\sqrt{2\cdot1{,}1^2+2\cdot0{,}62^2}=1{,}79\,\text{pA}/\sqrt{\text{Hz}}`]},
{t:'Přepočet na vstup',h:['M23','rd'],x:R`<p>Šumový proud ve výstupním uzlu odpovídá vstupnímu napětí $i/g_{mN}$:</p>`,eq:[R`v_{ni}=\frac{i_{nT}}{g_{mN}}=\frac{1{,}79\cdot10^{-12}}{73{,}2\cdot10^{-6}}=24{,}45\,\text{nV}/\sqrt{\text{Hz}}`],r:R`$v_{ni}=24{,}45$ nV/√Hz`,m:R`Šum = proudy do výstupního uzlu → kvadraticky → děleno $g_m$ vstupu.`},
{t:'Integrální šum v pásmu',x:R`<p>Spektrum $v_{ni}^2(1+f_K/f)$ zintegrované od $f_1$ do $f_2$ (sbírka zanedbá $f_1$ proti $f_2$):</p>`,g:[R`V_{Ni}=v_{ni}\sqrt{f_2+f_K\ln\frac{f_2}{f_1}}`],eq:[R`V_{Ni}=24{,}45\cdot10^{-9}\sqrt{100\cdot10^3+4\cdot10^3\ln\frac{100\cdot10^3}{10}}=9\,\mu\text{V}`],r:R`$V_{Ni}=9\,\mu$V`},
{t:'A0, f0, fT, Sr',h:['rd','Ck','It'],eq:[R`A_0=g_{mN}r_d=73{,}2\cdot10^{-6}\cdot2{,}73\cdot10^6=200`,R`f_0=\frac{1}{2\pi r_dC_K}=\frac{1}{2\pi\cdot2{,}73\cdot10^6\cdot20\cdot10^{-12}}=2915\,\text{Hz}`,R`f_T=A_0f_0=583\,\text{kHz},\quad S_r=\frac{I_{SS}}{C_K}=0{,}5\,\text{V}/\mu\text{s}`]}
],
res:R`$v_{ni}=24{,}45$ nV/√Hz, $V_{Ni}=9\,\mu$V, $A_0=200$, $f_0=2915$ Hz, $f_T=583$ kHz, $S_r=0{,}5$ V/µs`,tk:[[R`i_n=\sqrt{4kTg_m}`,'+'],[R`v_{ni}=\frac{\sqrt{\sum i^2}}{g_m}`,'+'],[R`V_N=v_n\sqrt{f_2+f_K\ln\frac{f_2}{f_1}}`,'+'],[R`g_m=\sqrt{I_{SS}k_p\frac WL}`,'d']]},

/* ================= 4.3 ================= */
{id:'4.3',ch:4,title:'CMOS napěťový sledovač: šum + parametry',
task:R`Vypočítejte vstupní/výstupní šumové napětí $v_{ni}$ (spektrální hustotu v oblasti bílého šumu) tohoto napěťového sledovače. Tranzistory MA, MB, MC a MD jsou v silné inverzi. Spočítejte integrální hodnotu $V_{Ni}$ v pásmu 10 Hz – 100 kHz pro $f_k=3$ kHz. Spočítejte $A_0$, $f_0$, $f_T$ a $S_r$. $k_{pp}=27\,\mu$A/V², $k_{pn}=67\,\mu$A/V².`,
pat:['nmos','nref','nint','oz','mir'],
idea:R`Stejný postup jako 4.2. Jen tail je $4\times$ proud $R_i$ (M1–M4 jsou čtyři kopie M0). Sledovač má zisk 1 → vstupní šum = výstupní šum.`,
parts:{Ri:{b:[19,19,5,14],c:'s',t:'Ri 370k'},MCD:{b:[40,17,23,15],c:'o',t:'MC/MD PMOS'},MAB:{b:[38,42,26,14],c:'r',t:'MA/MB NMOS (vstup)'},M14:{b:[37,71,30,16],c:'s',t:'M1–M4 → ISS = 4·IRi'},rd:{n:[60.5,38.5],c:'b',t:'rd 7,5M'},Ck:{b:[73,59,6,14],c:'b',t:'Ck 40p'},IRi:{a:[[21,33],[21,95]],c:'s',t:'IRi'},It:{a:[[52,58],[52,70]],c:'s',t:'ISS'},Ia:{a:[[43,33],[43,57]],c:'r',t:'ISS/2'},Ib:{a:[[60.5,40],[60.5,57]],c:'r',t:'ISS/2'}},
steps:[
{t:'Tail proud',h:['Ri','IRi','M14','It'],eq:[R`I_{SS}=4\frac{V_{CC}-V_{GS}}{R_i}=4\cdot\frac{5-1{,}3}{370\cdot10^3}=40\,\mu\text{A}`]},
{t:'gm',h:['MAB','MCD','Ia','Ib'],eq:[R`g_{mn}=\sqrt{2\frac{I_{SS}}{2}k_{pn}\frac WL}=\sqrt{40\cdot10^{-6}\cdot67\cdot10^{-6}\cdot\tfrac{100}{15}}=133{,}7\,\mu\text{A/V}`,R`g_{mp}=\sqrt{40\cdot10^{-6}\cdot27\cdot10^{-6}\cdot\tfrac{30}{10}}=56{,}92\,\mu\text{A/V}`]},
{t:'Šum',h:['MAB','MCD'],eq:[R`i_n=\sqrt{4kTg_{mn}}=1{,}49\,\text{pA},\quad i_p=\sqrt{4kTg_{mp}}=0{,}97\,\text{pA}`,R`i_{nT}=\sqrt{2i_n^2+2i_p^2}=2{,}51\,\text{pA}/\sqrt{\text{Hz}}`,R`v_{ni}=\frac{i_{nT}}{g_{mn}}=\frac{2{,}51\cdot10^{-12}}{133{,}7\cdot10^{-6}}=18{,}77\,\text{nV}/\sqrt{\text{Hz}}`],r:R`$v_{ni}=18{,}77$ nV/√Hz`},
{t:'Integrální šum',eq:[R`V_{Ni}=18{,}77\cdot10^{-9}\sqrt{100\cdot10^3+3\cdot10^3\ln\frac{100\cdot10^3}{10}}=6{,}7\,\mu\text{V}`],r:R`$V_{Ni}=6{,}7\,\mu$V`},
{t:'A0, f0, fT, Sr',h:['rd','Ck'],eq:[R`A_0=g_{mn}r_d=133{,}7\cdot10^{-6}\cdot7{,}5\cdot10^6=1000`,R`f_0=\frac{1}{2\pi r_dC_k}=530\,\text{Hz},\quad f_T=530\,\text{kHz},\quad S_r=\frac{I_{SS}}{C_k}=\frac{40\,\mu}{40\,\text{p}}=1\,\text{V}/\mu\text{s}`]}
],
res:R`$v_{ni}=18{,}77$ nV/√Hz, $V_{Ni}=6{,}7\,\mu$V, $A_0=1000$, $f_0=530$ Hz, $f_T=530$ kHz, $S_r=1$ V/µs`,tk:[[R`i_n=\sqrt{4kTg_m}`,'+'],[R`V_N=v_n\sqrt{f_2+f_K\ln\frac{f_2}{f_1}}`,'+']]},

/* ================= 4.4 ================= */
{id:'4.4',ch:4,title:'Vstup ve slabé inverzi: vni',
task:R`Vypočítejte hodnotu spektrální hustoty vstupního šumového napětí $v_{ni}$ v oblasti bílého šumu. Předpokládejte, že hodnota šumového proudu referenčního zdroje proudu $I_{REF}$ je nulová.`,
pat:['nmos','nref','mir'],
idea:R`Vstupní pár M4/M5 je ve slabé inverzi ($g_m=I/(nV_T)$), zrcadla jsou v silné inverzi. Spočítej šumový proud každé skupiny, sečti se zadanými váhami, vyděl $g_{mW}$.`,
parts:{Iref:{b:[11,43,6,14],c:'s',t:'Iref 4µA'},M0:{b:[11,12,8,15],c:'o',t:'M0 PMOS'},M6:{b:[61,12,8,15],c:'o',t:'M6 PMOS'},M1:{b:[11,76,8,15],c:'g',t:'M1 NMOS'},M23:{b:[51,74,16,16],c:'g',t:'M2/M3 NMOS'},M45:{b:[42,38,34,21],c:'r',t:'M4/M5 slabá inverze n=2'},Ck:{b:[74,53,6,16],c:'b',t:'Ck 5p'},Ir:{a:[[12.8,30],[12.8,96]],c:'s',t:'Iref'}},
steps:[
{t:'gm vstupního páru (slabá inverze)',h:['M45','M23','Iref'],x:R`<p>Sbírka bere transkonduktanci ve tvaru „poloviny diferenciálního stupně“ z taháku ($I_{SS}/(4nV_T)$) s tailem $I_{SS}=2I_{REF}$:</p>`,eq:[R`g_{mW}=\frac{2I_{REF}}{4nV_T}=\frac{2\cdot4\cdot10^{-6}}{4\cdot2\cdot26\cdot10^{-3}}=38{,}5\,\mu\text{A/V}`],x2:''},
{t:'Šum jednotlivých skupin',h:['M45','M1','M23','M0','M6'],eq:[R`i_{nW}=\sqrt{4kTg_{mW}}=0{,}8\,\text{pA}`,R`g_{mN}=\sqrt{2I_{REF}k_{pn}\tfrac WL}=\sqrt{2\cdot4\,\mu\cdot67\,\mu\cdot\tfrac{10}{8}}=25{,}9\,\mu\text{A/V}\Rightarrow i_{nN}=0{,}65\,\text{pA}`,R`g_{mP}=\sqrt{2I_{REF}k_{p}\tfrac WL}=\sqrt{2\cdot4\,\mu\cdot27\,\mu\cdot\tfrac{5}{15}}=8{,}48\,\mu\text{A/V}\Rightarrow i_{nP}=0{,}38\,\text{pA}`]},
{t:'Součet a přepočet na vstup',h:['M45'],eq:[R`i_{nT}=\sqrt{\frac{i_{nW}^2}{2}+\frac{6i_{nN}^2}{4}+2i_{nP}^2}=10^{-12}\sqrt{\frac{0{,}8^2}{2}+\frac{6\cdot0{,}65^2}{4}+2\cdot0{,}38^2}=1{,}115\,\text{pA}/\sqrt{\text{Hz}}`,R`v_{ni}=\frac{i_{nT}}{g_{mW}}=\frac{1{,}115\cdot10^{-12}}{38{,}5\cdot10^{-6}}=29\,\text{nV}/\sqrt{\text{Hz}}`],r:R`$v_{ni}=29$ nV/√Hz`,w:R`Váhy 1/2, 6/4 a 2 v součtu jsou převzaté ze sbírky — odrážejí, jak se šum zrcadel M1–M3 (NMOS) a M0/M6 (PMOS) přenáší do páru. Zapamatuj si postup tak, jak je, a na cvičení se doptej, odkud váhy pocházejí.`}
],
res:R`$g_{mW}=38{,}5\,\mu$A/V, $i_{nT}=1{,}115$ pA/√Hz, $v_{ni}=29$ nV/√Hz`,tk:[[R`g_m=\frac{I_D}{nV_T}`,'T'],[R`i_n=\sqrt{4kTg_m}`,'+']]},

/* ================= 4.5 ================= */
{id:'4.5',ch:4,title:'Dvoustupňový CMOS OZ: parametry + šum',
task:R`Vypočítejte $A_0$, $f_0$, $f_T$ a $S_r$ tohoto OZ. Vypočítejte spektrální hustotu vstupního šumového napětí v oblasti bílého šumu a integrální hodnotu v pásmu 10 Hz – 100 kHz, když $f_K=8$ kHz.`,
pat:['oz','nmos','nref','nint'],
idea:R`Vstupní pár PMOS (M4/M5), zátěž NMOS (M6/M7), 2. stupeň M8 se $3I_{Ri}$. Šum 2. stupně se na vstup dělí $A_1$ → zanedbatelný.`,
parts:{Ri:{b:[15,9,5,12],c:'s',t:'Ri 1M'},M45:{b:[36,33,21,14],c:'r',t:'M4/M5 PMOS (vstup, gmP)'},M67:{b:[38,76,17,14],c:'g',t:'M6/M7 NMOS (gmN)'},M8:{b:[66,53,8,13],c:'b',t:'M8 (gmM, 3·IRi)'},rd1:{n:[39.5,60],c:'r',t:'rd1 8,4M'},rd2:{n:[71.5,34],c:'b',t:'rd2 1,2M'},Ck:{b:[60,47,11,6],c:'o',t:'Ck 10p'},IRi:{a:[[17.5,20],[17.5,92]],c:'s',t:'IRi'},It:{a:[[46.5,20],[46.5,32]],c:'r',t:'IRi'},I3:{a:[[71.5,22],[71.5,92]],c:'b',t:'3·IRi'}},
steps:[
{t:'Proudy a gm',h:['Ri','IRi','It','I3','M45','M67','M8'],eq:[R`I_{Ri}=\frac{5-1}{1\cdot10^6}=4\,\mu\text{A}`,R`g_{mP}=\sqrt{I_{Ri}k_{pp}\tfrac WL}=\sqrt{4\,\mu\cdot27\,\mu\cdot\tfrac{90}{3}}=56{,}92\,\mu\text{A/V}`,R`g_{mN}=\sqrt{I_{Ri}k_{pn}\tfrac WL}=\sqrt{4\,\mu\cdot67\,\mu\cdot\tfrac{20}{2}}=51{,}77\,\mu\text{A/V}`,R`g_{mM}=\sqrt{2\cdot3I_{Ri}k_{pn}\tfrac WL}=\sqrt{6\cdot4\,\mu\cdot67\,\mu\cdot40}=253{,}6\,\mu\text{A/V}`]},
{t:'Zesílení a kmitočty',h:['rd1','rd2','Ck','M8'],eq:[R`A_1=g_{mP}r_{d1}=478,\quad A_2=g_{mM}r_{d2}=304,\quad A_0=145\,312`,R`f_0=\frac{1}{2\pi r_{d1}A_2C_k}=\frac{1}{2\pi\cdot8{,}4\cdot10^6\cdot304\cdot10\cdot10^{-12}}=6{,}2\,\text{Hz}`,R`f_T=A_0f_0=901\,\text{kHz},\quad S_r=\frac{I_{Ri}}{C_k}=0{,}4\,\text{V}/\mu\text{s}`]},
{t:'Šum 1. stupně',h:['M45','M67'],eq:[R`i_{nP}=\sqrt{4kTg_{mP}}=0{,}97\,\text{pA},\quad i_{nN}=\sqrt{4kTg_{mN}}=0{,}93\,\text{pA}`,R`i_{nT}=\sqrt{2i_{nP}^2+2i_{nN}^2}=1{,}9\,\text{pA}/\sqrt{\text{Hz}}`,R`v_{ni}=\frac{i_{nT}}{g_{mP}}=\frac{1{,}9\cdot10^{-12}}{56{,}92\cdot10^{-6}}=33{,}4\,\text{nV}/\sqrt{\text{Hz}}`]},
{t:'Šum 2. stupně je zanedbatelný',h:['M8'],eq:[R`v_{ni2}=\frac{\sqrt{4kTg_{mM}}}{g_{mM}}=\frac{2{,}05\cdot10^{-12}}{253{,}6\cdot10^{-6}}=8{,}12\,\text{nV}/\sqrt{\text{Hz}}`,R`v_{ni(v_{ni2})}=\frac{v_{ni2}}{A_1}=\frac{8{,}12\,\text{n}}{478}=17\,\text{pV}/\sqrt{\text{Hz}}`],m:R`Šum druhého stupně se na vstup dělí ziskem prvního stupně → skoro vždy zanedbatelný.`},
{t:'Integrální šum',eq:[R`V_{Ni}=33{,}4\cdot10^{-9}\sqrt{100\cdot10^3+8\cdot10^3\ln\frac{100\cdot10^3}{10}}=13{,}92\,\mu\text{V}`],r:R`$V_{Ni}=13{,}92\,\mu$V`}
],
res:R`$A_0=145\,312$, $f_0=6{,}2$ Hz, $f_T=901$ kHz, $S_r=0{,}4$ V/µs, $v_{ni}=33{,}4$ nV/√Hz, $V_{Ni}=13{,}92\,\mu$V`,tk:[[R`v_{ni(2)}=\frac{v_{n2}}{A_1}`,'+'],[R`f_0=\frac{1}{2\pi r_dAC}`,'T']]},

/* ================= 4.6 ================= */
{id:'4.6',ch:4,title:'Šumový proud zrcadla s BJT zdrojem',
task:R`Vypočítejte spektrální hustotu výstupního šumového proudu $i_{no}$ v oblasti bílého šumu. Vypočítejte integrální hodnotu $I_N$ v pásmu 10 Hz – 100 kHz, $f_k=10$ kHz. MOS tranzistory jsou v silné inverzi. Zanedbejte šumový proud daný bázovým odporem bipolárního tranzistoru.`,
pat:['nbjt','nmos','nint','mir'],
idea:R`Tři nezávislé zdroje: výstřelový šum kolektorového proudu Q0 (projde zrcadlem 1:1) a tepelný šum M0 a M1.`,
parts:{M0:{b:[35,16,12,17],c:'o',t:'M0 (dioda)'},M1:{b:[53,16,12,17],c:'o',t:'M1'},Q0:{b:[28,64,12,18],c:'r',t:'Q0 (Io 5µA)'},Io:{a:[[38.5,38],[38.5,63]],c:'r',t:'Io'},Iout:{a:[[63,33],[63,51],[80,51]],c:'b',t:'iout'}},
steps:[
{t:'Výstřelový šum Q0',h:['Q0','Io'],g:[R`i_{nQ}=\sqrt{2qI_O}`],eq:[R`i_{nQ}=\sqrt{2\cdot1{,}602\cdot10^{-19}\cdot5\cdot10^{-6}}=1{,}27\,\text{pA}/\sqrt{\text{Hz}}`]},
{t:'Tepelný šum M0, M1',h:['M0','M1'],eq:[R`g_{mp}=\sqrt{2I_Ok_p\tfrac WL}=\sqrt{2\cdot5\,\mu\cdot27\,\mu\cdot\tfrac{30}{4}}=45\,\mu\text{A/V}`,R`i_{nP}=\sqrt{4kTg_{mp}}=0{,}86\,\text{pA}/\sqrt{\text{Hz}}`]},
{t:'Výstupní šum',h:['Q0','M0','M1','Iout'],x:R`<p>Zrcadlo 1:1 → šum Q0 a M0 přejde na výstup beze změny, M1 přidá svůj:</p>`,eq:[R`i_{no}=\sqrt{i_{nQ}^2+2i_{nP}^2}=10^{-12}\sqrt{1{,}27^2+2\cdot0{,}86^2}=1{,}76\,\text{pA}/\sqrt{\text{Hz}}`],r:R`$i_{no}=1{,}76$ pA/√Hz`},
{t:'Integrální hodnota',eq:[R`I_N=i_{no}\sqrt{f_2+f_K\ln\frac{f_2}{f_1}}=1{,}76\cdot10^{-12}\sqrt{100\cdot10^3+10\cdot10^3\ln10^4}=771{,}4\,\text{pA}`],r:R`$I_N=771{,}4$ pA`}
],
res:R`$i_{no}=1{,}76$ pA/√Hz, $I_N=771{,}4$ pA`,tk:[[R`i_n=\sqrt{2qI}`,'+'],[R`i_n=\sqrt{4kTg_m}`,'+']]},

/* ================= 4.7 ================= */
{id:'4.7',ch:4,title:'BJT pár s Rc: vni (rezistory + tranzistory)',
task:R`Vypočítejte vstupní šumové napětí $v_{ni}$ tohoto OZ. Zanedbejte šum bázových odporů NPN tranzistorů a vstupní šum druhého stupně. Počítejte se šumem kolektorových odporů $R_C$. Předpokládejte „nekonečnou“ hodnotu $A_2$.`,
pat:['nbjt','nR','nref'],
idea:R`Dva zdroje: šum dvou $R_C$ (na vstup dělíš ziskem $A_1=g_mR_C$) a výstřelový šum dvou tranzistorů (na vstup dělíš $g_m$).`,
parts:{Ri:{b:[24,7,6,13],c:'s',t:'Ri 2M'},Rc1:{b:[35,7,6,13],c:'o',t:'Rc 52k'},Rc2:{b:[54,7,6,13],c:'o',t:'Rc 52k'},Q01:{b:[31,45,30,15],c:'r',t:'Q0/Q1'},M01:{b:[25,74,26,18],c:'s',t:'M0 → M1 (ISS)'},A2:{b:[69,22,14,24],c:'s',t:'A2 (→ ∞)'},vni:{b:[18,48,7,9],c:'g',t:'vni = ?'},Iss:{a:[[26.5,20],[26.5,73]],c:'s',t:'ISS'},I1:{a:[[37.4,20],[37.4,62]],c:'r',t:'ISS/2'},I2:{a:[[56,20],[56,62]],c:'r',t:'ISS/2'}},
steps:[
{t:'Proud, gm a zisk',h:['Ri','Iss','M01','Q01','Rc1','Rc2'],eq:[R`I_{SS}=\frac{5-1}{2\cdot10^6}=2\,\mu\text{A},\quad g_m=\frac{I_{SS}}{2V_T}=38{,}46\,\mu\text{A/V}`,R`A=g_mR_C=38{,}46\cdot10^{-6}\cdot52\cdot10^3=2`],w:R`Sbírka má v (4.61) překlep $10^{-3}$ místo $10^{-6}$; výsledek A = 2 je správně.`},
{t:'Šum rezistorů',h:['Rc1','Rc2'],eq:[R`v_{nR}=\sqrt{4kTR_C}=\sqrt{4\cdot1{,}38\cdot10^{-23}\cdot300\cdot52\cdot10^3}=29{,}35\,\text{nV}/\sqrt{\text{Hz}}`,R`v_{ni(R)}=\sqrt{2\left(\frac{v_{nR}}{A}\right)^2}=\sqrt2\cdot\frac{29{,}35}{2}=20{,}75\,\text{nV}/\sqrt{\text{Hz}}`],x:R`<p>Dva rezistory, každý na vstup děleno $A$.</p>`},
{t:'Šum tranzistorů',h:['Q01','I1','I2'],eq:[R`i_{nQ}=\sqrt{2q\frac{I_{SS}}{2}}=0{,}566\,\text{pA}/\sqrt{\text{Hz}}`,R`v_{ni(Q)}=\sqrt2\frac{i_{nQ}}{g_m}=\sqrt2\frac{0{,}566\cdot10^{-12}}{38{,}46\cdot10^{-6}}=20{,}81\,\text{nV}/\sqrt{\text{Hz}}`]},
{t:'Celkem',h:['vni'],eq:[R`v_{ni}=\sqrt{v_{ni(R)}^2+v_{ni(Q)}^2}=10^{-9}\sqrt{20{,}75^2+20{,}81^2}=29{,}39\,\text{nV}/\sqrt{\text{Hz}}`],r:R`$v_{ni}=29{,}39$ nV/√Hz`}
],
res:R`$A=2$, $v_{ni(R)}=20{,}75$, $v_{ni(Q)}=20{,}81$, $v_{ni}=29{,}39$ nV/√Hz`,tk:[[R`v_{nR}=\sqrt{4kTR}`,'+'],[R`i_n=\sqrt{2qI}`,'+']]},

/* ================= 4.8 ================= */
{id:'4.8',ch:4,title:'BJT pár s Rc + šum 2. stupně',
task:R`Vypočítejte spektrální hustotu vstupního šumového napětí $v_{ni}$ v oblasti bílého šumu. Zanedbejte šum bázových odporů Q0 a Q1. Vypočítejte $V_{Ni}$ v pásmu 10 Hz – 100 kHz, když kmitočet kolena 1/f šumu je $f_K=12$ kHz.`,
pat:['nbjt','nR','nref','nint'],
idea:R`Jako 4.7, plus třetí složka: šum druhého stupně $v_{ni2}=40$ nV/√Hz vydělený ziskem $A=2$.`,
parts:{Ri:{b:[25,8,5,13],c:'s',t:'Ri 2M'},Rc1:{b:[35,8,6,13],c:'o',t:'Rc 52k'},Rc2:{b:[54,8,6,13],c:'o',t:'Rc 52k'},Q01:{b:[32,46,30,14],c:'r',t:'Q0/Q1'},M01:{b:[25,74,26,18],c:'s',t:'M0 → M1'},A2:{b:[69,23,14,24],c:'s',t:'A2'},vni:{b:[19,49,6,8],c:'g',t:'vni = ?'},vn2:{b:[60,24,6,7],c:'p',t:'vni2 40nV'},I1:{a:[[37.4,20],[37.4,62]],c:'r',t:'ISS/2'},I2:{a:[[56,20],[56,62]],c:'r',t:'ISS/2'}},
steps:[
{t:'Stejné mezivýsledky jako 4.7',h:['Q01','Rc1','Rc2','I1','I2'],eq:[R`I_{SS}=2\,\mu\text{A},\;g_m=38{,}46\,\mu\text{A/V},\;A=2`,R`v_{ni(R)}=20{,}75\,\text{nV}/\sqrt{\text{Hz}},\quad v_{ni(Q)}=20{,}81\,\text{nV}/\sqrt{\text{Hz}}`]},
{t:'Šum 2. stupně na vstup',h:['vn2','A2'],eq:[R`v_{ni(v_{n2})}=\frac{v_{ni2}}{A}=\frac{40\cdot10^{-9}}{2}=20\,\text{nV}/\sqrt{\text{Hz}}`]},
{t:'Celkem a integrál',h:['vni'],eq:[R`v_{ni}=10^{-9}\sqrt{20{,}75^2+20^2+20{,}81^2}=35{,}55\,\text{nV}/\sqrt{\text{Hz}}`,R`V_{Ni}=35{,}55\cdot10^{-9}\sqrt{100\cdot10^3+12\cdot10^3\ln10^4}=16{,}3\,\mu\text{V}`],r:R`$v_{ni}=35{,}55$ nV/√Hz, $V_{Ni}=16{,}3\,\mu$V`,m:R`Malý zisk 1. stupně (A = 2) → šum 2. stupně už zanedbat nejde.`}
],
res:R`$v_{ni}=35{,}55$ nV/√Hz, $V_{Ni}=16{,}3\,\mu$V`,tk:[[R`v_{ni(2)}=\frac{v_{n2}}{A_1}`,'+'],[R`V_N=v_n\sqrt{f_2+f_K\ln\frac{f_2}{f_1}}`,'+']]},

/* ================= 4.9 ================= */
{id:'4.9',ch:4,title:'Bipolární OZ: vni, A0, f0, fT, Sr',
task:R`Spočítejte spektrální hustotu vstupního šumového napětí v oblasti bílého šumu. Zanedbejte šum bázových odporů. Určete DC zisk $A_0$, kmitočet dominantního pólu $f_0$, šířku pásma $f_T$ a rychlost přeběhu $S_r$ tohoto jednoduchého OZ.`,
pat:['nbjt','nref','oz'],
idea:R`Čtyři BJT v prvním stupni (vstup Q2/Q3, zátěž Q4/Q5) vedou stejný proud $I_{SS}/2$ → každý má stejný výstřelový šum.`,
parts:{Ri:{b:[12,10,4,15],c:'s',t:'Ri 5,4M'},Q45:{b:[27,11,25,13],c:'o',t:'Q4/Q5 (zátěž)'},Q23:{b:[22,38,33,17],c:'r',t:'Q2/Q3 (vstup)'},Q01:{b:[12,74,30,16],c:'s',t:'Q0 → Q1 (ISS)'},rd:{n:[48.5,36],c:'b',t:'rd 70M'},Ck:{b:[61,62,6,13],c:'b',t:'Ck 10p'},Iss:{a:[[13.7,25],[13.7,96]],c:'s',t:'ISS'},It:{a:[[39,61],[39,73]],c:'s',t:'ISS'},Ia:{a:[[29.4,24],[29.4,60]],c:'r',t:'ISS/2'},Ib:{a:[[48.5,38],[48.5,60]],c:'r',t:'ISS/2'}},
steps:[
{t:'Proud a gm',h:['Ri','Iss','Q01','It'],eq:[R`I_{SS}=\frac{V_{CC}-V_{BE}}{R_i}=\frac{6-0{,}6}{5{,}4\cdot10^6}=1\,\mu\text{A},\quad g_m=\frac{I_{SS}}{2V_T}=19{,}23\,\mu\text{A/V}`]},
{t:'Šum',h:['Q23','Q45','Ia','Ib'],eq:[R`i_n=\sqrt{2q\frac{I_{SS}}{2}}=\sqrt{2\cdot1{,}602\cdot10^{-19}\cdot0{,}5\cdot10^{-6}}=0{,}4\,\text{pA}/\sqrt{\text{Hz}}`,R`v_{ni}=\frac{\sqrt{4i_n^2}}{g_m}=\frac{2\cdot0{,}4\cdot10^{-12}}{19{,}23\cdot10^{-6}}=41{,}6\,\text{nV}/\sqrt{\text{Hz}}`],r:R`$v_{ni}=41{,}6$ nV/√Hz`},
{t:'A0, f0, fT, Sr',h:['rd','Ck'],eq:[R`A_0=g_mr_d=19{,}23\cdot10^{-6}\cdot70\cdot10^6=1346`,R`f_0=\frac{1}{2\pi r_dC_K}=227\,\text{Hz},\quad f_T=A_0f_0=305{,}5\,\text{kHz},\quad S_r=\frac{I_{SS}}{C_K}=0{,}1\,\text{V}/\mu\text{s}`]}
],
res:R`$v_{ni}=41{,}6$ nV/√Hz, $A_0=1346$, $f_0=227$ Hz, $f_T=305{,}5$ kHz, $S_r=0{,}1$ V/µs`,tk:[[R`i_n=\sqrt{2qI}`,'+']]},

/* ================= 4.10 ================= */
{id:'4.10',ch:4,title:'Bipolární OZ: vni a VNi (10 Hz–10 kHz)',
task:R`Spočítejte spektrální hustotu vstupního šumového napětí v oblasti bílého šumu. Zanedbejte šum bázových odporů. Spočítejte integrální hodnotu v pásmu 10 Hz – 10 kHz, když $f_k=800$ Hz.`,
pat:['nbjt','nref','nint'],
idea:R`Totéž zapojení a čísla jako 4.9 → stejné $v_{ni}$; navíc integrál přes jiné pásmo.`,
parts:{Ri:{b:[22,10,5,16],c:'s',t:'Ri 5,3M'},Q45:{b:[35,12,23,12],c:'o',t:'Q4/Q5'},Q23:{b:[34,40,26,16],c:'r',t:'Q2/Q3'},Q01:{b:[22,74,28,16],c:'s',t:'Q0 → Q1'},Iss:{a:[[24.5,26],[24.5,96]],c:'s',t:'ISS'},It:{a:[[47,62],[47,75]],c:'s',t:'ISS'}},
steps:[
{t:'vni',h:['Ri','Iss','Q23','Q45','It'],eq:[R`I_{SS}=\frac{6-0{,}7}{5{,}3\cdot10^6}=1\,\mu\text{A},\;g_m=19{,}23\,\mu\text{A/V},\;i_n=\sqrt{2q\tfrac{I_{SS}}{2}}=0{,}4\,\text{pA}`,R`v_{ni}=\frac{\sqrt4\,i_n}{g_m}=41{,}6\,\text{nV}/\sqrt{\text{Hz}}`]},
{t:'Integrál',eq:[R`V_{Ni}=41{,}6\cdot10^{-9}\sqrt{10\cdot10^3+800\ln\frac{10\cdot10^3}{10}}=5{,}18\,\mu\text{V}`],r:R`$V_{Ni}=5{,}18\,\mu$V`}
],
res:R`$v_{ni}=41{,}6$ nV/√Hz, $V_{Ni}=5{,}18\,\mu$V`,tk:[[R`V_N=v_n\sqrt{f_2+f_K\ln\frac{f_2}{f_1}}`,'+']]},
/* ================= 4.11 ================= */
{id:'4.11',ch:4,title:'BJT sledovač s PMOS zátěží: vni, VNi',
task:R`Vypočítejte vstupní/výstupní šumové napětí $v_{ni}$ tohoto napěťového sledovače. MOS tranzistory jsou v silné inverzi. Zanedbejte šum bázových odporů NPN. Spočítejte $V_{Ni}$ v pásmu 10 Hz – 100 kHz pro $f_K=200$ Hz. $k_{pp}=27\,\mu$A/V² pro PMOS.`,
pat:['nbjt','nmos','nref','nint','mir'],
idea:R`Vstup BJT (výstřelový šum), zátěž PMOS (tepelný šum). Sečti 2+2 šumové proudy, vyděl $g_m$ bipolárního páru.`,
parts:{Ri:{b:[17,12,5,15],c:'s',t:'Ri 370k'},M34:{b:[38,12,25,14],c:'o',t:'M3/M4 PMOS (gmP)'},Q01:{b:[34,37,28,15],c:'r',t:'Q0/Q1 (vstup)'},M01:{b:[17,69,15,18],c:'s',t:'M0+M1 (2 jedn.)'},M2:{b:[45,69,7,18],c:'s',t:'M2 → ISS'},vni:{b:[23,41,8,10],c:'g',t:'vni = ?'},I2:{a:[[19,27],[19,96]],c:'s',t:'2·ISS'},It:{a:[[49,58],[49,70]],c:'s',t:'ISS'},Ia:{a:[[40,31],[40,57]],c:'r',t:'ISS/2'},Ib:{a:[[57.5,31],[57.5,57]],c:'r',t:'ISS/2'}},
steps:[
{t:'Tail proud',h:['Ri','I2','M01','M2','It'],x:R`<p>Proud $R_i$ teče diodami M0+M1 (2 jednotky), M2 (1 jednotka) z něj vezme polovinu:</p>`,eq:[R`I_{SS}=\frac{V_{CC}-V_{GS}}{2R_i}=\frac{5-1{,}3}{2\cdot370\cdot10^3}=5\,\mu\text{A}`],w:R`Sbírka ve vzorci píše $V_{BE}$, ale dosazuje $V_{GS}=1{,}3$ V — správně je $V_{GS}$.`},
{t:'Šumové proudy',h:['Q01','M34'],eq:[R`g_m=\frac{I_{SS}}{2V_T}=96{,}15\,\mu\text{A/V},\quad i_{nQ}=\sqrt{2q\tfrac{I_{SS}}{2}}=0{,}895\,\text{pA}`,R`g_{mP}=\sqrt{I_{SS}k_p\tfrac WL}=\sqrt{5\,\mu\cdot27\,\mu\cdot3}=20{,}1\,\mu\text{A/V},\quad i_{nP}=0{,}577\,\text{pA}`]},
{t:'vni a VNi',h:['vni'],eq:[R`v_{ni}=\frac{\sqrt{2i_{nQ}^2+2i_{nP}^2}}{g_m}=\frac{10^{-12}\sqrt{2\cdot0{,}895^2+2\cdot0{,}577^2}}{96{,}15\cdot10^{-6}}=15{,}66\,\text{nV}/\sqrt{\text{Hz}}`,R`V_{Ni}=15{,}66\cdot10^{-9}\sqrt{100\cdot10^3+200\ln10^4}=5\,\mu\text{V}`],r:R`$v_{ni}=15{,}66$ nV/√Hz, $V_{Ni}=5\,\mu$V`}
],
res:R`$I_{SS}=5\,\mu$A, $v_{ni}=15{,}66$ nV/√Hz, $V_{Ni}=5\,\mu$V`,tk:[[R`i_n=\sqrt{2qI}`,'+'],[R`i_n=\sqrt{4kTg_m}`,'+']]},

/* ================= 4.12 ================= */
{id:'4.12',ch:4,title:'BJT vstup + PMOS zátěž: vni',
task:R`Vypočítejte vstupní šumové napětí $v_{ni}$ (spektrální hustotu v oblasti bílého šumu) tohoto OZ. Zanedbejte šum bázových odporů NPN tranzistorů.`,
pat:['nbjt','nmos','nref'],
idea:R`Úplně stejný postup jako 4.11, jen jiná čísla.`,
parts:{Ri:{b:[11,17,5,14],c:'s',t:'Ri 2M'},M23:{b:[35,17,24,14],c:'o',t:'M2/M3 PMOS (gmP)'},Q01:{b:[31,46,30,15],c:'r',t:'Q0/Q1 (vstup)'},M0:{b:[11,76,10,16],c:'s',t:'M0'},M1:{b:[40,76,9,16],c:'s',t:'M1 → ISS'},vni:{b:[19,48,8,10],c:'g',t:'vni = ?'},Iss:{a:[[13,30],[13,96]],c:'s',t:'ISS'},It:{a:[[46,65],[46,75]],c:'s',t:'ISS'},Ia:{a:[[37,30],[37,64]],c:'r',t:'ISS/2'},Ib:{a:[[55,30],[55,64]],c:'r',t:'ISS/2'}},
steps:[
{t:'Proud a gm',h:['Ri','Iss','M0','M1','It','Q01'],eq:[R`I_{SS}=\frac{5-1}{2\cdot10^6}=2\,\mu\text{A},\quad g_m=\frac{I_{SS}}{2V_T}=38{,}46\,\mu\text{A/V}`]},
{t:'Šumové proudy',h:['Q01','M23'],eq:[R`i_{nQ}=\sqrt{2q\tfrac{I_{SS}}{2}}=0{,}566\,\text{pA}`,R`g_{mP}=\sqrt{I_{SS}k_{pp}\tfrac WL}=\sqrt{2\,\mu\cdot27\,\mu\cdot3}=12{,}7\,\mu\text{A/V},\quad i_{nP}=0{,}46\,\text{pA}`,R`i_{nT}=\sqrt{2i_{nQ}^2+2i_{nP}^2}=1{,}03\,\text{pA}/\sqrt{\text{Hz}}`]},
{t:'vni',h:['vni'],eq:[R`v_{ni}=\frac{i_{nT}}{g_m}=\frac{1{,}03\cdot10^{-12}}{38{,}46\cdot10^{-6}}=26{,}78\,\text{nV}/\sqrt{\text{Hz}}`],r:R`$v_{ni}=26{,}78$ nV/√Hz`}
],
res:R`$v_{ni}=26{,}78$ nV/√Hz`,tk:[[R`v_{ni}=\frac{\sqrt{\sum i^2}}{g_m}`,'+']]},

/* ================= 4.13 ================= */
{id:'4.13',ch:4,title:'Dvoustupňový OZ (BJT + NMOS): parametry a šum',
task:R`Vypočítejte $A_0$, $f_0$, $f_T$ a $S_r$ tohoto OZ. Vypočítejte spektrální hustotu vstupního šumového napětí v oblasti bílého šumu. Vypočítejte $V_{Ni}$ v pásmu 1 kHz – 10 kHz, když $f_K=800$ Hz. Zanedbejte šum bázového odporu bipolárních tranzistorů.`,
pat:['oz','nbjt','nref','nint'],
idea:R`Čtyři BJT v 1. stupni (vstup Q0/Q1, zátěž Q2/Q3) se stejným proudem. 2. stupeň M7 šumí taky, ale přes $A_1=500$ je to nic.`,
parts:{Ri:{b:[16,10,4,13],c:'s',t:'Ri 1M'},Q01:{b:[34,36,24,14],c:'r',t:'Q0/Q1 (vstup)'},Q23:{b:[37,77,19,15],c:'o',t:'Q2/Q3 (zátěž)'},M7:{b:[67,55,8,13],c:'b',t:'M7 (gmN, 3·IRi)'},rd1:{n:[39.5,62.5],c:'r',t:'rd1 6,5M'},rd2:{n:[71.5,35.5],c:'b',t:'rd2 1,2M'},Ck:{b:[60,49,12,6],c:'p',t:'Ck 12p'},vni:{b:[20,40,6,9],c:'g',t:'vni = ?'},IRi:{a:[[17.5,22],[17.5,96]],c:'s',t:'IRi'},It:{a:[[46.5,22],[46.5,33]],c:'r',t:'IRi'},I3:{a:[[71.5,23],[71.5,96]],c:'b',t:'3·IRi'}},
steps:[
{t:'Proudy a gm',h:['Ri','IRi','It','I3','Q01','M7'],eq:[R`I_{Ri}=4\,\mu\text{A},\quad g_{mDif}=\frac{I_{Ri}}{2V_T}=76{,}92\,\mu\text{A/V}`,R`g_{mN}=\sqrt{2\cdot3I_{Ri}k_p\tfrac WL}=\sqrt{6\cdot4\,\mu\cdot67\,\mu\cdot40}=253{,}6\,\mu\text{A/V}`]},
{t:'A0, f0, fT, Sr',h:['rd1','rd2','Ck'],eq:[R`A_1=g_{mDif}r_{d1}=500,\quad A_2=g_{mN}r_{d2}=304,\quad A_0=152\,000`,R`f_0=\frac{1}{2\pi r_{d1}A_2C_k}=\frac{1}{2\pi\cdot6{,}5\cdot10^6\cdot304\cdot12\cdot10^{-12}}=6{,}7\,\text{Hz}`,R`f_T=A_0f_0=1{,}02\,\text{MHz},\quad S_r=\frac{I_{Ri}}{C_k}=0{,}333\,\text{V}/\mu\text{s}`]},
{t:'Šum 1. stupně',h:['Q01','Q23'],eq:[R`i_{nQ}=\sqrt{2q\tfrac{I_{Ri}}{2}}=0{,}8\,\text{pA},\quad i_{nT}=\sqrt{4i_{nQ}^2}=1{,}6\,\text{pA}/\sqrt{\text{Hz}}`,R`v_{ni}=\frac{i_{nT}}{g_{mDif}}=20{,}8\,\text{nV}/\sqrt{\text{Hz}}`],r:R`$v_{ni}=20{,}8$ nV/√Hz`},
{t:'Šum 2. stupně (zanedbatelný)',h:['M7'],eq:[R`v_{ni2}=\frac{\sqrt{4kTg_{mN}}}{g_{mN}}=8{,}12\,\text{nV},\quad\frac{v_{ni2}}{A_1}=16{,}24\,\text{pV}/\sqrt{\text{Hz}}`]},
{t:'Integrál 1 kHz – 10 kHz',eq:[R`V_{Ni}=20{,}8\cdot10^{-9}\sqrt{10\cdot10^3+800\ln\frac{10\cdot10^3}{1\cdot10^3}}=2{,}26\,\mu\text{V}`],r:R`$V_{Ni}=2{,}26\,\mu$V`,w:R`Sbírka zanedbává $f_1$ proti $f_2$. Tady $f_1=1$ kHz už není zanedbatelné: přesně $\sqrt{f_2-f_1+\dots}$ dá ≈ 2,17 µV. U zkoušky počítej jako sbírka, ale věz, odkud rozdíl je.`}
],
res:R`$A_0=152\,000$, $f_0=6{,}7$ Hz, $f_T=1{,}02$ MHz, $S_r=0{,}333$ V/µs, $v_{ni}=20{,}8$ nV/√Hz, $V_{Ni}=2{,}26\,\mu$V`,tk:[[R`V_N=v_n\sqrt{f_2-f_1+f_K\ln\frac{f_2}{f_1}}`,'+']]},

/* ================= 4.14 ================= */
{id:'4.14',ch:4,title:'BJT pár s rb: vni, VNi, A0, f0, fT, Sr',
task:R`Vypočítejte $v_{ni}$ v oblasti bílého šumu a $V_{Ni}$ v pásmu 1 Hz – 100 kHz pro $f_K=2$ kHz. Bázový odpor bipolárních tranzistorů je 750 Ω. Vypočítejte $A_0$, $f_0$, $f_T$ a $S_r$.`,
pat:['nbjt','nmos','nref','nint','oz'],
idea:R`Vstupní BJT teď šumí napěťově i přes $r_b$: $v_n^2=4kT(r_b+1/(2g_m))$. K tomu šum PMOS zátěže přepočtený přes $g_m$.`,
parts:{Ri:{b:[10,17,5,15],c:'s',t:'Ri 200k'},M34:{b:[33,16,25,15],c:'o',t:'M3/M4 PMOS (gmP)'},Q01:{b:[29,45,30,17],c:'r',t:'Q0/Q1 (rb 750Ω)'},M01:{b:[10,74,17,18],c:'s',t:'M0+M1'},M2:{b:[39,74,8,18],c:'s',t:'M2 → ISS'},rd:{n:[51.5,39],c:'b',t:'rd 8M'},Ck:{b:[63,65,6,15],c:'b',t:'Ck 20p'},vni:{b:[17,49,8,10],c:'g',t:'vni = ?'},I2:{a:[[11.6,31],[11.6,96]],c:'s',t:'2·ISS'},It:{a:[[43,65],[43,75]],c:'s',t:'ISS'},Ia:{a:[[34,30],[34,64]],c:'r',t:'ISS/2'},Ib:{a:[[51.5,42],[51.5,64]],c:'r',t:'ISS/2'}},
steps:[
{t:'Proud a gm',h:['Ri','I2','M01','M2','It','Q01'],eq:[R`I_{SS}=\frac{5-1}{2\cdot200\cdot10^3}=10\,\mu\text{A},\quad g_m=\frac{I_{SS}}{2V_T}=192{,}3\,\mu\text{A/V}`]},
{t:'Napěťový šum BJT páru s rb',h:['Q01'],x:R`<p>Jeden tranzistor: $v_n^2=4kTr_b+\frac{2qI_C}{g_m^2}=4kT\left(r_b+\frac{1}{2g_m}\right)$, a $\frac{1}{2g_m}=\frac{V_T}{2I_C}=\frac{V_T}{I_{SS}}$. Dva tranzistory → $\sqrt2$:</p>`,eq:[R`v_{ni(Q)}=\sqrt2\sqrt{4kT\left(r_b+\frac{V_T}{I_{SS}}\right)}=\sqrt{8\cdot1{,}38\cdot10^{-23}\cdot300\left(750+\frac{26\cdot10^{-3}}{10\cdot10^{-6}}\right)}=10{,}54\,\text{nV}/\sqrt{\text{Hz}}`]},
{t:'Šum PMOS zátěže',h:['M34'],eq:[R`g_{mP}=\sqrt{I_{SS}k_{pp}\tfrac WL}=\sqrt{10\,\mu\cdot27\,\mu\cdot40}=104\,\mu\text{A/V},\quad i_{nP}=1{,}31\,\text{pA}`,R`v_{ni(P)}=\frac{\sqrt2\,i_{nP}}{g_m}=\frac{\sqrt2\cdot1{,}31\cdot10^{-12}}{192{,}3\cdot10^{-6}}=9{,}63\,\text{nV}/\sqrt{\text{Hz}}`]},
{t:'Celkem a integrál',h:['vni'],eq:[R`v_{ni}=10^{-9}\sqrt{10{,}54^2+9{,}63^2}=14{,}28\,\text{nV}/\sqrt{\text{Hz}}`,R`V_{Ni}=14{,}28\cdot10^{-9}\sqrt{100\cdot10^3+2\cdot10^3\ln\frac{100\cdot10^3}{1}}=5\,\mu\text{V}`],r:R`$v_{ni}=14{,}28$ nV/√Hz, $V_{Ni}=5\,\mu$V`},
{t:'A0, f0, fT, Sr',h:['rd','Ck'],eq:[R`A_0=g_mr_d=1538,\quad f_0=\frac{1}{2\pi r_dC_K}=994\,\text{Hz},\quad f_T=1{,}53\,\text{MHz},\quad S_r=\frac{I_{SS}}{C_K}=0{,}5\,\text{V}/\mu\text{s}`]}
],
res:R`$v_{ni}=14{,}28$ nV/√Hz, $V_{Ni}=5\,\mu$V, $A_0=1538$, $f_0=994$ Hz, $f_T=1{,}53$ MHz, $S_r=0{,}5$ V/µs`,tk:[[R`v_{ni(Q)}=\sqrt2\sqrt{4kT\left(r_b+\frac{V_T}{I_{SS}}\right)}`,'+']]},

/* ================= 4.15 ================= */
{id:'4.15',ch:4,title:'Napěťový sledovač s PTAT biasem a rb: vni',
task:R`Vypočítejte vstupní šumové napětí $v_{ni}$ (jeho spektrální hustotu v oblasti bílého šumu) tohoto napěťového sledovače.`,
pat:['nbjt','nmos','nref','ptat'],
idea:R`Bias z PTAT jádra (N = 2), pak stejné vzorce jako 4.14. $g_{mP}$ zátěže je zadané přímo.`,
parts:{Rs:{b:[34,12,6,13],c:'s',t:'Rs 4,5k'},core:{b:[16,25,22,37],c:'s',t:'Q0–Q3 (N=2)'},M23:{b:[49,14,18,10],c:'o',t:'M2/M3 (gmP 30µA/V)'},Q45:{b:[46,58,24,13],c:'r',t:'Q4/Q5 (rb 4k)'},M01:{b:[35,76,25,16],c:'s',t:'M0 → M1 (ISS)'},vni:{b:[7,61,7,9],c:'g',t:'vni = ?'},Ip:{a:[[36,62],[36,76]],c:'s',t:'ISS'},It:{a:[[58,77],[58,90]],c:'s',t:'ISS'},Ia:{a:[[50,26],[50,58]],c:'r',t:'ISS/2'},Ib:{a:[[66,26],[66,58]],c:'r',t:'ISS/2'}},
steps:[
{t:'Proud z PTAT jádra',h:['Rs','core','Ip','M01','It'],eq:[R`I_{SS}=\frac{V_T\ln N}{R_S}=\frac{26\cdot10^{-3}\ln2}{4{,}5\cdot10^3}=4\,\mu\text{A},\quad g_m=\frac{I_{SS}}{2V_T}=76{,}92\,\mu\text{A/V}`]},
{t:'Šum vstupního páru (s rb)',h:['Q45'],eq:[R`v_{ni(Q)}=\sqrt2\sqrt{4kT\left(r_b+\frac{V_T}{I_{SS}}\right)}=\sqrt{8\cdot1{,}38\cdot10^{-23}\cdot300\left(4000+\frac{26\cdot10^{-3}}{4\cdot10^{-6}}\right)}=18{,}65\,\text{nV}/\sqrt{\text{Hz}}`]},
{t:'Šum zátěže',h:['M23'],eq:[R`i_{nP}=\sqrt{4kTg_{mP}}=\sqrt{4\cdot1{,}38\cdot10^{-23}\cdot300\cdot30\cdot10^{-6}}=0{,}7\,\text{pA},\quad v_{ni(P)}=\frac{\sqrt2\,i_{nP}}{g_m}=12{,}87\,\text{nV}/\sqrt{\text{Hz}}`]},
{t:'Celkem',h:['vni'],eq:[R`v_{ni}=10^{-9}\sqrt{18{,}65^2+12{,}87^2}=22{,}66\,\text{nV}/\sqrt{\text{Hz}}`],r:R`$v_{ni}=22{,}66$ nV/√Hz`}
],
res:R`$I_{SS}=4\,\mu$A, $v_{ni}=22{,}66$ nV/√Hz`,tk:[[R`v_{ni(Q)}=\sqrt2\sqrt{4kT\left(r_b+\frac{V_T}{I_{SS}}\right)}`,'+']]},

/* ================= 4.16 ================= */
{id:'4.16',ch:4,title:'Bipolární OZ, rb všech tranzistorů: vni',
task:R`Vypočítejte vstupní šumové napětí $v_{ni}$ (jeho spektrální hustotu v oblasti bílého šumu) tohoto OZ. Bázový odpor všech bipolárních tranzistorů je 500 Ω.`,
pat:['nbjt','nref'],
idea:R`Čtyři BJT (vstup Q0/Q1 + zátěž Q2/Q3), každý přispívá $4kTr_b$ a výstřelovým šumem $2qI_C/g_m^2$. Všechno to sbírka sbalí do jednoho vzorce.`,
parts:{Ri:{b:[10,16,5,15],c:'s',t:'Ri 80k'},Q23:{b:[35,16,22,13],c:'o',t:'Q2/Q3 (zátěž)'},Q01:{b:[32,44,30,15],c:'r',t:'Q0/Q1 (rb 500Ω)'},M0:{b:[11,76,12,17],c:'s',t:'M0'},M1:{b:[40,76,9,17],c:'s',t:'M1 → ISS'},vni:{b:[19,47,8,10],c:'g',t:'vni = ?'},Iss:{a:[[12.5,30],[12.5,97]],c:'s',t:'ISS'},Ia:{a:[[37,28],[37,64]],c:'r',t:'IC'},Ib:{a:[[55.5,38],[55.5,64]],c:'r',t:'IC'}},
steps:[
{t:'Proudy',h:['Ri','Iss','M0','M1','Ia','Ib'],eq:[R`I_{SS}=\frac{5-1}{80\cdot10^3}=50\,\mu\text{A},\quad I_C=\frac{I_{SS}}{2}=25\,\mu\text{A}`]},
{t:'Odkud je vzorec',h:['Q01','Q23'],x:R`<p>Každý ze 4 tranzistorů přispívá na vstup $4kTr_b+\frac{2qI_C}{g_m^2}$ (s $g_m=I_C/V_T$ a $4kT=4qV_T$). Součet čtyř:</p>`,g:[R`v_{ni}^2=4\left(4qV_Tr_b+\frac{2qV_T^2}{I_C}\right)=4V_T^2\frac{2q}{I_C}\left(1+\frac{2r_bI_C}{V_T}\right)`]},
{t:'Dosazení',h:['vni'],eq:[R`v_{ni}=2V_T\sqrt{\frac{2q}{I_C}\left(1+\frac{2r_bI_C}{V_T}\right)}=2\cdot26\cdot10^{-3}\sqrt{\frac{2\cdot1{,}602\cdot10^{-19}}{25\cdot10^{-6}}\left(1+\frac{2\cdot500\cdot25\cdot10^{-6}}{26\cdot10^{-3}}\right)}=8{,}24\,\text{nV}/\sqrt{\text{Hz}}`],r:R`$v_{ni}=8{,}24$ nV/√Hz`,m:R`„Bázový odpor <b>všech</b> tranzistorů“ = počítáš $r_b$ i u zátěže, ne jen u vstupního páru.`}
],
res:R`$I_C=25\,\mu$A, $v_{ni}=8{,}24$ nV/√Hz`,tk:[[R`v_n^2=4kT\left(r_b+\frac{1}{2g_m}\right)`,'+']]},

/* ================= 4.17 ================= */
{id:'4.17',ch:4,title:'Folded-cascode s BJT vstupem: vni, VNi, A0, f0, fT',
task:R`Spočítejte $v_{ni}$ v oblasti bílého šumu. Zanedbejte šum bázových odporů. Vypočítejte $V_{Ni}$ v pásmu 10 Hz – 100 kHz, když $f_K=1{,}4$ kHz. Určete DC zisk $A_0$, $f_0$ a $f_T$ tohoto OZ.`,
pat:['nbjt','nmos','nref','nint','oz'],
idea:R`Do výstupního uzlu šumí: 2× vstupní BJT, 2× NMOS (M11/M12) a 4× PMOS zdroje (M5–M8). Sečti, vyděl $g_m$ BJT.`,
parts:{Ri:{b:[11,17,5,14],c:'s',t:'Ri 4,1M'},M58:{b:[36,16,23,12],c:'o',t:'M5–M8 PMOS (4×)'},Q01:{b:[34,54,22,14],c:'r',t:'Q0/Q1 (vstup, gmQ)'},M34:{b:[38,78,12,13],c:'s',t:'M3/M4 → ISS'},M1112:{b:[61,79,16,12],c:'g',t:'M11/M12 NMOS'},rd:{n:[75,74],c:'b',t:'rd 80M'},Ck:{b:[80,79,6,13],c:'b',t:'Ck 10p'},I1:{a:[[12.5,30],[12.5,97]],c:'s',t:'ISS/2'},It:{a:[[44.6,67],[44.6,79]],c:'s',t:'ISS'},I2:{a:[[62.3,55],[62.3,97]],c:'g',t:'ISS/2'}},
steps:[
{t:'Tail proud',h:['Ri','I1','M34','It'],x:R`<p>$R_i$ nese $I_{SS}/2$, M3+M4 (2 jednotky) dají $I_{SS}$:</p>`,eq:[R`I_{SS}=2\frac{V_{CC}-V_{GS}}{R_i}=2\cdot\frac{5-0{,}9}{4{,}1\cdot10^6}=2\,\mu\text{A}`]},
{t:'Šumové proudy',h:['Q01','M1112','M58'],eq:[R`i_{nQ}=\sqrt{2q\tfrac{I_{SS}}{2}}=0{,}566\,\text{pA}`,R`g_{mN}=\sqrt{I_{SS}k_{pn}\tfrac WL}=\sqrt{2\,\mu\cdot67\,\mu\cdot\tfrac{8}{16}}=8{,}18\,\mu\text{A/V}\Rightarrow i_{nN}=0{,}37\,\text{pA}`,R`g_{mP}=\sqrt{I_{SS}k_{pp}\tfrac WL}=\sqrt{2\,\mu\cdot27\,\mu\cdot\tfrac{4}{16}}=3{,}67\,\mu\text{A/V}\Rightarrow i_{nP}=0{,}247\,\text{pA}`]},
{t:'vni a VNi',h:['Q01'],eq:[R`i_{nT}=\sqrt{2i_{nN}^2+2i_{nQ}^2+4i_{nP}^2}=1{,}076\,\text{pA}/\sqrt{\text{Hz}}`,R`g_{mQ}=\frac{I_{SS}}{2V_T}=38{,}46\,\mu\text{A/V}\Rightarrow v_{ni}=\frac{i_{nT}}{g_{mQ}}=27{,}98\,\text{nV}/\sqrt{\text{Hz}}`,R`V_{Ni}=27{,}98\cdot10^{-9}\sqrt{100\cdot10^3+1{,}4\cdot10^3\ln10^4}=9{,}4\,\mu\text{V}`],r:R`$v_{ni}=27{,}98$ nV/√Hz, $V_{Ni}=9{,}4\,\mu$V`},
{t:'A0, f0, fT, Sr',h:['rd','Ck'],eq:[R`A_0=g_{mQ}r_d=38{,}46\cdot10^{-6}\cdot80\cdot10^6=3076`,R`f_0=\frac{1}{2\pi r_dC_K}=199\,\text{Hz},\quad f_T=612\,\text{kHz},\quad S_r=\frac{I_{SS}}{C_K}=0{,}2\,\text{V}/\mu\text{s}`]}
],
res:R`$v_{ni}=27{,}98$ nV/√Hz, $V_{Ni}=9{,}4\,\mu$V, $A_0=3076$, $f_0=199$ Hz, $f_T=612$ kHz, $S_r=0{,}2$ V/µs`,tk:[[R`v_{ni}=\frac{\sqrt{\sum i^2}}{g_m}`,'+']]},

/* ================= 4.18 ================= */
{id:'4.18',ch:4,title:'Kombinace: parametry, σVos i šum',
task:R`Vypočítejte $A_0$, $f_0$, $f_T$ a $S_r$. Vypočítejte $\sigma_{Vos}$ ($\sigma_{Vos1}=200\,\mu$V, $\sigma_{Vos2}=1{,}6$ mV). Spočítejte $v_{ni}$ v oblasti bílého šumu; šum druhého stupně je $v_{ni2}=130$ nV/√Hz. Zanedbejte šum bázových odporů. Spočítejte $V_{Ni}$ v pásmu 1 Hz – 100 kHz pro $f_K=3$ kHz.`,
pat:['oz','sig','nbjt','nR','nref','nint'],
idea:R`Všechno, co jsi zatím viděl, najednou. Rozptyl i šum jsou nezávislé příspěvky → kvadraticky; všechno za 1. stupněm dělíš $A_1=10$.`,
parts:{Ri:{b:[9,8,4,13],c:'s',t:'Ri 2M'},Rc1:{b:[28,8,5,13],c:'o',t:'Rc 260k'},Rc2:{b:[39,8,5,13],c:'o',t:'Rc 260k'},Q01:{b:[26,57,20,13],c:'r',t:'Q0/Q1 (σVos1 0,2mV)'},M3:{b:[33,77,6,13],c:'s',t:'M3 → IRi'},M1011:{b:[63,44,19,12],c:'b',t:'M10/M11 slabá inv. n=2,9'},M89:{b:[66,17,11,13],c:'b',t:'M8/M9 → 2·IRi'},rd:{n:[79,76],c:'b',t:'rd 10M'},Ck:{b:[82,78,6,13],c:'b',t:'Ck 40p'},s2:{b:[43,38,6,9],c:'p',t:'σVos2 1,6mV'},n2:{b:[50,38,6,9],c:'p',t:'vni2 130nV'},sv:{b:[11,60,11,9],c:'g',t:'σVos, vni = ?'},IR:{a:[[10.5,20],[10.5,97]],c:'s',t:'IRi'},Ia:{a:[[30.5,20],[30.5,73]],c:'r',t:'IRi/2'},Ib:{a:[[41.5,20],[41.5,73]],c:'r',t:'IRi/2'},I2:{a:[[73.5,30],[73.5,42]],c:'b',t:'2·IRi'}},
steps:[
{t:'Proudy a gm',h:['Ri','IR','M3','Ia','Ib','M89','I2','Q01','M1011'],eq:[R`I_{Ri}=\frac{5-1}{2\cdot10^6}=2\,\mu\text{A},\quad g_{m1}=\frac{I_{Ri}}{2V_T}=38{,}46\,\mu\text{A/V}`,R`g_{m2}=\frac{2I_{Ri}}{2nV_T}=\frac{4\cdot10^{-6}}{2\cdot2{,}9\cdot26\cdot10^{-3}}=26{,}53\,\mu\text{A/V}`]},
{t:'A0, f0, fT, Sr',h:['Rc1','Rc2','rd','Ck'],eq:[R`A_1=g_{m1}R_C=10,\quad A_2=g_{m2}r_d=265,\quad A_0=2650`,R`f_0=\frac{1}{2\pi r_dC_K}=398\,\text{Hz},\quad f_T=1{,}05\,\text{MHz},\quad S_r=\frac{2I_{Ri}}{C_K}=0{,}1\,\text{V}/\mu\text{s}`]},
{t:'σVos',h:['Q01','s2','sv'],eq:[R`\sigma_{Vos}=\sqrt{\sigma_{Vos1}^2+\left(\frac{\sigma_{Vos2}}{A_1}\right)^2}=10^{-3}\sqrt{0{,}2^2+\left(\frac{1{,}6}{10}\right)^2}=0{,}256\,\text{mV}`],r:R`$\sigma_{Vos}=0{,}256$ mV`},
{t:'Tři šumové složky',h:['Rc1','Rc2','n2','Q01'],eq:[R`v_{nR}=\sqrt{4kTR_C}=65{,}62\,\text{nV}\Rightarrow v_{ni(R)}=\sqrt2\frac{v_{nR}}{A_1}=9{,}28\,\text{nV}/\sqrt{\text{Hz}}`,R`v_{ni(v_{n2})}=\frac{v_{ni2}}{A_1}=\frac{130}{10}=13\,\text{nV}/\sqrt{\text{Hz}}`,R`i_{nQ}=\sqrt{2q\tfrac{I_{Ri}}{2}}=0{,}566\,\text{pA}\Rightarrow v_{ni(Q)}=\sqrt2\frac{i_{nQ}}{g_{m1}}=20{,}81\,\text{nV}/\sqrt{\text{Hz}}`]},
{t:'Celkový šum a integrál',h:['sv'],eq:[R`v_{ni}=10^{-9}\sqrt{9{,}28^2+13^2+20{,}81^2}=26{,}23\,\text{nV}/\sqrt{\text{Hz}}`,R`V_{Ni}=26{,}23\cdot10^{-9}\sqrt{100\cdot10^3+3\cdot10^3\ln\frac{100\cdot10^3}{1}}=9{,}62\,\mu\text{V}`],r:R`$v_{ni}=26{,}23$ nV/√Hz, $V_{Ni}=9{,}62\,\mu$V`,m:R`Rozptyl i šum: nezávislé příspěvky → kvadraticky, a vše za 1. stupněm děleno $A_1$.`}
],
res:R`$A_0=2650$, $f_0=398$ Hz, $f_T=1{,}05$ MHz, $S_r=0{,}1$ V/µs, $\sigma_{Vos}=0{,}256$ mV, $v_{ni}=26{,}23$ nV/√Hz, $V_{Ni}=9{,}62\,\mu$V`,tk:[[R`\sigma_{Vos}=\sqrt{\sigma_{Vos1}^2+(\sigma_{Vos2}/A_1)^2}`,'+'],[R`v_{nR}=\sqrt{4kTR}`,'+']]},

/* ================= 4.19 ================= */
{id:'4.19',ch:4,title:'Doublet, A0, Sr a šum s emitorovou degenerací',
task:R`Vypočítejte kmitočet nuly $f_Z$ a pólu $f_P$ kmitočtového doubletu tohoto OZ. Vypočítejte ss zisk $A_0$, rychlost přeběhu $S_r$. Vypočítejte $v_{ni}$ v oblasti bílého šumu. Zanedbejte vstupní šum druhého stupně a šum bázových odporů.`,
pat:['dbl','vbe','oz','nbjt','nR','nref'],
idea:R`$C_d$ je jen u jednoho ze dvou $R_1$ → rozdílový výstup má pól $1/(R_1C_d)$ a nulu na dvojnásobku. 2. stupeň má emitorovou degeneraci $R_e$ (vzorec je na taháku).`,
parts:{Cd:{b:[6,5,5,16],c:'k',t:'Cd 20p'},R1a:{b:[10,5,4,16],c:'o',t:'R1 100k'},R1b:{b:[18,5,4,16],c:'o',t:'R1 100k'},Q01:{b:[7,53,17,15],c:'r',t:'Q0/Q1 (gm1)'},M0:{b:[14,78,6,15],c:'s',t:'M0 → ISS'},Rs:{b:[25,5,4,16],c:'s',t:'Rs 70k'},Q2:{b:[28,16,6,12],c:'s',t:'Q2'},Q34:{b:[49,49,16,14],c:'b',t:'Q3/Q4 (gm2)'},Re:{b:[50,36,13,13],c:'b',t:'Re 30k (degenerace)'},rd:{n:[83.5,50.5],c:'b',t:'rd 200M'},Ck:{b:[86,66,5,12],c:'p',t:'Ck 40p'},vni:{b:[3,58,4,12],c:'g',t:'vni'},Ia:{a:[[11.8,20],[11.8,62]],c:'r',t:'ISS/2'},Ib:{a:[[19.7,20],[19.7,62]],c:'r',t:'ISS/2'},It:{a:[[15.7,69],[15.7,84]],c:'r',t:'ISS'},I2:{a:[[56.5,27],[56.5,36]],c:'b',t:'ISS'}},
steps:[
{t:'Bias z VBE',h:['Rs','Q2','M0','It','I2'],x:R`<p>Q2 + M2 tvoří zdroj z $V_{BE}$ (jako 2.4) na $R_s$:</p>`,eq:[R`I_{SS}=\frac{V_{BE}}{R_S}=\frac{0{,}7}{70\cdot10^3}=10\,\mu\text{A}`]},
{t:'Doublet',h:['Cd','R1a','R1b'],x:R`<p>Rozdílový výstup je úměrný $Z_1+R_1$, kde $Z_1=R_1\parallel C_d$:</p>`,g:[R`Z_1+R_1=R_1\frac{2+sR_1C_d}{1+sR_1C_d}\;\Rightarrow\;\omega_p=\frac{1}{R_1C_d},\;\omega_z=\frac{2}{R_1C_d}`],eq:[R`f_p=\frac{1}{2\pi R_1C_d}=\frac{1}{2\pi\cdot100\cdot10^3\cdot20\cdot10^{-12}}=80\,\text{kHz},\quad f_z=2f_p=160\,\text{kHz}`],r:R`$f_p=80$ kHz, $f_z=160$ kHz`},
{t:'Zisk a Sr',h:['Q01','Q34','Re','rd','Ck'],x:R`<p>2. stupeň s emitorovou degenerací (tahák: $g_m=I_C/(R_eI_C+V_T)$ s $I_C=I_{SS}/2$):</p>`,eq:[R`g_{m1}=\frac{I_{SS}}{2V_T}=192{,}3\,\mu\text{A/V},\quad g_{m2}=\frac{I_{SS}}{2V_T+R_eI_{SS}}=\frac{10\,\mu}{52\,\text{m}+0{,}3}=28{,}4\,\mu\text{A/V}`,R`A_1=g_{m1}R_1=19{,}23,\quad A_2=g_{m2}r_{d2}=5680,\quad A_0=109\,226`,R`S_r=\frac{I_{SS}}{C_K}=\frac{10\,\mu}{40\,\text{p}}=0{,}25\,\text{V}/\mu\text{s}`]},
{t:'Šum',h:['R1a','R1b','Q01','vni'],eq:[R`v_{nR}=\sqrt{4kTR_1}=40{,}7\,\text{nV}\Rightarrow v_{ni(R)}=\sqrt2\frac{v_{nR}}{A_1}=3\,\text{nV}/\sqrt{\text{Hz}}`,R`i_{nQ}=\sqrt{2q\tfrac{I_{SS}}{2}}=1{,}27\,\text{pA}\Rightarrow v_{ni(Q)}=\sqrt2\frac{i_{nQ}}{g_{m1}}=9{,}34\,\text{nV}/\sqrt{\text{Hz}}`,R`v_{ni}=10^{-9}\sqrt{3^2+9{,}34^2}=9{,}8\,\text{nV}/\sqrt{\text{Hz}}`],r:R`$v_{ni}=9{,}8$ nV/√Hz`}
],
res:R`$f_p=80$ kHz, $f_z=160$ kHz, $A_0=109\,226$, $S_r=0{,}25$ V/µs, $v_{ni}=9{,}8$ nV/√Hz`,tk:[[R`g_m=\frac{I_C}{R_eI_C+V_T}`,'T'],[R`f_p=\frac{1}{2\pi R_1C_d},\;f_z=2f_p`,'+']]}
];
})();
