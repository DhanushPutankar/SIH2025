const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const emergencyRoutes = require('./routes/emergency');
const trafficRoutes = require('./routes/traffic');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Add this before app.use('/api/emergency', ...) lines in backend/index.js

app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running' });
});
// Routes
app.use('/api/emergency', emergencyRoutes);
app.use('/api/traffic', trafficRoutes);

// WebSocket for real-time updates
io.on('connection', (socket) => {
  console.log('🔗 Client connected:', socket.id);
  
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });
  
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// System status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'active',
    services: {
      backend: 'running',
      virtual_controller: 'connected',
      ai_controller: 'connected',
      sumo_simulation: 'ready'
    },
    timestamp: new Date().toISOString()
  });
});

// Emergency broadcast function
app.locals.broadcastEmergency = (data) => {
  io.emit('emergency_update', data);
};

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log('📡 Socket.io ready for real-time updates');
});

module.exports = { app, io };