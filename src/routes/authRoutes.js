// just creating base structure for resourceController.js
const router = require('express').Router();
const controller = require('../controllers/authController');
const {validateRegister, validateLogin} = require("../middleware/validate");

router.post('/register', validateRegister, controller.register);
router.post('/login', validateLogin, controller.login);

module.exports = router;