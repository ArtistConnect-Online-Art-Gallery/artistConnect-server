const express = require('express');
const {
	registerUser,
	loginUser,
	getUserProfile,
	updateUserDetails,
	deleteUser,
} = require('../controllers/UserController');

const checkLoggedIn = require('../middlewares/checkLoggedIn');
const userRoutes = express.Router();

userRoutes
	.post('/register', registerUser)
	.post('/login', loginUser)
	.get('/profile', checkLoggedIn, getUserProfile) // Access for logged-in users
	.patch('/settings', checkLoggedIn, updateUserDetails) //Access for logged-in users
	.delete('/settings/delete', checkLoggedIn, deleteUser); //Access for logged-in users

module.exports = userRoutes;
