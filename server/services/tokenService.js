const jwt = require('jsonwebtoken');
const { secret } = require('../config');

class tokenService {
	generateAccessToken(id, email) {
		const payload = {
			id,
			email
		}
		return jwt.sign(payload, secret, { expiresIn: "24h" });
	}
}
module.exports = new tokenService();