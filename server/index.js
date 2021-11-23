const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/router');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 7000;
const DB_URL = 'mongodb+srv://root:root@cluster0.kcqms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const CLIENT_URL = 'http://localhost:3000';


app.use(express.json());
app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: CLIENT_URL
}));
app.use("/api", router);

const start = async () => {
	try {
		await mongoose.connect(DB_URL);
		server.listen(PORT, () => {
			console.log('Server started on ' + PORT);
		})
	} catch (e) {
		console.log(e);
	}
}

start();

const Room = require('./models/roomModel');

io.on('connection', (socket) => {
	console.log('User connected ' + socket.id);

	socket.on('JOIN', async ({ roomId, prevRoom }) => {
		console.log('Socket JOIN ' + roomId);
		if (prevRoom !== undefined) {
			socket.leave(prevRoom);
		}
		const room = await Room.findOne({ _id: roomId });
		socket.join(roomId);
		socket.emit('SERVER:GET_MESSAGES', { messages: room.messages });
	});

	socket.on('NEW_MESSAGE', async ({ roomId, message }) => {
		console.log('Socket NEW_MESSAGE ' + roomId);
		const room = await Room.findOne({ _id: roomId });
		room.messages = [...room.messages, message];
		await room.save();
		socket.to(roomId).emit('SERVER:NEW_MESSAGE', { message: message });
	});

	socket.on('disconnect', () => {
		console.log('User disconnected ' + socket.id);
	});
});