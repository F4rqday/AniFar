// just creating base structure for resourceController.js
const router = require('express').Router();
const controller = require('../controllers/resourceController')

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getbyId);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;