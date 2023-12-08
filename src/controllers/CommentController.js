// import Express library
const express = require('express');
const { Comment } = require('../models/CommentModel');


// make an instance of a Router
const router = express.Router();  

// GET localhost:3000/artworks/
router.get("/", async (request, response) => {
	let result = await Comment.find({});

	response.json({result});
})


// GET localhost:3000/artworks/id
router.get("/:id", async (request, response) => {
	let result = await Comment.findOne({_id: request.params.id});

	response.json({result});
})


// POST localhost:3000/artworks/
router.post("/", async (request, response) => {
	let newComment = await Comment.create(request.body).catch(error => error);

	response.json(newComment);
}); 

module.exports = router ; 
