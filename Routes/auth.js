const express = require("express");
const router = express.Router();
const UserController = require('../Controllers/UserController');
const { auth } = require("../Middleware/auth")
router.post('/user', UserController.create);
router.get('/user',auth, UserController.getUser);
router.put('/user/:id', UserController.update);
router.delete('/items/:id', UserController.delete);
// router.get("/list",list)
// router.get("/my_account/:id",auth,myaccount);
// router.post("/login",login)
// router.post("/register",register)
// router.put("/auth/:id",update)
// router.delete("/auth/:id",del)
module.exports = router;
