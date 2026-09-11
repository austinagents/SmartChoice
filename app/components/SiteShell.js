"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, phone, phoneHref } from "../data";
import LocalImage from "./LocalImage";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Smart Choice Golf Carts home">
        <LocalImage
          file="smarchoicenew.png"
          alt="Smart Choice Golf Carts"
          height={72}
          width={217}
        />
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              className={active ? "active" : ""}
              href={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <a className="phone-link" href={phoneHref}>
        {phone}
      </a>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-rule" />
      <div className="footer-grid">
        <div className="footer-brand">
          <LocalImage
            className="footer-logo"
            file="smarchoicenew.png"
            alt="Smart Choice Golf Carts"
            height={72}
            width={217}
          />
          <p>Your local one-stop golf cart shop for sales, service, builds, and consignment.</p>
          <a className="footer-phone" href={phoneHref}>
            {phone}
          </a>
        </div>
        <div className="footer-column">
          <h2>Site Map</h2>
          <div className="footer-links">
            {navItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-column footer-service-area">
          <h2>Service Area</h2>
          <div className="footer-links">
            <span>Greater Naples</span>
            <span>Quail Creek</span>
            <span>Quail Creek Estates</span>
            <span>Esplanade</span>
            <span>The Quarry</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
