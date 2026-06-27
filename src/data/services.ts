/**
 * Service catalog — drives /[service] SEO pages, navigation, home grid,
 * sitemaps, internal linking, and Service/FAQ JSON-LD.
 * All copy is original to Kapital Insurance Group. No placeholder text.
 */

export type FAQ = { question: string; answer: string };

export type ServiceCategory = "personal" | "commercial" | "specialty" | "services";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  /** Lower = higher business priority. */
  priority: number;
  icon: IconKey;
  category: ServiceCategory;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSub: string;
  /** 1–2 original SEO paragraphs shown in the body. */
  intro: string[];
  benefits: { title: string; description: string }[];
  coverages: { title: string; description: string }[];
  faqs: FAQ[];
  related: string[];
  /** Generate /[service]/[city] local pages for this service. */
  localEnabled?: boolean;
  /** Noun used in local page copy, e.g. "auto insurance". */
  localNoun?: string;
  keywords: string[];
};

export type IconKey =
  | "car"
  | "truck"
  | "home"
  | "briefcase"
  | "shield"
  | "hardhat"
  | "motorcycle"
  | "boat"
  | "key"
  | "wave"
  | "heart"
  | "leaf"
  | "umbrella"
  | "badge"
  | "stamp"
  | "building";

export const services: Service[] = [
  {
    slug: "auto-insurance",
    name: "Auto Insurance",
    shortName: "Auto",
    priority: 1,
    icon: "car",
    category: "personal",
    localEnabled: true,
    localNoun: "auto insurance",
    metaTitle: "Auto Insurance in Hialeah, FL — Cheap Car Insurance Quotes",
    metaDescription:
      "Compare cheap car insurance in Hialeah and Miami with Kapital Insurance Group. We shop top Florida carriers for full coverage, SR-22, and liability. Free quote in minutes.",
    heroEyebrow: "Auto Insurance",
    heroHeadline: "Better Car Coverage. Lower Payments.",
    heroSub:
      "We compare Florida's top auto carriers in one quick call so you stop overpaying — full coverage, liability, and SR-22 made simple.",
    intro: [
      "Florida is one of the most expensive states in the country for car insurance, and rates can swing hundreds of dollars between carriers for the exact same driver. As an independent UniVista franchise, Kapital Insurance Group isn't tied to a single company — we shop dozens of A-rated Florida carriers at once and bring you the lowest price for the coverage you actually need.",
      "Whether you need state-minimum liability to get back on the road, true full coverage to protect a financed vehicle, or an SR-22 filing after a ticket, our team in Hialeah handles the paperwork and finds the discounts most drivers never hear about — multi-policy, multi-vehicle, safe-driver, and paid-in-full savings included.",
    ],
    benefits: [
      { title: "We shop, you save", description: "One quote request compares dozens of carriers instead of one — the average switcher saves real money in minutes." },
      { title: "Same-day coverage & ID cards", description: "Need proof of insurance today? We bind coverage fast and send your digital ID cards immediately." },
      { title: "SR-22 specialists", description: "Tickets, lapses, or a DUI on record? We file your SR-22 with the state and keep you compliant." },
      { title: "Bilingual local team", description: "Real people in Hialeah who speak English and Spanish — no call-center runaround, ever." },
    ],
    coverages: [
      { title: "Liability (BI & PD)", description: "Covers injuries and property damage you cause to others — the foundation of every Florida policy." },
      { title: "PIP / No-Fault", description: "Florida-required Personal Injury Protection that pays your medical bills regardless of fault." },
      { title: "Collision & Comprehensive", description: "Repairs or replaces your car after an accident, theft, flood, or storm — required by most lenders." },
      { title: "Uninsured Motorist", description: "Protects you when an at-fault driver has no insurance — and roughly 1 in 5 Florida drivers don't." },
      { title: "Roadside & Rental", description: "Towing, lockout, and a rental car while yours is in the shop, added for just a few dollars a month." },
    ],
    faqs: [
      { question: "What is the minimum car insurance required in Florida?", answer: "Florida requires $10,000 in Personal Injury Protection (PIP) and $10,000 in Property Damage Liability (PDL). However, those minimums leave most drivers badly underinsured — we'll show you affordable options that actually protect your finances." },
      { question: "How can I get cheaper car insurance in Hialeah?", answer: "The fastest way is to let an independent agency compare carriers for you. We also stack discounts — bundling with home or renters, insuring multiple vehicles, paying in full, and maintaining a clean record can each lower your premium." },
      { question: "Can you file an SR-22 for me?", answer: "Yes. We file SR-22 (and FR-44) certificates directly with the state of Florida and pair them with the cheapest qualifying policy so you stay legal without overpaying." },
      { question: "Do you offer coverage for high-risk or new drivers?", answer: "Absolutely. We work with carriers that specialize in new drivers, drivers with tickets or accidents, and those rebuilding their record after a lapse." },
      { question: "How fast can I get insured?", answer: "Most customers are insured the same day. Call us or request a quote online and we can usually have you covered with digital ID cards within the hour." },
    ],
    related: ["commercial-auto-insurance", "motorcycle-insurance", "sr22", "renters-insurance"],
    keywords: ["car insurance hialeah", "cheap auto insurance miami", "sr22 florida", "full coverage car insurance"],
  },
  {
    slug: "commercial-auto-insurance",
    name: "Commercial Auto Insurance",
    shortName: "Commercial Auto",
    priority: 2,
    icon: "truck",
    category: "commercial",
    localEnabled: true,
    localNoun: "commercial auto insurance",
    metaTitle: "Commercial Auto Insurance in Hialeah, FL — Fleet & Truck Coverage",
    metaDescription:
      "Protect your vehicles and drivers with commercial auto insurance from Kapital Insurance Group in Hialeah. Coverage for trucks, vans, fleets, and contractors. Fast COIs and free quotes.",
    heroEyebrow: "Commercial Auto Insurance",
    heroHeadline: "Keep Your Business Moving.",
    heroSub:
      "From a single work van to a full fleet, we insure the vehicles that power your business — with fast certificates of insurance and competitive rates.",
    intro: [
      "If you use a vehicle to make money — deliveries, contracting, transport, ride-share, or hauling — a personal auto policy won't protect you when something goes wrong. Commercial auto insurance covers the higher liability, cargo, and downtime risks that come with running a business on the road.",
      "Kapital Insurance Group works with carriers that specialize in South Florida's tradespeople and fleet operators. We tailor limits to your contracts, add the drivers and vehicles you need, and turn around certificates of insurance (COIs) quickly so you never lose a job waiting on paperwork.",
    ],
    benefits: [
      { title: "Fast certificates of insurance", description: "Need a COI to win a contract? We issue and send them same-day, with additional insureds added on request." },
      { title: "Single vehicle to full fleet", description: "Flexible policies that scale from one work truck to dozens of vehicles under one renewal." },
      { title: "Industry-specific coverage", description: "Contractors, delivery, landscaping, transport, and more — limits matched to how you actually operate." },
      { title: "Bundle & save", description: "Combine commercial auto with general liability or a business owner's policy for lower overall cost." },
    ],
    coverages: [
      { title: "Liability", description: "Bodily injury and property damage your business vehicles cause to others — often required at higher limits than personal auto." },
      { title: "Physical Damage", description: "Collision and comprehensive coverage to repair or replace your trucks, vans, and equipment vehicles." },
      { title: "Hired & Non-Owned Auto", description: "Extends coverage to rented vehicles and employees' personal cars used for business errands." },
      { title: "Cargo & Tools", description: "Protects the goods, materials, and equipment you carry while on the job." },
      { title: "Medical Payments", description: "Covers medical costs for you and your passengers after an accident, regardless of fault." },
    ],
    faqs: [
      { question: "Do I need commercial auto insurance if I use my personal truck for work?", answer: "Usually yes. Personal policies typically exclude business use, meaning a claim could be denied. If you haul tools, make deliveries, or visit job sites for pay, commercial auto is the right coverage." },
      { question: "Can you add additional insureds to my policy?", answer: "Yes — we add additional insureds and issue updated certificates of insurance the same day so you can satisfy contract requirements quickly." },
      { question: "How are commercial auto rates determined?", answer: "Carriers look at vehicle type and value, driving records, radius of operation, cargo, and your business type. Because we shop multiple carriers, we find the one that prices your specific operation best." },
      { question: "Do you cover ride-share and delivery drivers?", answer: "Yes. We offer ride-share endorsements and commercial policies for delivery and gig drivers who need protection beyond a personal policy." },
    ],
    related: ["business-insurance", "general-liability-insurance", "workers-compensation", "auto-insurance"],
    keywords: ["commercial auto insurance miami", "fleet insurance florida", "box truck insurance", "contractor vehicle insurance"],
  },
  {
    slug: "home-insurance",
    name: "Home Insurance",
    shortName: "Home",
    priority: 3,
    icon: "home",
    category: "personal",
    localEnabled: true,
    localNoun: "home insurance",
    metaTitle: "Home Insurance in Hialeah, FL — Homeowners Coverage & Quotes",
    metaDescription:
      "Protect your home with affordable Florida homeowners insurance from Kapital Insurance Group. Hurricane, wind, and dwelling coverage compared across top carriers. Free quote today.",
    heroEyebrow: "Home Insurance",
    heroHeadline: "Protect What Matters Most.",
    heroSub:
      "Florida homeowners insurance is complicated — wind, flood, and roof rules change fast. We make it simple and find you the strongest coverage for less.",
    intro: [
      "Owning a home in South Florida means protecting it against hurricanes, wind, water, and liability — all in one of the toughest insurance markets in the country. The difference between carriers can be thousands of dollars and the fine print on roof and wind coverage matters more here than almost anywhere else.",
      "Kapital Insurance Group cuts through the confusion. We compare Florida-admitted and surplus carriers, explain your hurricane and wind deductibles in plain language, and structure a policy that satisfies your mortgage lender while keeping your premium as low as possible.",
    ],
    benefits: [
      { title: "Hurricane & wind expertise", description: "We explain wind/hurricane deductibles clearly and find carriers still writing strong coverage in your area." },
      { title: "Lender-ready policies", description: "Need proof of insurance to close? We issue documents your mortgage company will accept the same day." },
      { title: "Bundle home + auto", description: "Combining policies is one of the biggest discounts available — we'll quote it both ways." },
      { title: "Replacement-cost coverage", description: "We push for replacement cost over actual cash value so you can truly rebuild after a loss." },
    ],
    coverages: [
      { title: "Dwelling (Coverage A)", description: "Rebuilds the structure of your home after a covered fire, storm, or disaster." },
      { title: "Other Structures & Personal Property", description: "Covers fences, sheds, and your belongings inside and outside the home." },
      { title: "Liability & Medical", description: "Protects you if someone is injured on your property or you're held responsible for damage." },
      { title: "Loss of Use", description: "Pays for temporary housing and expenses if your home becomes uninhabitable after a covered loss." },
      { title: "Wind / Hurricane", description: "Critical in Florida — covers storm and named-hurricane damage, often with a separate deductible." },
    ],
    faqs: [
      { question: "Is flood damage covered by home insurance in Florida?", answer: "No — standard homeowners policies exclude flood. In South Florida we strongly recommend a separate flood policy, which we also offer and can bundle with your home coverage." },
      { question: "Why is Florida home insurance so expensive?", answer: "Hurricane risk, roofing litigation, and reinsurance costs drive premiums up statewide. Shopping multiple carriers is the single best way to control cost — which is exactly what we do for you." },
      { question: "Does my roof's age affect my premium?", answer: "Yes, significantly. Many Florida carriers limit coverage or raise rates on roofs older than 15 years. We know which carriers are most favorable based on your roof's age and condition." },
      { question: "Can I get covered if I've had a prior claim?", answer: "Often yes. We work with multiple carriers, including specialty markets, so a past claim doesn't automatically price you out." },
    ],
    related: ["flood-insurance", "auto-insurance", "umbrella-insurance", "renters-insurance"],
    keywords: ["home insurance hialeah", "florida homeowners insurance", "hurricane insurance miami", "cheap home insurance"],
  },
  {
    slug: "business-insurance",
    name: "Business Insurance",
    shortName: "Business",
    priority: 4,
    icon: "briefcase",
    category: "commercial",
    localEnabled: true,
    localNoun: "business insurance",
    metaTitle: "Business Insurance in Hialeah, FL — Small Business Coverage",
    metaDescription:
      "Protect your company with tailored business insurance from Kapital Insurance Group in Hialeah. General liability, BOP, property, and workers' comp for South Florida businesses. Free quote.",
    heroEyebrow: "Business Insurance",
    heroHeadline: "Built to Protect Your Business.",
    heroSub:
      "From a food truck to a 50-person shop, we build coverage around how your business actually runs — and keep your certificates ready when clients ask.",
    intro: [
      "Your business is too important to leave exposed. A single liability claim, fire, or injured employee can wipe out years of work. Business insurance bundles the protections a South Florida company needs — liability, property, and income protection — into coverage you can afford.",
      "Kapital Insurance Group specializes in small and mid-sized businesses across Miami-Dade and Broward. We assess your real exposures, recommend the right mix (often a Business Owner's Policy plus workers' comp), and shop carriers so you get strong protection without overpaying.",
    ],
    benefits: [
      { title: "One agency, every policy", description: "General liability, property, BOP, workers' comp, and commercial auto — managed together, renewed together." },
      { title: "Certificates on demand", description: "Win contracts faster with same-day COIs and additional insureds whenever a client requires them." },
      { title: "Right-sized coverage", description: "We don't oversell. You get the limits your industry and contracts actually require — nothing wasted." },
      { title: "Local, bilingual service", description: "A real agent in Hialeah who knows South Florida business — in English or Spanish." },
    ],
    coverages: [
      { title: "General Liability", description: "Covers third-party injury and property damage claims — the baseline most clients and landlords require." },
      { title: "Business Owner's Policy (BOP)", description: "Bundles liability and property at a discount — ideal for shops, offices, and contractors." },
      { title: "Commercial Property", description: "Protects your building, equipment, inventory, and improvements against fire, theft, and storms." },
      { title: "Business Interruption", description: "Replaces lost income and covers expenses while you recover from a covered shutdown." },
      { title: "Workers' Compensation", description: "Required for most Florida employers — covers medical bills and lost wages for injured staff." },
    ],
    faqs: [
      { question: "What insurance does a small business in Florida need?", answer: "Most start with general liability, and many add a Business Owner's Policy (BOP) for property coverage. If you have employees, Florida usually requires workers' compensation. We'll assess your specific business and recommend the right mix." },
      { question: "What is a BOP and do I need one?", answer: "A Business Owner's Policy bundles general liability and commercial property at a lower combined price. It's a great fit for most small businesses with a location, equipment, or inventory." },
      { question: "How quickly can I get a certificate of insurance?", answer: "Same day in most cases. Once your policy is active, we issue COIs and add additional insureds whenever your contracts require them." },
      { question: "Can you cover home-based and online businesses?", answer: "Yes. We tailor coverage for home-based, e-commerce, and service businesses that may not need a full commercial property policy." },
    ],
    related: ["general-liability-insurance", "workers-compensation", "commercial-auto-insurance", "commercial-insurance"],
    keywords: ["business insurance hialeah", "small business insurance miami", "BOP florida", "general liability"],
  },
  {
    slug: "general-liability-insurance",
    name: "General Liability Insurance",
    shortName: "General Liability",
    priority: 5,
    icon: "shield",
    category: "commercial",
    metaTitle: "General Liability Insurance in Hialeah, FL — GL Coverage Quotes",
    metaDescription:
      "Get general liability insurance for your Florida business with Kapital Insurance Group. Coverage for third-party injury, property damage, and contracts. Same-day COIs and free quotes.",
    heroEyebrow: "General Liability Insurance",
    heroHeadline: "The Coverage Clients Require.",
    heroSub:
      "Most contracts, landlords, and licenses demand general liability. We get you covered fast — with the certificate in hand the same day.",
    intro: [
      "General liability (GL) is the cornerstone of business protection. It pays for third-party claims of bodily injury, property damage, and personal or advertising injury — the everyday risks that can turn into expensive lawsuits even when you did nothing wrong.",
      "Whether a landlord, client, or licensing board is requiring it, Kapital Insurance Group gets your GL policy bound quickly and at a competitive rate, then issues the certificate of insurance you need to keep your work moving.",
    ],
    benefits: [
      { title: "Meet contract requirements", description: "We match your limits to what clients and landlords demand — typically $1M/$2M — and prove it with a COI." },
      { title: "Affordable monthly options", description: "Flexible payment plans keep this essential coverage within reach for new and growing businesses." },
      { title: "Fast issuance", description: "Many GL policies can be bound same-day so you never lose a job over missing paperwork." },
      { title: "Bundle into a BOP", description: "Add property coverage and save by combining GL into a Business Owner's Policy." },
    ],
    coverages: [
      { title: "Bodily Injury", description: "Covers medical and legal costs if a customer or visitor is injured because of your business." },
      { title: "Property Damage", description: "Pays for damage your operations cause to someone else's property." },
      { title: "Personal & Advertising Injury", description: "Protects against claims like libel, slander, and copyright infringement in your advertising." },
      { title: "Products & Completed Operations", description: "Covers claims arising from your finished work or the products you sell." },
      { title: "Medical Payments", description: "Pays smaller injury costs quickly, often without a liability finding, to resolve incidents fast." },
    ],
    faqs: [
      { question: "How much general liability coverage do I need?", answer: "Most contracts require a $1,000,000 per-occurrence / $2,000,000 aggregate limit. We'll confirm your specific contract or license requirements and quote accordingly." },
      { question: "Is general liability the same as professional liability?", answer: "No. General liability covers physical injury and property damage, while professional liability (E&O) covers mistakes in professional services. Many businesses need both, and we can quote each." },
      { question: "How much does general liability cost?", answer: "Premiums vary by industry, revenue, and limits, but many small businesses pay a modest monthly amount. Because we shop carriers, we find the most competitive price for your trade." },
    ],
    related: ["business-insurance", "workers-compensation", "commercial-insurance", "commercial-auto-insurance"],
    keywords: ["general liability insurance miami", "GL insurance florida", "contractor liability insurance"],
  },
  {
    slug: "workers-compensation",
    name: "Workers Compensation Insurance",
    shortName: "Workers' Comp",
    priority: 6,
    icon: "hardhat",
    category: "commercial",
    metaTitle: "Workers' Compensation Insurance in Hialeah, FL — Workers Comp Quotes",
    metaDescription:
      "Florida workers' compensation insurance from Kapital Insurance Group in Hialeah. Stay compliant and protect employees from workplace injuries. Fast quotes for contractors and small businesses.",
    heroEyebrow: "Workers' Compensation",
    heroHeadline: "Protect Your Team. Stay Compliant.",
    heroSub:
      "Florida requires workers' comp for most employers. We keep you legal, your crew protected, and your premium under control.",
    intro: [
      "Workers' compensation covers medical bills and lost wages when an employee is hurt on the job — and in Florida it's legally required for most businesses, especially in construction. Going without it risks steep fines, stop-work orders, and personal liability.",
      "Kapital Insurance Group helps South Florida employers get compliant quickly and affordably. We classify your payroll correctly, find carriers that price your trade well, and keep your certificates current so you can take on the contracts you want.",
    ],
    benefits: [
      { title: "Stay legally compliant", description: "Avoid Florida stop-work orders and fines with the right coverage filed correctly the first time." },
      { title: "Construction specialists", description: "We know Florida's strict construction requirements and the carriers that handle trades well." },
      { title: "Pay-as-you-go options", description: "Premium based on actual payroll improves cash flow and reduces year-end audit surprises." },
      { title: "Fast certificates", description: "Same-day COIs so you can prove coverage to general contractors and project owners." },
    ],
    coverages: [
      { title: "Medical Benefits", description: "Pays for treatment, hospital stays, and rehabilitation for work-related injuries and illnesses." },
      { title: "Lost Wages", description: "Replaces a portion of an injured employee's income while they recover and can't work." },
      { title: "Disability Benefits", description: "Provides ongoing benefits for temporary or permanent disabilities resulting from a workplace injury." },
      { title: "Employer's Liability", description: "Protects your business against lawsuits related to workplace injuries." },
      { title: "Death Benefits", description: "Provides support to an employee's family in the event of a fatal work accident." },
    ],
    faqs: [
      { question: "Does Florida require workers' compensation insurance?", answer: "Generally, yes. Construction businesses must carry it with one or more employees, while most non-construction businesses need it at four or more. We'll confirm the rule for your industry." },
      { question: "How is my workers' comp premium calculated?", answer: "Premiums are based on your payroll, employee job classifications, and claims history. Correct classification is key — and one of the ways we keep your premium fair." },
      { question: "What happens if I don't carry workers' comp?", answer: "Florida can issue stop-work orders and significant fines, and you could be personally liable for an injured worker's costs. We help you get compliant quickly to avoid this." },
    ],
    related: ["business-insurance", "general-liability-insurance", "commercial-auto-insurance", "commercial-insurance"],
    keywords: ["workers comp insurance florida", "workers compensation hialeah", "construction workers comp"],
  },
  {
    slug: "life-insurance",
    name: "Life Insurance",
    shortName: "Life",
    priority: 7,
    icon: "heart",
    category: "personal",
    metaTitle: "Life Insurance in Hialeah, FL — Term & Whole Life Quotes",
    metaDescription:
      "Affordable term and whole life insurance from Kapital Insurance Group in Hialeah. Protect your family's future and lock in low rates. Free, no-pressure life insurance quotes.",
    heroEyebrow: "Life Insurance",
    heroHeadline: "Protect the People You Love.",
    heroSub:
      "Lock in affordable life insurance that replaces income, pays off debt, and gives your family security — for less than most people expect.",
    intro: [
      "Life insurance is one of the most meaningful and affordable ways to protect your family. The right policy can replace your income, pay off a mortgage, cover final expenses, and fund your children's future — all for a premium that's often lower than people assume, especially when you're young and healthy.",
      "Kapital Insurance Group helps you choose between term and permanent coverage based on your budget and goals, then compares carriers to lock in the best rate. No pressure, no jargon — just clear guidance and honest numbers.",
    ],
    benefits: [
      { title: "Income replacement", description: "Make sure your family can keep their home and lifestyle if something happens to you." },
      { title: "Term or permanent", description: "Affordable term for pure protection, or whole/universal life that builds cash value over time." },
      { title: "Lock in low rates", description: "The younger and healthier you are, the cheaper your premium — and it stays level for the term." },
      { title: "Mortgage & debt payoff", description: "Coverage sized to clear your mortgage and debts so loved ones aren't left with the bill." },
    ],
    coverages: [
      { title: "Term Life", description: "Affordable coverage for 10, 20, or 30 years — ideal for income replacement and mortgage protection." },
      { title: "Whole Life", description: "Permanent coverage that never expires and builds guaranteed cash value you can borrow against." },
      { title: "Universal Life", description: "Flexible permanent coverage with adjustable premiums and cash-value growth potential." },
      { title: "Final Expense", description: "Smaller, easy-to-qualify policies designed to cover funeral and end-of-life costs." },
    ],
    faqs: [
      { question: "How much life insurance do I need?", answer: "A common guideline is 10–12 times your annual income, plus enough to clear your mortgage and debts. We'll build a number around your family's real needs and budget." },
      { question: "Is term or whole life better?", answer: "Term offers the most coverage for the lowest cost and suits most families' needs during their working years. Whole life costs more but lasts your whole life and builds cash value. We'll help you weigh both." },
      { question: "Can I get life insurance without a medical exam?", answer: "Yes — many carriers now offer simplified and no-exam policies. They may cost a bit more, but they're fast and convenient. We'll compare exam and no-exam options for you." },
    ],
    related: ["health-insurance", "home-insurance", "auto-insurance", "umbrella-insurance"],
    keywords: ["life insurance hialeah", "term life insurance miami", "whole life insurance florida"],
  },
  {
    slug: "health-insurance",
    name: "Health Insurance",
    shortName: "Health",
    priority: 8,
    icon: "leaf",
    category: "personal",
    metaTitle: "Health Insurance in Hialeah, FL — ACA & Marketplace Plans",
    metaDescription:
      "Find affordable health insurance and ACA Marketplace plans with Kapital Insurance Group in Hialeah. We help you compare subsidies and coverage. Free, bilingual enrollment help.",
    heroEyebrow: "Health Insurance",
    heroHeadline: "Coverage That Fits Your Life.",
    heroSub:
      "Confused by the Marketplace? We help you compare plans, unlock subsidies, and enroll in coverage that fits your health and your budget.",
    intro: [
      "Choosing a health plan shouldn't require a degree in insurance. Between premiums, deductibles, networks, and subsidies, the Marketplace can feel overwhelming — and the wrong choice can cost you thousands. Kapital Insurance Group makes it simple and free to get expert help.",
      "Our bilingual team helps you compare ACA Marketplace plans, check whether you qualify for premium subsidies, and enroll in coverage that includes the doctors and benefits you need. We guide individuals, families, and the self-employed through every step.",
    ],
    benefits: [
      { title: "Maximize your subsidy", description: "Many people qualify for tax credits that dramatically lower premiums — we make sure you don't leave money on the table." },
      { title: "Compare plans clearly", description: "We translate deductibles, networks, and copays into plain language so you can choose with confidence." },
      { title: "Self-employed friendly", description: "Tailored guidance for freelancers, gig workers, and small business owners without employer coverage." },
      { title: "Free, no-pressure help", description: "Our enrollment assistance is free — we're here to help you find the right fit, not upsell you." },
    ],
    coverages: [
      { title: "ACA Marketplace Plans", description: "Individual and family plans across Bronze, Silver, Gold, and Platinum tiers, with subsidy eligibility checks." },
      { title: "Short-Term Medical", description: "Temporary coverage to bridge gaps between jobs or enrollment periods." },
      { title: "Supplemental Plans", description: "Dental, vision, accident, and critical illness coverage to fill out your protection." },
      { title: "Self-Employed Coverage", description: "Plan guidance built for freelancers and small business owners." },
    ],
    faqs: [
      { question: "When can I enroll in a health plan?", answer: "Open Enrollment typically runs in the fall, but major life events — losing coverage, moving, marriage, or a new baby — open a Special Enrollment Period. We'll let you know if you qualify to enroll now." },
      { question: "How do subsidies work?", answer: "Based on your household size and income, you may qualify for premium tax credits that lower your monthly cost — sometimes substantially. We calculate your eligibility before you enroll." },
      { question: "Do you charge for enrollment help?", answer: "No. Our health insurance guidance and enrollment assistance are free to you — we're compensated by the carriers, not by you." },
    ],
    related: ["life-insurance", "business-insurance", "auto-insurance", "home-insurance"],
    keywords: ["health insurance hialeah", "aca marketplace miami", "obamacare florida", "affordable health plans"],
  },
  {
    slug: "motorcycle-insurance",
    name: "Motorcycle Insurance",
    shortName: "Motorcycle",
    priority: 9,
    icon: "motorcycle",
    category: "specialty",
    metaTitle: "Motorcycle Insurance in Hialeah, FL — Cheap Bike Coverage",
    metaDescription:
      "Ride protected with affordable motorcycle insurance from Kapital Insurance Group in Hialeah. Liability, collision, and custom-parts coverage for Florida riders. Free quote in minutes.",
    heroEyebrow: "Motorcycle Insurance",
    heroHeadline: "Ride Protected. Pay Less.",
    heroSub:
      "Florida-tailored motorcycle coverage that protects you, your bike, and your custom parts — at a price built for riders.",
    intro: [
      "Florida's roads are made for riding year-round, but they also carry real risk. The right motorcycle policy protects your bike, your gear, and — most importantly — you, with coverage that fits how and where you ride.",
      "Kapital Insurance Group finds riders affordable coverage that goes beyond the basics, including protection for custom parts and accessories, plus discounts for safety courses, multiple bikes, and bundling with your auto policy.",
    ],
    benefits: [
      { title: "Rider-first coverage", description: "Policies built around real riding risks, not an afterthought tacked onto an auto policy." },
      { title: "Custom parts protection", description: "Cover the aftermarket parts and accessories that make your bike yours." },
      { title: "Safety-course discounts", description: "We apply every discount you qualify for — rider courses, multi-bike, and bundling." },
      { title: "Seasonal flexibility", description: "Options to right-size coverage if you ride seasonally or store your bike part of the year." },
    ],
    coverages: [
      { title: "Liability", description: "Covers injury and property damage you cause to others while riding." },
      { title: "Collision & Comprehensive", description: "Repairs or replaces your bike after a crash, theft, or storm." },
      { title: "Custom Parts & Equipment", description: "Protects upgrades, accessories, and aftermarket parts beyond standard limits." },
      { title: "Uninsured Motorist", description: "Protects you when an at-fault driver has little or no insurance." },
      { title: "Medical Payments", description: "Helps cover your medical bills after an accident, regardless of fault." },
    ],
    faqs: [
      { question: "Is motorcycle insurance required in Florida?", answer: "Florida doesn't mandate liability insurance just to register a motorcycle, but riders are still financially responsible for any harm they cause — and lenders require coverage on financed bikes. We strongly recommend liability and physical damage coverage." },
      { question: "Can I cover my custom parts and accessories?", answer: "Yes. We add custom parts and equipment coverage so your upgrades and accessories are protected beyond the standard policy limit." },
      { question: "How can I lower my motorcycle premium?", answer: "Completing a rider safety course, bundling with auto, insuring multiple bikes, and maintaining a clean record all help. We apply every discount you qualify for." },
    ],
    related: ["auto-insurance", "boat-insurance", "umbrella-insurance", "sr22"],
    keywords: ["motorcycle insurance hialeah", "cheap bike insurance miami", "florida motorcycle coverage"],
  },
  {
    slug: "boat-insurance",
    name: "Boat Insurance",
    shortName: "Boat",
    priority: 10,
    icon: "boat",
    category: "specialty",
    metaTitle: "Boat Insurance in Hialeah, FL — Watercraft & Yacht Coverage",
    metaDescription:
      "Protect your boat with watercraft insurance from Kapital Insurance Group in Hialeah. Coverage for liability, physical damage, and on-water towing across South Florida. Free quote.",
    heroEyebrow: "Boat Insurance",
    heroHeadline: "Enjoy the Water. We'll Handle the Risk.",
    heroSub:
      "South Florida boating is a lifestyle. We protect your vessel, passengers, and gear so you can focus on the water.",
    intro: [
      "From Biscayne Bay to the Keys, South Florida is one of the best places in the country to own a boat — and one of the most important places to insure it. Wind, storms, on-water accidents, and liability all create real exposure that a homeowners policy won't fully cover.",
      "Kapital Insurance Group matches boaters with watercraft coverage tailored to their vessel and how they use it — fishing, cruising, or watersports — including on-water towing, fuel-spill liability, and protection for gear and electronics.",
    ],
    benefits: [
      { title: "Coverage for any vessel", description: "From center consoles and bass boats to cruisers and personal watercraft." },
      { title: "On-water towing", description: "Add emergency towing and assistance so a breakdown doesn't ruin your day — or your wallet." },
      { title: "Gear & electronics", description: "Protect fishing equipment, electronics, and accessories alongside the hull." },
      { title: "Bundle & save", description: "Combine with auto or home for additional multi-policy discounts." },
    ],
    coverages: [
      { title: "Hull / Physical Damage", description: "Repairs or replaces your boat after a collision, storm, fire, or theft." },
      { title: "Liability", description: "Covers injury and property damage you cause to others on the water." },
      { title: "Medical Payments", description: "Helps cover medical costs for you and your passengers after an accident." },
      { title: "Uninsured Boater", description: "Protects you if another boater at fault has no insurance." },
      { title: "Towing & Assistance", description: "Pays for emergency on-water towing, jump-starts, and fuel delivery." },
    ],
    faqs: [
      { question: "Is boat insurance required in Florida?", answer: "Florida doesn't require boat insurance by law, but marinas and lenders often do, and you're financially responsible for accidents you cause. Given the value and risk, coverage is strongly recommended." },
      { question: "Does my homeowners policy cover my boat?", answer: "Usually only small boats and very limited amounts. A dedicated watercraft policy provides proper liability limits, physical damage, and on-water protection." },
      { question: "What affects my boat insurance rate?", answer: "Boat type, value, horsepower, your boating experience, and where you operate all matter. Because we compare carriers, we find the one that prices your vessel best." },
    ],
    related: ["motorcycle-insurance", "home-insurance", "umbrella-insurance", "flood-insurance"],
    keywords: ["boat insurance miami", "watercraft insurance florida", "yacht insurance hialeah"],
  },
  {
    slug: "renters-insurance",
    name: "Renters Insurance",
    shortName: "Renters",
    priority: 11,
    icon: "key",
    category: "personal",
    metaTitle: "Renters Insurance in Hialeah, FL — Cheap Renter Coverage",
    metaDescription:
      "Affordable renters insurance from Kapital Insurance Group in Hialeah. Protect your belongings and liability for less than you'd expect. Free quote and same-day proof for your landlord.",
    heroEyebrow: "Renters Insurance",
    heroHeadline: "Big Protection. Small Price.",
    heroSub:
      "Your landlord's policy doesn't cover your stuff. For just a few dollars a month, we protect your belongings and your liability.",
    intro: [
      "If you rent, your landlord's insurance only covers the building — not your belongings, and not your liability. Renters insurance fills that gap for a surprisingly low monthly cost, protecting your furniture, electronics, and clothing against theft, fire, and storms, and shielding you if someone is injured in your home.",
      "Kapital Insurance Group gets renters covered fast, often with same-day proof of insurance for your landlord, and bundles it with auto for extra savings.",
    ],
    benefits: [
      { title: "Affordable peace of mind", description: "Robust coverage often costs just a few dollars a month — far less than replacing your belongings." },
      { title: "Same-day proof for landlords", description: "Need to show coverage to move in? We issue documentation immediately." },
      { title: "Liability included", description: "Protects you if a guest is injured or you accidentally cause damage." },
      { title: "Bundle with auto", description: "Adding renters to your auto policy can lower your overall insurance cost." },
    ],
    coverages: [
      { title: "Personal Property", description: "Covers your belongings against theft, fire, vandalism, and certain water damage." },
      { title: "Liability", description: "Protects you if you're legally responsible for someone's injury or property damage." },
      { title: "Loss of Use", description: "Pays for temporary housing if your rental becomes uninhabitable after a covered loss." },
      { title: "Medical Payments", description: "Covers minor medical costs for guests injured in your home." },
    ],
    faqs: [
      { question: "How much does renters insurance cost in Florida?", answer: "Many renters pay just a few dollars a month for solid coverage. The exact price depends on your coverage amount and location, but it's one of the most affordable policies available." },
      { question: "What does renters insurance actually cover?", answer: "It covers your personal belongings, your liability if someone is injured in your home, and living expenses if your rental becomes uninhabitable after a covered event like a fire." },
      { question: "Does renters insurance cover flood?", answer: "No — like homeowners, standard renters policies exclude flood. We can add a separate flood policy if you live in a flood-prone area." },
    ],
    related: ["auto-insurance", "home-insurance", "flood-insurance", "life-insurance"],
    keywords: ["renters insurance hialeah", "cheap renters insurance miami", "apartment insurance florida"],
  },
  {
    slug: "flood-insurance",
    name: "Flood Insurance",
    shortName: "Flood",
    priority: 12,
    icon: "wave",
    category: "specialty",
    metaTitle: "Flood Insurance in Hialeah, FL — NFIP & Private Flood Quotes",
    metaDescription:
      "Protect your property with flood insurance from Kapital Insurance Group in Hialeah. NFIP and private flood coverage for South Florida homes and businesses. Free quote and risk review.",
    heroEyebrow: "Flood Insurance",
    heroHeadline: "South Florida Floods. Be Ready.",
    heroSub:
      "Home and business policies exclude flood — and just an inch of water can cause tens of thousands in damage. We get you protected.",
    intro: [
      "In South Florida, flooding isn't a rare event — it's a when, not an if. Yet standard home, renters, and business policies all exclude flood damage. A separate flood policy is the only way to protect your property from rising water, storm surge, and heavy-rain flooding.",
      "Kapital Insurance Group offers both NFIP and private flood options, reviews your flood-zone risk, and finds the coverage that satisfies your lender while keeping your premium reasonable — even outside high-risk zones, where rates are often surprisingly affordable.",
    ],
    benefits: [
      { title: "NFIP & private options", description: "We compare federal and private flood markets to find your best price and coverage." },
      { title: "Lender requirement help", description: "If your mortgage requires flood coverage, we make sure your policy satisfies it." },
      { title: "Low-risk zone savings", description: "Outside high-risk zones, flood coverage is often inexpensive — and well worth it in Florida." },
      { title: "Home & business", description: "Protect both your residence and your commercial property from costly water damage." },
    ],
    coverages: [
      { title: "Building Property", description: "Covers your home or building's structure, foundation, and major systems against flood damage." },
      { title: "Contents", description: "Protects your belongings, inventory, and equipment from flood losses." },
      { title: "Commercial Flood", description: "Coverage tailored to businesses, including stock and improvements." },
      { title: "Excess Flood", description: "Adds coverage above NFIP limits for higher-value homes and properties." },
    ],
    faqs: [
      { question: "Do I need flood insurance if I'm not in a high-risk zone?", answer: "It's smart to have it. More than a quarter of flood claims come from outside high-risk zones, and in those areas coverage is often very affordable — especially important in South Florida." },
      { question: "Why isn't flood covered by my home insurance?", answer: "Standard home, renters, and business policies specifically exclude flood. Flood must be purchased as a separate policy through the NFIP or a private carrier." },
      { question: "How much does flood insurance cost?", answer: "It depends on your flood zone, elevation, and coverage amount. In lower-risk zones it can be quite affordable. We'll review your risk and quote both NFIP and private options." },
    ],
    related: ["home-insurance", "renters-insurance", "business-insurance", "boat-insurance"],
    keywords: ["flood insurance hialeah", "nfip florida", "private flood insurance miami"],
  },
  {
    slug: "umbrella-insurance",
    name: "Umbrella Insurance",
    shortName: "Umbrella",
    priority: 13,
    icon: "umbrella",
    category: "specialty",
    metaTitle: "Umbrella Insurance in Hialeah, FL — Extra Liability Coverage",
    metaDescription:
      "Add an extra layer of liability protection with umbrella insurance from Kapital Insurance Group in Hialeah. Affordable million-dollar coverage above your auto and home. Free quote.",
    heroEyebrow: "Umbrella Insurance",
    heroHeadline: "Extra Protection. Total Peace of Mind.",
    heroSub:
      "When a serious claim exceeds your auto or home limits, an umbrella policy protects your savings, home, and future income.",
    intro: [
      "A single serious accident or lawsuit can exceed the limits of your auto or home policy — and once that happens, your savings, assets, and future wages are exposed. Umbrella insurance adds an extra layer of liability protection, typically in million-dollar increments, for a remarkably low cost.",
      "Kapital Insurance Group helps families and business owners protect what they've built with umbrella coverage that sits on top of your existing policies, kicking in exactly when you need it most.",
    ],
    benefits: [
      { title: "Million-dollar protection", description: "Add $1M or more in liability coverage above your auto, home, and boat policies." },
      { title: "Surprisingly affordable", description: "Umbrella coverage is one of the best values in insurance — a little goes a very long way." },
      { title: "Protects your assets", description: "Shields your savings, home equity, and future income from large judgments." },
      { title: "Covers more than you'd expect", description: "Includes certain claims like libel, slander, and landlord liability your base policies may exclude." },
    ],
    coverages: [
      { title: "Excess Liability", description: "Pays covered claims above the limits of your underlying auto, home, or boat policies." },
      { title: "Legal Defense", description: "Covers attorney and court costs for covered claims, often beyond your policy limit." },
      { title: "Personal Injury Claims", description: "Includes certain claims like slander, libel, and false arrest that base policies may not." },
      { title: "Worldwide Coverage", description: "Extends liability protection for covered incidents that happen away from home." },
    ],
    faqs: [
      { question: "Who needs umbrella insurance?", answer: "Anyone with assets or future income to protect — homeowners, landlords, parents of new drivers, and business owners. If a lawsuit could exceed your current limits, an umbrella makes sense." },
      { question: "How much umbrella coverage should I get?", answer: "A common starting point is $1,000,000, scaled up based on your net worth and risk. We'll help you choose a limit that protects what you've built." },
      { question: "Do I need auto and home insurance first?", answer: "Yes. An umbrella sits on top of underlying policies that must carry certain minimum limits. We can structure your auto and home coverage to qualify, often saving you money in the process." },
    ],
    related: ["auto-insurance", "home-insurance", "boat-insurance", "life-insurance"],
    keywords: ["umbrella insurance miami", "excess liability florida", "personal umbrella policy"],
  },
  {
    slug: "commercial-insurance",
    name: "Commercial Insurance",
    shortName: "Commercial",
    priority: 14,
    icon: "building",
    category: "commercial",
    localEnabled: true,
    localNoun: "commercial insurance",
    metaTitle: "Commercial Insurance in Hialeah, FL — Coverage for Every Business",
    metaDescription:
      "Comprehensive commercial insurance from Kapital Insurance Group in Hialeah. Property, liability, fleet, and workers' comp for South Florida businesses. One agency, every policy. Free quote.",
    heroEyebrow: "Commercial Insurance",
    heroHeadline: "One Agency for Every Policy.",
    heroSub:
      "Property, liability, fleet, and workers' comp — managed together by a local team that knows South Florida business.",
    intro: [
      "Running a business means juggling risk on every front — property, liability, vehicles, employees, and contracts. Commercial insurance brings those protections together so a single claim doesn't threaten everything you've built.",
      "Kapital Insurance Group is a one-stop commercial agency for Miami-Dade and Broward businesses. We assess your full risk picture, package the right coverages, and manage every policy under one roof — with fast certificates and a real local agent who answers the phone.",
    ],
    benefits: [
      { title: "Complete protection", description: "Property, liability, commercial auto, and workers' comp coordinated under one agency." },
      { title: "Industry expertise", description: "Tailored programs for contractors, retailers, restaurants, offices, and service businesses." },
      { title: "Certificates on demand", description: "Same-day COIs and additional insureds to keep your contracts and projects moving." },
      { title: "Annual coverage reviews", description: "We revisit your policies each year so your coverage grows with your business." },
    ],
    coverages: [
      { title: "Commercial Property", description: "Protects buildings, equipment, inventory, and tenant improvements." },
      { title: "General & Professional Liability", description: "Covers third-party claims and professional errors and omissions." },
      { title: "Commercial Auto & Fleet", description: "Insures the vehicles and drivers your business depends on." },
      { title: "Workers' Compensation", description: "Keeps you compliant and protects employees after on-the-job injuries." },
      { title: "Business Interruption", description: "Replaces lost income while you recover from a covered shutdown." },
    ],
    faqs: [
      { question: "What's the difference between business and commercial insurance?", answer: "They overlap heavily. 'Business insurance' often refers to smaller, packaged policies like a BOP, while 'commercial insurance' describes the full suite of coverages a larger or more complex operation needs. We handle both and right-size to your business." },
      { question: "Can you handle all of my company's policies?", answer: "Yes. We act as your single agency for property, liability, commercial auto, and workers' comp, which simplifies renewals, certificates, and claims." },
      { question: "How often should I review my commercial coverage?", answer: "At least annually, and any time you add vehicles, employees, locations, or major equipment. We schedule reviews so your coverage keeps pace with growth." },
    ],
    related: ["business-insurance", "general-liability-insurance", "workers-compensation", "commercial-auto-insurance"],
    keywords: ["commercial insurance miami", "business coverage hialeah", "commercial property insurance florida"],
  },
  {
    slug: "sr22",
    name: "SR-22 Insurance",
    shortName: "SR-22",
    priority: 15,
    icon: "badge",
    category: "specialty",
    metaTitle: "SR-22 Insurance in Hialeah, FL — Fast SR22 Filing & Quotes",
    metaDescription:
      "Need an SR-22 in Florida? Kapital Insurance Group files SR-22 and FR-44 certificates fast and pairs them with the cheapest qualifying policy. Same-day filing. Free quote.",
    heroEyebrow: "SR-22 Filing",
    heroHeadline: "Back on the Road, Fast.",
    heroSub:
      "We file your SR-22 with the state the same day and find the lowest-cost policy that keeps you legal and driving.",
    intro: [
      "An SR-22 isn't insurance — it's a certificate your insurer files with the state proving you carry the required liability coverage, usually after a ticket, lapse, or DUI. Florida also uses the FR-44 in certain cases, which requires higher limits. Either way, you need a carrier willing to file it quickly and affordably.",
      "Kapital Insurance Group specializes in SR-22 and FR-44 filings. We file the same day, pair you with the cheapest qualifying policy, and keep your filing active so you never risk another suspension.",
    ],
    benefits: [
      { title: "Same-day filing", description: "We file your SR-22 electronically with Florida so you can reinstate and drive sooner." },
      { title: "Cheapest qualifying policy", description: "We shop high-risk-friendly carriers to keep your SR-22 policy as affordable as possible." },
      { title: "FR-44 expertise", description: "We handle Florida's higher-limit FR-44 filings required after certain DUI offenses." },
      { title: "We keep you compliant", description: "We monitor your filing so a lapse never triggers another license suspension." },
    ],
    coverages: [
      { title: "SR-22 Certificate", description: "State filing that proves you carry the required liability coverage." },
      { title: "FR-44 Certificate", description: "Florida's higher-limit filing required after certain alcohol-related offenses." },
      { title: "High-Risk Liability", description: "Affordable liability coverage from carriers that specialize in SR-22 drivers." },
      { title: "Full Coverage Options", description: "Add collision and comprehensive if you finance or want to protect your vehicle." },
    ],
    faqs: [
      { question: "How long do I need an SR-22 in Florida?", answer: "Typically three years from your reinstatement date, though it varies by case. We keep your filing active the entire time so your license stays valid." },
      { question: "How fast can you file my SR-22?", answer: "Usually the same day. Once we bind your policy, we file the SR-22 electronically with the state so you can get back on the road quickly." },
      { question: "What's the difference between SR-22 and FR-44?", answer: "Both are state filings proving financial responsibility, but FR-44 (used in Florida after certain DUI offenses) requires significantly higher liability limits. We handle both." },
    ],
    related: ["auto-insurance", "motorcycle-insurance", "commercial-auto-insurance", "renters-insurance"],
    keywords: ["sr22 insurance florida", "sr22 filing hialeah", "fr44 insurance miami", "dui insurance"],
  },
  {
    slug: "notary",
    name: "Notary Public Services",
    shortName: "Notary",
    priority: 16,
    icon: "stamp",
    category: "services",
    metaTitle: "Notary Public in Hialeah, FL — Document Notarization Services",
    metaDescription:
      "Notary public services at Kapital Insurance Group in Hialeah. Fast, professional notarization of contracts, affidavits, powers of attorney, and more. Bilingual service. Walk-ins welcome.",
    heroEyebrow: "Notary Public",
    heroHeadline: "Documents Notarized, Done Right.",
    heroSub:
      "Need something notarized today? Our bilingual notary handles your documents quickly and professionally — right here in Hialeah.",
    intro: [
      "A notary public verifies identities and witnesses signatures to make your important documents official and legally recognized. From powers of attorney to affidavits and contracts, having a trusted, professional notary nearby saves you time and stress.",
      "Kapital Insurance Group provides fast, friendly, bilingual notary services in Hialeah. Bring your unsigned document and valid ID, and we'll take care of the rest — often while you wait.",
    ],
    benefits: [
      { title: "Fast & local", description: "Walk in and get your documents notarized quickly — no need to drive across town." },
      { title: "Bilingual service", description: "We assist clients comfortably in English and Spanish." },
      { title: "Wide range of documents", description: "Affidavits, powers of attorney, contracts, consent forms, and more." },
      { title: "One-stop convenience", description: "Handle your notary needs alongside insurance and business services in a single visit." },
    ],
    coverages: [
      { title: "Acknowledgments", description: "Verifying that a signer willingly signed a document such as a deed or contract." },
      { title: "Jurats / Affidavits", description: "Administering oaths and witnessing sworn statements." },
      { title: "Powers of Attorney", description: "Notarizing documents that authorize someone to act on your behalf." },
      { title: "Consent & Authorization Forms", description: "Travel consent, parental authorization, and similar documents." },
    ],
    faqs: [
      { question: "What do I need to bring to get a document notarized?", answer: "Bring your unsigned document and a valid government-issued photo ID, such as a driver's license or passport. Don't sign beforehand — the notary must witness your signature." },
      { question: "Can you notarize documents in Spanish?", answer: "Yes. Our notary is bilingual and routinely assists clients with documents and questions in both English and Spanish." },
      { question: "Do I need an appointment?", answer: "Walk-ins are welcome, but calling ahead ensures our notary is available the moment you arrive." },
    ],
    related: ["start-an-llc", "business-insurance", "auto-insurance", "commercial-insurance"],
    keywords: ["notary hialeah", "notary public miami", "notario hialeah", "document notarization"],
  },
  {
    slug: "start-an-llc",
    name: "LLC Formation & Business Registration",
    shortName: "Start an LLC",
    priority: 17,
    icon: "stamp",
    category: "services",
    metaTitle: "Start an LLC in Florida — LLC Formation & Business Registration",
    metaDescription:
      "Form your Florida LLC with Kapital Insurance Group in Hialeah. We handle business registration, EIN, and get you insured to operate. Bilingual, all-in-one small business setup. Free consult.",
    heroEyebrow: "LLC Formation",
    heroHeadline: "Start Your Business the Right Way.",
    heroSub:
      "We register your Florida LLC, help with your EIN, and get you properly insured — everything you need to open your doors, in one place.",
    intro: [
      "Starting a business in Florida is exciting — and the paperwork shouldn't slow you down. Forming an LLC protects your personal assets, makes your business official, and is the first step toward bank accounts, contracts, and growth.",
      "Kapital Insurance Group helps entrepreneurs in Hialeah and across South Florida form their LLC, register with the state, obtain an EIN, and — uniquely — get the right insurance to operate from day one. It's a true one-stop launch for your business, with bilingual guidance every step of the way.",
    ],
    benefits: [
      { title: "Done-for-you filing", description: "We prepare and file your Florida LLC paperwork so it's done right the first time." },
      { title: "EIN & registration help", description: "Guidance on your federal EIN and state registration so you're ready to bank and bill." },
      { title: "Insured from day one", description: "Pair your new LLC with the liability and commercial coverage clients and landlords require." },
      { title: "Bilingual, local support", description: "Real help in English or Spanish from a team that knows South Florida small business." },
    ],
    coverages: [
      { title: "LLC Formation", description: "Preparation and filing of your Articles of Organization with the State of Florida." },
      { title: "EIN Assistance", description: "Guidance on obtaining your federal Employer Identification Number." },
      { title: "Registered Agent Guidance", description: "Help understanding and meeting your registered agent requirement." },
      { title: "Business Insurance Setup", description: "Pairing your new entity with general liability, BOP, or commercial coverage." },
    ],
    faqs: [
      { question: "Why should I form an LLC?", answer: "An LLC separates your personal assets from your business, adds credibility, and creates a clean structure for banking, contracts, and taxes. It's the most popular choice for South Florida small businesses." },
      { question: "How long does it take to form a Florida LLC?", answer: "State processing times vary, but once we prepare your filing it's typically processed within a few business days. We'll keep you updated through approval." },
      { question: "Can you also get my business insured?", answer: "Yes — that's our specialty. We can form your LLC and set up the general liability, commercial auto, or workers' comp coverage you need to start operating, all in one place." },
    ],
    related: ["notary", "business-insurance", "general-liability-insurance", "commercial-insurance"],
    keywords: ["start an llc florida", "llc formation hialeah", "business registration miami", "abrir llc florida"],
  },
];

/* ------------------------------ Helpers ------------------------------ */

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string): Service[] {
  const svc = getService(slug);
  if (!svc) return [];
  return svc.related.map(getService).filter(Boolean) as Service[];
}

/** Services ordered by business priority. */
export const servicesByPriority = [...services].sort((a, b) => a.priority - b.priority);

/** Services that generate local /[service]/[city] pages. */
export const localServices = services.filter((s) => s.localEnabled);

export const servicesByCategory: Record<ServiceCategory, Service[]> = {
  personal: services.filter((s) => s.category === "personal"),
  commercial: services.filter((s) => s.category === "commercial"),
  specialty: services.filter((s) => s.category === "specialty"),
  services: services.filter((s) => s.category === "services"),
};
