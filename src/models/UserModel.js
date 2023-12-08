const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true, 
        trim: true
	}, 
    email: {
        type: String, 
        required: true,  
        unique: true, 
        lowercase: true, 
        trim: true
    },
	password: {
		type: String,
		required: true,
		unique: false
	}, 
    bio: {
        type: String, 
        required: false, 
        unique: false, 
        trim: true
    }
}); 

const User = mongoose.model('User', UserSchema);

module.exports = { User }