// just creating base structure for userRoutes.js
const router = require('express').Router();
const controller = require('../controllers/user.Controller');
const auth = require('../middleware/authMiddleware')

router.get('/profile', auth, controller.getProfile);
router.put('/profile', auth,  controller.updateProfile);

module.exports = router;