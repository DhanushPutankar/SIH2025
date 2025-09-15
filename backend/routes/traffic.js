// Traffic routes for managing vehicle flow


const express = require("express");
const { getSignalStatus, updateSignal } = require("../controllers/signalController");

const router = express.Router();

// 🚦 Get live signal status
router.get("/signals", async (req, res) => {
  const signals = await getSignalStatus();
  res.json(signals);
});

// 🕹️ Manually update signal
router.post("/update", async (req, res) => {
  const { junctionId, state } = req.body;
  const response = await updateSignal(junctionId, state);
  res.json(response);
});

module.exports = router;
