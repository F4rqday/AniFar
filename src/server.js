const app = require('./app');
require('dotenv').config();


const connectDB = require('./config/db');

// Creating test user to check user model 
const User = require('./models/users');
(async () => {
    await User.create({
        userName: "Faraday",
        email: "ALTF4@MAIL.COM",
        password: "123456"
    });
    console.log('User created');
})();

// set port from .env or default to 3000
const PORT = process.env.PORT || 3000;


// server waits database until it connects successfully
connectDB()
// if database connection is successful, start the server
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on: http://localhost:${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/health`);
     }); 
})
    // if database connection fails, log the error and exit
    .catch((err) => { 
        console.error("failed to connect to mongoDB", err);
        process.exit(1);
    });


