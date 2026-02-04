// just creating base structure for resourceController.js
const router = require('express').Router();
const controller = require('../controllers/resourceController')
const auth = require('../middleware/authMiddleware')

router.post('/', auth, controller.create);
router.get('/', auth, controller.getAll);
router.get('/:id', auth, controller.getbyId);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.delete);

module.exports = router;