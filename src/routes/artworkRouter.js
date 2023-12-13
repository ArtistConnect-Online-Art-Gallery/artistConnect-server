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
	.post('/upload', checkLoggedIn, uploadArtwork)
	.post('/:id/report', checkLoggedIn, reportArtwork)
	.post('/:id/favorite', checkLoggedIn, favoriteArtwork)
	.patch('/:id/update', checkLoggedIn, checkArtworkCreator, updateArtwork)
	.delete('/:id/delete', checkLoggedIn, checkArtworkCreator, deleteArtwork);

module.exports = artworkRoutes;
