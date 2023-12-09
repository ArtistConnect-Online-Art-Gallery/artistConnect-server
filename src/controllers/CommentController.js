// import Express library
const express = require('express');

const { Comment } = require('../models/CommentModel');

// make an instance of a Router
const router = express.Router();  

// localhost:3000/artworks/:artworkId/comments
// Fetch all comments associate with a specific artwork 
router.get("/", async (request, response) => {
	let comments = await Comment.find({ artworkId: request.params.artworkId});

	response.json({comments});
});

// GET localhost:3000/artworks/id
// Fetch a comment by its ID and populate relate data such us the associated artwork 
router.get("/:id", async (request, response) => {
	let result = await Comment.findOne({_id: request.params.id}).populate('artwork');

	response.json({result});
});


// POST localhost:3000/artworks/
router.post("/", async (request, response) => {
	let newComment = await Comment.create(request.body).catch(error => {return error});

	response.json(newComment);
}); 


// Retrieves the comment by its id and modifies it 
// PATCH localhost:3000/comments/id  
router.patch("/:id", async (request, response) => {
	let updateComment = await Comment.findByIdAndUpdate(request.params.id, request.body, { new: true });

	response.json(updateComment);
});

// DELETE localhost:3000/comments/id
router.delete("/:id", async (request, response) => {
	let result = await Comment.findByIdAndDelete(request.params.id);

	response.json(result);
}); 



module.exports = router ; 
