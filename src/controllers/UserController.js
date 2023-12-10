// import Express library
const express = require('express');
const { User } = require('../models/UserModel');  
const { comparePassword, generateJwt } = require('../functions/userAuthFunctions');


// make an instance of a Router
const router = express.Router();

// GET localhost:3000/users/
router.get('/', async (request, response) => {
	let result = await User.find({});

	response.json({ result });
});

// GET localhost:3000/users/id
router.get('/:id', async (request, response) => {
	let result = await User.findOne({ _id: request.params.id });

	response.json({ result });
});

// POST localhost:3000/users/
router.post("/", async (request, response) => {
	let result = await User.create(request.body).catch(error => {return error});

	response.json({
		user: result
	});
}); 

// POST localhost:3000/users/login/ 
router.post("/login", async (request, response) => {
	// Find user by provided email
	let targetUser = await User.findOne({email: request.body.email}).catch(error => error); 

	// Check if user provided the correct password
	let isPasswordCorrect = await comparePassword(request.body.password, targetUser.password);  

	if (!isPasswordCorrect){
		response.status(403).json({error:"Password was incorrect"}); 
	} 

	// If they provided the correct, generate a JWT
	let freshJwt = generateJwt(targetUser._id.toString());

	// respond with the JWT 
	response.json({
		jwt: freshJwt
	});

})


module.exports = router;

