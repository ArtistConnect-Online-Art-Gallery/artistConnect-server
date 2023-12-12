const express = require('express');
const { uploadArtwork, getAllArtworks, updateArtwork, deleteArtwork } = require('../controllers/ArtworkController');

const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkArtworkCreator = require('../middlewares/checkArtworkCreator');
const artworkRoutes = express.Router();

artworkRoutes
	.get('/', getAllArtworks)
	.post('/uploadArtwork', checkLoggedIn, uploadArtwork)
	.patch('/updateArtwork/:id', checkLoggedIn, checkArtworkCreator, updateArtwork)
	.delete('/:id', checkLoggedIn, checkArtworkCreator, deleteArtwork);

module.exports = artworkRoutes;
