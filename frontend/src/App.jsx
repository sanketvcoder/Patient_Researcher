import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import ChoiceSection from "./Pages/ChoiceSection";
import Navbar from "./components/navbar";
import Publications from "./Pages/publication";
import ReadMore from "./Pages/ReadMore";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choice-section" element={<ChoiceSection />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/read-more" element={<ReadMore />} />
      </Routes>
    </Router>
  );
}

export default App;
