const jwt = require('jsonwebtoken');

// Middleware function to check for a valid JWT
function requiresJWT (request, response, next) {
    // Get the JWT from the request headers
    const token = request.headers.authorization;

    // Check if a token is present
    if (!token) {
        return response.status(401).json({ error: 'Unauthorized - Missing JWT' });
    }

    try {
        // Verify the token and decode its payload
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Attach the decoded payload to the request for further use in the route handler
        request.user = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        return response.status(401).json({ error: 'Unauthorized - Invalid JWT' });
    }
};

module.exports = requiresJWT;