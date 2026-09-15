import SiteShell from "../components/SiteShell";
import LocalImage from "../components/LocalImage";
import { footerContentSlots, images, phoneHref, servicesContentSlots } from "../data";
import { contentValue, footerContentValues, getContentMap } from "../lib/siteContent";

export const dynamic = "force-dynamic";

export default async function Services() {
  const content = await getContentMap([
    ...servicesContentSlots,
    ...footerContentSlots,
  ]);
  const c = (sectionKey, contentKey) =>
    contentValue(content, "services", sectionKey, contentKey);
  const serviceItems = Array.from({ length: 7 }, (_item, index) =>
    c("service_items", `item_${index + 1}`)
  );
  const steps = Array.from({ length: 3 }, (_item, index) => [
    c("steps", `step_${index + 1}_title`),
    c("steps", `step_${index + 1}_text`),
  ]);
  const reasons = Array.from({ length: 3 }, (_item, index) => [
    c("reasons", `reason_${index + 1}_title`),
    c("reasons", `reason_${index + 1}_text`),
  ]);

  return (
    <SiteShell footerContent={footerContentValues(content)}>
      <main>
        <section className="hero page-hero">
          <LocalImage file={images.serviceHero} alt="" fill priority sizes="100vw" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">{c("hero", "eyebrow")}</p>
            <h1>{c("hero", "heading")}</h1>
            <p className="hero-copy">{c("hero", "copy")}</p>
            <p className="hero-note">{c("hero", "note")}</p>
            <a className="btn btn-primary" href={phoneHref}>
              {c("hero", "button")}
            </a>
          </div>
        </section>

        <section className="section service-layout">
          <div>
            <p className="eyebrow">{c("what_we_service", "eyebrow")}</p>
            <h2>{c("what_we_service", "heading")}</h2>
            <div className="check-grid">
              {serviceItems.map((item, index) => (
                <div className="check-item" key={`service-item-${index + 1}`}>
                  <span>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="service-photo">
            <LocalImage file={images.serviceDetail} alt="" fill sizes="50vw" />
          </div>
        </section>

        <section className="section charcoal">
          <div className="section-heading">
            <p className="eyebrow">{c("how_it_works", "eyebrow")}</p>
            <h2>{c("how_it_works", "heading")}</h2>
          </div>
          <div className="step-grid">
            {steps.map(([title, text], index) => (
              <div className="step-card" key={`step-${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">{c("why_smart_choice", "eyebrow")}</p>
            <h2>{c("why_smart_choice", "heading")}</h2>
          </div>
          <div className="service-grid">
            {reasons.map(([title, text], index) => (
              <article className="feature-card" key={`reason-${index + 1}`}>
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
