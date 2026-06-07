import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "./Login.css"; // Link to the new modern stylesheet

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // Modern inline state instead of ugly alert()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await login(username, password);
      navigate("/members");
    } catch (err) {
      setErrorMsg("Invalid credentials. Please verify your access tokens.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* DEEP GLASS AMBIENT BACKDROPS */}
      <div className="login-blur-sphere login-blur-1"></div>
      <div className="login-blur-sphere login-blur-2"></div>

      <div className="login-card animate-slide-up">
        {/* HEADER BLOCK */}
        <div className="login-header">
          <h1>Admin Control</h1>
          <p className="login-subtitle">Secure Gateway Infrastructure</p>
        </div>

        {/* MODERN NOTIFICATION BANNER */}
        {errorMsg && (
          <div className="login-error-banner animate-fade-in">
            <span className="error-icon">⚠️</span>
            <p>{errorMsg}</p>
          </div>
        )}

        {/* INPUT FORM TRACK */}
        <form onSubmit={handleSubmit} className="login-form-group">
          <div className="input-field-wrapper">
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input-element"
            />
            <span className="input-accent-border"></span>
          </div>

          <div className="input-field-wrapper">
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input-element"
            />
            <span className="input-accent-border"></span>
          </div>

          <button type="submit" disabled={loading} className="login-submit-trigger">
            {loading ? (
              <div className="login-btn-spinner-layout">
                <span className="login-mini-spinner"></span>
                <span>Authenticating Identity...</span>
              </div>
            ) : (
              <span>Authorize Access</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;