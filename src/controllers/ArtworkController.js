// import Express library
const express = require('express');
const { Artwork } = require('../models/ArtworkModel');

// make an instance of a Router
const router = express.Router();  

// GET localhost:3000/artworks/
router.get("/", async (request, response) => {
	let result = await Artwork.find({});

	response.json({result});
});

// GET localhost:3000/artworks/id
router.get("/:id", async (request, response) => {
	let result = await Artwork.findOne({_id: request.params.id})
	.populate('user')
	.populate('username');

	response.json({result});
});

// GET localhost:3000/artworks/genre
router.get("/multiple/genre/:genreToSearchFor", async (request, response) => {
	let result = await Artwork.find({ genre: request.params.genreToSearchFor});

	response.json({result});
});

// GET localhost:3000/artworks/medium
router.get("/multiple/medium/:mediumToSearchFor", async (request, response) => {
	let result = await Artwork.find({ medium: request.params.mediumToSearchFor});

	response.json({result});
});


// POST localhost:3000/artworks/  
router.post("/", async (request, response) => {
	let newArtwork = await Artwork.create(request.body).catch(error => {return error});
	response.json(newArtwork);
}); 

// Find an artwork by its id and modify that artwork  
// PATCH localhost:3000/artworks/id
router.patch("/:id", async (request, response) => {
	let result = await Artwork.findByIdAndUpdate(request.params.id,request.body, { new: true });

	response.json(result);
}); 

// DELETE localhost:3000/artworks/id
router.delete("/:id", async (request, response) => {
	let result = await Artwork.findByIdAndDelete(request.params.id);

	response.json(result);
}); 


module.exports = router ; 
