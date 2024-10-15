import { verifyToken, decodeToken } from '../utils/jwt.util.js';

// Use 'export' instead of 'exports'
export const isAuth = async (req, res, next) => {
    let token;

    try {
        // Check if authorization header is provided and if it starts with 'Bearer'
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(403).json({ message: 'Invalid token, Unauthorized user' });
        }

        // Extract the token from the authorization header
        token = req.headers.authorization.split(' ')[1];

        // Verify the token and check if it's expired
        const { expired } = verifyToken(token);
        if (expired) {
            return res.status(403).json({ message: 'Expired token, Unauthorized user' });
        }

        // Decode the token to get user details
        req.user = decodeToken(token); // Ensure decodeToken returns the expected user object

        // Call the next middleware
        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message || 'An error occurred' // Provide a clear error message
        });
    }
};
