
const jwt = require("jsonwebtoken");  
const bcrypt = require("bcryptjs")

/**
 * Compare a plain text password with a hashed password using bcrypt.
 * 
 * @param {string} plainTextPassword - The plain text password to be compared.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {boolean} - Returns true if the plain text password matches the hashed password, false otherwise.
 */
async function comparePassword(plainTextPassword, hashedPassword) {
    // Initialize a variable to store the result of password comparison.
    let doesPasswordMatch = false; 
    // Use bcrypt's compare function to compare the plain text password with the hashed password.
    doesPasswordMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    // Return the result of the password comparison.
    return doesPasswordMatch;
}

// Function to generate a JWT for a given userId
function generateJwt(userId) {
    // Create a new JWT using jwt.sign
    let newJwt = jwt.sign(
      // Payload
      { userId },
      // Secret key for server-only verification: Used to sign the token and verify its authenticity
      process.env.JWT_KEY,
      // Additional options: In this case
      { expiresIn: '7d' }
    );
    // Return the generated JWT
    return newJwt;
  }
  
  module.exports = { 
    comparePassword,
    generateJwt
  };