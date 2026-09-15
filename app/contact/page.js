import SiteShell from "../components/SiteShell";
import LocalImage from "../components/LocalImage";
import { contactContentSlots, footerContentSlots, images, phone, phoneHref } from "../data";
import { contentValue, footerContentValues, getContentMap } from "../lib/siteContent";

export const dynamic = "force-dynamic";

export default async function Contact() {
  const content = await getContentMap([
    ...contactContentSlots,
    ...footerContentSlots,
  ]);
  const c = (sectionKey, contentKey) =>
    contentValue(content, "contact", sectionKey, contentKey);

  return (
    <SiteShell footerContent={footerContentValues(content)}>
      <main>
        <section className="hero page-hero contact-hero">
          <LocalImage file={images.contact} alt="" fill priority sizes="100vw" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">{c("hero", "eyebrow")}</p>
            <h1>{c("hero", "heading")}</h1>
            <p className="hero-copy">{c("hero", "copy")}</p>
            <p className="hero-note">{c("hero", "note")}</p>
            <a className="btn btn-primary" href={phoneHref}>
              {c("hero", "button_prefix")} {phone}
            </a>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
