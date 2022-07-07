const router = require('express').Router();
const commentsController = require('../Controllers/CommentsController');


router.post('/', commentsController.createComment);
router.post('/get', commentsController.getComments);


module.exports = router