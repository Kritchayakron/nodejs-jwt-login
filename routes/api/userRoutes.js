const express = require("express");
const router = express.Router();
const UserController = require('../../Controllers/UserController');
const AuthMiddleware = require("../../middleware/AuthMiddleware");
router.post('/user', UserController.create);
router.get('/user',AuthMiddleware.verifyToken, UserController.getUser);
router.put('/user/:id',AuthMiddleware.verifyToken, UserController.update);
router.delete('/user/:id',AuthMiddleware.verifyToken, UserController.delete);
module.exports = router;
