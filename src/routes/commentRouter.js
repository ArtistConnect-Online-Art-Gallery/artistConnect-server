const express = require('express');
const { getAllComments, createComment, updateComment, deleteComment } = require('../controllers/CommentController');

const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkCommentCreator = require('../middlewares/checkCommentCreator');
const commentRoutes = express.Router();

commentRoutes
	.get('/', getAllComments)
	.post('/:artworkID', checkLoggedIn, createComment) //any logged-in user can create a comment
	.patch('/:id', checkLoggedIn, checkCommentCreator, updateComment) //only the creator of the comment can update it
	.delete('/:id', checkLoggedIn, checkCommentCreator, deleteComment); //only the creator of the comment can delete it

module.exports = commentRoutes;
