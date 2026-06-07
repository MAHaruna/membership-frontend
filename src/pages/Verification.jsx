import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { verifyMember } from "../services/memberService";
import "./Verification.css"; // Import the ultra-modern stylesheet

function Verification() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scannerActive, setScannerActive] = useState(true);

  useEffect(() => {
    if (!scannerActive) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText) {
      scanner.clear();
      setScannerActive(false);

      const membershipId = decodedText
        .replace(import.meta.env.VITE_API_URL || "", "")
        .split("/")
        .filter(Boolean)
        .pop()
        .trim();

      handleVerify(membershipId);
    }

    function onScanError(error) {
      console.log("QR Scan Error:", error);
    }

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scannerActive]);

  const handleVerify = async (membershipId) => {
    if (!membershipId) {
      setResult({ success: false, message: "Invalid QR Code" });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await verifyMember(membershipId);
      setResult({ success: true, member: data });
    } catch (err) {
      console.error(err);
      setResult({ success: false, message: "Member not found or invalid QR" });
    } finally {
      setLoading(false);
    }
  };

  const restartScanner = () => {
    setResult(null);
    setScannerActive(true);
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h1>QR Verification</h1>
        <p className="subtitle">Scan member ID pass to authenticate access</p>

        {/* SCANNER CONTAINER */}
        {scannerActive && (
          <div className="scanner-wrapper">
            <div id="qr-reader"></div>
            <div className="scanner-overlay-laser"></div>
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cryptographic verification in progress...</p>
          </div>
        )}

        {/* SUCCESS RESULT */}
        {result?.success && (
          <div className="result-panel success">
            <div className="status-badge">VALID MEMBER</div>
            <h2 className="member-name">{result.member.full_name}</h2>
            <p className="member-id">{result.member.membership_id}</p>
            <button className="btn" onClick={restartScanner}>
              Scan Next Pass
            </button>
          </div>
        )}

        {/* ERROR RESULT */}
        {result && !result.success && (
          <div className="result-panel error">
            <div className="status-badge">ACCESS DENIED</div>
            <h3 className="error-message">{result.message}</h3>
            <button className="btn" onClick={restartScanner}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verification;