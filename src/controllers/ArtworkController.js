const asyncHandler = require('express-async-handler');
const Artwork = require('../models/ArtworkModel');
const User = require('../models/UserModel');

// @desc    get all artworks
// @route   GET artworks/
// @access  Public
const getAllArtworks = asyncHandler(async (req, res) => {
	const artworks = await Artwork.find().populate('user', 'username');

	res.status(200).json({
		status: 'success',
		message: 'All artworks',
		artworks,
	});
});

// @desc    Get a specific artwork by ID
// @route   GET /artworks/:id
// @access  Public

const getArtworkById = asyncHandler(async (req, res) => {
	const artwork = await Artwork.findById(req.params.id).populate('user');

	res.status(200).json({
		status: 'success',
		message: 'Artwork found',
		artwork,
	});
});

// @desc    create new artworks
// @route   POST artworks/upload
// @access  Private
const uploadArtwork = asyncHandler(async (req, res) => {
	const { title, description, genre, medium, comments } = req.body;

	// Find the logged-in user
	const user = await User.findById(req.userAuthId).populate('username');

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
		username,
		artworkImg: req.file.path,
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
// @route   PATCH artworks/：id/update
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
// @route   Delete artworks/:id/delete
// @access  Private
const deleteArtwork = asyncHandler(async (req, res) => {
	// Delete the artwork

	const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id);

	if (!deletedArtwork) {
		return res.status(404).json({ status: 'error', message: 'Artwork not found' });
	}

	// Find the user associated with the deleted artwork
	const user = await User.findById(req.userAuthId);

	if (user) {
		// Remove the deleted artwork ID from the user's artworks array
		user.artworks.pull(deletedArtwork._id);
		await user.save();
	}

	res.json({
		status: 'success',
		message: 'Artwork deleted successfully',
		artwork: deletedArtwork,
	});

	await user.save();
});

// @desc    report artwork
// @route   POST artworks/:id/report
// @access  Private
const reportArtwork = asyncHandler(async (req, res) => {
	const artwork = await Artwork.findById(req.params.id).populate({
		path: 'user',
		select: 'username',
	});

	if (!artwork) {
		return res.status(404).json({ error: 'Artwork not found' });
	}

	// turn the reported property of the artwork to true
	artwork.report = true;

	// update change
	await artwork.save();

	// check the login user
	const user = await User.findById(req.userAuthId);

	// save the artwork id to the reportedArtworks array of the user
	if (!user.reportedArtworks.includes(artwork._id)) {
		user.reportedArtworks.push(artwork._id);
		await user.save();
	}

	res.status(200).json({ status: 'success', message: 'Artwork reported successfully', artwork });
});

// @desc    Favorite artwork
// @route   POST artworks/:id/favorite
// @access  Private
const favoriteArtwork = asyncHandler(async (req, res) => {
	const artwork = await Artwork.findById(req.params.id);

	if (!artwork) {
		return res.status(404).json({ error: 'Artwork not found' });
	}

	artwork.favorite = true;
	const user = await User.findById(req.userAuthId);

	if (!user.favArtworks.includes(artwork._id)) {
		user.favArtworks.push(artwork._id);
		await user.save();
	}

	await user.save();

	res.status(200).json({ status: 'success', message: 'Artwork favorited successfully', artwork });
});

module.exports = {
	getAllArtworks,
	getArtworkById,
	uploadArtwork,
	updateArtwork,
	deleteArtwork,
	reportArtwork,
	favoriteArtwork,
};
