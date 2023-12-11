const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: [true, 'Username is required'],
		trim: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
	},
	artworks: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Artwork',
			required: false,
		},
	],
	comments: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Comment',
			required: false,
		},
	],
	bio: {
		type: String,
		required: false,
		unique: false,
		trim: true,
	},
	userAvatarImg: {
		type: String,
		required: false,
		unique: false,
	},
	favArtworks: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Artwork',
			required: false,
		},
	],
	reportedArtworks: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Artwork',
			required: false,
		},
	],
	reportedComments: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Comment',
			required: false,
		},
	],
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
