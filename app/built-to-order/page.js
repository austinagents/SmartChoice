import SiteShell from "../components/SiteShell";
import LocalImage from "../components/LocalImage";
import { builtToOrderContentSlots, footerContentSlots, images, phoneHref } from "../data";
import { contentValue, footerContentValues, getContentMap } from "../lib/siteContent";

export const dynamic = "force-dynamic";

export default async function BuiltToOrder() {
  const content = await getContentMap([
    ...builtToOrderContentSlots,
    ...footerContentSlots,
  ]);
  const c = (sectionKey, contentKey) =>
    contentValue(content, "built-to-order", sectionKey, contentKey);
  const steps = Array.from({ length: 6 }, (_item, index) =>
    c("steps", `step_${index + 1}`)
  );
  const upgrades = Array.from({ length: 6 }, (_item, index) =>
    c("upgrades", `upgrade_${index + 1}`)
  );

  return (
    <SiteShell footerContent={footerContentValues(content)}>
      <main>
        <section className="hero page-hero">
          <LocalImage file={images.buildHero} alt="" fill priority sizes="100vw" />
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

        <section className="section two-column">
          <div>
            <p className="eyebrow">{c("how_it_works", "eyebrow")}</p>
            <h2>{c("how_it_works", "heading")}</h2>
            <p>{c("how_it_works", "copy")}</p>
          </div>
          <div className="process-list light">
            {steps.map((step, index) => (
              <article key={`step-${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section charcoal">
          <div className="section-heading">
            <p className="eyebrow">{c("upgrades", "eyebrow")}</p>
            <h2>{c("upgrades", "heading")}</h2>
          </div>
          <div className="upgrade-grid">
            {upgrades.map((upgrade, index) => (
              <div key={`upgrade-${index + 1}`}>{upgrade}</div>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
