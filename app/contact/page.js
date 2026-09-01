import SiteShell from "../components/SiteShell";
import LocalImage from "../components/LocalImage";
import { images, phone, phoneHref } from "../data";

export default function Contact() {
  return (
    <SiteShell>
      <main>
        <section className="hero page-hero contact-hero">
          <LocalImage file={images.contact} alt="" fill priority sizes="100vw" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Contact Smart Choice</p>
            <h1>Call or Text Anytime — We’re Here to Help</h1>
            <p className="hero-copy">
              Located right off Oakes Blvd. in North Naples.
            </p>
            <p className="hero-note">Hours: 9AM-5PM Monday - Saturday</p>
            <a className="btn btn-primary" href={phoneHref}>
              Call or Text {phone}
            </a>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
