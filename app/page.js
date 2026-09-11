import Image from "next/image";
import Link from "next/link";
import SiteShell from "./components/SiteShell";
import LocalImage from "./components/LocalImage";
import { images, inventoryImageBase, inventoryItems, phone, phoneHref } from "./data";

const whatWeDo = [
  {
    title: "Pre-Owned Carts",
    text: "Ready-to-ride inventory",
    href: "/pre-owned-inventory",
    image: "/home-card-images/pre-owned-carts.webp",
  },
  {
    title: "Built-to-Order Carts",
    text: "Designed for your lifestyle",
    href: "/built-to-order",
    image: "/home-card-images/built-to-order-carts.webp",
  },
  {
    title: "Service & Repairs",
    text: "Batteries, upgrades & maintenance",
    href: "/services",
    image: "/home-card-images/service-repairs.webp",
  },
  {
    title: "Consign Sales",
    text: "We sell your cart for you",
    href: "/consignment",
    image: "/home-card-images/consign-sales.webp",
  },
];

const featuredInventory = inventoryItems.slice(0, 4);

export default function Home() {
  return (
    <SiteShell>
      <main className="home-page">
        <section className="hero hero-home">
          <LocalImage file={images.hero} alt="" fill priority sizes="100vw" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Smart Choice Golf Carts</p>
            <h1>Naples golf carts, built and serviced with care.</h1>
            <p className="hero-copy">
              Sales, service, custom builds, and consignment for the communities
              we serve every day.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" href="/pre-owned-inventory">
                View Inventory
              </Link>
              <Link className="btn btn-secondary dark" href="/built-to-order">
                Build Your Cart
              </Link>
              <Link className="btn btn-tertiary" href="/services">
                Schedule Service
              </Link>
            </div>
          </div>
        </section>

        <section className="section home-section home-departments">
          <div className="section-heading">
            <p className="eyebrow">What We Do</p>
            <h2>Sales, service, custom builds, and consignment.</h2>
          </div>
          <div className="department-grid">
            {whatWeDo.map((item) => (
              <Link href={item.href} className="department-card" key={item.title}>
                <div className="department-card-image">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </div>
                <div className="department-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section home-section inventory-preview">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Available Now</p>
              <h2>Featured pre-owned carts.</h2>
            </div>
            <Link className="btn btn-secondary dark" href="/pre-owned-inventory">
              View All Inventory
            </Link>
          </div>
          <div className="featured-inventory-grid">
            {featuredInventory.map((cart, index) => (
              <article className="featured-cart" key={`${cart.title}-${cart.price}`}>
                <div className="featured-cart-image">
                  <Image
                    src={`${inventoryImageBase}${cart.image}`}
                    alt={cart.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 720px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </div>
                <div className="featured-cart-copy">
                  <p className="featured-cart-price">{cart.price}</p>
                  <h3>{cart.title}</h3>
                  <p>{cart.description}</p>
                  <a href={phoneHref}>Call or Text</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-feature-band">
          <div className="home-feature-image">
            <LocalImage file={images.buildHero} alt="" fill sizes="(max-width: 980px) 100vw, 50vw" />
          </div>
          <div className="home-feature-copy">
            <p className="eyebrow">Built-to-Order</p>
            <h2>Custom carts with a dealership-level finish.</h2>
            <p>
              Start with a late model Club Car Tempo and select the paint,
              upholstery, wheels, lighting, sound, lift, and accessories that
              fit how you ride.
            </p>
            <Link className="btn btn-primary" href="/built-to-order">
              Start Your Build
            </Link>
          </div>
        </section>

        <section className="home-feature-band reverse">
          <div className="home-feature-image service-crop">
            <LocalImage file={images.homeFeature} alt="" fill sizes="(max-width: 980px) 100vw, 50vw" />
          </div>
          <div className="home-feature-copy">
            <p className="eyebrow">Mobile Service</p>
            <h2>Service and repairs brought to your driveway.</h2>
            <p>
              Batteries, maintenance, diagnostics, repairs, and upgrades handled
              locally across Greater Naples.
            </p>
            <Link className="btn btn-primary" href="/services">
              Schedule Service
            </Link>
          </div>
        </section>

        <section className="section home-section consignment-panel">
          <div className="consignment-image">
            <LocalImage file={images.consignmentHero} alt="" fill sizes="(max-width: 980px) 100vw, 44vw" />
          </div>
          <div className="consignment-copy">
            <p className="eyebrow">Consignment Sales</p>
            <h2>Ready to sell your cart without the hassle?</h2>
            <p>
              We handle photos, listing, buyer calls, showings, and the sale so
              the process stays simple from the first conversation to payment.
            </p>
            <Link className="btn btn-secondary dark" href="/consignment">
              Learn About Consignment
            </Link>
          </div>
        </section>

        <section className="section home-section local-band">
          <div>
            <p className="eyebrow">Greater Naples</p>
            <h2>Local help for the neighborhoods we serve every day.</h2>
          </div>
          <p>
            Quail Creek, Quail Creek Estates, Esplanade, The Quarry, and the
            surrounding Naples area.
          </p>
        </section>

        <section className="home-final-cta">
          <p className="eyebrow">Smart Choice Golf Carts</p>
          <h2>Need help choosing the right cart?</h2>
          <a className="btn btn-primary" href={phoneHref}>
            Call or Text {phone}
          </a>
        </section>
      </main>
    </SiteShell>
  );
}
