#!/usr/bin/env python3
"""
Virtual Traffic Light Controller
Manages traffic signals based on vehicle density and emergency requests
"""

import json
import time
import requests
from controller_utils import calculate_signal_timing, get_junction_status
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class VirtualController:
    def __init__(self):
        self.junction_states = {}
        self.emergency_mode = False
        self.backend_url = "http://localhost:5000"
        
        # Load junction configuration
        with open('../sumo/junctions_config.json', 'r') as f:
            self.config = json.load(f)
        
        # Initialize junction states
        for junction_id in self.config['junctions']:
            self.junction_states[junction_id] = {
                'current_phase': 'NS_green',  # North-South green
                'timer': 30,
                'vehicle_count': {'north': 0, 'south': 0, 'east': 0, 'west': 0}
            }
    
    def update_signal_timing(self, junction_id, vehicle_counts):
        """Update signal timing based on vehicle density"""
        timing = calculate_signal_timing(vehicle_counts)
        self.junction_states[junction_id]['timer'] = timing
        
        print(f"Junction {junction_id}: Updated timing to {timing}s")
        return timing
    
    def handle_emergency_request(self, ambulance_route):
        """Handle emergency vehicle priority"""
        self.emergency_mode = True
        
        print(f"🚨 EMERGENCY MODE ACTIVATED")
        print(f"Ambulance route: {ambulance_route}")
        
        # Clear the path for ambulance
        for junction_id in ambulance_route:
            if junction_id in self.junction_states:
                self.junction_states[junction_id]['current_phase'] = 'emergency_clear'
                self.junction_states[junction_id]['timer'] = 5
                print(f"Junction {junction_id}: Set to emergency clear")
        
        return {"status": "success", "message": "Emergency route cleared"}

@app.route('/signal_control', methods=['POST'])
def signal_control():
    """API endpoint for signal control"""
    data = request.json
    controller = VirtualController()
    
    if data['type'] == 'emergency':
        result = controller.handle_emergency_request(data['route'])
        return jsonify(result)
    
    elif data['type'] == 'normal':
        junction_id = data['junction_id']
        vehicle_counts = data['vehicle_counts']
        timing = controller.update_signal_timing(junction_id, vehicle_counts)
        return jsonify({"status": "success", "new_timing": timing})

@app.route('/status', methods=['GET'])
def get_status():
    """Get current controller status"""
    controller = VirtualController()
    return jsonify({
        "controller_active": True,
        "emergency_mode": controller.emergency_mode,
        "junction_count": len(controller.junction_states)
    })


@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Virtual Traffic Controller is running"})

if __name__ == "__main__":
    print("🚦 Virtual Traffic Controller Starting...")
    print("Listening on http://localhost:5001")
    app.run(host='0.0.0.0', port=5001, debug=True)