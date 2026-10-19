require('dotenv').config(); // MUST BE AT THE VERY TOP

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`ApplyFlow server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });