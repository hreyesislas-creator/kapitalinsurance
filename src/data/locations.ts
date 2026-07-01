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
  /**
   * Genuinely unique local context (2 paragraphs) — driving conditions,
   * weather/flood exposure, commercial activity, and neighborhood character.
   * Written qualitatively to avoid unsupported factual claims.
   */
  localContext: string[];
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
    localContext: [
      "Hialeah is one of Miami-Dade's most densely built cities, and daily driving here means a tight grid of surface streets with plenty of stop-and-go traffic along major avenues like West 49th Street and Palm Avenue. That kind of close-quarters city driving is exactly where comprehensive and uninsured-motorist coverage tend to earn their keep, and it's why so many local drivers ask us to compare limits rather than just chase the lowest sticker price.",
      "Sitting inland, Hialeah is less exposed to coastal storm surge than the beachfront cities, but summer thunderstorms and passing tropical systems still bring heavy rain and wind that can affect homes and vehicles. With a large share of multi-family homes, renters, and hard-working small businesses — auto shops, warehouses, and storefronts — the right mix here is often a blend of renters or homeowners coverage, windstorm protection, and a commercial policy sized to the business.",
    ],
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
    localContext: [
      "Miami is among the most congested driving environments in Florida, with dense traffic, tight urban parking, and long stretches of highway that see frequent fender-benders. In an environment like this, drivers often weigh higher liability limits and strong uninsured-motorist coverage, since a busy metro means a wider mix of vehicles and drivers sharing the road every day.",
      "The city's housing runs the full range, from historic single-family neighborhoods in Little Havana and Flagami to the high-rise condos of Brickell. That variety shapes coverage: condo residents typically need an HO-6 unit-owner policy that works alongside the building's master policy, while homeowners farther inland focus on windstorm and rebuild valuations. Comparing several carriers is usually the most effective way to manage Miami's higher-than-average premiums.",
    ],
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
    localContext: [
      "Doral has grown into a major business hub next to Miami International Airport, with extensive warehouse, logistics, and office space. That commercial density drives steady demand for commercial auto, fleet, and business owners policies, and weekday traffic around the airport and the Palmetto Expressway keeps commercial and personal auto coverage front of mind for the people who work here.",
      "Alongside the business districts, Doral's planned residential communities feature newer construction and family households, which often pairs well with bundling home and auto. Whether it's a delivery fleet, a storefront, or a family home near Downtown Doral, we compare carriers to match the coverage to how the vehicle or property is actually used.",
    ],
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
    localContext: [
      "Kendall is a large, spread-out suburban area, and many residents here face long daily commutes on the Palmetto Expressway, the Turnpike, and US-1. More time on the road generally means more exposure, so drivers often look closely at comprehensive coverage and liability limits rather than settling for a bare-minimum policy.",
      "Single-family homes dominate much of West Kendall and The Hammocks, which makes bundling home and auto one of the most practical ways local households lower their overall premium. Newer subdivisions and established family neighborhoods alike benefit from right-sizing dwelling coverage and comparing multiple carriers before renewing.",
    ],
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
    localContext: [
      "Miami Lakes is a planned town of tree-lined residential streets built around a well-established business park, giving it a quieter, more suburban feel than its busier neighbors. Homeowners and local entrepreneurs here often benefit most from a side-by-side carrier comparison, since the mix of residential and commercial needs rewards a policy tailored to each.",
      "Its inland location tempers coastal storm-surge risk, but seasonal storms still bring wind and heavy rain that make windstorm and comprehensive coverage worthwhile. For many households, bundling home and auto with the same carrier is a straightforward way to keep protection strong while trimming the monthly bill.",
    ],
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
    localContext: [
      "Homestead sits in South Miami-Dade near open agricultural land and closer to the paths of the storms that have historically affected the region. That exposure makes hurricane windstorm coverage and a separate flood policy especially important considerations for homeowners, since standard policies typically treat wind and flood differently.",
      "The area has seen rapid residential growth, with many newer homes and first-time buyers in communities like Keys Gate and Leisure City. For families protecting a first home, we focus on getting the rebuild valuation right, confirming the wind and flood picture, and pairing it with an auto policy that keeps the overall cost manageable.",
    ],
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
    localContext: [
      "Miramar is a master-planned Broward city that stretches along the county line, pairing newer western communities like Silver Lakes and Sunset Lakes with the more established neighborhoods of Historic Miramar. Commuters here rely heavily on I-75 and Miramar Parkway, so auto coverage that reflects real daily mileage is a common starting point for our conversations.",
      "The city's many family households make home-and-auto bundling especially popular as a way to save. Even in the inland western developments, seasonal hurricane risk keeps windstorm coverage relevant, and we help residents balance strong protection against the premium.",
    ],
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
    localContext: [
      "Pembroke Pines is one of Broward's larger suburban cities, filled with families, gated communities like Pembroke Falls and Chapel Trail, and a healthy base of small businesses. Residents here routinely compare carriers to bring down home and auto premiums, and the community's suburban layout means most households run multiple vehicles worth covering together.",
      "The western neighborhoods sit near the Everglades buffer, where seasonal rain and drainage patterns make comprehensive auto coverage and a careful look at flood exposure sensible. Our role is to line up several carriers side by side so families can keep their protection strong while managing the monthly cost.",
    ],
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
    localContext: [
      "Hollywood runs from a historic downtown all the way to the beachfront Broadwalk, and that coastal position makes windstorm and flood coverage a priority for many homes near the water. Older housing stock in the downtown core can also affect how a home policy is written, so getting the roof, construction, and rebuild details right matters here.",
      "The beachside economy supports a lot of small businesses — shops, restaurants, and rentals — that need commercial coverage suited to a tourism-driven area. Whether it's a beachfront condo needing an HO-6 policy or a storefront near the Broadwalk, we compare carriers to fit the coastal risk without overpaying.",
    ],
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
    localContext: [
      "Known as The City Beautiful, Coral Gables is defined by higher property values, historic Mediterranean-style homes, a mature tree canopy, and notably strict building and design codes. Those factors push homeowners to pay close attention to rebuild valuations and to consider umbrella liability, since replacing a distinctive older home can cost more than a quick estimate suggests.",
      "Residents here often drive higher-value vehicles, which makes comprehensive coverage and higher liability limits worth a careful look. The combination of substantial homes and prestige cars is exactly where bundling and umbrella protection tend to deliver the best balance of coverage and value — and where comparing carriers really pays off.",
    ],
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
    localContext: [
      "Miami Gardens is a lively residential and commercial community — home to Hard Rock Stadium — with many homeowners and local entrepreneurs across neighborhoods like Carol City and Norland. Comparing several carriers here frequently uncovers meaningful savings on both home and auto, especially for households running more than one vehicle.",
      "Its inland setting reduces coastal storm-surge exposure, but seasonal storms still bring wind and heavy rain that keep windstorm coverage relevant for local homes. For the area's small-business owners, we also help match commercial coverage to how the business actually operates rather than to a generic template.",
    ],
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
    localContext: [
      "Sweetwater is a compact, densely populated city next to Florida International University, with a large share of students, renters, and families alongside busy commercial corridors. That mix makes renters coverage and well-structured auto policies especially common, and a bilingual local agent helps first-time buyers understand exactly what they're paying for.",
      "Some low-lying areas near the western canals make comprehensive auto coverage and a look at flood considerations worthwhile. With FIU traffic and nearby commercial zones adding to daily congestion, we help residents weigh liability and uninsured-motorist limits that fit real conditions on the road.",
    ],
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
    localContext: [
      "North Miami is a diverse city that sits close to Biscayne Bay, and its eastern neighborhoods like Keystone Point and Sans Souci are near enough to the water to raise flood and windstorm considerations. Getting the flood picture right — separately from the standard home policy — is often an important step for waterfront and near-water homeowners here.",
      "The city blends single-family homes with condos, which shapes very different coverage needs from one block to the next. Affordable auto and home protection are community priorities, and comparing multiple carriers is usually the most reliable way to keep premiums in check without cutting essential coverage.",
    ],
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
    localContext: [
      "Aventura is defined by high-rise condominiums, luxury retail, and waterfront living, which gives its coverage needs a distinct shape. Condo residents typically need an HO-6 unit-owner policy that dovetails with the building's master policy, and it's worth confirming exactly where the association's coverage ends and the owner's begins.",
      "Many residents also own high-value vehicles, making higher liability limits and umbrella coverage a common recommendation. The community's coastal proximity keeps windstorm and flood coverage important, so we help owners balance premium protection for both the home and the car.",
    ],
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
    localContext: [
      "Cutler Bay is a coastal South Miami-Dade town where storm-surge and flood exposure make strong home coverage and a dedicated flood policy essential considerations. Neighborhoods like Lakes by the Bay sit close to the water, so confirming both windstorm and flood protection is usually near the top of the list for homeowners here.",
      "Much of the area was rebuilt and expanded in the decades since Hurricane Andrew, meaning a lot of relatively modern construction alongside established family neighborhoods. Families here frequently bundle home and auto to manage the overall cost, and we compare carriers to keep that coastal protection affordable.",
    ],
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
