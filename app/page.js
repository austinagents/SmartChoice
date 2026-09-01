import Link from "next/link";
import SiteShell from "./components/SiteShell";
import LocalImage from "./components/LocalImage";
import { images, phoneHref } from "./data";

const whatWeDo = [
  { title: "Pre-Owned Carts", text: "Ready-to-ride inventory", href: "/gallery" },
  {
    title: "Built-to-Order Carts",
    text: "Designed for your lifestyle",
    href: "/built-to-order",
  },
  {
    title: "Service & Repairs",
    text: "Batteries, upgrades & maintenance",
    href: "/services",
  },
  { title: "Consign Sales", text: "We sell your cart for you", href: "/information" },
];

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="hero hero-home">
          <LocalImage file={images.hero} alt="" fill priority sizes="100vw" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Smart Choice Golf Carts</p>
            <h1>YOUR LOCAL ONE-STOP GOLF CART SHOP</h1>
            <p className="hero-copy">
              Sales, service, custom builds and consignment, right here in the
              neighborhood.
            </p>
            <div className="button-row">
              <a className="btn btn-primary" href={phoneHref}>
                Get Started
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">What We Do</p>
            <h2>Sales, service, custom builds, and consignment.</h2>
          </div>
          <div className="service-grid">
            {whatWeDo.map((item) => (
              <Link href={item.href} className="feature-card" key={item.title}>
                <span />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="split-section dark-panel">
          <div className="split-media">
            <LocalImage file={images.homeFeature} alt="" fill sizes="55vw" />
          </div>
          <div className="split-copy">
            <p className="eyebrow">Mobile Services Available</p>
            <h2>Golf cart service brought right to your driveway.</h2>
            <p>
              Battery replacements, annual services, repairs, and upgrades,
              done efficiently and professionally.
            </p>
            <p>
              Serving Greater Naples with a focus on Quail Creek, Quail Creek
              Estates, Esplanade, and The Quarry.
            </p>
            <a className="btn btn-primary" href={phoneHref}>
              Schedule Service
            </a>
          </div>
        </section>

        <section className="section local-band">
          <div>
            <p className="eyebrow">Greater Naples</p>
            <h2>Local help for the neighborhoods we serve every day.</h2>
          </div>
          <p>
            Quail Creek, Quail Creek Estates, Esplanade, The Quarry, and the
            surrounding Naples area.
          </p>
        </section>
      </main>
    </SiteShell>
  );
}
