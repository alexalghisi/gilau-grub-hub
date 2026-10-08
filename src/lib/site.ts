// Date de contact — DE CONFIRMAT cu clientul.
export const SITE = {
  name: "Optim Catering",
  phone: "07xx xxx xxx",
  phoneHref: "tel:+4070000000",
  email: "contact@optimcatering.ro",
  street: "Gilău",
  locality: "Gilău",
  region: "Cluj",
  postal: "407310",
  hours: "Luni – Vineri, 08:00 – 16:00",
  facebook: "https://www.facebook.com/search/top?q=Optim%20Catering%20Gil%C4%83u",
  areas: ["Gilău", "Florești", "Cluj-Napoca", "Luna de Sus", "Săvădisla", "Căpușu Mare"],
};

export type Dish = { name: string; note?: string; price: number };
export type DailyMenu = { date: string; dishes: Dish[] };

// Meniuri zilnice — cel mai nou primul. Se actualizează din pagina de Facebook.
export const DAILY_MENUS: [DailyMenu, ...DailyMenu[]] = [
  {
    date: "2026-10-08",
    dishes: [
      { name: "Ciorbă de perișoare", note: "cu smântână și ardei iute", price: 15 },
      { name: "Pulpă de pui la cuptor", note: "cu piure de cartofi", price: 28 },
      { name: "Salată de varză", price: 6 },
    ],
  },
  {
    date: "2026-10-07",
    dishes: [
      { name: "Supă de găluște", price: 14 },
      { name: "Tocăniță de porc", note: "cu mămăligă", price: 29 },
      { name: "Murături asortate", price: 6 },
    ],
  },
  {
    date: "2026-10-06",
    dishes: [
      { name: "Ciorbă de fasole cu afumătură", price: 15 },
      { name: "Șnițel de pui", note: "cu cartofi wedges", price: 30 },
      { name: "Clătite cu gem", price: 10 },
    ],
  },
  {
    date: "2026-10-05",
    dishes: [
      { name: "Ciorbă rădăuțeană", price: 16 },
      { name: "Sarmale cu mămăligă", note: "și smântână", price: 32 },
    ],
  },
];

export const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("ro-RO", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": ["FoodEstablishment", "LocalBusiness"],
  name: SITE.name,
  description: "Catering în Gilău, Florești și Cluj-Napoca: meniul zilei, evenimente, nunți, botezuri și pachete de prânz pentru firme.",
  telephone: SITE.phone,
  email: SITE.email,
  servesCuisine: "Românească",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    postalCode: SITE.postal,
    addressCountry: "RO",
  },
  areaServed: SITE.areas.map((a) => ({ "@type": "City", name: a })),
  sameAs: [SITE.facebook],
};
