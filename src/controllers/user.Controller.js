const User = require('../models/users')
const bcrypt = require('bcryptjs')

// GET /api/users/profile (private) need jwt
exports.getProfile = async (req, res, next) => {
try{
    // id of curent user
    const userId = req.user?.userId; // if req.user = true => userId=UserId , else => userId = undefined
    if(!userId){return res.status(401).json({message: "Unauthorized"})}

    // taking user without password
    const user = await User.findById(userId).select("-password")
    if(!user){return res.status(404).json({message:"User not found"})}

    return res.status(200).json({user});

}   
catch(e){next(e);}
};






// PUT /api/users/profile (private) need jwt
exports.updateProfile = async (req, res, next) => {
    try{
        // id of curent user
        const userId = req.user?.userId;
        if(!userId){return res.status(401).json({message: "Unauthorized"})}

        //taking data from req.body
        const {username, email, password} = req.body
        
        //empty object to contain what exactly came and then we will change only what came
        const update = {};
        //if username exist put it to update object
        if(username) {update.username = username};
        //if email exist put it to update object
        if(email) {update.email = email};
        // passsword exis hash it first and then put to update
        if(password){update.password = await bcrypt.hash(password, 10)}
   
   
        // finding user by id and update what he need 
        const user = await User.findByIdAndUpdate(userId, update, {
            new: true, // it returning new created name, email or password
            runValidators: true, //checking data by my schemas from /models/users before updating Data Base
         }).select("-password");


        if (!user) {return res.status(404).json({message:"user not found"})}
    
        return res.status(200).json({message:"Profile updated", user});
    }

    catch(e){next(e);}
};


