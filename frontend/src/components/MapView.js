import React from 'react';

const MapView = ({ route, emergencyActive }) => {
  return (
    <div className="map-container">
      <div className="map-placeholder">
        <div>
          <h3>🗺️ Traffic Network Map</h3>
          <p>SUMO Simulation Integration</p>
          {emergencyActive && (
            <div style={{ marginTop: '1rem' }}>
              <div className="status status-emergency">
                🚨 Emergency Route Active
              </div>
              {route && (
                <div style={{ marginTop: '0.5rem' }}>
                  <strong>Route:</strong> {route.join(' → ')}
                </div>
              )}
            </div>
          )}
          <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
            <p>• Red dots: Congested junctions</p>
            <p>• Green dots: Normal flow</p>
            <p>• Yellow dots: Emergency mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;