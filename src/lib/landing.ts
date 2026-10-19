// Pagini de aterizare SEO: zone din județul Cluj + servicii de catering.
// Fiecare pagină are text propriu (nu duplicat), întrebări frecvente (FAQPage) și link-uri interne.

export type Faq = { q: string; a: string };
export type Landing = {
  slug: string;
  kind: "area" | "service";
  /** Numele scurt folosit în link-uri, ex. „Catering Apahida”. */
  name: string;
  h1Lead: string;
  h1Accent: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  points: string[];
  body: string[];
  faq: Faq[];
  image: "event" | "daily" | "hero" | "kitchen";
  /** Completare pentru mesajul WhatsApp precompletat. */
  wa: string;
  city?: string;
};

const commonFaq = (city: string): Faq[] => [
  { q: `Cum comand catering în ${city}?`, a: `Cel mai rapid e pe WhatsApp sau telefonic la 0727 944 844. Ne spui data, numărul de persoane și adresa din ${city}, iar noi îți trimitem meniul și prețul pe loc.` },
  { q: `Cât costă cateringul în ${city}?`, a: "Meniul zilei pornește de la aproximativ 15 lei ciorba și 28–32 lei felul principal. Pentru evenimente facem ofertă pe persoană, în funcție de meniu și numărul de invitați." },
];

export const LANDINGS = {
  "catering-cluj": {
    slug: "catering-cluj", kind: "area", city: "Cluj-Napoca", name: "Catering Cluj-Napoca",
    h1Lead: "Catering", h1Accent: "Cluj-Napoca", eyebrow: "Catering Cluj · aprox. 18 km de bucătăria din Gilău",
    title: "Catering Cluj-Napoca — Prânz firme, nunți & evenimente | Optim Catering",
    description: "Catering Cluj-Napoca: meniul zilei pentru birouri, platouri, catering pentru evenimente corporate, nunți și botezuri. Mâncare românească gătită zilnic. Comandă pe WhatsApp: 0727 944 844.",
    intro: "Livrăm în Cluj-Napoca prânzuri calde pentru echipe și organizăm catering complet pentru evenimente, de la ședințe și team building-uri la nunți.",
    points: ["Prânz zilnic pentru birouri și echipe", "Catering pentru evenimente corporate", "Meniuri de nuntă și botez", "Platouri reci și aperitive la comandă"],
    body: [
      "Gătim în fiecare dimineață în bucătăria noastră din Gilău și ajungem în Cluj-Napoca pe centura de vest, prin Florești, în Mănăștur, Grigorescu, Zorilor, Gheorgheni, Mărăști, Bună Ziua sau centru.",
      "Pentru firme din Cluj facem abonamente de prânz cu meniu diferit în fiecare zi, iar pentru evenimente aducem mâncarea caldă în caserole sau vase termice, cu servire la cerere.",
    ],
    faq: [
      { q: "Livrați catering în toate cartierele din Cluj-Napoca?", a: "Da. Livrăm în Mănăștur, Grigorescu, Zorilor, Gheorgheni, Mărăști, Bună Ziua, Iris, Someșeni și centru. Pentru comenzi mici de meniul zilei îți confirmăm ora de livrare la comandă." },
      ...commonFaq("Cluj-Napoca"),
      { q: "Faceți catering pentru firme din Cluj?", a: "Da, avem pachete de prânz zilnice pentru birouri și catering pentru ședințe, conferințe și petreceri de firmă, cu factură." },
    ],
    image: "event", wa: "catering în Cluj-Napoca pentru ",
  },
  "catering-floresti": {
    slug: "catering-floresti", kind: "area", city: "Florești", name: "Catering Florești",
    h1Lead: "Catering", h1Accent: "Florești", eyebrow: "Catering Florești · aprox. 8 km de bucătăria din Gilău",
    title: "Catering Florești — Meniul zilei & livrare | Optim Catering",
    description: "Catering în Florești, Cluj: meniul zilei livrat cald, platouri, prânz pentru firme, catering pentru petreceri, nunți și botezuri. Comandă pe WhatsApp: 0727 944 844.",
    intro: "Florești este la câteva minute de bucătăria noastră. Livrăm prânzul zilei și gătim pentru evenimentele tale de familie.",
    points: ["Livrare rapidă a meniului zilei", "Catering pentru petreceri și aniversări", "Nunți, botezuri și mese festive", "Abonamente de prânz pentru firme"],
    body: [
      "Fiind cei mai apropiați de Florești dinspre Gilău, mâncarea ajunge caldă pe Eroilor, Avram Iancu, Florilor, Tăuți sau Cetatea Fetei, de obicei în mai puțin de jumătate de oră de la plecare.",
      "Pentru aniversări și petreceri acasă pregătim platouri reci, sarmale, friptură și garnituri, iar pentru botezuri și nunți facem meniul complet.",
    ],
    faq: [
      { q: "Cât durează livrarea în Florești?", a: "De regulă 15–30 de minute de la plecarea din bucătăria din Gilău, în funcție de trafic." },
      ...commonFaq("Florești"),
    ],
    image: "daily", wa: "catering în Florești pentru ",
  },
  "catering-gilau": {
    slug: "catering-gilau", kind: "area", city: "Gilău", name: "Catering Gilău",
    h1Lead: "Catering", h1Accent: "Gilău", eyebrow: "Catering Gilău · bucătăria noastră este aici",
    title: "Catering Gilău — Meniul zilei & evenimente | Optim Catering",
    description: "Catering în Gilău: meniul zilei gătit în fiecare dimineață, prânz pentru firme, nunți, botezuri, pomeni și evenimente. Bucătărie locală pe Str. Republicii 191. WhatsApp 0727 944 844.",
    intro: "Suntem din Gilău. Bucătăria noastră este pe Str. Republicii 191, așa că mâncarea ajunge caldă, în câteva minute, oriunde în comună.",
    points: ["Meniul zilei de luni până vineri", "Ridicare personală sau livrare locală", "Mese pentru nunți, botezuri și pomeni", "Pachete de prânz pentru firmele din zonă"],
    body: [
      "Livrăm în Gilău, Someșu Rece, Luna de Sus, Săvădisla și Căpușu Mare. Poți ridica și personal comanda de la bucătărie, pe Str. Republicii 191.",
      "Pentru mese de pomenire, botezuri sau nunți în căminul cultural ori acasă, pregătim meniul tradițional complet: ciorbă, sarmale, friptură, garnituri și prăjituri.",
    ],
    faq: [
      { q: "Pot ridica personal mâncarea în Gilău?", a: "Da, de luni până vineri, între 09:00 și 15:00, de la Str. Republicii 191, Gilău." },
      { q: "Faceți mese de pomenire în Gilău?", a: "Da, pregătim meniuri tradiționale pentru pomeni, cu livrare la biserică, cămin sau acasă." },
      ...commonFaq("Gilău"),
    ],
    image: "kitchen", wa: "catering în Gilău pentru ",
  },
  "catering-apahida": {
    slug: "catering-apahida", kind: "area", city: "Apahida", name: "Catering Apahida",
    h1Lead: "Catering", h1Accent: "Apahida", eyebrow: "Catering Apahida · est de Cluj-Napoca",
    title: "Catering Apahida — Evenimente, firme & meniul zilei | Optim Catering",
    description: "Catering Apahida și Sânnicoara: catering pentru evenimente, botezuri, nunți, prânz pentru firmele din zona industrială și platouri la comandă. WhatsApp 0727 944 844.",
    intro: "Venim în Apahida, Sânnicoara și Dezmir cu catering pentru evenimente de familie și cu prânzuri pentru firmele din zona industrială de est.",
    points: ["Prânz pentru firme și depozite", "Botezuri, aniversări și mese festive", "Platouri reci și calde la comandă", "Ofertă personalizată pe persoană"],
    body: [
      "Apahida a crescut rapid, iar familiile din cartierele noi și firmele din zona Cluj-Est caută mâncare gătită ca acasă. Pregătim totul dimineața și livrăm pe Calea Apahidei și Drumul Național 1C.",
      "Pentru echipe mari facem meniuri pe săptămână, iar pentru evenimente aducem mâncarea în vase termice ca să ajungă caldă.",
    ],
    faq: [
      { q: "Livrați meniul zilei în Apahida?", a: "Pentru firme și comenzi de grup da, în baza unei comenzi stabilite din timp. Scrie-ne pe WhatsApp numărul de porții." },
      ...commonFaq("Apahida"),
    ],
    image: "event", wa: "catering în Apahida pentru ",
  },
  "catering-baciu": {
    slug: "catering-baciu", kind: "area", city: "Baciu", name: "Catering Baciu",
    h1Lead: "Catering", h1Accent: "Baciu", eyebrow: "Catering Baciu · Popești · Rădaia",
    title: "Catering Baciu — Petreceri, botezuri & prânz firme | Optim Catering",
    description: "Catering în Baciu, Popești și Rădaia (jud. Cluj): petreceri, botezuri, aniversări, platouri și prânz pentru firme. Comandă rapid pe WhatsApp: 0727 944 844.",
    intro: "Baciu e la doi pași de Florești, pe ruta noastră de livrare. Gătim pentru petreceri acasă, botezuri și firmele din zonă.",
    points: ["Petreceri și aniversări acasă", "Meniuri de botez", "Platouri aperitive și reci", "Prânz zilnic pentru firme"],
    body: [
      "Livrăm în Baciu, Popești, Rădaia, Mera și Corușu. Spune-ne câți invitați ai, iar noi propunem cantitățile potrivite, ca să nu rămâi nici fără mâncare, nici cu prea multă.",
      "Fiecare comandă e gătită în ziua livrării, cu rețete românești: sarmale, friptură, mici, ciorbe și salate de sezon.",
    ],
    faq: commonFaq("Baciu"),
    image: "hero", wa: "catering în Baciu pentru ",
  },
  "catering-huedin": {
    slug: "catering-huedin", kind: "area", city: "Huedin", name: "Catering Huedin",
    h1Lead: "Catering", h1Accent: "Huedin", eyebrow: "Catering Huedin · Izvoru Crișului · Căpușu Mare",
    title: "Catering Huedin — Nunți, botezuri & evenimente | Optim Catering",
    description: "Catering în Huedin și zona Izvoru Crișului, Căpușu Mare: nunți, botezuri, pomeni și evenimente, cu mâncare tradițională gătită în Gilău. WhatsApp 0727 944 844.",
    intro: "Gilăul e pe drumul spre Huedin, așa că ajungem ușor la evenimentele din zonă, cu mâncare tradițională gătită în aceeași zi.",
    points: ["Nunți și botezuri la cămin sau acasă", "Mese de pomenire", "Evenimente de firmă", "Meniu tradițional ardelenesc"],
    body: [
      "Facem catering în Huedin, Izvoru Crișului, Căpușu Mare, Mănăstireni și Poieni pentru evenimente stabilite din timp. Transportul îl includem în ofertă.",
      "Meniurile sunt ardelenești: ciorbă de perișoare, sarmale cu mămăligă, friptură la cuptor, salate și prăjituri de casă.",
    ],
    faq: commonFaq("Huedin"),
    image: "event", wa: "catering în Huedin pentru ",
  },
  "catering-luna-de-sus": {
    slug: "catering-luna-de-sus", kind: "area", city: "Luna de Sus", name: "Catering Luna de Sus",
    h1Lead: "Catering", h1Accent: "Luna de Sus", eyebrow: "Catering Luna de Sus · între Gilău și Florești",
    title: "Catering Luna de Sus — Meniul zilei & evenimente | Optim Catering",
    description: "Catering în Luna de Sus (Florești): meniul zilei livrat cald, catering pentru aniversări, botezuri și firme. Comandă pe WhatsApp: 0727 944 844.",
    intro: "Luna de Sus este chiar între bucătăria noastră și Florești, deci meniul zilei ajunge cald și repede.",
    points: ["Meniul zilei livrat cald", "Aniversări și petreceri", "Botezuri și mese festive", "Prânz pentru firme mici"],
    body: [
      "Livrăm în Luna de Sus de luni până vineri, în același tur cu Gilăul și Floreștiul. Comanzi dimineața, primești la prânz.",
      "Pentru evenimente în weekend stabilim meniul și ora de livrare din timp.",
    ],
    faq: commonFaq("Luna de Sus"),
    image: "daily", wa: "catering în Luna de Sus pentru ",
  },
  "catering-savadisla": {
    slug: "catering-savadisla", kind: "area", city: "Săvădisla", name: "Catering Săvădisla",
    h1Lead: "Catering", h1Accent: "Săvădisla", eyebrow: "Catering Săvădisla · aprox. 12 km de Gilău",
    title: "Catering Săvădisla — Botezuri, pomeni & evenimente | Optim Catering",
    description: "Catering în Săvădisla, Finișel, Vlaha și Hășdate: meniuri pentru botezuri, nunți, pomeni și petreceri. Mâncare gătită în Gilău. WhatsApp 0727 944 844.",
    intro: "Săvădisla și satele din jur sunt aproape de Gilău. Gătim pentru evenimentele de familie și livrăm meniul zilei la cerere.",
    points: ["Meniuri de botez și nuntă", "Mese de pomenire", "Petreceri de familie", "Meniul zilei pentru grupuri"],
    body: [
      "Livrăm în Săvădisla, Finișel, Vlaha, Hășdate și Lita. Pentru evenimente aducem mâncarea caldă și, la cerere, vesela și personal de servire.",
      "Spune-ne data și numărul de persoane pe WhatsApp și primești o ofertă clară, fără costuri ascunse.",
    ],
    faq: commonFaq("Săvădisla"),
    image: "kitchen", wa: "catering în Săvădisla pentru ",
  },
  "catering-turda": {
    slug: "catering-turda", kind: "area", city: "Turda", name: "Catering Turda",
    h1Lead: "Catering", h1Accent: "Turda", eyebrow: "Catering Turda · evenimente în județul Cluj",
    title: "Catering Turda — Nunți, botezuri & evenimente de firmă | Optim Catering",
    description: "Catering pentru evenimente în Turda și Câmpia Turzii: nunți, botezuri, aniversări și evenimente de firmă, cu meniu tradițional românesc. Ofertă pe WhatsApp: 0727 944 844.",
    intro: "Pentru evenimentele din Turda și Câmpia Turzii venim cu mâncarea gătită în aceeași zi și, la cerere, cu servire.",
    points: ["Catering pentru nunți și botezuri", "Evenimente de firmă și conferințe", "Platouri și bufet suedez", "Transport inclus în ofertă"],
    body: [
      "Acceptăm evenimente în Turda, Câmpia Turzii și localitățile din jur, de la 20 de persoane în sus, stabilite cu câteva zile înainte.",
      "Meniul îl alegi împreună cu noi: aperitive, ciorbă sau supă, sarmale, friptură, garnituri și desert.",
    ],
    faq: commonFaq("Turda"),
    image: "event", wa: "catering în Turda pentru ",
  },
  "catering-nunta-cluj": {
    slug: "catering-nunta-cluj", kind: "service", name: "Catering nuntă Cluj",
    h1Lead: "Catering nuntă", h1Accent: "Cluj", eyebrow: "Nunți · 20 – 300 de invitați",
    title: "Catering nuntă Cluj — Meniuri complete de nuntă | Optim Catering",
    description: "Catering pentru nunți în Cluj-Napoca, Florești, Gilău și județul Cluj: aperitive, sarmale, friptură, garnituri și desert, cu servire. Ofertă pe WhatsApp: 0727 944 844.",
    intro: "Gătim meniuri complete de nuntă pentru 20 până la 300 de invitați, la restaurant, cort, cămin cultural sau acasă.",
    points: ["Aperitiv rece și cald", "Ciorbă sau supă, sarmale cu mămăligă", "Friptură cu garnituri", "Servire și veselă la cerere"],
    body: [
      "Stabilim împreună meniul, cantitățile pe invitat și ora fiecărui fel. Mâncarea e gătită în ziua evenimentului și ajunge în vase termice.",
      "Facem nunți în Cluj-Napoca, Florești, Gilău, Huedin, Turda și în tot județul Cluj, cu transport inclus în ofertă.",
    ],
    faq: [
      { q: "Cu cât timp înainte trebuie să rezerv cateringul de nuntă?", a: "Ideal cu 1–3 luni înainte, mai ales vara și toamna. Pentru nunți mici putem accepta și cu câteva săptămâni înainte." },
      { q: "Cât costă meniul de nuntă pe persoană?", a: "Depinde de numărul de feluri și de invitați. Scrie-ne pe WhatsApp data și numărul de persoane și primești oferta în aceeași zi." },
      { q: "Asigurați și personal de servire?", a: "Da, la cerere venim cu ospătari, veselă și tacâmuri." },
    ],
    image: "event", wa: "catering pentru nuntă: data …, nr. invitați …",
  },
  "catering-botez-cluj": {
    slug: "catering-botez-cluj", kind: "service", name: "Catering botez Cluj",
    h1Lead: "Catering botez", h1Accent: "Cluj", eyebrow: "Botezuri & mese festive",
    title: "Catering botez Cluj — Meniuri de botez la cheie | Optim Catering",
    description: "Catering pentru botez în Cluj-Napoca, Florești, Gilău și împrejurimi: meniuri tradiționale, platouri, tort și servire. Comandă pe WhatsApp: 0727 944 844.",
    intro: "Pentru botez pregătim meniul complet, de la aperitive la desert, ca tu să te bucuri de zi, nu de bucătărie.",
    points: ["Platouri aperitive", "Sarmale, friptură și garnituri", "Meniuri pentru copii", "Livrare caldă acasă sau la salon"],
    body: [
      "Botezurile le facem acasă, în curte, la cămin sau în sală închiriată, pentru 20 până la 150 de invitați.",
      "Îți recomandăm cantitățile pe persoană și aducem mâncarea la ora stabilită, gata de servit.",
    ],
    faq: [
      { q: "Pot comanda catering de botez doar pentru 20 de persoane?", a: "Da. Facem meniuri de botez de la aproximativ 20 de persoane în sus." },
      ...commonFaq("Cluj"),
    ],
    image: "hero", wa: "catering pentru botez: data …, nr. invitați …",
  },
  "catering-firme-cluj": {
    slug: "catering-firme-cluj", kind: "service", name: "Catering firme Cluj",
    h1Lead: "Catering pentru firme", h1Accent: "Cluj", eyebrow: "Prânz la birou · evenimente corporate",
    title: "Catering firme Cluj — Prânz la birou & evenimente corporate | Optim Catering",
    description: "Catering pentru firme în Cluj-Napoca, Florești și Gilău: prânz zilnic la birou, abonamente, ședințe, conferințe și petreceri de firmă, cu factură. WhatsApp 0727 944 844.",
    intro: "Hrănim echipe în fiecare zi: meniu cald, diferit zilnic, livrat la birou, plus catering pentru ședințe și evenimente de firmă.",
    points: ["Abonamente de prânz pentru echipe", "Coffee break și platouri pentru ședințe", "Petreceri și team building", "Factură pe firmă"],
    body: [
      "Meniul se schimbă în fiecare zi și îl publicăm pe site și pe Facebook. Echipa ta alege, noi gătim și livrăm la ora de prânz.",
      "Pentru conferințe și evenimente corporate facem bufet cald și rece, cu servire la cerere.",
    ],
    faq: [
      { q: "Emiteți factură pentru firme?", a: "Da, emitem factură pentru toate comenzile corporate." },
      { q: "Care e comanda minimă pentru prânz la birou?", a: "Depinde de zonă. Scrie-ne pe WhatsApp adresa biroului și numărul de porții și îți confirmăm imediat." },
    ],
    image: "daily", wa: "prânz pentru firmă: nr. porții …, adresa …",
  },
  "platouri-aperitive-cluj": {
    slug: "platouri-aperitive-cluj", kind: "service", name: "Platouri aperitive Cluj",
    h1Lead: "Platouri aperitive", h1Accent: "Cluj", eyebrow: "Platouri reci & calde la comandă",
    title: "Platouri aperitive Cluj — Platouri reci & calde la comandă | Optim Catering",
    description: "Platouri aperitive în Cluj-Napoca, Florești și Gilău: platouri reci, mezeluri, brânzeturi, tartine, platouri calde și sarmale, pentru petreceri și birou. Comandă pe WhatsApp.",
    intro: "Platouri gata de pus pe masă pentru petreceri, aniversări, ședințe sau sărbători, făcute în ziua livrării.",
    points: ["Platouri reci cu mezeluri și brânzeturi", "Tartine și aperitive", "Platouri calde: mici, cârnăciori, chiftele", "Sarmale și friptură la tavă"],
    body: [
      "Ne spui pentru câte persoane și ce îți place, iar noi alcătuim platourile și îți spunem prețul exact.",
      "Livrăm platourile în Cluj-Napoca, Florești, Gilău, Baciu și Apahida.",
    ],
    faq: [
      { q: "Pentru câte persoane e un platou?", a: "Un platou standard ajunge de obicei pentru 6–8 persoane, ca aperitiv. Îți recomandăm numărul exact la comandă." },
      { q: "Cu cât timp înainte comand platourile?", a: "Ideal cu o zi înainte. Pentru comenzi mari, cu 2–3 zile." },
    ],
    image: "hero", wa: "platouri aperitive pentru … persoane, data …",
  },
  "catering-craciun-revelion-cluj": {
    slug: "catering-craciun-revelion-cluj", kind: "service", name: "Catering Crăciun & Revelion",
    h1Lead: "Catering Crăciun & Revelion", h1Accent: "Cluj", eyebrow: "Sărbători de iarnă · petreceri de firmă",
    title: "Catering Crăciun & Revelion Cluj — Meniuri de sărbători | Optim Catering",
    description: "Catering de Crăciun și Revelion în Cluj-Napoca, Florești și Gilău: sarmale, friptură, platouri, meniuri pentru petreceri de firmă și acasă. Rezervă din timp pe WhatsApp.",
    intro: "Pentru sărbătorile de iarnă gătim meniuri tradiționale: sarmale, piftie, friptură, cozonac și platouri, pentru acasă sau pentru petrecerea de firmă.",
    points: ["Meniuri de Crăciun acasă", "Petreceri de Crăciun pentru firme", "Meniu de Revelion", "Platouri și aperitive festive"],
    body: [
      "Locurile din decembrie se ocupă repede, așa că îți recomandăm să rezervi data din timp.",
      "Livrăm în Cluj-Napoca, Florești, Gilău și în comunele din jur.",
    ],
    faq: [
      { q: "Până când pot comanda catering de Crăciun?", a: "Cât mai devreme. Primim rezervări pentru decembrie încă din noiembrie, în limita capacității bucătăriei." },
      ...commonFaq("Cluj"),
    ],
    image: "event", wa: "catering de sărbători: data …, nr. persoane …",
  },
} satisfies Record<string, Landing>;

export type LandingSlug = keyof typeof LANDINGS;

const all = Object.values(LANDINGS) as Landing[];
export const AREA_LINKS = all.filter((l) => l.kind === "area").map(({ slug, name }) => ({ slug, name }));
export const SERVICE_LINKS = all.filter((l) => l.kind === "service").map(({ slug, name }) => ({ slug, name }));
