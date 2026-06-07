import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard"; // Updated name reference point
import Members from "./pages/Members";
import MemberProfile from "./pages/MemberProfile";
import Verification from "./pages/Verification";
import RegisterMember from "./pages/RegisterMember";
import "./App.css"; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="app-layout">
        <Routes>
          {/* Swapped out the old inline rendering route with the true component element layout */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<MemberProfile />} />
          <Route path="/register" element={<RegisterMember />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/verify/:membershipId" element={<Verification />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;