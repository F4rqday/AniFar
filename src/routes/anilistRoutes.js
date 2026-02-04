const router = require('express').Router();
const controller = require('../controllers/anilistController')

router.get('/search', controller.searchAnime);
router.get('/:id', controller.getAnimeById);

module.exports = router;