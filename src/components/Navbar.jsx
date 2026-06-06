import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Membership System</Link>
      </div>

      <div className="navbar-links">
        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/members">
          Members
        </NavLink>

        <NavLink to="/register">
          Register
        </NavLink>

        <NavLink to="/verify">
          Verify
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;