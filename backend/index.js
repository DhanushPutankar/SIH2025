const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const emergencyRoutes = require("./routes/emergency");
const trafficRoutes = require("./routes/traffic");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/emergency", emergencyRoutes);
app.use("/api/traffic", trafficRoutes);

const PORT = 5000;
app.get("/", (req, res) => {
  res.send("🚦 Traffic Management Backend is Running!");
});
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
