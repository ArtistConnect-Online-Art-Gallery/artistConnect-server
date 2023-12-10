const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,  
        unique: false
	}, 
    // Add a reference to the User model to include user's name
    username: {
        type: String, 
        required: true,
    },
    uploadedPhoto: {
        type: String, // URL of uploaded photo
        required: true,   
        unique: false
    }, 
    title: {
        type: String, 
        required: true, 
        unique: false
    },
	description: {
		type: String,
		trim: true,  
        required: false,
        unique: false
	}, 
    genre: {
        type: String, 
        required: true, 
        unique: false, 
        trim: true
    }, 
    medium: {
        type: String, 
        required: false, 
        unique: false, 
        trim: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }

}); 

const Artwork = mongoose.model('Artwork', ArtworkSchema);
module.exports = { Artwork }

