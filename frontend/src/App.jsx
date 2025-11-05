import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Home from "./Pages/Home";
import ChoiceSection from "./Pages/ChoiceSection";
import Navbar from "./components/navbar";
import Publications from "./Pages/publication";
import ReadMore from "./Pages/ReadMore";
import ProfileSetup from "./Pages/ProfileSetup";
import Patient from "./Pages/Patient/Patient";
import Researcher from "./Pages/Researcher/Researcher";

function AppContent() {
  const location = useLocation();

  // paths where Navbar should NOT be shown
  const hideNavbarPaths = ["/patient/dashboard", "/researcher/dashboard"];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choice-section" element={<ChoiceSection />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/read-more" element={<ReadMore />} />
        <Route path="/profile-creation" element={<ProfileSetup />} />
        <Route path="/patient/dashboard" element={<Patient/>} />
        <Route path="/researcher/dashboard" element={<Researcher />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
