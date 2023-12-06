require('dotenv').config();

const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
const { Artwork } = require('./models/ArtworkModel');
const { User } = require('./models/UserModel');
const { Comment } = require('./models/CommentModel');

databaseConnect().then(async () => {

	console.log("Creating seed data!");

	let newUser = new User({
		username: "user2",
		email: "user2@email.com",
		password:"user2pw",
		bio: "This is user2's bio :)",
	})
	await newUser.save().then(() => {
		console.log(`${newUser.username} is in the DB`);
	});

	// let newArtwork = await Artwork.create({
	// 	user: newUser._id,
	// 	uploadedPhoto: "artwork photo URL", 
    //     description: "artwork description",  
    //     genre: "impressionism",
    //     medium: "painting"

	// });

	// let newComment = await Comment.create({
	// 	user: newUser._id,
	// 	artwork: newArtwork._id, 
    //     comment: `This is a comment on ${newComment.artwork}` 
		
	// });

	// console.log(newComment);



}).then(async () => {
	//imaginary dbDisconnect() 
	// await dbDisconnect();
})