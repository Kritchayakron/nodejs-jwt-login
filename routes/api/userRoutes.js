const express = require("express");
const router = express.Router();
const UserController = require('../../controllers/UserController');
const AuthMiddleware = require('../../middleware/AuthMiddleware');
router.post('/user', UserController.create);
router.post('/login', UserController.login);
router.use(AuthMiddleware.verifyToken);
router
    .route('/user/:id')
    .get(UserController.getUser)
    .patch(UserController.update)
    .delete(UserController.delete);
router.get('/users',AuthMiddleware.verifyToken, UserController.allUsers);

module.exports = router;
