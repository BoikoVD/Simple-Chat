const { Schema, model } = require('mongoose')

const Room = new Schema({
	roomName: { type: String, required: true },
	messages: [{ type: Object, required: true }],
	users: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }]
})

module.exports = model('Room', Room)