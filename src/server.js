const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRouter');
const artworkRoutes = require('./routes/artworkRouter');
const commentRoutes = require('./routes/commentRouter');
const adminRoutes = require('./routes/adminRouter');

// make a server instance
app.use(express.json());

const corsOptions = {
	//			frontend localhost,  frontend deployed
	origin: ['http://localhost:3000/', 'http://localhost:3001', 'https://someDeployedWebsite.com'],
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// pass incoming request to express.json()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.get('/', (request, response) => {
	response.json({
		message: 'Hello Artist Connect',
	});
});

// routes
app.use('/users', userRoutes);
app.use('/artworks', artworkRoutes);
app.use('/comments', commentRoutes);
app.use('/admin', adminRoutes);

module.exports = {
	app,
};
