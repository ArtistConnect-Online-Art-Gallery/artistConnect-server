const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CommentSchema = new mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User',
		required: true,  
        unique: false
	}, 
    artwork: {
		type: ObjectId,
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