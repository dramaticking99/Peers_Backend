const router = require('express').Router();
const uploadMiddleware = require('../Middlewares/reelUploadMiddleware');
const ReelController = require('../Controller/reelController');

router.post('/upload', uploadMiddleware.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No video file uploaded' });
    }

    const videoUrl = `/uploads/reel/${req.file.filename}`;
    res.json({ videoUrl });
});
router.post('/createReel', ReelController.createReel);


module.exports = router;


