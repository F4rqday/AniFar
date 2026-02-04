const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const header = req.headers.authorization; // authotization: bearer <token>
        // if don't have header - 401 unauthorized 
        if (!header) {return res.status(401).json({message:'No token'})}
        
        const [type, token] = header.split(' '); // just devide these 2 parameters like this     type = "Barear"   token = "dasfadsfagdas" 
        if(type !== 'Bearer' || !token) return res.status(401).json({message: 'wrong authorization format'})
        
        const playload = jwt.verify(token, process.env.JWT_SECRET); // checking jwt 
        req.user = playload; // saving info about user in req.user
        return next();
        }
        catch(e){ return res.status(401).json({message: "invalid token"})}
}; 