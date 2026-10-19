export const SITE = {
  name: "Optim Catering",
  phone: "0727 944 844",
  phoneHref: "tel:+40727944844",
  whatsapp: "40727944844",
  email: "contact@optimcatering.ro",
  street: "Str. Republicii 191",
  locality: "Gilău",
  region: "Cluj",
  postal: "407310",
  hours: "Luni – Vineri, 09:00 – 15:00",
  facebook: "https://www.facebook.com/p/Optim-Catering-100080055056942/",
  areas: ["Gilău", "Florești", "Cluj-Napoca", "Apahida", "Baciu", "Luna de Sus", "Săvădisla", "Căpușu Mare", "Huedin", "Turda"],
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
  "@id": "https://optimcatering.ro/#business",
  name: SITE.name,
  description: "Catering în Cluj-Napoca, Florești, Gilău și tot județul Cluj: meniul zilei, platouri, evenimente, nunți, botezuri și pachete de prânz pentru firme.",
  telephone: "+40727944844",
  email: SITE.email,
  servesCuisine: "Românească",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    postalCode: SITE.postal,
    addressCountry: "RO",
  },
  areaServed: [
    ...SITE.areas.map((a) => ({ "@type": "City", name: a })),
    { "@type": "AdministrativeArea", name: "Județul Cluj" },
  ],
  url: "https://optimcatering.ro/",
  image: "https://optimcatering.ro/favicon.ico",
  hasMap: "https://maps.google.com/?q=Str.+Republicii+191,+Gil%C4%83u",
  geo: { "@type": "GeoCoordinates", latitude: 46.7536, longitude: 23.3826 },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "15:00",
  }],
  contactPoint: [{
    "@type": "ContactPoint",
    telephone: "+40727944844",
    contactType: "customer service",
    availableLanguage: ["ro"],
    url: "https://wa.me/40727944844",
  }],
  acceptsReservations: "True",
  sameAs: [SITE.facebook],
};
