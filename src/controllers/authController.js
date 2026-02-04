const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// save a new user to the database and hash the password
exports.register = async (req, res, next) => {
    try{
        //Checking username, email and password are provided
        const {username, email, password} = req.body;
        
        //if any of them is missing, return 400 bad request 
        if (!username || !email || !password) {return res.status(400).json({message: "username, email and password are required"});} 
   
        //Check if user with the same email already exists
        const exist = await User.findOne({email});
        // 409 conflict error
        if (exist) {return res.status(409).json({message: "email already exists"});}

        //Hash the password with 10 salt rounds
        const hashed = await bcrypt.hash(password, 10);

        //Creating document (user) in MongoDB
        const user = await User.create({
            username,
            email,
            password: hashed,
        });

        //return success response (201 created) with user info (but without password)
        res.status(201).json({
            message:"registred",
            user:{id: user._id, username: user.username, email: user.email}

        })
    }
    // catch any errors and pass to error handling middleware 
    catch (e) {next(e) };
} 






// checking user password and returning JWT token
exports.login = async (req, res, next) => {
    try{
    
    //extract email and password from request body
    const {email, password} = req.body;
    //if email or password is missing, return error 400 bad request
    if (!email || !password){return res.status(400).json({message: "email and password are required"})}

    
    
    //find user by email
    const user = await User.findOne({email});
    //if user not found, return error 401 unauthorized
    if (!user){return res.status(401).json({message: "no user found with that email"});}
    
    
    
    //bcrypt checks the correctness of user password by comparing it with hash password from MongoDB
    const ok = await bcrypt.compare(password, user.password);
    // if user password different - 401 unauthorized
    if (!ok){return res.status(401).json({message: "invalid password"});}

    
    // creating JWT 
    const token = jwt.sign(
    {
        userId: user._id, 
        email: user.email 
    },
    //sign by secret key from .env
    process.env.JWT_SECRET,
    //is valid only to 7 days
    {expiresIn: process.env.JWT_EXPIRES_IN || '7d'}

    );

    res.json({message:"logged in", token})

}
    catch(e){
        next(e)
    }

};