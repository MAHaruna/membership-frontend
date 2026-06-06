import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Members from "./pages/Members";
import MemberProfile from "./pages/MemberProfile";
import Verification from "./pages/Verification";
import RegisterMember from "./pages/RegisterMember";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<h1 style={{ padding: "30px" }}>Dashboard</h1>}
        />

        <Route
          path="/members"
          element={<Members />}
        />

        <Route
          path="/members/:id"
          element={<MemberProfile />}
        />

        <Route
          path="/register"
          element={<RegisterMember />}
        />

        <Route
          path="/verify"
          element={<Verification />}
        />

        <Route
          path="/verify/:membershipId"
          element={<Verification />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;