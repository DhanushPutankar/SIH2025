# AI Instructions

Your job: Write AI logic for emergency corridor & traffic optimization.

Tasks:
1. In `ai_controller.py`:
   - Implement calculate_eta(lat, lon, speed).
   - Return ETA to next junction.

2. In `predictive_corridor.py`:
   - Decide which signals must turn green based on ETA.
   - Push command to backend/virtual controller.

3. Edge cases:
   - If ambulance is stuck, suggest reroute.
   - If jam is >1km, delay corridor activation.

Deliverables:
- Working ETA calculator
- Clear green corridor activation logic
