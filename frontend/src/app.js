import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dispatcher from "./pages/Dispatcher";
import EmergencyVehicle from "./pages/EmergencyVehicle";
import TrafficCenter from "./pages/TrafficCenter";
import TrafficPolice from "./pages/TrafficPolice";
import Hospital from "./pages/Hospital";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/dispatcher">Dispatcher</Link>
        <Link to="/emergency">Emergency Vehicle</Link>
        <Link to="/traffic-center">Traffic Center</Link>
        <Link to="/police">Traffic Police</Link>
        <Link to="/hospital">Hospital</Link>
      </div>

      <Routes>
        <Route path="/dispatcher" element={<Dispatcher />} />
        <Route path="/emergency" element={<EmergencyVehicle />} />
        <Route path="/traffic-center" element={<TrafficCenter />} />
        <Route path="/police" element={<TrafficPolice />} />
        <Route path="/hospital" element={<Hospital />} />
      </Routes>
    </Router>
  );
}

export default App;
