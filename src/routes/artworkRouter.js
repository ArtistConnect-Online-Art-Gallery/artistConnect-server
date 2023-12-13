const express = require('express');
const {
	uploadArtwork,
	getAllArtworks,
	updateArtwork,
	deleteArtwork,
	reportArtwork,
	favoriteArtwork,
} = require('../controllers/ArtworkController');

const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkArtworkCreator = require('../middlewares/checkArtworkCreator');
const artworkRoutes = express.Router();

artworkRoutes
	.get('/', getAllArtworks)
	.post('/uploadArtwork', checkLoggedIn, uploadArtwork)
	.post('/report/:id', checkLoggedIn, reportArtwork)
	.post('/favorite/:id', checkLoggedIn, favoriteArtwork)
	.patch('/updateArtwork/:id', checkLoggedIn, checkArtworkCreator, updateArtwork)
	.delete('/:id/delete', checkLoggedIn, checkArtworkCreator, deleteArtwork);

module.exports = artworkRoutes;
