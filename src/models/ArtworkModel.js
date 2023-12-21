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
		required: true,
		unique: false,
	},
	genre: {
		type: String,
		required: true,
		enum: [
			'Modern',
			'Impressionist',
			'Contemporary',
			'Surrealist',
			'Pop Art',
			'Cubist',
			'Abstract',
			'Graffiti/Street-Art',
			'Other',
		],
	},
	medium: {
		type: String,
		required: true,
		enum: [
			'Oil Painting',
			'Acrylic Painting',
			'Watercolor painting',
			'Ink Drawing',
			'Pencil Drawing',
			'Sculpture',
			'Mixed Media',
			'Photography',
			'Other',
		],
	},
	comments: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Comment',
			required: false,
		},
	],
	favorite: {
		type: Boolean,
		default: false,
	},
	report: {
		type: Boolean,
		default: false,
	},
});

const Artwork = mongoose.model('Artwork', ArtworkSchema);
module.exports = Artwork;
