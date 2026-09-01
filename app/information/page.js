import SiteShell from "../components/SiteShell";
import LocalImage from "../components/LocalImage";
import { images, phone, phoneHref } from "../data";

const benefits = [
  "Photos + listing handled",
  "Buyer calls + showings handled",
  "Best price possible",
  "Free consignment evaluation",
];

const steps = [
  "Send photos + basic details",
  "We pick it up or you drop it off",
  "We list it, show it, and handle buyers",
  "You get paid — fast and hassle-free",
];

export default function Information() {
  return (
    <SiteShell>
      <main>
        <section className="hero page-hero">
          <LocalImage
            file={images.consignmentHero}
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Consignment Sales</p>
            <h1>We’ll sell your cart for you — quickly and professionally.</h1>
            <p className="hero-copy">
              If you’re ready to sell your cart but don’t want the hassle, we’ve
              got you covered.
            </p>
            <a className="btn btn-primary" href={phoneHref}>
              Contact Us To List Your Cart
            </a>
          </div>
        </section>

        <section className="section two-column">
          <div>
            <p className="eyebrow">Free Consignment Evaluation</p>
            <h2>No pressure. Professional help from start to finish.</h2>
          </div>
          <div className="check-grid compact">
            {benefits.map((benefit) => (
              <div className="check-item" key={benefit}>
                <span>✓</span>
                {benefit}
              </div>
            ))}
          </div>
        </section>

        <section className="section charcoal">
          <div className="section-heading">
            <p className="eyebrow">How It Works</p>
            <h2>Start here.</h2>
          </div>
          <div className="process-list">
            {steps.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </article>
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
