// Emergency routes for handling ambulance requests


const express = require("express");
const { handleEmergency } = require("../controllers/aiController");

const router = express.Router();

// 🚑 Emergency dispatch API
router.post("/dispatch", async (req, res) => {
  const { vehicleId, location } = req.body;
  const response = await handleEmergency(vehicleId, location);
  res.json(response);
});

module.exports = router;
