const router = require('express').Router();

/**
 * Routes middleware
 */
const shortner = require('./shortner');

/**
 * Mounting all the imported routes handlers middleware
 */
router.use('/shortner', shortner)


/**
 * Exporting the router middleware
 */
module.exports = router;