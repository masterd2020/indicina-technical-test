const express = require('express');
const app = express();
const helmet = require('helmet')

/**
 * Routes middleware
 */
const apiRoutes = require('./src/routes')

/**
 * Import
 */
const {NotFoundError, ResponseError, InternalError} = require('./src/utils/errorResponse')
const ShortnerHelper = require('./src/utils/core/ShortnerHelper');

/**
 * Setup middleware
 */
app.use(express.json({ limit: '20mb', extended: true }));
app.use(express.urlencoded({ limit: '20mb', extended: false }));
app.use(helmet())


/**
 * Mounts routes
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to URL Shortner',
    version: '1.0.0',
    author: 'tohebayomide11@gmail.com'
  })
})
app.use('/api/v1', apiRoutes)
app.get('/:id', (req, res) => {
  const {id} = req.params;

  const originalURL = ShortnerHelper.retrieveOriginalURL(id);

  if(originalURL) res.redirect(originalURL);
  else res.redirect('/')
})

/**
 * Express global error handling middleware
 */
app.use((req, res, next) => {
  next(new NotFoundError('Resource not found'))
})

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
  // Checks if err is thrown by us and handled to the RespnseError Class, if not we throw and handle an internal server error
  if (err instanceof ResponseError) {
    ResponseError.handle(err, res);
  } else {
    ResponseError.handle(new InternalError(err), res);
  }
  console.error(err);
});

// Export express app
module.exports = app;