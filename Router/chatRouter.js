const router = require('express').Router();
const ChatController = require('../Controller/chatController')


router.post('/addMessage', ChatController.addMessage);
router.post('/getChat', ChatController.getChat);
router.get('/getChats', ChatController.getChats);


module.exports = router;