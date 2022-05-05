require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const controller = require('../db/controllers.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/save', controller.saveWorkout);
app.post('/api/status', controller.saveStatus);
app.get('/api/leaderboard', controller.getLeaderboard);
app.get('/api/status', controller.getStatus);
app.put('/api/status', controller.editStatus);
app.delete('/api/status', controller.deleteStatus);

// Access either env or default port
const port = 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

/* Add your routes here */

app.listen(port);
console.log(`Listening at http://localhost:${port}`);

module.exports = app;
