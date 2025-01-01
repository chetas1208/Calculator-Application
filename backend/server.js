const dotenv = require('dotenv');


dotenv.config();
// FILE: /backend/server.js

const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });