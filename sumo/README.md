# SUMO Simulation Instructions

Your job: Build the traffic network with 5–6 junctions and hospitals.

Tasks:
1. Export a small Bangalore map (5–6 junctions, 2 with hospitals).
   - Use OpenStreetMap Overpass to download OSM.
   - Save as `bangalore.osm`.

2. Convert OSM → SUMO network:
   netconvert --osm-files bangalore.osm -o bangalore.net.xml

3. Generate routes (vehicles + ambulance):
   python randomTrips.py -n bangalore.net.xml -o bangalore.rou.xml -e 200

4. Create `bangalore.sumocfg` to run simulation:
   - Must include `bangalore.net.xml` and `bangalore.rou.xml`.

5. Add hospitals in `junctions_config.json`:
   {
      "junctions": [
         {"id": "j1", "type": "normal"},
         {"id": "j2", "type": "hospital"},
         ...
      ]
   }

Final Deliverables:
- `bangalore.net.xml` (network)
- `bangalore.rou.xml` (routes)
- `bangalore.sumocfg` (config file)
- `junctions_config.json` (junction info)
