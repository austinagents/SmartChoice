import SiteShell from "../components/SiteShell";
import LocalImage from "../components/LocalImage";
import { footerContentSlots, galleryContentSlots, galleryImages } from "../data";
import { contentValue, footerContentValues, getContentMap } from "../lib/siteContent";

export const dynamic = "force-dynamic";

export default async function Gallery() {
  const content = await getContentMap([
    ...galleryContentSlots,
    ...footerContentSlots,
  ]);
  const c = (sectionKey, contentKey) =>
    contentValue(content, "gallery", sectionKey, contentKey);

  return (
    <SiteShell footerContent={footerContentValues(content)}>
      <main>
        <section className="gallery-intro">
          <p className="eyebrow">{c("intro", "eyebrow")}</p>
          <h1>{c("intro", "heading")}</h1>
        </section>
        <section className="gallery-grid" aria-label="Smart Choice cart gallery">
          {galleryImages.map((image, index) => (
            <figure
              className={index % 7 === 0 || index % 7 === 3 ? "wide" : ""}
              key={image}
            >
              <LocalImage file={image} alt="" fill sizes="(max-width: 1100px) 50vw, 25vw" />
            </figure>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
