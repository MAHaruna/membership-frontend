import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMembers } from "../services/memberService";
import { logout } from "../services/authService"; // ✅ ADDED
import "./Members.css";

function Members() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyId, setVerifyId] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await getMembers();
      setMembers(data?.results ?? data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // LIVE FILTER (no button)
  const filteredMembers = members.filter((m) =>
    `${m.full_name} ${m.membership_id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const rows = [
      ["Name", "ID", "Phone", "State", "LGA", "Status"],
      ...filteredMembers.map((m) => [
        m.full_name,
        m.membership_id,
        m.phone_number,
        m.state_name,
        m.local_government_name,
        m.is_active ? "Active" : "Inactive",
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "members_export.csv";
    a.click();
  };

  const verifyMember = () => {
    if (!verifyId) return alert("Enter Membership ID");
    navigate(`/verify/${verifyId}`);
  };

  // 🔴 LOGOUT HANDLER
  const handleLogout = () => {
    logout(); // clears token
    navigate("/"); // or "/login" if you have login page
  };

  const activeCount = members.filter((m) => m.is_active).length;

  return (
    <div className="emis-container">

      {/* TOP INTELLIGENCE BAR */}
      <div className="emis-topbar">

        <div className="emis-title">
          <h1>Members Intelligence System</h1>
          <p>Real-time membership monitoring & verification system</p>
        </div>

        <div className="emis-actions">
          <button onClick={exportCSV}>Export</button>
          <button onClick={() => setVerifyOpen(true)}>Verify</button>
          <button onClick={fetchMembers}>Refresh</button>

          {/* 🔴 LOGOUT BUTTON */}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

      </div>

      {/* KPI STRIP */}
      <div className="emis-kpi">
        <div className="kpi">
          <h2>{members.length}</h2>
          <p>Total Members</p>
        </div>

        <div className="kpi green">
          <h2>{activeCount}</h2>
          <p>Active Members</p>
        </div>

        <div className="kpi">
          <h2>{members.length - activeCount}</h2>
          <p>Inactive</p>
        </div>
      </div>

      {/* LIVE SEARCH */}
      <div className="emis-search">
        <input
          placeholder="Search members by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      {loading ? (
        <div className="emis-loading">Loading system data...</div>
      ) : (
        <div className="emis-grid">

          {filteredMembers.map((m) => (
            <div
              key={m.id}
              className="emis-card"
              onClick={() => setSelected(m)}
            >
              <div className="avatar">{m.full_name?.charAt(0)}</div>

              <h3>{m.full_name}</h3>
              <p className="id">{m.membership_id}</p>

              <p className="meta">
                {m.state_name} • {m.local_government_name}
              </p>

              <span className={m.is_active ? "active" : "inactive"}>
                {m.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          ))}

        </div>
      )}

      {/* SIDE DRAWER */}
      {selected && (
        <div className="emis-drawer" onClick={() => setSelected(null)}>
          <div className="emis-panel" onClick={(e) => e.stopPropagation()}>

            <h2>{selected.full_name}</h2>

            <p><b>ID:</b> {selected.membership_id}</p>
            <p><b>Phone:</b> {selected.phone_number}</p>
            <p><b>State:</b> {selected.state_name}</p>
            <p><b>LGA:</b> {selected.local_government_name}</p>

            <button
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_API_URL}/members/card/${selected.membership_id}/`,
                  "_blank"
                )
              }
            >
              Download Card
            </button>

          </div>
        </div>
      )}

      {/* VERIFY MODAL */}
      {verifyOpen && (
        <div className="emis-modal" onClick={() => setVerifyOpen(false)}>
          <div className="emis-box" onClick={(e) => e.stopPropagation()}>

            <h2>Verify Member</h2>

            <input
              placeholder="Enter Membership ID"
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
            />

            <button onClick={verifyMember}>
              Verify Now
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Members;