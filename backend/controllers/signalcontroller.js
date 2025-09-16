const axios = require('axios');

const SIGNAL_SERVICE_URL = 'http://localhost:5001';

class SignalController {
  
  async clearEmergencyPath(route) {
    try {
      const response = await axios.post(`${SIGNAL_SERVICE_URL}/signal_control`, {
        type: 'emergency',
        route: route
      });
      
      return response.data;
    } catch (error) {
      console.error('Signal control error:', error.message);
      return { status: 'error', message: 'Failed to clear emergency path' };
    }
  }
  
  async updateNormalSignal(junctionId, vehicleCounts) {
    try {
      const response = await axios.post(`${SIGNAL_SERVICE_URL}/signal_control`, {
        type: 'normal',
        junction_id: junctionId,
        vehicle_counts: vehicleCounts
      });
      
      return response.data;
    } catch (error) {
      console.error('Normal signal update error:', error.message);
      return { status: 'error', new_timing: 30 };
    }
  }
  
  async getControllerStatus() {
    try {
      const response = await axios.get(`${SIGNAL_SERVICE_URL}/status`);
      return response.data;
    } catch (error) {
      console.error('Controller status error:', error.message);
      return { controller_active: false };
    }
  }
}

module.exports = new SignalController();