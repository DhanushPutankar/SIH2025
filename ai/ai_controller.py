#!/usr/bin/env python3
"""
AI Traffic Controller
Uses AI algorithms to optimize traffic flow and emergency routing
"""

import json
import time
import requests
import numpy as np
from controller_utils import predict_traffic_flow, calculate_optimal_route
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class AIController:
    def __init__(self):
        self.traffic_data = {}
        self.learning_enabled = True
        self.backend_url = "http://localhost:5000"
        
        # Load configuration
        with open('../sumo/junctions_config.json', 'r') as f:
            self.config = json.load(f)
    
    def predict_optimal_timing(self, junction_id, current_traffic):
        """AI prediction for optimal signal timing"""
        
        # Simple AI logic for demo (replace with ML model)
        base_timing = 30
        traffic_factor = sum(current_traffic.values()) / 10
        
        # AI optimization
        optimal_timing = int(base_timing + (traffic_factor * 2))
        optimal_timing = max(15, min(60, optimal_timing))  # Clamp between 15-60s
        
        print(f"🤖 AI: Junction {junction_id} optimal timing: {optimal_timing}s")
        return optimal_timing
    
    def calculate_ambulance_route(self, start_hospital, end_hospital):
        """AI-powered ambulance route calculation"""
        
        print(f"🤖 AI: Calculating ambulance route from {start_hospital} to {end_hospital}")
        
        # AI route optimization (simplified for demo)
        if start_hospital == "H1" and end_hospital == "H2":
            route = ["J1", "J2", "J5", "J6"]
            estimated_time = 120  # seconds
        else:
            route = ["J1", "J6"]  # Default route
            estimated_time = 90
        
        return {
            "route": route,
            "estimated_time": estimated_time,
            "traffic_density": "medium",
            "alternative_routes": [["J1", "J4", "J5", "J6"]]
        }
    
    def analyze_traffic_pattern(self):
        """Analyze current traffic patterns"""
        
        # Mock traffic analysis
        analysis = {
            "peak_hours": ["08:00-10:00", "17:00-19:00"],
            "congested_junctions": ["J2", "J5"],
            "average_wait_time": 25,
            "efficiency_score": 78
        }
        
        print(f"🤖 AI: Traffic analysis complete - Efficiency: {analysis['efficiency_score']}%")
        return analysis

@app.route('/ai_optimize', methods=['POST'])
def ai_optimize():
    """AI optimization endpoint"""
    data = request.json
    controller = AIController()
    
    if data['type'] == 'signal_timing':
        junction_id = data['junction_id']
        traffic_data = data['traffic_data']
        optimal_timing = controller.predict_optimal_timing(junction_id, traffic_data)
        
        return jsonify({
            "status": "success",
            "junction_id": junction_id,
            "optimal_timing": optimal_timing,
            "confidence": 85
        })
    
    elif data['type'] == 'emergency_route':
        start = data['start_hospital']
        end = data['end_hospital']
        route_data = controller.calculate_ambulance_route(start, end)
        
        return jsonify({
            "status": "success",
            "route_data": route_data
        })

@app.route('/traffic_analysis', methods=['GET'])
def traffic_analysis():
    """Get AI traffic analysis"""
    controller = AIController()
    analysis = controller.analyze_traffic_pattern()
    return jsonify(analysis)

@app.route('/ai_status', methods=['GET'])
def ai_status():
    """Get AI system status"""
    return jsonify({
        "ai_active": True,
        "learning_enabled": True,
        "models_loaded": True,
        "last_optimization": "2 minutes ago"
    })

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "AI Traffic Controller is running"})

if __name__ == "__main__":
    print("🤖 AI Traffic Controller Starting...")
    print("AI System ready on http://localhost:5002")
    app.run(host='0.0.0.0', port=5002, debug=True)