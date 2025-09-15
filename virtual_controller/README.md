# Virtual Controller Instructions

task: Simulate smart traffic signals controlled by backend/AI.

Tasks:
1. Edit `controller.py` to create a VirtualSignal class with:
   - set_state(green/yellow/red)
   - fallback_cycle() (runs cached signals if AI/backend fails)

2. Connect with backend:
   - Accept commands from backend (REST/WebSocket).
   - Update signal states accordingly.

3. Test:
   - Manually call set_state("green") and check console output.
   - Later integrate with SUMO via TraCI.

Deliverables:
- `controller.py` (signal logic)
- `controller_utils.py` (helper functions)
