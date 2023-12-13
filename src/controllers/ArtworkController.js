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
		// username: user.username,
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
			// username: user.username,
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

// @desc    report artwork
// @route   POST artworks/report/:id
// @access  Private
const reportArtwork = asyncHandler(async (req, res) => {
	const artwork = await Artwork.findById(req.params.id);

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
// @route   POST artworks/favorite/:id
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
	uploadArtwork,
	updateArtwork,
	deleteArtwork,
	reportArtwork,
	favoriteArtwork,
};
