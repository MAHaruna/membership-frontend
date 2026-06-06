import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMembers } from "../services/memberService";
import "./Members.css";

function Members() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [lgaFilter, setLgaFilter] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);

    try {
      const data = await getMembers({
        search: search || undefined,
        state: stateFilter || undefined,
        local_government: lgaFilter || undefined,
      });

      const results = data.results ?? data;
      setMembers(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      fetchMembers();
    }
  };

  return (
    <div className="members-container">

      {/* HEADER */}
      <div className="members-header">
        <h1>Members Management</h1>
        <p>Manage and view all registered members</p>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">

        <input
          type="text"
          placeholder="Search name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKey}
        />

        <input
          type="text"
          placeholder="State ID"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          onKeyDown={handleSearchKey}
        />

        <input
          type="text"
          placeholder="LGA ID"
          value={lgaFilter}
          onChange={(e) => setLgaFilter(e.target.value)}
          onKeyDown={handleSearchKey}
        />

        <button onClick={fetchMembers}>
          Search
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="loading">Loading members...</div>
      ) : members.length === 0 ? (
        <div className="empty-state">
          No members found.
        </div>
      ) : (
        <>
          <div className="summary">
            Total Members: <b>{members.length}</b>
          </div>

          <div className="table-wrapper">
            <table className="members-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Membership ID</th>
                  <th>Phone</th>
                  <th>State</th>
                  <th>LGA</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {members.map((m) => (
                  <tr key={m.id}>

                    <td>{m.full_name}</td>
                    <td>{m.membership_id}</td>
                    <td>{m.phone_number}</td>
                    <td>{m.state_name}</td>
                    <td>{m.local_government_name}</td>

                    <td>
                      <span className={m.is_active ? "active" : "inactive"}>
                        {m.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/members/${m.id}`)}
                      >
                        View
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Members;