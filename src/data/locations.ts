/**
 * Cities served — drives /[service]/[city] local SEO pages, the "Cities We Serve"
 * section, sitemaps, and LocalBusiness JSON-LD. Original blurbs per city.
 */

export type City = {
  slug: string;
  name: string;
  county: "Miami-Dade" | "Broward";
  zips: string[];
  /** Nearby city slugs for internal linking. */
  nearby: string[];
  /** Original 1–2 sentence local context, woven into local pages. */
  blurb: string;
  /** Notable areas/neighborhoods for natural local keywords. */
  areas: string[];
};

export const cities: City[] = [
  {
    slug: "hialeah",
    name: "Hialeah",
    county: "Miami-Dade",
    zips: ["33010", "33012", "33013", "33014", "33015", "33016", "33018"],
    nearby: ["miami-lakes", "miami", "doral", "miami-gardens"],
    blurb:
      "As a Hialeah-based agency, we know this community inside and out — from the busy corridors of West 49th Street to the families and small businesses that make the city run.",
    areas: ["West Hialeah", "Hialeah Gardens", "Palm Springs", "East Hialeah"],
  },
  {
    slug: "miami",
    name: "Miami",
    county: "Miami-Dade",
    zips: ["33125", "33126", "33135", "33142", "33145", "33155", "33165", "33175"],
    nearby: ["hialeah", "doral", "coral-gables", "sweetwater"],
    blurb:
      "From Little Havana to Brickell, Miami drivers and businesses face some of the highest insurance costs in the country — making it exactly the place where comparing carriers pays off most.",
    areas: ["Little Havana", "Flagami", "Westchester", "Brickell"],
  },
  {
    slug: "doral",
    name: "Doral",
    county: "Miami-Dade",
    zips: ["33122", "33126", "33166", "33172", "33178", "33182"],
    nearby: ["miami", "sweetwater", "hialeah", "miami-lakes"],
    blurb:
      "Doral's fast-growing business community and commercial corridors mean commercial auto, fleet, and business coverage are in constant demand — and we specialize in all three.",
    areas: ["Downtown Doral", "Doral Isles", "Sabal Chase"],
  },
  {
    slug: "kendall",
    name: "Kendall",
    county: "Miami-Dade",
    zips: ["33156", "33176", "33183", "33186", "33193", "33196"],
    nearby: ["miami", "cutler-bay", "coral-gables", "sweetwater"],
    blurb:
      "Kendall's sprawling neighborhoods and family households make bundling home and auto one of the smartest ways residents here cut their insurance costs.",
    areas: ["West Kendall", "The Hammocks", "Pinecrest border", "Sunset"],
  },
  {
    slug: "miami-lakes",
    name: "Miami Lakes",
    county: "Miami-Dade",
    zips: ["33014", "33016", "33018"],
    nearby: ["hialeah", "miami-gardens", "doral", "miramar"],
    blurb:
      "The Town of Miami Lakes blends quiet residential streets with a strong small-business base, where homeowners and entrepreneurs alike benefit from a local agent who shops the market.",
    areas: ["Royal Oaks", "Loch Lomond", "Lake Patricia"],
  },
  {
    slug: "homestead",
    name: "Homestead",
    county: "Miami-Dade",
    zips: ["33030", "33031", "33032", "33033", "33034", "33035"],
    nearby: ["cutler-bay", "kendall", "miami"],
    blurb:
      "In Homestead and the surrounding South Dade communities, hurricane exposure and growing neighborhoods make strong home and flood coverage especially important.",
    areas: ["Florida City border", "Keys Gate", "Leisure City"],
  },
  {
    slug: "miramar",
    name: "Miramar",
    county: "Broward",
    zips: ["33023", "33025", "33027", "33029"],
    nearby: ["pembroke-pines", "hollywood", "miami-gardens", "miami-lakes"],
    blurb:
      "Spanning the Miami-Dade and Broward line, Miramar's mix of new developments and established neighborhoods keeps home and auto bundling in high demand.",
    areas: ["Silver Lakes", "Sunset Lakes", "Historic Miramar"],
  },
  {
    slug: "pembroke-pines",
    name: "Pembroke Pines",
    county: "Broward",
    zips: ["33023", "33024", "33025", "33026", "33027", "33028", "33029"],
    nearby: ["miramar", "hollywood", "miami-gardens"],
    blurb:
      "One of Broward's largest cities, Pembroke Pines is full of families and small businesses looking to lower premiums without sacrificing protection.",
    areas: ["Pembroke Falls", "Chapel Trail", "Silver Lakes"],
  },
  {
    slug: "hollywood",
    name: "Hollywood",
    county: "Broward",
    zips: ["33019", "33020", "33021", "33023", "33024", "33025"],
    nearby: ["pembroke-pines", "miramar", "aventura"],
    blurb:
      "From the historic downtown to the beachfront, Hollywood's coastal location makes wind, flood, and home coverage a top priority for residents and businesses.",
    areas: ["Hollywood Beach", "Emerald Hills", "Hollywood Hills"],
  },
  {
    slug: "coral-gables",
    name: "Coral Gables",
    county: "Miami-Dade",
    zips: ["33114", "33134", "33143", "33146", "33156"],
    nearby: ["miami", "kendall", "sweetwater"],
    blurb:
      "In The City Beautiful, higher home values and prestige vehicles make right-sized coverage and umbrella protection especially worthwhile.",
    areas: ["Coral Way", "Riviera", "Gables by the Sea"],
  },
  {
    slug: "miami-gardens",
    name: "Miami Gardens",
    county: "Miami-Dade",
    zips: ["33014", "33054", "33055", "33056", "33169", "33179"],
    nearby: ["miami-lakes", "hialeah", "pembroke-pines", "aventura"],
    blurb:
      "Miami Gardens is a vibrant community of homeowners and entrepreneurs where shopping multiple carriers consistently uncovers meaningful savings.",
    areas: ["Carol City", "Bunche Park", "Norland"],
  },
  {
    slug: "sweetwater",
    name: "Sweetwater",
    county: "Miami-Dade",
    zips: ["33172", "33174", "33182", "33184"],
    nearby: ["doral", "miami", "kendall"],
    blurb:
      "Near FIU and West Miami-Dade's busy commercial zones, Sweetwater's students, families, and businesses all benefit from a bilingual local agent.",
    areas: ["West Miami border", "Fontainebleau", "University Park"],
  },
  {
    slug: "north-miami",
    name: "North Miami",
    county: "Miami-Dade",
    zips: ["33161", "33168", "33181", "33179"],
    nearby: ["aventura", "miami-gardens", "miami"],
    blurb:
      "North Miami's diverse neighborhoods and coastal proximity make affordable auto, home, and flood coverage a community priority.",
    areas: ["Keystone Point", "Sans Souci", "North Miami Beach border"],
  },
  {
    slug: "aventura",
    name: "Aventura",
    county: "Miami-Dade",
    zips: ["33160", "33180"],
    nearby: ["north-miami", "hollywood", "miami-gardens"],
    blurb:
      "With its high-rise condos and luxury vehicles, Aventura residents often need higher liability limits, umbrella coverage, and careful condo protection.",
    areas: ["Aventura Lakes", "Williams Island", "Hallandale border"],
  },
  {
    slug: "cutler-bay",
    name: "Cutler Bay",
    county: "Miami-Dade",
    zips: ["33157", "33189", "33190"],
    nearby: ["kendall", "homestead", "miami"],
    blurb:
      "In coastal Cutler Bay, hurricane and flood exposure make robust home coverage essential, while families look to bundle and save on auto.",
    areas: ["Lakes by the Bay", "Saga Bay", "Cutler Ridge"],
  },
];

export const citySlugs = cities.map((c) => c.slug);

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getNearbyCities(slug: string): City[] {
  const city = getCity(slug);
  if (!city) return [];
  return city.nearby.map(getCity).filter(Boolean) as City[];
}
