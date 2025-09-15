// API calls for the frontend application

const API_BASE = "http://localhost:5000/api";

export async function getSignalStatus() {
  const res = await fetch(`${API_BASE}/traffic/signals`);
  return res.json();
}

export async function sendEmergency(vehicleId, location) {
  const res = await fetch(`${API_BASE}/emergency/dispatch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vehicleId, location }),
  });
  return res.json();
}
