const router = require('express').Router();

/**
 * Controllers files
 */
const shortnerController = require('../controllers/shortner');

/**
 * @description This routes encode a URL to a shortend URL
 */
router.post('/encode', shortnerController.encode)

/**
 * @description This routes decode the shortend URL to it's original URL
 */
router.post('/decode', shortnerController.decode)

/**
 * @description This routes return basic stat of a short URL path
 */
router.get('/statistic/:url_path', shortnerController.statistic)

module.exports = router;
