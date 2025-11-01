import React, { useEffect, useRef, useState } from "react";
import "./Land.css";
import heroVid from "../assets/IMG_9158.mp4";
import teamPhoto from "../assets/team.jpg";
import img9052 from "../assets/IMG_9052.png";
import topImage from "../assets/IMG_6262.png";
import aboutImage from "../assets/IMG_9097.png";
import { useTheme } from "../utils/useTheme";
import { Link } from "react-router-dom";

// Resolve correct base (/Official-DART-Website)
const pub = (p) => `${process.env.PUBLIC_URL}/${p.replace(/^\/+/, "")}`;

// For images, store RELATIVE paths only (files should be in public/images)
const mediaItems = [
  { type: "video", src: heroVid },                // module import is fine
  { type: "image", src: "images/IMG_8931.png",     alt: "Pinhead Larry" },
  { type: "image", src: "images/IMG_9107.png",     alt: "Storm Surge"  },
];
const resolveSrc = (it) =>
    typeof it.src === "string" ? pub(it.src) : it.src;
function MediaCarousel() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((current + 1) % mediaItems.length);
  const prev = () =>
    setCurrent((current - 1 + mediaItems.length) % mediaItems.length);
  const item = mediaItems[current];

  return (
    <div className="carousel-container">
      <button onClick={prev} className="about-btn">❮</button>
      <div className="media-item">
        {item.type === "video" ? (
          <video controls className="media-video">
            <source src={item.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={resolveSrc(item)} alt={item.alt} className="media-image" />
        )}
      </div>
      <button onClick={next} className="about-btn">❯</button>
    </div>
  );
}

export function Land() {
  const aboutTextRef     = useRef(null);
  const foundersLeftRef  = useRef(null);
  const foundersRightRef = useRef(null);
  const trevorRef        = useRef(null);
  const nickRef          = useRef(null);

  useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === aboutTextRef.current) {
            aboutTextRef.current.classList.toggle("visible", entry.isIntersecting);
          }
          if (entry.target === trevorRef.current) {
            const action = entry.isIntersecting ? "add" : "remove";
            [trevorRef.current, nickRef.current, foundersLeftRef.current, foundersRightRef.current]
              .forEach(el => el && el.classList[action]("visible"));
          }
          if (entry.target.classList.contains("project-card")) {
            entry.target.classList.toggle("visible", entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (aboutTextRef.current) observer.observe(aboutTextRef.current);
    if (trevorRef.current) observer.observe(trevorRef.current);

    const cards = Array.from(document.querySelectorAll(".project-grid .project-card"));
    cards.forEach((card, i) => {
      card.classList.add("hidden", i === 1 ? "slide-down" : "slide-up");
      observer.observe(card);
    });

    return () => {
      if (aboutTextRef.current) observer.unobserve(aboutTextRef.current);
      if (trevorRef.current) observer.unobserve(trevorRef.current);
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <div id="Landing">
      <div className="top-image-wrapper">
        <img src={topImage} alt="Top Robotics Scene" className="top-banner" />
        <div className="hero-overlay">
          <img src={pub("images/DART.svg")} alt="DART Logo" className="hero-logo small" />
          <h1>DART Robotics</h1>
          <p>Innovating through destruction – Virginia Tech’s Combat Robotics Team</p>
        </div>
      </div>

      <section className="about-section">
        <img src={aboutImage} alt="About the team" className="about-image" />
        <div ref={aboutTextRef} className="about-overlay-text hidden">
          <h2>About the Team</h2>
          <p>
            Founded in 2022, DART Robotics builds combat robots for competitions
            like RoboGames, AutoNav, and VEX-style arena matches. We bring
            together mechanical, software, and electrical engineers from all
            disciplines.
          </p>
          <Link to="/about" className="about-btn">Learn More</Link>
        </div>
      </section>

      <section className="projects section-colored">
        <h2>Robots</h2>
        <div className="project-grid">
          <div className="project-card">
            <img src={pub("images/stormsurge.png")} alt="Storm Surge" />
            <h3>Storm Surge</h3>
          </div>
          <div className="project-card">
            <img src={pub("images/pinhead.png")} alt="Pinhead Larry" />
            <h3>Pinhead Larry</h3>
            <Link to="/robots" className="about-btn">View Full Robot Page</Link>
          </div>
          <div className="project-card">
            <img src={pub("images/eggbeater.png")} alt="Eggbeater" />
            <h3>Eggbeater</h3>
          </div>
        </div>
      </section>

      <section className="spacer-section"></section>

      <section className="team-preview section-colored">
        <h2>Meet the Founders</h2>
        <div className="team-row">
          <div className="founder-block">
            <div ref={foundersLeftRef} className="founders-left-text hidden">
              <p>
                Trevor was the operations lead since DART's inception,
                driving logistics and strategy for all robot builds and competitions.
              </p>
            </div>
            <div ref={trevorRef} className="team-member slide-in-left hidden">
              {/* Consider renaming these files to avoid spaces */}
              <img src={pub("images/Trevor Ierardi.png")} alt="Trevor Ierardi" />
              <h3>Trevor Ierardi</h3>
            </div>
          </div>
          <div className="founder-block">
            <div ref={nickRef} className="team-member slide-in-right hidden">
              <img src={pub("images/Nick Cowen.png")} alt="Nick Cowen" />
              <h3>Nick Cowen</h3>
            </div>
            <div ref={foundersRightRef} className="founders-right-text hidden">
              <p>
                Nick leads the Darts Organization and mechanical team with a focus on design innovation and
                battle-ready durability for our flagship robots.
              </p>
            </div>
          </div>
        </div>
        <Link to="/team" className="about-btn">Full Team Roster</Link>
      </section>

      <section className="media">
        <h2>Gallery & Media</h2>
        <MediaCarousel />
      </section>

      <section className="sponsors section-colored">
        <h2>Our Sponsors</h2>
        <h4>
          We are proudly supported by industry partners and local businesses who help make our robots possible.
        </h4>
        <div className="sponsor-logos">
          <img src={pub("icons/SponsorLogo.svg")}  alt="Sponsor Logo"  className="sponsor-logo" />
          <img src={pub("icons/SponsorLogo2.svg")} alt="Sponsor Logo2" className="sponsor-logo" />
        </div>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link to="/sponsors" className="about-btn">See More</Link>
        </div>
      </section>

      <section
        className="join-section"
        style={{
          backgroundImage: `url(${teamPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "5rem 2rem",
          textAlign: "center",
          color: "white",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2>Want To Join Us?</h2>
          <p>
            DART Robotics is open to students from all majors interested in
            combat robotics — no experience required. Join us to learn, build,
            and compete.
          </p>
          <a href="mailto:nickolasc24@vt.edu" className="about-btn">
            nickolasc24@vt.edu
          </a>
        </div>
      </section>
    </div>
  );
}
