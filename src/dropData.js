const mongoose = require('mongoose');
const { databaseConnect } = require('./database');
require('dotenv').config();

async function dropDatabase() {
	try {
		await databaseConnect();
		await mongoose.connection.dropDatabase();
		console.log('Database dropped');
	} catch (error) {
		console.error('Error dropping database:', error);
	} finally {
		mongoose.connection.close();
	}
}

dropDatabase();
