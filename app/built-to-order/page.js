import SiteShell from "../components/SiteShell";
import LocalImage from "../components/LocalImage";
import { images, phone, phoneHref } from "../data";

const steps = [
  "Let’s connect either in-person or remotely to discuss your wants and needs",
  "We present options with examples of previous builds with associated budgets",
  "You select everything you want and nothing you don’t",
  "We take a late model Club Car Tempo, strip it to the frame and rebuild it with all new parts to your final selections",
  "You get what in essence is a brand new cart for a fraction of the price of new",
  "You and your family live happily ever after with your new golf cart",
];

const upgrades = [
  "Lift kits",
  "Lighting",
  "Custom wheels",
  "Audio systems",
  "Premium upholstery",
  "Accessories",
];

export default function BuiltToOrder() {
  return (
    <SiteShell>
      <main>
        <section className="hero page-hero">
          <LocalImage file={images.buildHero} alt="" fill priority sizes="100vw" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Built-to-Order Carts</p>
            <h1>Designed around your lifestyle.</h1>
            <p className="hero-copy">
              Golf, neighborhood cruising or both. We have you covered.
            </p>
            <p className="hero-note">
              Custom paint, upholstery, wheels, lift kits, lights, sound, and
              more.
            </p>
            <a className="btn btn-primary" href={phoneHref}>
              Contact Us
            </a>
          </div>
        </section>

        <section className="section two-column">
          <div>
            <p className="eyebrow">How It Works</p>
            <h2>Tell us your vision or let us make suggestions.</h2>
            <p>
              We’ll guide you through the best options. Fast turnaround.
              Transparent pricing. Built exactly the way you want it.
            </p>
          </div>
          <div className="process-list light">
            {steps.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section charcoal">
          <div className="section-heading">
            <p className="eyebrow">Popular Upgrades</p>
            <h2>Make your cart look better, ride smoother, and stand out.</h2>
          </div>
          <div className="upgrade-grid">
            {upgrades.map((upgrade) => (
              <div key={upgrade}>{upgrade}</div>
            ))}
          </div>
          <a className="btn btn-primary" href={phoneHref}>
            {phone}
          </a>
        </section>
      </main>
    </SiteShell>
  );
}
