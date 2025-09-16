import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

class API {
  
  // Emergency APIs
  async createEmergencyRequest(hospitalFrom, hospitalTo, priority = 'high') {
    try {
      const response = await axios.post(`${API_BASE_URL}/emergency/request`, {
        hospital_from: hospitalFrom,
        hospital_to: hospitalTo,
        priority: priority
      });
      return response.data;
    } catch (error) {
      console.error('Emergency request failed:', error);
      throw error;
    }
  }
  
  async getEmergencyStatus(ambulanceId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/emergency/status/${ambulanceId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get emergency status:', error);
      throw error;
    }
  }
  
  async completeEmergency(ambulanceId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/emergency/complete`, {
        ambulance_id: ambulanceId
      });
      return response.data;
    } catch (error) {
      console.error('Failed to complete emergency:', error);
      throw error;
    }
  }
  
  // Traffic APIs
  async getTrafficStatus() {
    try {
      const response = await axios.get(`${API_BASE_URL}/traffic/status`);
      return response.data;
    } catch (error) {
      console.error('Failed to get traffic status:', error);
      throw error;
    }
  }
  
  async getJunctionDetails(junctionId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/traffic/junction/${junctionId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get junction details:', error);
      throw error;
    }
  }
  
  async updateSignalTiming(junctionId, timing) {
    try {
      const response = await axios.post(`${API_BASE_URL}/traffic/update_signal`, {
        junction_id: junctionId,
        timing: timing
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update signal timing:', error);
      throw error;
    }
  }
  
  // System APIs
  async getSystemStatus() {
    try {
      const response = await axios.get(`${API_BASE_URL}/status`);
      return response.data;
    } catch (error) {
      console.error('Failed to get system status:', error);
      throw error;
    }
  }
}

export default new API();
