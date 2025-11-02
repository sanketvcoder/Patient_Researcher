import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import ChoiceSection from "./Pages/ChoiceSection";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choice-section" element={<ChoiceSection />} />
      </Routes>
    </Router>
  );
}

export default App;
