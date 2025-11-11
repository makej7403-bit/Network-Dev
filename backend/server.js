const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Simple in-memory store (replace with real DB in production)
const motivationalMessages = [];
const notifications = [];

// Sockets for real-time notifications (e.g., motivational quote push)
io.on('connection', (socket) => {
  console.log('Client connected', socket.id);
  // send latest motivational messages on connect
  socket.emit('motivations', motivationalMessages.slice(-5));
});

// Routes
const chatRoutes = require('./routes/chat');
const wassceRoutes = require('./routes/wassce');
const twilioRoutes = require('./routes/twilio');

app.use('/api/chat', chatRoutes);
app.use('/api/wassce', wassceRoutes);
app.use('/api/twilio', twilioRoutes);

// Simple endpoint to fetch motivational messages
app.get('/api/motivations', (req, res) => {
  res.json({ messages: motivationalMessages.slice(-50) });
});

// Server-side scheduler to push motivational quotes every 30 minutes
const cron = require('node-cron');
const { getRandomMotivation } = require('./utils/motivations');

cron.schedule('*/30 * * * *', () => {
  const quote = getRandomMotivation();
  const item = { quote, createdAt: new Date().toISOString() };
  motivationalMessages.push(item);
  notifications.push({ type: 'motivation', payload: item });
  // broadcast over websocket
  io.emit('new_motivation', item);
  console.log('Scheduled motivation emitted:', item);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Global Light backend listening on ${PORT}`);
});
