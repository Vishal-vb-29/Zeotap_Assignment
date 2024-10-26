const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ruleRoutes = require('./routes/ruleRoutes');
require('dotenv').config(); // Import dotenv and configure it


const app = express();
const PORT = 3000;

// Using Cross origin resource sharing
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Connecting the mongoDB
mongoose.connect(process.env.MONGO_URL, { // Use the MONGO_URI from .env
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB", err);
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

// Mounting the routes
app.use('/api/rules', ruleRoutes);

// Starting the app.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
