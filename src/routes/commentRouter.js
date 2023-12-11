const express = require('express');
const { getAllComments, createComment, updateComment, deleteComment } = require('../controllers/CommentController');

const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkCommentCreater = require('../middlewares/checkCommentCreater');
const commentRoutes = express.Router();

commentRoutes
	.get('/', getAllComments)
	.post('/:artworkID', checkLoggedIn, createComment) //any logged-in user can create a comment
	.patch('/:id', checkLoggedIn, checkCommentCreater, updateComment) //only the creator of the comment can update it
	.delete('/:id', checkLoggedIn, checkCommentCreater, deleteComment); //only the creator of the comment can delete it

module.exports = commentRoutes;
