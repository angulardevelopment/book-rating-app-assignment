import jwt from 'jsonwebtoken'; 
import {jwtDecode} from 'jwt-decode';
import dotenv from 'dotenv'; 

dotenv.config();


export const encode_jwt = function (obj) {
	// 1 hour
	const jwtToken = jwt.sign(obj,
					process.env.JWT_SECRET,
					{ expiresIn: '15m' }
				);
	return jwtToken;
}

export const generateRefreshToken = (obj) => {
	const refreshToken = jwt.sign(obj, process.env.JWT_REFRESH_SECRET, {
		expiresIn: '3d'
	})
	return refreshToken;
}

export const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return {
		  expired: false,
		  decoded,
	};
	} catch (e) { 
			return {
				expired: e.message === 'jwt expired',
				decoded: null,
	  	};
	}
}
  
export const decodeToken = (token) => {

	const id = jwtDecode(token)._id
	return id
}

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return {
            expired: false,
            decoded,
        };
    } catch (e) {
        return {
            expired: e.message === 'jwt expired',
            decoded: null,
        };
    }
};