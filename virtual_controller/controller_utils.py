"""
Utility functions for traffic signal control
"""

def calculate_signal_timing(vehicle_counts):
    """
    Calculate optimal signal timing based on vehicle density
    
    Args:
        vehicle_counts (dict): Count of vehicles in each direction
    
    Returns:
        int: Signal timing in seconds
    """
    total_vehicles = sum(vehicle_counts.values())
    
    if total_vehicles == 0:
        return 20  # Minimum timing
    elif total_vehicles < 10:
        return 25
    elif total_vehicles < 20:
        return 35
    else:
        return 45  # Maximum timing

def get_junction_status(junction_id):
    """Get current status of a junction"""
    return {
        'junction_id': junction_id,
        'status': 'active',
        'last_update': 'now'
    }

def calculate_emergency_route(start_junction, end_junction):
    """Calculate the best route for emergency vehicles"""
    # Simple pathfinding logic for demo
    routes = {
        ('J1', 'J6'): ['J1', 'J2', 'J5', 'J6'],
        ('H1', 'H2'): ['J1', 'J2', 'J5', 'J6']
    }
    
    route_key = (start_junction, end_junction)
    return routes.get(route_key, [start_junction, end_junction])