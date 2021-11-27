const Room = require('../models/roomModel')
const User = require('../models/userModel')
const { validationResult } = require('express-validator');

class roomsController {
	async createRoom(req, res) {
		try {
			let errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.json({ message: `CreateRoom ERROR`, ...errors })
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
			return res.json({ message: `Room ${roomName} has been created`, rooms, roomId: newRoom._id });
		} catch (e) {
			console.log(e);
			res.json({ message: 'Unforeseen CreateRoom ERROR' });
		}
	}
	async findRoom(req, res) {
		try {
			let errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.json({ message: `FindRoom ERROR`, ...errors })
			}
			const { roomId, userId } = req.body;
			const checkRoom = await Room.findOne({ _id: roomId });
			if (!checkRoom) {
				return res.json({ message: `FindRoom ERROR`, errors: [{ msg: `Room Id: ${roomId} didn't find`, param: 'roomId' }] });
			}
			if (checkRoom.users.includes(userId)) {
				return res.json({ message: `FindRoom ERROR`, errors: [{ msg: `You have already joined this room`, param: 'roomId' }] });
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
			return res.json({ message: `Room Id ${roomId} has been joined`, rooms });
		} catch (e) {
			console.log(e);
			res.json({ message: 'Unforeseen FindRoom ERROR', errors: [{ msg: `Unforeseen FindRoom ERROR`, param: 'roomId' }] });
		}
	}
	async leaveRoom(req, res) {
		try {
			const { roomId, userId } = req.body;
			const user = await User.findOne({ _id: userId });
			let index = user.rooms.indexOf(roomId);
			user.rooms.splice(index, 1);
			await user.save();
			const room = await Room.findOne({ _id: roomId });
			index = room.users.indexOf(userId);
			room.users.splice(index, 1);
			await room.save();
			let rooms = [];
			for (let roomId of user.rooms) {
				let room = await Room.findOne({ _id: roomId });
				rooms = [...rooms, room];
			}
			return res.json({ message: `Room ${roomId} has been leaved`, rooms });
		} catch (e) {
			console.log(e);
			res.json({ message: 'Unforeseen LeaveRoom ERROR' });
		}
	}
}

module.exports = new roomsController();