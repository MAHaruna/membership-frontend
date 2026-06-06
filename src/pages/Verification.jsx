import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { verifyMember } from "../services/memberService";

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

      // ✅ CLEAN QR INPUT (MOST IMPORTANT FIX)
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

  // ✅ VERIFY MEMBER
  const handleVerify = async (membershipId) => {
    if (!membershipId) {
      setResult({
        success: false,
        message: "Invalid QR Code"
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await verifyMember(membershipId);

      setResult({
        success: true,
        member: data
      });
    } catch (err) {
      console.error(err);

      setResult({
        success: false,
        message: "Member not found or invalid QR"
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESTART SCANNER
  const restartScanner = () => {
    setResult(null);
    setScannerActive(true);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>

      <h1>QR Member Verification</h1>

      {/* SCANNER */}
      {scannerActive && (
        <div
          id="qr-reader"
          style={{ width: "300px", margin: "auto" }}
        ></div>
      )}

      {/* LOADING */}
      {loading && <p>Verifying member...</p>}

      {/* SUCCESS RESULT */}
      {result?.success && (
        <div style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #4CAF50",
          borderRadius: "10px",
          background: "#f0fff0"
        }}>
          <h2>{result.member.full_name}</h2>
          <p>{result.member.membership_id}</p>

          <h3 style={{ color: "green" }}>
            VALID MEMBER ✅
          </h3>

          <button onClick={restartScanner}>
            Scan Another
          </button>
        </div>
      )}

      {/* ERROR RESULT */}
      {result && !result.success && (
        <div style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid red",
          borderRadius: "10px",
          background: "#fff0f0"
        }}>
          <h3 style={{ color: "red" }}>
            {result.message}
          </h3>

          <button onClick={restartScanner}>
            Try Again
          </button>
        </div>
      )}

    </div>
  );
}

export default Verification;