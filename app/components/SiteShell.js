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
          file="smart-choice.jpg"
          alt="Smart Choice Golf Carts"
          height={42}
          width={190}
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
      <div className="footer-grid">
        <div>
          <LocalImage
            className="footer-logo"
            file="smart-choice.jpg"
            alt="Smart Choice Golf Carts"
            height={52}
            width={230}
          />
          <p>YOUR LOCAL ONE-STOP GOLF CART SHOP</p>
          <a className="footer-phone" href={phoneHref}>
            {phone}
          </a>
        </div>
        <div>
          <h2>Site Map</h2>
          <div className="footer-links">
            {navItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
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
