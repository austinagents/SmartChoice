import SiteShell from "../components/SiteShell";
import LocalImage from "../components/LocalImage";
import { consignmentContentSlots, footerContentSlots, images, phone, phoneHref } from "../data";
import { contentValue, footerContentValues, getContentMap } from "../lib/siteContent";

export const metadata = {
  title: "Golf Cart Consignment Sales | Smart Choice Golf Carts",
  description:
    "Sell your golf cart with Smart Choice Golf Carts. We handle photos, listings, buyers, showings, and the sale.",
};

export const dynamic = "force-dynamic";

export default async function Consignment() {
  const content = await getContentMap([
    ...consignmentContentSlots,
    ...footerContentSlots,
  ]);
  const c = (sectionKey, contentKey) =>
    contentValue(content, "consignment", sectionKey, contentKey);
  const benefits = Array.from({ length: 4 }, (_item, index) =>
    c("benefits", `benefit_${index + 1}`)
  );
  const steps = Array.from({ length: 4 }, (_item, index) =>
    c("steps", `step_${index + 1}`)
  );

  return (
    <SiteShell footerContent={footerContentValues(content)}>
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
            <p className="eyebrow">{c("hero", "eyebrow")}</p>
            <h1>{c("hero", "heading")}</h1>
            <p className="hero-copy">{c("hero", "copy")}</p>
            <a className="btn btn-primary" href={phoneHref}>
              {c("hero", "button")}
            </a>
          </div>
        </section>

        <section className="section two-column">
          <div>
            <p className="eyebrow">{c("evaluation", "eyebrow")}</p>
            <h2>{c("evaluation", "heading")}</h2>
            <p>{c("evaluation", "copy")}</p>
          </div>
          <div className="check-grid compact">
            {benefits.map((benefit, index) => (
              <div className="check-item" key={`benefit-${index + 1}`}>
                <span>✓</span>
                {benefit}
              </div>
            ))}
          </div>
        </section>

        <section className="section charcoal">
          <div className="section-heading">
            <p className="eyebrow">{c("how_it_works", "eyebrow")}</p>
            <h2>{c("how_it_works", "heading")}</h2>
          </div>
          <div className="process-list">
            {steps.map((step, index) => (
              <article key={`step-${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
          <a className="btn btn-primary" href={phoneHref}>
            {c("how_it_works", "button_prefix")} {phone}
          </a>
        </section>
      </main>
    </SiteShell>
  );
}
