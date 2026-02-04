// just creating base structure for userRoutes.js
const router = require('express').Router();
const controller = require('../controllers/user.Controller');

router.get('/profile', controller.getProfile);
router.put('/profile', controller.updateProfile);

module.exports = router;