// import Express library
const express = require('express');
const { User } = require('../models/UserModel'); 

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


module.exports = router;
