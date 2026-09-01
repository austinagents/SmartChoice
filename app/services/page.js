import SiteShell from "../components/SiteShell";
import LocalImage from "../components/LocalImage";
import { images, phone, phoneHref, serviceItems } from "../data";

const steps = [
  ["Contact Us.", "Call or text."],
  ["We Diagnose & Quote", "Clear recommendations."],
  ["We Fix It Fast", "Done right the first time."],
];

const reasons = [
  ["Local & responsive", "We’re nearby and easy to reach — call or text anytime."],
  ["Honest recommendations", "Clear options, no pressure, and straightforward pricing."],
  ["Quality work, done fast", "Most services completed same-day whenever possible."],
];

export default function Services() {
  return (
    <SiteShell>
      <main>
        <section className="hero page-hero">
          <LocalImage file={images.serviceHero} alt="" fill priority sizes="100vw" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Service</p>
            <h1>Mobile Golf Cart Service — Right to Your Driveway</h1>
            <p className="hero-copy">
              From battery replacements and tune-ups to repairs and upgrades —
              we make owning a golf cart easy.
            </p>
            <p className="hero-note">
              Fast response times, honest pricing, and professional work you
              can trust.
            </p>
            <a className="btn btn-primary" href={phoneHref}>
              Schedule Service
            </a>
          </div>
        </section>

        <section className="section service-layout">
          <div>
            <p className="eyebrow">What We Service</p>
            <h2>Fast, reliable golf cart service — done right the first time.</h2>
            <div className="check-grid">
              {serviceItems.map((item) => (
                <div className="check-item" key={item}>
                  <span>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <a className="btn btn-primary" href={phoneHref}>
              {phone}
            </a>
          </div>
          <div className="service-photo">
            <LocalImage file={images.serviceDetail} alt="" fill sizes="50vw" />
          </div>
        </section>

        <section className="section charcoal">
          <div className="section-heading">
            <p className="eyebrow">How It Works</p>
            <h2>Simple service from first call to final repair.</h2>
          </div>
          <div className="step-grid">
            {steps.map(([title, text], index) => (
              <div className="step-card" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Why Smart Choice</p>
            <h2>Local service you can trust — done right the first time.</h2>
          </div>
          <div className="service-grid">
            {reasons.map(([title, text]) => (
              <article className="feature-card" key={title}>
                <span />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
