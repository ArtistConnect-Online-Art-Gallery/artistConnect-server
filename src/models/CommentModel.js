const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    artwork: {
		type: mongoose.Types.ObjectId,
		ref: 'Artwork',
		required: true,  
        unique: false
	}, 

	username: {
		type: String,
		required: true,  
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