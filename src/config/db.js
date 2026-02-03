const mongoose = require('mongoose');

// async function to connect to MongoDB
async function connectDB() {
    const uri = process.env.MONGO_URI;
    // throw error if MONGO_URI is not defined
    if (!uri) {
        throw new Error('MONGO_URI is not defined in .env');
   }

   // wait until connect to mongoDB 
    await mongoose.connect(uri, {});
    // will print if connection is successful
    console.log('connected to MongoDB');
}

module.exports =  connectDB;

