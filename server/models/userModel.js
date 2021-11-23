const { Schema, model } = require('mongoose')

const User = new Schema({
	nickname: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	rooms: [{ type: Schema.Types.ObjectId, required: true, ref: 'Room' }]
})

module.exports = model('User', User)