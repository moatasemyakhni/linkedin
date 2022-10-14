const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database is connected"))
    .catch((err) => console.error("Database connection failed:", err));