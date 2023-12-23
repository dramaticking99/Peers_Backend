const router = require('express').Router();
const UserController = require("../Controller/userController");

router.post('/registeration', UserController.register);
router.post('/login',UserController.login);

module.exports = router;




