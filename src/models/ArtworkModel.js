const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	artworkImg: {
		type: String, // URL of uploaded photo
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		trim: true,
		required: true,
		unique: false,
	},
	genre: {
		type: String,
		required: true,
		enum: ['Painting', 'Sculpture', 'Photography', 'Mixed Media', 'Other'],
	},

	medium: {
		type: String,
		required: true,
		enum: ['Oil', 'Acrylic', 'Watercolor', 'Ink', 'Pencil', 'Other'],
	},
	comments: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Comment',
			required: false,
		},
	],
});

const Artwork = mongoose.model('Artwork', ArtworkSchema);
module.exports = Artwork;
