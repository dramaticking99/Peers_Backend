const router = require('express').Router();
const PostController = require('../Controller/postController');
const uploadMiddleware = require('../Middlewares/uplaodMiddleware');

router.post('/upload', uploadMiddleware.array('images',3), (req,res)=>{
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    res.json({imageUrls});
})
router.post('/createPost', PostController.createPost);

router.post('/likePost',PostController.likePost)
router.post('/removeLike',PostController.removeLike)


router.post('/addComment', PostController.addComment)
router.delete('/deleteComment', PostController.deleteComment)


module.exports = router;