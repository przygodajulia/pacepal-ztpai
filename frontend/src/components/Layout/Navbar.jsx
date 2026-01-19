import { useState } from "react";

function Navbar({ current }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div className="default-nav-header">
        <img className="header-img" src="/img/running_girl.png" alt="main logo" />
        <h1 className="default-header-text">Pacepal</h1>
      </div>

      <div className="default-nav-list">
        <ul>
          <li>
            <a className={`nav-link ${current === "races" ? "mark-current" : ""}`} href="/races">
              Races Calendar
            </a>
          </li>
          <li>
            <a className={`nav-link ${current === "my_races" ? "mark-current" : ""}`} href="/my_races">
              My Races
            </a>
          </li>
          <li>
            <a className={`nav-link ${current === "my_account" ? "mark-current" : ""}`} href="/my_account">
              My Account
            </a>
          </li>
        </ul>
      </div>

      <img
        className="mobile-menu-icon"
        src="/img/menu.png"
        alt="menu icon"
        onClick={() => setMenuOpen(!menuOpen)}
      />

      <div className={`mobile-menu-container ${menuOpen ? "show-menu" : ""}`}>
        <ul>
          <li>
            <a href="/races" onClick={() => setMenuOpen(false)}>
              Races Calendar
            </a>
          </li>
          <li>
            <a href="/my_races" onClick={() => setMenuOpen(false)}>
              My Races
            </a>
          </li>
          <li>
            <a href="/my_account" onClick={() => setMenuOpen(false)}>
              My Account
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
              }}
            >
              Close
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
