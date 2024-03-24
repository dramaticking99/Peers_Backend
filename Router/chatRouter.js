const router = require('express').Router();
const ChatController = require('../Controller/chatController')


router.post('/addMessage', ChatController.addMessage);
router.post('/getChat', ChatController.getChat);


module.exports = router;