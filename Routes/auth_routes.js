const router = require('express').Router();
const userController = require('../Controllers/UserController');


router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router