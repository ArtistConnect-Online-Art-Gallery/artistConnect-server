require('dotenv').config();
const mongoose = require('mongoose');

const { databaseConnect } = require('./database');
const Artwork = require('./models/ArtworkModel');
const User = require('./models/UserModel');
const Comment = require('./models/CommentModel');
const hashedPassword = require('./utils/hashPassword');

databaseConnect().then(async () => {
	console.log('Creating seed data!');

	let user1 = new User({
		username: 'user1',
		email: 'user1@email.com',
		password: await hashedPassword('user1pw'),
		bio: "This is user1's bio :)",
	});
	await user1.save().then(() => {
		console.log(`${user1.username} is in the DB`);
	});

	let admin = new User({
		username: 'admin',
		email: 'admin@email.com',
		password: await hashedPassword('adminpw'),
		bio: "This is admin's bio :)",
		isAdmin: true,
	});
	await admin.save().then(() => {
		console.log(`${admin.username} is in the DB`);
	});

	let newArtwork = await Artwork.create({
		user: user1._id, // 使用 user1 的 _id 属性
		artworkImg: 'http://google.com',
		title: 'Awesome title',
		description: 'artwork description',
		genre: 'Modern',
		medium: 'Oil Painting',
	});
	await newArtwork.save().then(() => {
		console.log(`${newArtwork.title} is in the DB`);
	});

	let newComment = await Comment.create({
		artwork: newArtwork._id,
		user: user1._id,
		content: 'This is a comment',
	});
	await newComment.save().then(() => {
		console.log(`comment: ${newComment.content} is in the DB`);
	});

	console.log('DataBase disconnected');
	mongoose.disconnect();
});
