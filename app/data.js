export const phone = "(239) 789-8025";
export const phoneHref = "tel:12397898025";
export const imageBase = "/smartchoice-current-site-images/";
export const inventoryImageBase = "/available-inventory/";

export function asset(file) {
  return `${imageBase}${file}`;
}

export const images = {
  logo: "smarchoicenew.png",
  hero: "IMG_9827.jpg",
  homeFeature: "IMG_8738+(2)+copy.jpg",
  serviceHero: "IMG_0193.jpg",
  serviceDetail: "IMG_8202.jpeg",
  consignmentHero: "IMG_0067+(1).jpg",
  buildHero: "IMG_0350+(3).jpg",
  cartRemoval: "IMG_9988.jpg",
  contact: "IMG_7444.jpg",
};

export const homepageImageSlots = [
  {
    page: "homepage",
    sectionKey: "hero",
    slotKey: "hero_image",
    label: "Hero Image",
    fallbackSrc: asset(images.hero),
    fallbackFile: `smartchoice-current-site-images/${images.hero}`,
    alt: "Smart Choice Golf Carts hero image",
  },
  {
    page: "homepage",
    sectionKey: "what_we_do",
    slotKey: "pre_owned_carts",
    label: "Pre-Owned Carts",
    fallbackSrc: "/home-card-images/pre-owned-carts.webp",
    fallbackFile: "home-card-images/pre-owned-carts.webp",
    alt: "Pre-owned golf cart",
  },
  {
    page: "homepage",
    sectionKey: "what_we_do",
    slotKey: "built_to_order_carts",
    label: "Built-to-Order Carts",
    fallbackSrc: "/home-card-images/built-to-order-carts.webp",
    fallbackFile: "home-card-images/built-to-order-carts.webp",
    alt: "Custom built golf cart",
  },
  {
    page: "homepage",
    sectionKey: "what_we_do",
    slotKey: "service_repairs",
    label: "Service & Repairs",
    fallbackSrc: "/home-card-images/service-repairs.webp",
    fallbackFile: "home-card-images/service-repairs.webp",
    alt: "Golf cart service and repairs",
  },
  {
    page: "homepage",
    sectionKey: "what_we_do",
    slotKey: "consign_sales",
    label: "Consign Sales",
    fallbackSrc: "/home-card-images/consign-sales.webp",
    fallbackFile: "home-card-images/consign-sales.webp",
    alt: "Golf cart consignment sales",
  },
  {
    page: "homepage",
    sectionKey: "feature_band",
    slotKey: "built_to_order_feature",
    label: "Built-to-Order Feature",
    fallbackSrc: asset(images.buildHero),
    fallbackFile: `smartchoice-current-site-images/${images.buildHero}`,
    alt: "Built-to-order golf cart",
  },
  {
    page: "homepage",
    sectionKey: "feature_band",
    slotKey: "mobile_service_feature",
    label: "Mobile Service Feature",
    fallbackSrc: asset(images.homeFeature),
    fallbackFile: `smartchoice-current-site-images/${images.homeFeature}`,
    alt: "Mobile golf cart service",
  },
  {
    page: "homepage",
    sectionKey: "consignment",
    slotKey: "consignment_feature",
    label: "Consignment Feature",
    fallbackSrc: asset(images.consignmentHero),
    fallbackFile: `smartchoice-current-site-images/${images.consignmentHero}`,
    alt: "Golf cart consignment",
  },
];

export const galleryImages = [
  "IMG_0067+(1).jpg",
  "IMG_0350+(3).jpg",
  "IMG_0502+copy.jpg",
  "IMG_0646+copy+2.jpg",
  "IMG_1026.jpg",
  "IMG_2607.jpg",
  "IMG_3620.jpg",
  "IMG_3684.jpg",
  "IMG_4181+(1).jpg",
  "IMG_4560.jpg",
  "IMG_7233.jpg",
  "IMG_7390.jpg",
  "IMG_7444.jpg",
  "IMG_7507.jpg",
  "IMG_7526.jpeg",
  "IMG_7662.jpg",
  "IMG_8738+(2)+copy.jpg",
  "IMG_9827.jpg",
];

export const serviceItems = [
  "Battery replacements",
  "Annual services & tune-ups",
  "Diagnostics & electrical repairs",
  "Brake service & steering repairs",
  "Lighting, audio & accessory upgrades",
  "Lift kits, tires & wheels",
  "Custom add-ons and performance upgrades",
];

export const inventoryItems = [
  {
    id: "2012-club-car-precedent-4900",
    title: "2012 Club Car Precedent",
    price: "$4,900",
    image: "IMG_9954.webp",
    description:
      "2012 Club Car Precedent with brand new batteries, new rear flip seat, new custom upholstery, and a full service with zero issues.",
  },
  {
    id: "2012-club-car-precedent-4500",
    title: "2012 Club Car Precedent",
    price: "$4,500",
    image: "IMG_0887.webp",
    description:
      "2012 Club Car Precedent with strong Trojan batteries, high-speed motor at 24mph, custom wheels, rear flip-down seat, dual USB ports, and more.",
  },
  {
    id: "2015-ezgo-rxv-new-batteries",
    title: "2015 EZGO RXV W/Brand New Batteries",
    price: "$4,700",
    image: "IMG_0380.webp",
    description:
      "2015 EZGO RXV with brand new batteries, A/C motor system, electronic braking, custom wheels, custom seats, LED lighting, and dual USB charging ports.",
  },
  {
    id: "2010-ezgo-rxv-4900",
    title: "2010 EZGO RXV",
    price: "$4,900",
    image: "IMG_9460.webp",
    description:
      "2010 EZGO RXV in mint condition with almost-new Trojan 12V batteries, A/C motor system, high-speed code at 22mph, electronic motor brake, and rear flip seat.",
  },
  {
    id: "2002-club-car-ds-iq",
    title: '2002 Club Car DS "IQ"',
    price: "$2,300",
    image: "IMG_9324.webp",
    description:
      "2002 Club Car DS IQ with almost-new Trojan batteries, high-speed code, front and rear lights, and a full service. Great budget cart.",
  },
  {
    id: "2004-club-car-ds-iq-25mph",
    title: '04 Club Car DS "IQ" 25mph',
    price: "$3,700",
    image: "IMG_0958.webp",
    description:
      "Mint-condition 2004 Club Car IQ 48-volt cart with strong 2025 batteries, high-speed motor at 25mph, custom wheels, custom steering wheel, fans, and DC outlet.",
  },
  {
    id: "2021-ezgo-txt-storm-edition",
    title: "2021 EZGO TXT Storm Edition",
    price: "$9,900",
    image: "IMG_0575.webp",
    description:
      "2021 EZGO TXT with Storm body kit, rare 72-volt A/C motor system, brand new Trojan batteries, lift kit, custom wheels, premium rear seat, soundbar, and extended roof.",
  },
  {
    id: "club-car-ds-new-batteries-2900",
    title: "Club Car DS With New Batteries",
    price: "$2,900",
    image: "IMG_0999.webp",
    description:
      "1998 Club Car DS with brand new Trojan batteries, new front and rear bushings, chrome SS hub caps, tinted windshield, side mirrors, and full service.",
  },
  {
    id: "2011-yamaha-g29-new-batteries",
    title: "2011 Yamaha G29 W/New Batteries",
    price: "$2,900",
    image: "IMG_0115.webp",
    description:
      "Yamaha G29 with brand new batteries, new custom upholstery, new chrome SS hub caps, and a full service. Great budget cart.",
  },
  {
    id: "2001-club-car-ds-3500",
    title: "01 Club Car DS",
    price: "$3,500",
    image: "IMG_0812.webp",
    description:
      "Beautiful 2001 Club Car DS with strong Trojan batteries, custom paint, custom wheels, all-aluminum rear seat with oversized safety bar, and full service.",
  },
  {
    id: "2021-ezgo-cushman-6-passenger",
    title: "2021 EZGO Cushman 6-Passenger Cart",
    price: "$7,900",
    image: "IMG_0133.webp",
    description:
      "2021 EZGO Cushman 6-passenger 72-volt cart with strong 2024 12-volt batteries, A/C motor system, custom upholstery, custom wheels, new tires, and rear flip seat.",
  },
  {
    id: "2001-club-car-ds-new-batteries-2700",
    title: "2001 Club Car DS with new batteries",
    price: "$2,700",
    image: "IMG_0910.webp",
    description:
      "2001 Club Car DS with brand new batteries, rear flip-down seat for passengers and utility use, new chrome SS hub caps, and more.",
  },
];

export const inventoryImageSlots = inventoryItems.map((item) => ({
  page: "pre-owned-inventory",
  sectionKey: "inventory",
  slotKey: "gallery",
  itemId: item.id,
  label: item.title,
  fallbackSrc: `${inventoryImageBase}${item.image}`,
  fallbackFile: `available-inventory/${item.image}`,
  alt: item.title,
}));

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/pre-owned-inventory", label: "Pre-Owned" },
  { href: "/services", label: "Service" },
  { href: "/built-to-order", label: "Built-to-Order" },
  { href: "/consignment", label: "Consignment" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

function contentField(page, sectionKey, contentKey, label, value, inputType = "line", itemId = "") {
  return {
    page,
    sectionKey,
    contentKey,
    label,
    value,
    inputType,
    itemId,
  };
}

export const homepageContentSlots = [
  contentField("homepage", "hero", "eyebrow", "Hero eyebrow", "Smart Choice Golf Carts"),
  contentField("homepage", "hero", "heading", "Hero heading", "Naples golf carts, built and serviced with care."),
  contentField(
    "homepage",
    "hero",
    "copy",
    "Hero description",
    "Sales, service, custom builds, and consignment for the communities we serve every day.",
    "long"
  ),
  contentField("homepage", "hero", "inventory_button", "Inventory button", "View Inventory"),
  contentField("homepage", "hero", "build_button", "Build button", "Build Your Cart"),
  contentField("homepage", "hero", "service_button", "Service button", "Schedule Service"),
  contentField("homepage", "what_we_do", "eyebrow", "Section eyebrow", "What We Do"),
  contentField(
    "homepage",
    "what_we_do",
    "heading",
    "Section heading",
    "Sales, service, custom builds, and consignment."
  ),
  contentField("homepage", "what_we_do", "pre_owned_title", "Pre-Owned card title", "Pre-Owned Carts"),
  contentField("homepage", "what_we_do", "pre_owned_text", "Pre-Owned card text", "Ready-to-ride inventory"),
  contentField("homepage", "what_we_do", "built_title", "Built-to-Order card title", "Built-to-Order Carts"),
  contentField("homepage", "what_we_do", "built_text", "Built-to-Order card text", "Designed for your lifestyle"),
  contentField("homepage", "what_we_do", "service_title", "Service card title", "Service & Repairs"),
  contentField("homepage", "what_we_do", "service_text", "Service card text", "Batteries, upgrades & maintenance"),
  contentField("homepage", "what_we_do", "consign_title", "Consign card title", "Consign Sales"),
  contentField("homepage", "what_we_do", "consign_text", "Consign card text", "We sell your cart for you"),
  contentField("homepage", "inventory_preview", "eyebrow", "Featured inventory eyebrow", "Available Now"),
  contentField("homepage", "inventory_preview", "heading", "Featured inventory heading", "Featured pre-owned carts."),
  contentField("homepage", "inventory_preview", "button", "Featured inventory button", "View All Inventory"),
  contentField("homepage", "inventory_preview", "card_cta", "Featured cart CTA text", "Call or Text"),
  contentField("homepage", "built_feature", "eyebrow", "Built feature eyebrow", "Built-to-Order"),
  contentField(
    "homepage",
    "built_feature",
    "heading",
    "Built feature heading",
    "Custom carts with a dealership-level finish."
  ),
  contentField(
    "homepage",
    "built_feature",
    "copy",
    "Built feature description",
    "Start with a late model Club Car Tempo and select the paint, upholstery, wheels, lighting, sound, lift, and accessories that fit how you ride.",
    "long"
  ),
  contentField("homepage", "built_feature", "button", "Built feature button", "Start Your Build"),
  contentField("homepage", "service_feature", "eyebrow", "Service feature eyebrow", "Mobile Service"),
  contentField(
    "homepage",
    "service_feature",
    "heading",
    "Service feature heading",
    "Service and repairs brought to your driveway."
  ),
  contentField(
    "homepage",
    "service_feature",
    "copy",
    "Service feature description",
    "Batteries, maintenance, diagnostics, repairs, and upgrades handled locally across Greater Naples.",
    "long"
  ),
  contentField("homepage", "service_feature", "button", "Service feature button", "Schedule Service"),
  contentField("homepage", "consignment", "eyebrow", "Consignment eyebrow", "Consignment Sales"),
  contentField(
    "homepage",
    "consignment",
    "heading",
    "Consignment heading",
    "Ready to sell your cart without the hassle?"
  ),
  contentField(
    "homepage",
    "consignment",
    "copy",
    "Consignment description",
    "We handle photos, listing, buyer calls, showings, and the sale so the process stays simple from the first conversation to payment.",
    "long"
  ),
  contentField("homepage", "consignment", "button", "Consignment button", "Learn About Consignment"),
  contentField("homepage", "local", "eyebrow", "Local section eyebrow", "Greater Naples"),
  contentField(
    "homepage",
    "local",
    "heading",
    "Local section heading",
    "Local help for the neighborhoods we serve every day."
  ),
  contentField(
    "homepage",
    "local",
    "copy",
    "Local service area text",
    "Quail Creek, Quail Creek Estates, Esplanade, The Quarry, and the surrounding Naples area.",
    "long"
  ),
  contentField("homepage", "final_cta", "eyebrow", "Final CTA eyebrow", "Smart Choice Golf Carts"),
  contentField("homepage", "final_cta", "heading", "Final CTA heading", "Need help choosing the right cart?"),
  contentField("homepage", "final_cta", "button_prefix", "Final CTA button text", "Call or Text"),
];

export const inventoryContentSlots = [
  contentField("pre-owned-inventory", "hero", "eyebrow", "Hero eyebrow", "Available Inventory"),
  contentField(
    "pre-owned-inventory",
    "hero",
    "heading",
    "Hero heading",
    "Pre-Owned Golf Carts Ready for a New Driveway"
  ),
  contentField(
    "pre-owned-inventory",
    "hero",
    "copy",
    "Hero description",
    "Inventory changes quickly. Call or text to confirm availability, ask questions, or schedule a time to see a cart in person.",
    "long"
  ),
  contentField("pre-owned-inventory", "hero", "button_prefix", "Hero button text", "Call or Text"),
  contentField("pre-owned-inventory", "inventory", "card_cta", "Listing CTA text", "Ask about this cart"),
  ...inventoryItems.flatMap((item) => [
    contentField("pre-owned-inventory", "inventory", "title", `${item.title} title`, item.title, "line", item.id),
    contentField("pre-owned-inventory", "inventory", "price", `${item.title} price`, item.price, "line", item.id),
    contentField(
      "pre-owned-inventory",
      "inventory",
      "description",
      `${item.title} description`,
      item.description,
      "long",
      item.id
    ),
  ]),
];

export const builtToOrderContentSlots = [
  contentField("built-to-order", "hero", "eyebrow", "Hero eyebrow", "Built-to-Order Carts"),
  contentField("built-to-order", "hero", "heading", "Hero heading", "Designed around your lifestyle."),
  contentField(
    "built-to-order",
    "hero",
    "copy",
    "Hero description",
    "Golf, neighborhood cruising or both. We have you covered.",
    "long"
  ),
  contentField(
    "built-to-order",
    "hero",
    "note",
    "Hero note",
    "Custom paint, upholstery, wheels, lift kits, lights, sound, and more.",
    "long"
  ),
  contentField("built-to-order", "hero", "button", "Hero button", "Start Your Build"),
  contentField("built-to-order", "how_it_works", "eyebrow", "How it works eyebrow", "How It Works"),
  contentField(
    "built-to-order",
    "how_it_works",
    "heading",
    "How it works heading",
    "Tell us your vision or let us make suggestions."
  ),
  contentField(
    "built-to-order",
    "how_it_works",
    "copy",
    "How it works description",
    "We’ll guide you through the best options. Fast turnaround. Transparent pricing. Built exactly the way you want it.",
    "long"
  ),
  ...[
    "Let’s connect either in-person or remotely to discuss your wants and needs",
    "We present options with examples of previous builds with associated budgets",
    "You select everything you want and nothing you don’t",
    "We take a late model Club Car Tempo, strip it to the frame and rebuild it with all new parts to your final selections",
    "You get what in essence is a brand new cart for a fraction of the price of new",
    "You and your family live happily ever after with your new golf cart",
  ].map((step, index) =>
    contentField("built-to-order", "steps", `step_${index + 1}`, `Step ${index + 1}`, step, "long")
  ),
  contentField("built-to-order", "upgrades", "eyebrow", "Upgrades eyebrow", "Popular Upgrades"),
  contentField(
    "built-to-order",
    "upgrades",
    "heading",
    "Upgrades heading",
    "Make your cart look better, ride smoother, and stand out."
  ),
  ...["Lift kits", "Lighting", "Custom wheels", "Audio systems", "Premium upholstery", "Accessories"].map((upgrade, index) =>
    contentField("built-to-order", "upgrades", `upgrade_${index + 1}`, `Upgrade ${index + 1}`, upgrade)
  ),
];

export const servicesContentSlots = [
  contentField("services", "hero", "eyebrow", "Hero eyebrow", "Service"),
  contentField("services", "hero", "heading", "Hero heading", "Mobile Golf Cart Service, Right to Your Driveway"),
  contentField(
    "services",
    "hero",
    "copy",
    "Hero description",
    "From battery replacements and tune-ups to repairs and upgrades, we make owning a golf cart easy.",
    "long"
  ),
  contentField(
    "services",
    "hero",
    "note",
    "Hero note",
    "Fast response times, honest pricing, and professional work you can trust.",
    "long"
  ),
  contentField("services", "hero", "button", "Hero button", "Schedule Service"),
  contentField("services", "what_we_service", "eyebrow", "Service list eyebrow", "What We Service"),
  contentField(
    "services",
    "what_we_service",
    "heading",
    "Service list heading",
    "Fast, reliable golf cart service, done right the first time."
  ),
  ...serviceItems.map((item, index) =>
    contentField("services", "service_items", `item_${index + 1}`, `Service item ${index + 1}`, item)
  ),
  contentField("services", "how_it_works", "eyebrow", "How it works eyebrow", "How It Works"),
  contentField(
    "services",
    "how_it_works",
    "heading",
    "How it works heading",
    "Simple service from first call to final repair."
  ),
  ...[
    ["Contact Us.", "Call or text."],
    ["We Diagnose & Quote", "Clear recommendations."],
    ["We Fix It Fast", "Done right the first time."],
  ].flatMap(([title, text], index) => [
    contentField("services", "steps", `step_${index + 1}_title`, `Step ${index + 1} title`, title),
    contentField("services", "steps", `step_${index + 1}_text`, `Step ${index + 1} text`, text),
  ]),
  contentField("services", "why_smart_choice", "eyebrow", "Why section eyebrow", "Why Smart Choice"),
  contentField(
    "services",
    "why_smart_choice",
    "heading",
    "Why section heading",
    "Local service you can trust, done right the first time."
  ),
  ...[
    ["Local & responsive", "We’re nearby and easy to reach. Call or text anytime."],
    ["Honest recommendations", "Clear options, no pressure, and straightforward pricing."],
    ["Quality work, done fast", "Most services completed same-day whenever possible."],
  ].flatMap(([title, text], index) => [
    contentField("services", "reasons", `reason_${index + 1}_title`, `Reason ${index + 1} title`, title),
    contentField("services", "reasons", `reason_${index + 1}_text`, `Reason ${index + 1} text`, text, "long"),
  ]),
];

export const consignmentContentSlots = [
  contentField("consignment", "hero", "eyebrow", "Hero eyebrow", "Consignment Sales"),
  contentField(
    "consignment",
    "hero",
    "heading",
    "Hero heading",
    "We’ll sell your cart for you, quickly and professionally."
  ),
  contentField(
    "consignment",
    "hero",
    "copy",
    "Hero description",
    "If you’re ready to sell your cart but don’t want the hassle, we’ve got you covered from photos to final buyer conversations.",
    "long"
  ),
  contentField("consignment", "hero", "button", "Hero button", "Contact Us to List Your Cart"),
  contentField("consignment", "evaluation", "eyebrow", "Evaluation eyebrow", "Free Evaluation"),
  contentField(
    "consignment",
    "evaluation",
    "heading",
    "Evaluation heading",
    "No pressure. Professional help from start to finish."
  ),
  contentField(
    "consignment",
    "evaluation",
    "copy",
    "Evaluation description",
    "Send over the basics and we’ll help you understand what your cart can sell for, then handle the listing and buyer process for you.",
    "long"
  ),
  ...[
    "Photos and listing handled",
    "Buyer calls and showings handled",
    "Best price possible",
    "Free consignment evaluation",
  ].map((benefit, index) =>
    contentField("consignment", "benefits", `benefit_${index + 1}`, `Benefit ${index + 1}`, benefit)
  ),
  contentField("consignment", "how_it_works", "eyebrow", "How it works eyebrow", "How It Works"),
  contentField(
    "consignment",
    "how_it_works",
    "heading",
    "How it works heading",
    "Start with a few details. We’ll handle the rest."
  ),
  ...[
    "Send photos and basic details",
    "We pick it up or you drop it off",
    "We list it, show it, and handle buyers",
    "You get paid, fast and hassle-free",
  ].map((step, index) =>
    contentField("consignment", "steps", `step_${index + 1}`, `Step ${index + 1}`, step, "long")
  ),
  contentField("consignment", "how_it_works", "button_prefix", "CTA button text", "Call or Text"),
];

export const contactContentSlots = [
  contentField("contact", "hero", "eyebrow", "Hero eyebrow", "Contact Smart Choice"),
  contentField("contact", "hero", "heading", "Hero heading", "Call or Text Anytime. We’re Here to Help"),
  contentField("contact", "hero", "copy", "Hero description", "Located right off Oakes Blvd. in North Naples.", "long"),
  contentField("contact", "hero", "note", "Hours note", "Hours: 9AM-5PM Monday - Saturday"),
  contentField("contact", "hero", "button_prefix", "CTA button text", "Call or Text"),
];

export const galleryContentSlots = [
  contentField("gallery", "intro", "eyebrow", "Intro eyebrow", "Gallery"),
  contentField("gallery", "intro", "heading", "Intro heading", "Recent carts, custom details, and service work."),
];

export const footerContentSlots = [
  contentField(
    "site",
    "footer",
    "tagline",
    "Footer tagline",
    "Your local one-stop golf cart shop for sales, service, builds, and consignment.",
    "long"
  ),
  contentField("site", "footer", "site_map_heading", "Site map heading", "Site Map"),
  contentField("site", "footer", "service_area_heading", "Service area heading", "Service Area"),
  contentField(
    "site",
    "footer",
    "service_area_text",
    "Service area text",
    "Greater Naples\nQuail Creek\nQuail Creek Estates\nEsplanade\nThe Quarry",
    "long"
  ),
];

export const siteContentPages = [
  { key: "homepage", label: "Homepage", slots: homepageContentSlots },
  { key: "pre-owned-inventory", label: "Pre-Owned Inventory", slots: inventoryContentSlots },
  { key: "built-to-order", label: "Built-to-Order", slots: builtToOrderContentSlots },
  { key: "services", label: "Services", slots: servicesContentSlots },
  { key: "consignment", label: "Consignment", slots: consignmentContentSlots },
  { key: "gallery", label: "Gallery", slots: galleryContentSlots },
  { key: "contact", label: "Contact", slots: contactContentSlots },
  { key: "site", label: "Shared Footer", slots: footerContentSlots },
];

export const allContentSlots = siteContentPages.flatMap((page) => page.slots);
