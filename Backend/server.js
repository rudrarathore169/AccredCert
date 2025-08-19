const express = require('express');
const cors = require('cors'); // <-- added
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

// Middleware
app.use(cors()); // <-- added
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// Routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// DB connect
connectDB();


// Start server
app.listen(3000, () => {
    console.log("server started!!");
});
