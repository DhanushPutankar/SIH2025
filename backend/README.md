# Backend Instructions

Your job: Build Node.js backend for communication.

Tasks:
1. Create REST APIs:
   - POST /api/emergency/start → ambulance sends GPS + speed
   - GET /api/traffic/status → returns current signal states

2. In `aiController.js`:
   - Call Python AI (using child_process or API).
   - Get ETA and which signals to clear.

3. In `signalController.js`:
   - Send commands to virtual_controller (green/red update).

4. Run:
   - npm install express
   - node index.js

Deliverables:
- index.js (main server)
- emergency.js (emergency APIs)
- traffic.js (normal traffic APIs)
- aiController.js, signalController.js (logic)
