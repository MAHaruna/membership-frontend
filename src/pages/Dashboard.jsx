import { Link } from "react-router-dom";
import pyaLogoNoBg from "../assets/logo.png"; // Your transparent logo
import bannerImg from "../assets/banner.png";  // Your widescreen movement photo
import "./Home.css";

function Dashboard() {
  return (
    <div className="homepage-container">
      {/* MINIMALIST BACKGROUND GRADIENT BLURS */}
      <div className="ambient-blur-one"></div>
      <div className="ambient-blur-two"></div>

      <div className="premium-split-layout">
        
        {/* LEFT COLUMN: THE CORE INTERACTION CONTROL SYSTEM */}
        <div className="control-panel-side">
          
          {/* Subtle Clean Identifier */}
          <div className="minimal-identity-tag">
            <span className="live-pulse"></span>
            <span className="identity-text">Ambassador Identity Hub</span>
          </div>

          <h1 className="hero-statement">
            The Digital Core of <br />
            <span className="brand-gradient">The PYA Movement</span>
          </h1>

          <p className="hero-context-narrative">
            Welcome to the command dashboard for the Pantami Youths Ambassadors. 
            We organize civic leadership structures, verify grassroots data blocks, and map biometric parameters for modern movement operational excellence.
          </p>

          {/* SAAS STYLE UTILITY BUTTON GROUPS */}
          <div className="action-button-cluster">
            <Link to="/register" className="action-btn primary-trigger">
              <span>Onboard Ambassador</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="trigger-arrow">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link to="/members" className="action-btn secondary-trigger">
              Access Directory
            </Link>
          </div>

          {/* HIGH-END MINIMALIST DATA NODES */}
          <div className="metric-display-grid">
            <div className="metric-card">
              <span className="metric-value">36</span>
              <span className="metric-tag">States Registered</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">100%</span>
              <span className="metric-tag">Encrypted Storage</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">Instant</span>
              <span className="metric-tag">QR Verification</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PURE MODERN FLOATING BRAND METRIC GRID */}
        <div className="showcase-banner-side">
          <div className="widescreen-media-frame">
            {/* Clean Widescreen Banner Layout Constraint */}
            <img 
              src={bannerImg} 
              alt="Movement Interface Visual" 
              className="premium-banner-asset" 
            />
            <div className="scenic-gradient-gradient"></div>
            
            {/* Pure Floating Transparent Logo Layer - Completely Unbound */}
            <div className="absolute-logo-overlay">
              <img 
                src={pyaLogoNoBg} 
                alt="PYA Logo" 
                className="pure-floating-logo" 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;