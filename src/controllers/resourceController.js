const Resource = require('../models/resource')

// POST /api/resource (private) adding anime to user, need jwt
exports.create = async (req,res, next) => {
    try{
        //taking user id from token 
        const userId = req.user?.userId;
        if (!userId) {return res.status(401).json({message: "Unauthoroized"})} 

        //taking all from req.body
        const {anilistId, title, coverImage, notes} = req.body;

        //creating document in MongoDB
        const resource = await Resource.create({
            user: userId,
            anilistId,
            title,
            coverImage,
            notes,
        });
        
        return res.status(201).json({message: "Anime added to your libary", resource})

    } catch(e){
        // if we already have this anime => return error  
        if(e.code === 11000){ return res.status(409).json({message: "Anime already exist in your libary"})} // 11000 it's mongoDB erorr code (duplicate key)
        
        //share this error with global error handler
        next(e);
    }
};





// GET api/resource (private) get ALL animes for current user, also need jwt
exports.getAll = async (req,res, next) => {
    try{
        //taking user id from token 
        const userId = req.user?.userId;
        if (!userId) {return res.status(401).json({message: "Unauthoroized"})} 

        //finding animes of user and printing them from newest to oldest 
        const resource = await Resource.find({user: userId}).sort({createdAt: -1});
        return res.status(200).json({resource});


    } catch(e){next(e)}
    

};






// GET api/resource/:id (private) get ONE anime for current user, also need jwt
exports.getbyId = async (req,res, next) => {
    try{
        //taking user id from token 
        const userId = req.user?.userId;
        if (!userId) {return res.status(401).json({message: "Unauthoroized"})} 

        //taking id from url that we need to print
        const {id} = req.params;
        //find resource with this id if it's user is the same with userId 
        const resource = await Resource.findOne({_id:id, user:userId})
        if(!resource){return res.status(404).json({message: "Anime not Found"})}

        //if all successfull => printing the result
        console.log("I found this:")
        return res.status(200).json({resource})
    } 
    
    catch(e){next(e);}
    
    };






// PUT /apy/resource/:id (private) update 
exports.update = async (req,res, next) => {
    try{
        //taking user id from token 
        const userId = req.user?.userId;
        if (!userId) {return res.status(401).json({message: "Unauthoroized"})} 

        
        //taking id from url that we need to update 
        const {id} = req.params;
        //taking data from req.body
        const {title, coverImage, notes} = req.body;

        //emty object to contain what we need to change exactly
        const update = {};
        //put only what we need update to update object
        if (title !== undefined) {update.title = title; };
        if (coverImage !== undefined) {update.coverImage = coverImage};
        if (notes !== undefined) {update.notes = notes};
    
        //updating anime
        const resource = await Resource.findOneAndUpdate(
            {_id: id , user: userId}, //filer: find anime with this id and if its owner is this user
            update, //update what we really need 
            {new:true, runValidators:true} // printing updated document and check schemas in models 
        
        );

        if(!resource) return res.status(404).json({message: "Anime not found"})
    
        return res.status(200).json({message:"Anime updated"})
    } catch(e){next(e);}



};





// DELETE /api/resource/:id
exports.delete = async (req,res, next) => {
    try{
        //taking user id from token 
        const userId = req.user?.userId;
        if (!userId) {return res.status(401).json({message: "Unauthoroized"})}

        //taking id from url that we need to update 
        const {id} = req.params;

        //delete 1 anime from this user
        const resource = await Resource.findOneAndDelete({_id: id , user: userId});
        if(!resource) return res.status(404).json({message: "Anime not found"})
    
        return res.status(200).json({message: "Anime deleted"})
    
    } catch(e){next(e);}

};
