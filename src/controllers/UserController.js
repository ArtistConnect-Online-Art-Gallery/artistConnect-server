const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const hashedPassword = require('../utils/hashPassword');

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

	// Hash the password
	const hashedPwd = await hashedPassword(password);

	//create the user
	const user = await User.create({
		username,
		email,
		password: hashedPwd,
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
	try {
		const user = await User.findById(req?.userAuthId).populate('artworks').populate('comments');

		res.json({
			status: 'success',
			message: 'User profile fetched successfully',
			user,
		});
	} catch {
		throw new Error('You do not have access to this profile');
	}
});

// @desc    Update user details
// @route   PATCH users/settings
// @access  Private
const updateUserDetails = asyncHandler(async (req, res) => {
	try {
		const { username, email, password, isAdmin, bio, userAvatarImg } = req.body;
		const hashedPwd = await hashedPassword(password);

		const user = await User.findByIdAndUpdate(
			req.userAuthId,
			{
				username,
				email,
				password: hashedPwd, // Use the hashed password
				isAdmin,
				bio,
				userAvatarImg,
			},
			{ new: true, runValidators: true } // 选项对象放置在正确的位置
		);

		res.json({
			status: 'success',
			message: 'User details updated successfully',
			user,
			token: generateToken(user?._id),
		});
		await user.save();
	} catch (error) {
		res.status(500).json({ message: 'Error updating user details' });
	}
});

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
