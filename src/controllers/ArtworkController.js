const asyncHandler = require('express-async-handler');
const Artwork = require('../models/ArtworkModel');
const User = require('../models/UserModel');

// @desc    get all artworks
// @route   GET artworks/
// @access  Public
const getAllArtworks = asyncHandler(async (req, res) => {
	const artworks = await Artwork.find();
	res.status(200).json({
		status: 'success',
		message: 'All artworks',
		artworks,
	});
});

// @desc    create new artworks
// @route   POST artworks/uploadArtwork
// @access  Private
const uploadArtwork = asyncHandler(async (req, res) => {
	const { title, description, genre, medium, comments, artworkImg } = req.body;

	// Find the logged-in user
	const user = await User.findById(req.userAuthId);

	if (!user) {
		return res.status(404).json({ error: 'Invalid user token' });
	}

	//artwork name  exists
	const artworkExist = await Artwork.findOne({ title });
	if (artworkExist) {
		throw new Error('Artwork Already Exists');
	}
	const artwork = await Artwork.create({
		title,
		user: req.userAuthId,
		artworkImg,
		description,
		genre,
		medium,
		comments,
	});

	//push the artwork into user
	user.artworks?.push(artwork?._id);
	await user.save();
	res.status(201).json({
		status: 'success',
		message: 'Artwork created successfully',
		artwork,
	});
});

// @desc    update artwork
// @route   PATCH artworks/updateArtwork/:id
// @access  Private
const updateArtwork = asyncHandler(async (req, res) => {
	const { title, description, genre, medium, comments, artworkImg } = req.body;
	const artwork = await Artwork.findByIdAndUpdate(
		req.params.id,
		{
			title,
			user: req.userAuthId,
			artworkImg,
			description,
			genre,
			medium,
			comments,
		},
		{
			runValidators: true,
			new: true,
		}
	);
	res.status(201).json({
		status: 'success',
		message: 'Artwork updated successfully',
		artwork,
	});
});

// @desc    delete artwork
// @route   Delete artworks/:id
// @access  Private
const deleteArtwork = asyncHandler(async (req, res) => {
	artwork = await Artwork.findByIdAndDelete(req.params.id);
	res.json({
		status: 'success',
		message: 'Artwork deleted successfully',
		artwork,
	});
});

module.exports = {
	getAllArtworks,
	uploadArtwork,
	updateArtwork,
	deleteArtwork,
};
