import Image from "next/image";
import SiteShell from "../components/SiteShell";
import { inventoryImageBase, inventoryItems, phone, phoneHref } from "../data";

export const metadata = {
  title: "Pre-Owned Golf Cart Inventory | Smart Choice Golf Carts",
  description:
    "Browse available pre-owned golf carts from Smart Choice Golf Carts in Naples and call or text for current availability.",
};

export default function PreOwnedInventory() {
  return (
    <SiteShell>
      <main>
        <section className="inventory-hero">
          <div>
            <p className="eyebrow">Available Inventory</p>
            <h1>Pre-Owned Golf Carts Ready for a New Driveway</h1>
            <p>
              Inventory changes quickly. Call or text to confirm availability,
              ask questions, or schedule a time to see a cart in person.
            </p>
          </div>
          <a className="btn btn-primary" href={phoneHref}>
            Call or Text {phone}
          </a>
        </section>

        <section className="inventory-grid" aria-label="Available pre-owned carts">
          {inventoryItems.map((item, index) => (
            <article className="inventory-card" key={`${item.title}-${item.price}`}>
              <div className="inventory-photo">
                <Image
                  src={`${inventoryImageBase}${item.image}`}
                  alt={item.title}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 900px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="inventory-card-copy">
                <div>
                  <p className="inventory-price">{item.price}</p>
                  <h2>{item.title}</h2>
                </div>
                <p>{item.description}</p>
                <a className="inventory-link" href={phoneHref}>
                  Ask about this cart
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SiteShell>
  );
}
