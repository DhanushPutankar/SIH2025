import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';

// Import pages
import Dispatcher from './pages/Dispatcher';
import EmergencyVehicle from './pages/EmergencyVehicle';
import TrafficCenter from './pages/TrafficCenter';
import TrafficPolice from './pages/TrafficPolice';
import Hospital from './pages/Hospital';

// Import components
import SignalStatus from './components/SignalStatus';

const socket = io('http://localhost:5000');

function App() {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyData, setEmergencyData] = useState(null);

  useEffect(() => {
    // Listen for emergency updates
    socket.on('emergency_update', (data) => {
      console.log('Emergency update received:', data);
      
      if (data.type === 'emergency_active') {
        setEmergencyActive(true);
        setEmergencyData(data);
      } else if (data.type === 'emergency_completed') {
        setEmergencyActive(false);
        setEmergencyData(null);
      }
    });

    return () => {
      socket.off('emergency_update');
    };
  }, []);

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="app-header">
          <div className="container">
            <h1>🚦 SIH2025 Traffic Management System</h1>
            <div className="emergency-indicator">
              {emergencyActive && (
                <div className="emergency-alert">
                  🚨 EMERGENCY MODE ACTIVE - Ambulance {emergencyData?.ambulance_id}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="main-nav">
          <div className="container">
            <ul>
              <li><Link to="/">Traffic Center</Link></li>
              <li><Link to="/dispatcher">Dispatcher</Link></li>
              <li><Link to="/emergency">Emergency Vehicle</Link></li>
              <li><Link to="/police">Traffic Police</Link></li>
              <li><Link to="/hospital">Hospital</Link></li>
            </ul>
          </div>
        </nav>

        {/* Signal Status Bar */}
        <SignalStatus />

        {/* Main Content */}
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<TrafficCenter />} />
              <Route path="/dispatcher" element={<Dispatcher />} />
              <Route path="/emergency" element={<EmergencyVehicle />} />
              <Route path="/police" element={<TrafficPolice />} />
              <Route path="/hospital" element={<Hospital />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="container">
            <p>SIH2025 - Smart Traffic Management System | Team Demo</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;