import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import MemberProfile from "./pages/MemberProfile";
import Verification from "./pages/Verification";
import RegisterMember from "./pages/RegisterMember";
import Login from "./pages/Login";

import ProtectedRoute from "./auth/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="app-layout">
        <Routes>

          {/* =========================
              PUBLIC ROUTES
          ========================= */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<RegisterMember />} />
          <Route path="/login" element={<Login />} />

          {/* =========================
              PROTECTED ADMIN SYSTEM
          ========================= */}
          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            }
          />

          <Route
            path="/members/:id"
            element={
              <ProtectedRoute>
                <MemberProfile />
              </ProtectedRoute>
            }
          />

          {/* =========================
              PROTECTED VERIFICATION SYSTEM
          ========================= */}
          <Route
            path="/verify"
            element={
              <ProtectedRoute>
                <Verification />
              </ProtectedRoute>
            }
          />

          <Route
            path="/verify/:membershipId"
            element={
              <ProtectedRoute>
                <Verification />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;