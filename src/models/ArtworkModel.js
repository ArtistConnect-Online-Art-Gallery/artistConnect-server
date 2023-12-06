// const mongoose = require('mongoose');


// const ArtworkSchema = new mongoose.Schema({
// 	user: {
// 		type: ObjectId,
// 		ref: 'User',
// 		required: true,  
//         unique: false
// 	}, 
//     uploadedPhoto: {
//         type: String, // URL of uploaded photo
//         required: true,   
//         unique: false
//     },
// 	description: {
// 		type: String,
// 		trim: true,  
//         required: false,
//         unique: false
// 	}, 
//     genre: {
//         type: String, 
//         required: true, 
//         unique: false, 
//         trim: true
//     }, 
//     medium: {
//         type: String, 
//         required: false, 
//         unique: false, 
//         trim: true
//     }
// }); 

// const Artwork = mongoose.model('Artwork', ArtworkSchema);

// module.exports = { Artwork }