import jwt from 'jsonwebtoken'; 
import * as jwt_decode from 'jwt-decode'; 
import dotenv from 'dotenv'; 

dotenv.config();


export const encode_jwt = function (obj) {
	// 1 hour
	const jwtToken = jwt.sign(obj,
					process.env.JWT_SECRET,
					{ expiresIn: '1h' }
				);
	return jwtToken;
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
	const id = jwt_decode(token)._id
	return id
}

// export default { encode_jwt, verifyToken, decodeToken } 