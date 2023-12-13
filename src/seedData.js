require('dotenv').config();

const { databaseConnect } = require('./database');
const { Artwork } = require('./models/ArtworkModel');
const { User } = require('./models/UserModel');
const { Comment } = require('./models/CommentModel');

databaseConnect().then(async () => {
	console.log('Creating seed data!');

	let newUser = new User({
		username: 'user12',
		email: 'user12@email.com',
		password: 'user12pw',
		bio: "This is user12's bio :)",
	});
	await newUser.save().then(() => {
		console.log(`${newUser.username} is in the DB`);
	});

	let newArtwork = await Artwork.create({
		user: newUser._id,
		// username: newUser.username,
		uploadedPhoto: 'http://google.com',
		title: 'Awesome title',
		description: 'artwork description',
		genre: 'impressionism',
		medium: 'painting',
	});
	await newArtwork.save().then(() => {
		console.log(`${newArtwork.title} is in the DB`);
	});

	let newComment = await Comment.create({
		artwork: newArtwork._id,
		username: newUser.username,
		comment: 'This is a comment',
	});
	await newComment.save().then(() => {
		console.log(`comment: ${newComment.comment} is in the DB`);
	});

	console.log(newComment);
});
