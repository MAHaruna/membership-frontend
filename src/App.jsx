import { BrowserRouter, Routes, Route } from "react-router-dom";
import Members from "./pages/Members";
import MemberProfile from "./pages/MemberProfile";
import Verification from "./pages/Verification";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<h1>Home Page</h1>} />

        <Route path="/members" element={<Members />} />

        <Route path="/members/:id" element={<MemberProfile />} />

        <Route path="/verify/:membershipId" element={<Verification />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;