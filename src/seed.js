require('dotenv').config();

const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
const { Artwork } = require('./models/ArtworkModel');
const { User } = require('./models/UserModel');
const { Comment } = require('./models/CommentModel');

databaseConnect()
	.then(async () => {
		console.log('Creating seed data!');

	let newUser = new User({
		username: "user5",
		email: "user5@email.com",
		password:"user5pw",
		bio: "This is user5's bio :)",
	})
    await newUser.save().then(() => {
        console.log(`${newUser.username} is in the DB`);
    });

	let newArtwork = await Artwork.create({
		user: newUser._id,
		uploadedPhoto: ["http://google.com"],  
        title: "Awesome title",
        description: "artwork description",  
        genre: "impressionism",
        medium: "painting", 
        uploadDate: Date()
    })  
    await newArtwork.save().then(() => {
        console.log(`${newArtwork.title} is in the DB`); 
    });
    
	let newComment = await Comment.create({
		commentingUser: "user2",
		artwork: newArtwork._id, 
        comment: " This is a comment"
	})
    await newComment.save().then(() => {
        console.log(`comment:${newComment.comment} is in the DB`); 
    });

	console.log(newComment);



}).then(async () => {
	//imaginary dbDisconnect() 
	// await dbDisconnect();
})
