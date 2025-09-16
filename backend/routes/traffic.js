const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Get current traffic status
router.get('/status', async (req, res) => {
  try {
    const trafficAnalysis = await aiController.getTrafficAnalysis();
    
    res.json({
      success: true,
      traffic_data: trafficAnalysis,
      junctions: {
        'J1': { status: 'normal', wait_time: 25, vehicle_count: 12 },
        'J2': { status: 'congested', wait_time: 45, vehicle_count: 28 },
        'J3': { status: 'normal', wait_time: 20, vehicle_count: 8 },
        'J4': { status: 'normal', wait_time: 30, vehicle_count: 15 },
        'J5': { status: 'congested', wait_time: 50, vehicle_count: 32 },
        'J6': { status: 'normal', wait_time: 22, vehicle_count: 10 }
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get traffic status',
      error: error.message
    });
  }
});

// Update signal timing
router.post('/update_signal', async (req, res) => {
  const { junction_id, timing } = req.body;
  
  console.log(`🚦 Signal update: Junction ${junction_id} → ${timing}s`);
  
  res.json({
    success: true,
    junction_id: junction_id,
    new_timing: timing,
    updated_at: new Date().toISOString()
  });
});

// Get junction details
router.get('/junction/:id', (req, res) => {
  const { id } = req.params;
  
  // Mock junction data
  const junctionData = {
    junction_id: id,
    current_phase: 'NS_green',
    remaining_time: 15,
    vehicle_count: {
      north: 5,
      south: 3,
      east: 8,
      west: 2
    },
    average_wait_time: 28,
    last_emergency: 'none'
  };
  
  res.json(junctionData);
});

module.exports = router;