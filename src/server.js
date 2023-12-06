const express = require('express');
const cors = require('cors');

// make a server instance
const app = express();

const corsOptions = {
	//			frontend localhost,  frontend deployed
	origin: ['http://localhost:3000/', 'http://localhost:3000', 'https://someDeployedWebsite.com'],
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/', (request, response) => {
	response.json({
		message: 'Hello Artist Connect',
	});
});

const userController = require('./controllers/UserController');
app.use('/users', userController);

module.exports = {
	app,
};
