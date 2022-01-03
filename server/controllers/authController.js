const User = require('../models/userModel')
const Room = require('../models/roomModel')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

class authController {
	async registration(req, res) {
		try {
			let errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.json({ message: `Registration ERROR`, ...errors })
			}
			let { nickname, email, password, retPassword } = req.body;
			email = email.toLowerCase();
			if (password !== retPassword) {
				return res.json({ message: `Registration ERROR`, errors: [{ msg: `Please enter the same passwords`, param: 'password' }] })
			}
			const checkNickname = await User.findOne({ nickname });
			if (checkNickname) {
				return res.json({ message: `Registration ERROR`, errors: [{ msg: `A user with this nickname is already registered. Please come up with another nickname`, param: 'nickname' }] });
			}
			const checkEmail = await User.findOne({ email });
			if (checkEmail) {
				return res.json({ message: `Registration ERROR`, errors: [{ msg: `A user with ${email} email is already registered`, param: 'email' }] });
			}
			const hashPass = bcrypt.hashSync(password, 5);
			const user = new User({ nickname, email, password: hashPass, rooms: [] });
			await user.save();
			return res.json({ message: `User ${email} has been registered` });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Unforeseen Registration ERROR' });
		}
	}
	async login(req, res) {
		try {
			let errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.json({ message: `Login ERROR`, ...errors })
			}
			let { email, password } = req.body;
			email = email.toLowerCase();
			const user = await User.findOne({ email });
			if (!user) {
				return res.json({ message: `Login ERROR`, errors: [{ msg: `A user with ${email} email is not registered`, param: 'email' }] })
			}
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.json({ message: `Login ERROR`, errors: [{ msg: `You entered an incorrect password`, param: 'password' }] })
			}
			res.cookie('userId', user._id, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
			let rooms = [];
			for (let roomId of user.rooms) {
				let room = await Room.findOne({ _id: roomId });
				rooms = [...rooms, room];
			}
			let userObj = { _id: user._id, nickname: user.nickname, email: user.email }
			return res.json({ user: userObj, rooms });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Unforeseen Registration ERROR' })
		}
	}
	async logout(req, res) {
		try {
			const { userId } = req.cookies;
			res.clearCookie('userId');
			return res.json({ message: `User (id: ${userId}) is logouted` });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Logout ERROR' })
		}
	}
	async checkAuth(req, res) {
		try {
			const { userId } = req.cookies;
			const user = await User.findOne({ _id: userId });
			if (!user) {
				return res.json({ message: `User is not logined`, statusCode: 0, user: null, rooms: null })
			}
			let rooms = [];
			for (let roomId of user.rooms) {
				let room = await Room.findOne({ _id: roomId });
				rooms = [...rooms, room];
			}
			return res.json({ message: `User is logined`, statusCode: 1, user, rooms });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'CheckAuth error' })
		}
	}
}

module.exports = new authController();