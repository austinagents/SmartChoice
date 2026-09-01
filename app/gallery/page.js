import SiteShell from "../components/SiteShell";
import LocalImage from "../components/LocalImage";
import { galleryImages } from "../data";

export default function Gallery() {
  return (
    <SiteShell>
      <main>
        <section className="gallery-intro">
          <p className="eyebrow">Gallery</p>
          <h1>Recent carts, custom details, and service work.</h1>
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
