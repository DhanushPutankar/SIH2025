// Map view component for displaying the city map and vehicle locations

import React, { useEffect, useState } from "react";

function MapView() {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/traffic/map") // backend endpoint
      .then((res) => res.json())
      .then((data) => setMapData(data));
  }, []);

  return (
    <div className="map-container">
      <h3>Live Map</h3>
      {mapData ? (
        <pre>{JSON.stringify(mapData, null, 2)}</pre>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
}

export default MapView;
