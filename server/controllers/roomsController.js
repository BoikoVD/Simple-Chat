const Room = require('../models/roomModel')
const User = require('../models/userModel')
const { validationResult } = require('express-validator');

class roomsController {
	async createRoom(req, res) {
		try {
			let errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.json({ message: `CreateRoom error`, ...errors })
			}
			const { roomName, creatorId } = req.body;
			/*
			const checkRoomName = await Room.findOne({ roomName });
			if (checkRoomName) {
				return res.json({ message: `CreateRoom error`, errors: [{ msg: `Room ${roomName} is already created`, param: 'roomName' }] });
			}
			*/
			const newRoom = new Room({ roomName, messages: [], users: [creatorId] });
			await newRoom.save();
			const creator = await User.findOne({ _id: creatorId });
			creator.rooms = [...creator.rooms, newRoom._id];
			await creator.save();
			let rooms = [];
			for (let roomId of creator.rooms) {
				let room = await Room.findOne({ _id: roomId });
				rooms = [...rooms, room];
			}
			return res.json({ message: `Room ${roomName} has been created`, userData: creator, rooms });
		} catch (e) {
			console.log(e);
			res.json({ message: 'CreateRoom error' });
		}
	}
	async findRoom(req, res) {
		try {
			let errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.json({ message: `FindRoom error`, ...errors })
			}
			const { roomId, userId } = req.body;
			const checkRoom = await Room.findOne({ _id: roomId });
			console.log(checkRoom);
			if (!checkRoom) {
				return res.json({ message: `FindRoom error`, errors: [{ msg: `Room Id ${roomId} didn't find`, param: 'roomId' }] });
			}
			checkRoom.users = [...checkRoom.users, userId];
			await checkRoom.save();
			const user = await User.findOne({ _id: userId });
			user.rooms = [...user.rooms, roomId];
			await user.save();
			let rooms = [];
			for (let roomId of user.rooms) {
				let room = await Room.findOne({ _id: roomId });
				rooms = [...rooms, room];
			}
			return res.json({ message: `Room Id ${roomId} has been joined`, userData: user, rooms });
		} catch (e) {
			console.log(e);
			res.json({ message: 'FindRoom error', errors: [{ msg: `FindRoom ERROR`, param: 'roomId' }] });
		}
	}
}

module.exports = new roomsController();