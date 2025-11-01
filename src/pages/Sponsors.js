// ./Sponsors.js
import React from "react";
import { Link } from "react-router-dom";
import "./Sponsors.css";

// Helper to resolve correct base (/Official-DART-Website)
const pub = (p) => `${process.env.PUBLIC_URL}/${p.replace(/^\/+/, "")}`;

const SPONSORS = [
  {
    name: "Calders Coffee Cafe",
    url: "https://calderscoffeecafe.com/",
    logo: "images/CaldersLogo.jpg",          // <-- plain path (no leading slash)
    tier: "Sponsors",
  },
  {
    name: "Undergraduate Student Senate of Virginia Tech",
    url: "https://uss.vt.edu/",
    logo: "images/USSVT.png",                // <-- plain path (no leading slash)
    tier: "Sponsors",
  },
];

export function Sponsors() {
  const sponsorEmail = "DARTvtech@gmail.com";
  const subject = encodeURIComponent("Sponsorship Inquiry — DART (Virginia Tech)");
  const body = encodeURIComponent(
    `Hello DART Team,

I'm interested in supporting the Destructive Arena Robotics Team. Could you share how we can collaborate?

Thanks,`
  );
  const mailto = `mailto:${sponsorEmail}?subject=${subject}&body=${body}`;

  // If you add more tiers later, group programmatically; for now this is fine:
  const grouped = { Sponsors: SPONSORS };
  const sortedTiers = ["Sponsors"];

  return (
    <div className="sponsors-page">
      <section className="sponsors-hero">
        <h1>Thank You to Our Sponsors & Partners</h1>
        <p>
          Our robots are possible thanks to generous support from sponsors and campus partners.
          Your contributions fuel student learning, competition travel, parts and materials,
          and outreach to the community.
        </p>
        <div className="cta-row">
          <a className="btn primary" href={mailto}>Become a Sponsor</a>
          <Link className="btn ghost" to="/robots">See Our Robots</Link>
        </div>
      </section>

      <section className="sponsor-grid">
        {sortedTiers.map((tier) => (
          <div key={tier} className="tier-block">
            <h2 className="tier-heading">{tier}</h2>
            <div className="grid">
              {grouped[tier].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card"
                  aria-label={`${s.name} — opens in new tab`}
                >
                  <img
                    src={pub(s.logo)}                 // <-- resolve to /Official-DART-Website/...
                    alt={`${s.name} logo`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="card-name">{s.name}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="closing-cta">
        <h2>Support the Team</h2>
        <p>Interested in joining as a sponsor? We offer recognition across events, social, and our website!</p>
        <a className="btn primary" href={mailto}>Become a Sponsor</a>
      </section>
    </div>
  );
}
