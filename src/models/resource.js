const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},

anilistId:{
    type: Number, 
    required:true
},

title: {
    type: String,
    required:true

},

coverImage:{
    type: String,
    required:true

}

}, {timestamps:true}

);

// Ensure a user cannot save the same anime more than 1 time
resourceSchema.index({user:1, anilistId:1}, {unique:true});

module.exports = mongoose.model('Resource', resourceSchema);