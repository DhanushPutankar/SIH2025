const axios = require('axios');

const AI_SERVICE_URL = 'http://localhost:5002';

class AIController {
  
  async calculateEmergencyRoute(startHospital, endHospital) {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/ai_optimize`, {
        type: 'emergency_route',
        start_hospital: startHospital,
        end_hospital: endHospital
      });
      
      return response.data.route_data;
    } catch (error) {
      console.error('AI service error:', error.message);
      
      // Fallback route calculation
      return {
        route: ['J1', 'J2', 'J5', 'J6'],
        estimated_time: 120,
        traffic_density: 'medium'
      };
    }
  }
  
  async optimizeSignalTiming(junctionId, trafficData) {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/ai_optimize`, {
        type: 'signal_timing',
        junction_id: junctionId,
        traffic_data: trafficData
      });
      
      return response.data;
    } catch (error) {
      console.error('Signal optimization error:', error.message);
      return { optimal_timing: 30, confidence: 0 };
    }
  }
  
  async getTrafficAnalysis() {
    try {
      const response = await axios.get(`${AI_SERVICE_URL}/traffic_analysis`);
      return response.data;
    } catch (error) {
      console.error('Traffic analysis error:', error.message);
      return {
        peak_hours: ["08:00-10:00", "17:00-19:00"],
        efficiency_score: 75,
        average_wait_time: 30
      };
    }
  }
}

module.exports = new AIController();