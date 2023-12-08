const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	commentingUser: {
		type: String,
		required: true,  
        unique: false
	}, 
    artwork: {
		type: mongoose.Types.ObjectId,
		ref: 'Artwork',
		required: true,  
        unique: false
	}, 
	comment: {
		type: String,
		trim: true,  
        required: true,
        unique: false
	}
}); 

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment }