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
