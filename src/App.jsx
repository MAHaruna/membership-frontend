import { BrowserRouter, Routes, Route } from "react-router-dom";

import Members from "./pages/Members";
import MemberProfile from "./pages/MemberProfile";
import Verification from "./pages/Verification";
import RegisterMember from "./pages/RegisterMember";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 Home */}
        <Route path="/" element={<Dashboard />} />

        {/* 📊 Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 👥 Members */}
        <Route path="/members" element={<Members />} />
        <Route path="/members/:id" element={<MemberProfile />} />

        {/* ➕ Register Member */}
        <Route path="/members/create" element={<RegisterMember />} />

        {/* 🔍 QR Verification */}
        <Route path="/verify/:membershipId" element={<Verification />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;