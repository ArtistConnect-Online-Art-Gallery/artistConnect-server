// import Express library
const express = require('express');
const { Artwork } = require('../models/ArtworkModel');

// make an instance of a Router
const router = express.Router();  

// GET localhost:3000/artworks/
router.get("/", async (request, response) => {
	let result = await Artwork.find({});

	response.json({result});
})

// GET localhost:3000/artworks/id
router.get("/:id", async (request, response) => {
	let result = await Artwork.findOne({_id: request.params.id});

	response.json({result});
})

// POST localhost:3000/artworks/
router.post("/", async (request, response) => {
	let newArtwork = await Artwork.create(request.body).catch(error => error);

	response.json(newArtwork);
}); 

module.exports = router ; 
