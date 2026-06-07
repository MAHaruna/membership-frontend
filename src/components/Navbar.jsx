import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
// This path steps out of components/ and into assets/ with lowercase matching
import pyaLogo from "../assets/logo.jpg"; 

function Navbar() {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        {/* PYA Identity Branding */}
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <div className="logo-image-wrapper">
              <img 
                src={pyaLogo} 
                alt="PYA Logo" 
                className="pya-logo-img"
                onError={(e) => {
                  // If the image fails to load, this safely brings up the text fallback token
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'block';
                  }
                }}
              />
              <div className="logo-fallback-icon" style={{ display: 'none' }}>PYA</div>
            </div>
            <div className="logo-text-group">
              <span className="logo-title">PANTAMI YOUTHS AMBASSADORS</span>
              <span className="logo-subtitle">THE BACKBONE OF THE MOVEMENT</span>
            </div>
          </Link>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/members" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Members</span>
          </NavLink>

          <NavLink to="/register" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Register</span>
          </NavLink>

          <NavLink to="/verify" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Verify</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;