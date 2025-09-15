# Frontend Instructions

Your job: Create React dashboard for demo.

Tasks:
1. Build pages for each user:
   - Dispatcher.js → Start emergency
   - EmergencyVehicle.js → Sends ambulance location
   - TrafficCenter.js → View traffic states
   - TrafficPolice.js → Manual override
   - Hospital.js → Track incoming ambulance ETA

2. In `MapView.js`:
   - Display SUMO map (static for demo).
   - Show ambulance + vehicles as moving dots.

3. In `SignalStatus.js`:
   - Show signals (green/yellow/red) in real-time.

4. Connect with backend APIs:
   - Call /api/emergency/start when ambulance starts.
   - Poll /api/traffic/status for live signals.

Deliverables:
- Pages with UI for each role
- Map + Signal visualization
