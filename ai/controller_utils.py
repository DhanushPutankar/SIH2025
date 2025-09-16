"""
AI utility functions for traffic management
"""

import numpy as np

def predict_traffic_flow(historical_data, time_of_day):
    """Predict traffic flow using simple ML logic"""
    
    # Mock prediction for demo
    base_flow = 100
    time_factor = np.sin(time_of_day / 24 * 2 * np.pi) * 50
    predicted_flow = int(base_flow + time_factor)
    
    return max(20, predicted_flow)

def calculate_optimal_route(start, end, current_traffic):
    """Calculate optimal route using AI pathfinding"""
    
    # Simple A* pathfinding simulation
    routes = {
        ('H1', 'H2'): {
            'primary': ['J1', 'J2', 'J5', 'J6'],
            'alternative': ['J1', 'J4', 'J5', 'J6'],
            'fastest': ['J1', 'J2', 'J5', 'J6']
        }
    }
    
    route_key = (start, end)
    return routes.get(route_key, {'primary': [start, end]})

def ml_signal_optimization(junction_data):
    """Machine learning signal optimization"""
    
    # Placeholder for actual ML model
    # In real implementation, this would use trained models
    
    return {
        'recommended_timing': 35,
        'confidence': 0.85,
        'improvement_estimate': '15%'
    }