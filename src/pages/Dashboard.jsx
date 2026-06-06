import MemberForm from "../components/MemberForm";

function Dashboard() {
  const refreshMembers = () => {
    console.log("refresh member list here");
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Dashboard</h1>

      {/* Quick Register Section */}
      <h3>Quick Register Member</h3>

      <MemberForm onSuccess={refreshMembers} />

    </div>
  );
}

export default Dashboard;