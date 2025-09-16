const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const signalController = require('../controllers/signalController');

// Emergency request endpoint
router.post('/request', async (req, res) => {
  try {
    const { hospital_from, hospital_to, priority } = req.body;
    
    console.log('🚨 Emergency request received:', req.body);
    
    // Step 1: Get optimal route from AI
    const routeData = await aiController.calculateEmergencyRoute(hospital_from, hospital_to);
    
    // Step 2: Clear traffic signals
    const signalResponse = await signalController.clearEmergencyPath(routeData.route);
    
    // Step 3: Broadcast to all connected clients
    req.app.locals.broadcastEmergency({
      type: 'emergency_active',
      ambulance_id: `AMB_${Date.now()}`,
      route: routeData.route,
      eta: routeData.estimated_time,
      priority: priority
    });
    
    res.json({
      success: true,
      ambulance_id: `AMB_${Date.now()}`,
      route: routeData.route,
      estimated_time: routeData.estimated_time,
      message: 'Emergency route activated'
    });
    
  } catch (error) {
    console.error('Emergency request error:', error);
    res.status(500).json({
      success: false,
      message: 'Emergency request failed',
      error: error.message
    });
  }
});

// Get emergency status
router.get('/status/:ambulance_id', (req, res) => {
  const { ambulance_id } = req.params;
  
  // Mock status for demo
  res.json({
    ambulance_id: ambulance_id,
    status: 'en_route',
    current_location: 'J2',
    next_junction: 'J5',
    eta_remaining: 75,
    signals_cleared: 4
  });
});

// End emergency (clear emergency mode)
router.post('/complete', (req, res) => {
  const { ambulance_id } = req.body;
  
  console.log(`✅ Emergency completed: ${ambulance_id}`);
  
  // Broadcast completion
  req.app.locals.broadcastEmergency({
    type: 'emergency_completed',
    ambulance_id: ambulance_id
  });
  
  res.json({
    success: true,
    message: 'Emergency completed, normal traffic resumed'
  });
});

module.exports = router;