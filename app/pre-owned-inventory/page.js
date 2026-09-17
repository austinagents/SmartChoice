import ImageCarousel from "../components/ImageCarousel";
import SiteShell from "../components/SiteShell";
import {
  inventoryContentSlots,
  inventoryImageSlots,
  inventoryItems,
  footerContentSlots,
  phone,
  phoneHref,
} from "../data";
import { getInventoryImageMap } from "../lib/siteImages";
import { contentValue, footerContentValues, getContentMap } from "../lib/siteContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pre-Owned Golf Cart Inventory | Smart Choice Golf Carts",
  description:
    "Browse available pre-owned golf carts from Smart Choice Golf Carts in Naples and call or text for current availability.",
};

export default async function PreOwnedInventory() {
  const inventoryImages = await getInventoryImageMap(inventoryImageSlots);
  const content = await getContentMap([
    ...inventoryContentSlots,
    ...footerContentSlots,
  ]);
  const c = (sectionKey, contentKey, itemId = "") =>
    contentValue(content, "pre-owned-inventory", sectionKey, contentKey, itemId);

  return (
    <SiteShell footerContent={footerContentValues(content)}>
      <main>
        <section className="inventory-hero">
          <div>
            <p className="eyebrow">{c("hero", "eyebrow")}</p>
            <h1>{c("hero", "heading")}</h1>
            <p>{c("hero", "copy")}</p>
          </div>
          <a className="btn btn-primary" href={phoneHref}>
            {c("hero", "button_prefix")} {phone}
          </a>
        </section>

        <section className="inventory-grid" aria-label="Available pre-owned carts">
          {inventoryItems.map((item, index) => (
            <article className="inventory-card" key={item.id}>
              <div className="inventory-photo">
                <ImageCarousel
                  images={inventoryImages[item.id]}
                  alt={item.title}
                  priority={index < 2}
                  sizes="(max-width: 900px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="inventory-card-copy">
                <div>
                  <p className="inventory-price">
                    {c("inventory", "price", item.id)}
                  </p>
                  <h2>{c("inventory", "title", item.id)}</h2>
                </div>
                <p>{c("inventory", "description", item.id)}</p>
                <a className="inventory-link" href={phoneHref}>
                  {c("inventory", "card_cta")}
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
