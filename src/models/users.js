const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true, // cant pass without userName
        trim: true, // just remove whitespace 
        minlength: 3,
        maxlength: 20
    },

    email:{
        type: String,
        required: true,
        unique: true, // no duplicate emails in db
        trim: true,
        lowercase:true
  },

    password:{
        type: String,
        required: true,
        minLength: 6
    },
},

{timestamps: true } // automatically create createdAt and updatedAt fields

);

module.exports = mongoose.model('User', userSchema);