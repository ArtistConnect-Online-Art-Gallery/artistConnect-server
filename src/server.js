const express = require('express');
const cors = require('cors');

// make a server instance
const app = express();

app.use(express.json());

const corsOptions = {
	//			frontend localhost,  frontend deployed
	origin: ['http://localhost:3000/', 'http://localhost:3002', 'https://someDeployedWebsite.com'],
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//url encoded
app.use(express.urlencoded({ extended: true }));

//server static files
app.use(express.static('public'));

app.get('/', (request, response) => {
	response.json({
		message: 'Hello Artist Connect',
	});
});

const UserRouter = require('./controllers/UserController');
app.use('/users', UserRouter);
const ArtworkRouter = require('./controllers/ArtworkController');
app.use('/artworks', ArtworkRouter);
const CommentRouter = require('./controllers/CommentController');
app.use('/comments', CommentRouter);

module.exports = {
	app,
};
