const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');
const roomsController = require('../controllers/roomsController');
const { check } = require('express-validator');

router.post('/registration', [
	check("nickname", "The nickname field cannot be empty. Please, enter your nickname").notEmpty(),
	check("email", "You have entered an incorrect email").isEmail(),
	check("password", "Please enter your password").notEmpty(),
	check("password", "You have entered a short password, the minimum number of symbols for the password is 4").isLength({ min: 4 })
], authController.registration);
router.post('/login', [
	check("email", "Please, enter your email").notEmpty(),
	check("email", "You have entered an incorrect email").isEmail(),
], authController.login);
router.post('/logout', authController.logout);
router.get('/check', authController.checkAuth);

router.post('/createroom', [
	check("roomName", "Please, enter the room's name").notEmpty(),
], roomsController.createRoom);
router.post('/findroom', [
	check("roomId", "Please, enter the room's Id").notEmpty(),
], roomsController.findRoom);
router.post('/leaveroom', roomsController.leaveRoom);

module.exports = router;