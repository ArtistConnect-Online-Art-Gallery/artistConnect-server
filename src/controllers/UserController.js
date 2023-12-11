const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// @desc    Register user
// @route   POST users/register
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
	const { email, password, username, isAdmin } = req.body;
	//Check user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		//throw
		throw new Error('User already exists');
	}
	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	//create the user
	const user = await User.create({
		username,
		email,
		password: hashedPassword,
		isAdmin,
	});
	res.status(201).json({
		status: 'success',
		message: 'User Registered Successfully',
		data: user,
	});
});

// @desc    Login user
// @route   POST users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//Find the user in db by email only
	const userFound = await User.findOne({
		email,
	});
	if (userFound && (await bcrypt.compare(password, userFound?.password))) {
		res.json({
			status: 'success',
			message: 'User logged in successfully',
			userFound,
			token: generateToken(userFound?._id),
		});
	} else {
		throw new Error('Invalid login credentials');
	}
});

// @desc    Get user profile
// @route   GET users/profile
// @access  Private/Admin
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.userAuthId).populate('artworks').populate('comments');

	res.json({
		status: 'success',
		message: 'User profile fetched successfully',
		user,
	});
});

// @desc    Update user details
// @route   PATCH users/settings
// @access  Private
const updateUserDetails = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.userAuthId, req.body, { new: true });
		//send response
		res.json({
			status: 'success',
			message: 'User details updated successfully',
			user,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({ message: 'Error updating user details' });
	}
};

// @desc    delete user
// @route   DELETE /users/settings/delete
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findByIdAndDelete(req.userAuthId);

	res.json({
		status: 'success',
		message: 'User deleted successfully',
		user,
	});
});

module.exports = {
	registerUser,
	loginUser,
	getUserProfile,
	updateUserDetails,
	deleteUser,
};
