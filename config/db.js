const mongoose = require('mongoose');
const { dev } = require('../config/index');

const connectDB = async () => {
    try {
        await mongoose.connect(dev.db.url)
        console.log('Database connection successful');
    } catch (error) {
        console.log('database connection failed');
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;