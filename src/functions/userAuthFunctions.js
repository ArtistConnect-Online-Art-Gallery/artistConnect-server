
const jwt = require("jsonwebtoken");  
const bcrypt = require("bcryptjs")

async function comparePassword(plainTextPassword, hashedPassword) {
    let doesPasswordMatch = false; 
    doesPasswordMatch = await bcrypt.compare(plainTextPassword, hashedPassword) 
    return doesPasswordMatch;
}