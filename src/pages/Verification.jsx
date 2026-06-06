import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { verifyMember } from "../services/memberService";

function Verification() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scannerActive, setScannerActive] = useState(true);

  // ✅ QR SCANNER INIT
  useEffect(() => {
    if (!scannerActive) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText) {
      // stop scanner after success
      scanner.clear();
      setScannerActive(false);

      handleVerify(decodedText);
    }

    function onScanError(error) {
      // ignore scan errors (normal while scanning)
      console.log("QR Scan Error:", error);
    }

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scannerActive]);

  // ✅ VERIFY FUNCTION
  const handleVerify = async (membershipId) => {
    setLoading(true);
    setResult(null);

    try {
      const data = await verifyMember(membershipId);
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // restart scanner
  const restartScanner = () => {
    setResult(null);
    setScannerActive(true);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>

      <h1>QR Member Verification</h1>

      {/* SCANNER */}
      {scannerActive && (
        <div id="qr-reader" style={{ width: "300px", margin: "auto" }}></div>
      )}

      {/* LOADING */}
      {loading && <p>Verifying member...</p>}

      {/* RESULT */}
      {result && (
        <div style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px"
        }}>
          <h2>{result.full_name}</h2>
          <p>{result.membership_id}</p>

          <h3 style={{ color: result.is_active ? "green" : "red" }}>
            {result.is_active ? "VALID MEMBER ✅" : "INVALID ❌"}
          </h3>

          <button onClick={restartScanner}>
            Scan Another
          </button>
        </div>
      )}

    </div>
  );
}

export default Verification;