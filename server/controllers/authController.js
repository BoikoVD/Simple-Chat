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
			const { nickname, email, password, retPassword } = req.body;
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
				return res.json({ message: `Login error`, ...errors })
			}
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res.json({ message: `Login error`, errors: [{ msg: `User ${email} is not registered`, param: 'email' }] })
			}
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.json({ message: `Login error`, errors: [{ msg: `Entered uncorrect password`, param: 'password' }] })
			}
			res.cookie('userId', user._id, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
			let rooms = [];
			for (let roomId of user.rooms) {
				let room = await Room.findOne({ _id: roomId });
				rooms = [...rooms, room];
			}
			return res.json({ user, rooms });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Login error' })
		}
	}
	async logout(req, res) {
		try {
			const { userId } = req.cookies;
			res.clearCookie('userId');
			return res.json({ message: `User (id: ${userId}) is logouted` });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Logout error' })
		}
	}
	async checkAuth(req, res) {
		try {
			const { userId } = req.cookies;
			const user = await User.findOne({ _id: userId });
			if (!user) {
				return res.json({ message: `User is not logined`, data: null })
			}
			let rooms = [];
			for (let roomId of user.rooms) {
				let room = await Room.findOne({ _id: roomId });
				rooms = [...rooms, room];
			}
			return res.json({ message: `User is logined`, data: { user, rooms } });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'CheckAuth error' })
		}
	}
}

module.exports = new authController();