import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMember } from "../services/memberService";
import "./Members.css";

function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    setLoading(true);

    try {
      const data = await getMember(id);
      setMember(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DOWNLOAD CARD (backend file)
  const downloadCard = () => {
    if (!member?.membership_id) {
      alert("Membership ID not found");
      return;
    }

    window.open(
      `${import.meta.env.VITE_API_URL}/members/card/${member.membership_id}/`,
      "_blank"
    );
  };

  // ✅ VERIFY (React Router navigation - FIXED)
    const verifyMember = () => {
    if (!member?.membership_id) {
        alert("Membership ID not found");
        return;
    }

    navigate(`/verify/${member.membership_id}`);
    };
  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="profile-container">
        <div>Member not found</div>
      </div>
    );
  }

  return (
    <div className="profile-container">

      <div className="profile-header">
        <button onClick={() => navigate(-1)}>← Back</button>
        <h2>Member Profile</h2>
      </div>

      <div className="profile-card">

        <div className="profile-top">
          <div className="avatar">
            {member?.full_name?.charAt(0)}
          </div>

          <div>
            <h3>{member?.full_name}</h3>
            <p>{member?.membership_id}</p>

            <span className={member?.is_active ? "active" : "inactive"}>
              {member?.is_active ? "Active Member" : "Inactive"}
            </span>
          </div>
        </div>

        <hr />

        <div className="profile-details">
          <p><b>Phone:</b> {member?.phone_number || "N/A"}</p>
          <p><b>Email:</b> {member?.email || "N/A"}</p>
          <p><b>State:</b> {member?.state_name || "N/A"}</p>
          <p><b>Senatorial Zone:</b> {member?.senatorial_zone_name || "N/A"}</p>
          <p><b>LGA:</b> {member?.local_government_name || "N/A"}</p>
          <p><b>Ward:</b> {member?.ward_name || "N/A"}</p>
          <p><b>Polling Unit:</b> {member?.polling_unit_name || "N/A"}</p>
        </div>

        <div className="profile-actions">
          <button onClick={downloadCard}>Download Card</button>
          <button onClick={verifyMember}>Verify Member</button>
        </div>

      </div>
    </div>
  );
}

export default MemberProfile;