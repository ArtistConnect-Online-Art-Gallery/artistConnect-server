const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true, 
        trim: true
	}, 
    email: {
        type: String, 
        required: true,  
        unique: true, 
        lowercase: true, 
        trim: true
    },
	password: {
		type: String,
		required: true,
		unique: false
	}, 
    bio: {
        type: String, 
        required: false, 
        unique: false, 
        trim: true
    }
});


UserSchema.pre(
	'save',
	async function (next) {
	  const user = this;
	  if (!user.isModified('password')) return next();
	  const hash = await bcrypt.hash(this.password, 10);
	  this.password = hash;
	  next();
	}
);


const User = mongoose.model('User', UserSchema);

module.exports = { User }