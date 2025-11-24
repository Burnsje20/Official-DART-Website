import React from 'react';
import {Route, Routes, Link, HashRouter } from 'react-router-dom'; // at the top
import { Sponsors } from './Sponsors';
import ScrollToTop from "./ScrollToTop";
import { About } from './About';
import { Land } from './Land';
import data from './navigation.json';
import './Home.css';
import themes from './themes.json';
import { Team } from './Team';
import { Robots } from './Robots';
const pub = (p) => `${process.env.PUBLIC_URL}/${p.replace(/^\/+/, '')}`;

function setTheme(themestr) {
  const theme = themes[themestr];
  const style = document.body.style;
  Object.keys(theme).forEach((key) => {
    style.setProperty('--' + key, theme[key]);
  });
  style.background = theme.bg;
  style.setProperty('--icon-filter', themestr === 'dark' ? 'invert(1)' : 'none');
  style.setProperty('--cta-color', themestr === 'dark' ? '#00cc66' : '#cc0000');
  style.setProperty('--cta-color-hover', themestr === 'dark' ? '#00e676' : '#e60000');
}

function Header({ currentTheme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme]);

  // close the mobile menu when viewport becomes desktop to avoid stuck-open state
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  return (
    <div id="header">
      <button
        id="hamburber"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((s) => !s)}
      >
        <img src={pub('icons/menu.svg')} alt="" aria-hidden="true" />
      </button>

      <Link to="/" id="logo_container">
        <img src={pub('images/DART.svg')} id="logo" alt="logo" />
      </Link>

      <nav id="navPanel" className={menuOpen ? 'open' : ''}>
        {Object.keys(data).map((key, index) => (
          <li key={index} className="navItem">
            <Link to={data[key]} onClick={() => setMenuOpen(false)}>{key}</Link>
          </li>
        ))}
      </nav>

      <button id="theme" onClick={toggleTheme}>
        <img src={currentTheme === 'light' ? 'icons/moon.svg' : 'icons/sun.svg'} alt="theme toggle" />
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-wrapper">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="footer-links">
            <a href="mailto:nickolasc24@vt.edu" className="footer-button">
              <img src={pub("/icons/email.svg")} alt="Email" />
              <span>nickolasc24@vt.edu</span>
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Social</h3>
          <div className="footer-links">
            <a href="https://www.instagram.com/vtdart/" target="_blank" rel="noreferrer" className="footer-button">
              <img src={`${process.env.PUBLIC_URL}/icons/instagram.svg`} alt="Instagram" />
              <span>Instagram</span>
            </a>
            <a href="https://discord.gg/GY4mx3Eb" target="_blank" rel="noreferrer" className="footer-button">
              <img src={pub("/icons/discord.svg")} alt="Discord" />
              <span>Discord</span>
            </a>
            <a href="https://vt.campuslabs.com/engage/organization/dart" target="_blank" rel="noreferrer" className="footer-button">
              <img src={pub("/icons/gobbler.svg")} alt="GobblerConnect" />
              <span>GobblerConnect</span>
            </a>
            <a href="https://www.linkedin.com/company/destructive-arena-robotics-team-dart/" target="_blank" rel="noreferrer" className="footer-button">
              <img src={pub("/icons/linkedin.svg")} alt="LinkedIn" />
              <span>LinkedIn</span>
            </a>
            <a href="https://www.youtube.com/@DARTatVirginiaTech" target="_blank" rel="noreferrer" className="footer-button">
              <img src={pub("/icons/youtube.svg")} alt="YouTube" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      
      </div>
    </footer>
  );
}

function Home() {
  const [currentTheme, setCurrentTheme] = React.useState('light');
  const toggleTheme = () => setCurrentTheme(prev => (prev === 'light' ? 'dark' : 'light'));

 return (
  <HashRouter>
    <ScrollToTop />
    <Header currentTheme={currentTheme} toggleTheme={toggleTheme} />
    <div id='content'>
        <Routes>
          <Route index element={<Land currentTheme={currentTheme} />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/robots" element={<Robots />} />
          <Route path="/sponsors" element={<Sponsors />} />
        </Routes>
      </div>
      <Footer />
  </HashRouter>
  );
}

export default Home;