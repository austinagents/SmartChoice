import Link from "next/link";
import ImageCarousel from "./components/ImageCarousel";
import SiteShell from "./components/SiteShell";
import {
  homepageImageSlots,
  homepageContentSlots,
  footerContentSlots,
  inventoryImageSlots,
  inventoryContentSlots,
  inventoryItems,
  phone,
  phoneHref,
} from "./data";
import { getHomepageImageMap, getInventoryImageMap } from "./lib/siteImages";
import { contentValue, footerContentValues, getContentMap } from "./lib/siteContent";

export const dynamic = "force-dynamic";

const featuredInventory = inventoryItems.slice(0, 4);

export default async function Home() {
  const homepageImages = await getHomepageImageMap(homepageImageSlots);
  const inventoryImages = await getInventoryImageMap(inventoryImageSlots);
  const content = await getContentMap([
    ...homepageContentSlots,
    ...inventoryContentSlots,
    ...footerContentSlots,
  ]);
  const c = (sectionKey, contentKey, itemId = "") =>
    contentValue(content, "homepage", sectionKey, contentKey, itemId);
  const inventoryText = (contentKey, itemId = "") =>
    contentValue(content, "pre-owned-inventory", "inventory", contentKey, itemId);
  const whatWeDo = [
    {
      title: c("what_we_do", "pre_owned_title"),
      text: c("what_we_do", "pre_owned_text"),
      href: "/pre-owned-inventory",
      slotKey: "pre_owned_carts",
    },
    {
      title: c("what_we_do", "built_title"),
      text: c("what_we_do", "built_text"),
      href: "/built-to-order",
      slotKey: "built_to_order_carts",
    },
    {
      title: c("what_we_do", "service_title"),
      text: c("what_we_do", "service_text"),
      href: "/services",
      slotKey: "service_repairs",
    },
    {
      title: c("what_we_do", "consign_title"),
      text: c("what_we_do", "consign_text"),
      href: "/consignment",
      slotKey: "consign_sales",
    },
  ];

  return (
    <SiteShell footerContent={footerContentValues(content)}>
      <main className="home-page">
        <section className="hero hero-home">
          <ImageCarousel
            images={homepageImages.hero_image}
            alt=""
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">{c("hero", "eyebrow")}</p>
            <h1>{c("hero", "heading")}</h1>
            <p className="hero-copy">{c("hero", "copy")}</p>
            <div className="button-row">
              <Link className="btn btn-primary" href="/pre-owned-inventory">
                {c("hero", "inventory_button")}
              </Link>
              <Link className="btn btn-secondary dark" href="/built-to-order">
                {c("hero", "build_button")}
              </Link>
              <Link className="btn btn-tertiary" href="/services">
                {c("hero", "service_button")}
              </Link>
            </div>
          </div>
        </section>

        <section className="section home-section home-departments">
          <div className="section-heading">
            <p className="eyebrow">{c("what_we_do", "eyebrow")}</p>
            <h2>{c("what_we_do", "heading")}</h2>
          </div>
          <div className="department-grid">
            {whatWeDo.map((item) => (
              <article className="department-card" key={item.title}>
                <div className="department-card-image">
                  <ImageCarousel
                    images={homepageImages[item.slotKey]}
                    alt=""
                    sizes="(max-width: 720px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </div>
                <Link href={item.href} className="department-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section home-section inventory-preview">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">{c("inventory_preview", "eyebrow")}</p>
              <h2>{c("inventory_preview", "heading")}</h2>
            </div>
            <Link className="btn btn-secondary dark" href="/pre-owned-inventory">
              {c("inventory_preview", "button")}
            </Link>
          </div>
          <div className="featured-inventory-grid">
            {featuredInventory.map((cart, index) => (
              <article className="featured-cart" key={cart.id}>
                <div className="featured-cart-image">
                  <ImageCarousel
                    images={inventoryImages[cart.id]}
                    alt={cart.title}
                    priority={index === 0}
                    sizes="(max-width: 720px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                </div>
                <div className="featured-cart-copy">
                  <p className="featured-cart-price">
                    {inventoryText("price", cart.id)}
                  </p>
                  <h3>{inventoryText("title", cart.id)}</h3>
                  <p>{inventoryText("description", cart.id)}</p>
                  <a href={phoneHref}>{c("inventory_preview", "card_cta")}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-feature-band">
          <div className="home-feature-image">
            <ImageCarousel
              images={homepageImages.built_to_order_feature}
              alt=""
              sizes="(max-width: 980px) 100vw, 50vw"
            />
          </div>
          <div className="home-feature-copy">
            <p className="eyebrow">{c("built_feature", "eyebrow")}</p>
            <h2>{c("built_feature", "heading")}</h2>
            <p>{c("built_feature", "copy")}</p>
            <Link className="btn btn-primary" href="/built-to-order">
              {c("built_feature", "button")}
            </Link>
          </div>
        </section>

        <section className="home-feature-band reverse">
          <div className="home-feature-image service-crop">
            <ImageCarousel
              images={homepageImages.mobile_service_feature}
              alt=""
              sizes="(max-width: 980px) 100vw, 50vw"
            />
          </div>
          <div className="home-feature-copy">
            <p className="eyebrow">{c("service_feature", "eyebrow")}</p>
            <h2>{c("service_feature", "heading")}</h2>
            <p>{c("service_feature", "copy")}</p>
            <Link className="btn btn-primary" href="/services">
              {c("service_feature", "button")}
            </Link>
          </div>
        </section>

        <section className="section home-section consignment-panel">
          <div className="consignment-image">
            <ImageCarousel
              images={homepageImages.consignment_feature}
              alt=""
              sizes="(max-width: 980px) 100vw, 44vw"
            />
          </div>
          <div className="consignment-copy">
            <p className="eyebrow">{c("consignment", "eyebrow")}</p>
            <h2>{c("consignment", "heading")}</h2>
            <p>{c("consignment", "copy")}</p>
            <Link className="btn btn-secondary dark" href="/consignment">
              {c("consignment", "button")}
            </Link>
          </div>
        </section>

        <section className="section home-section local-band">
          <div>
            <p className="eyebrow">{c("local", "eyebrow")}</p>
            <h2>{c("local", "heading")}</h2>
          </div>
          <p>{c("local", "copy")}</p>
        </section>

        <section className="home-final-cta">
          <p className="eyebrow">{c("final_cta", "eyebrow")}</p>
          <h2>{c("final_cta", "heading")}</h2>
          <a className="btn btn-primary" href={phoneHref}>
            {c("final_cta", "button_prefix")} {phone}
          </a>
        </section>
      </main>
    </SiteShell>
  );
}
