const router = require('express').Router();
const commentsController = require('../Controllers/CommentsController');


router.post('/', commentsController.createComment);


module.exports = router