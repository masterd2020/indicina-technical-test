/**
 * Service file
 */
const ShortnerService = require('../services/Shortner');

/**
 * Utils import
 */
const {SuccessResponse} = require('../utils/response');

/**
 * Controller
 */
/**
 * @description A function to handle encoding
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.encode = (req, res) => {
  const response = ShortnerService.encode(req);

  new SuccessResponse('Encode URL successfully', response).send(res)
}

/**
 * @description A function to handle decoding
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.decode = (req, res) => {
  const response = ShortnerService.decode(req);

  new SuccessResponse('Decode URL successfully', response).send(res)
}

/**
 * @description A function to handle decoding
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.statistic = (req, res) => {
  const response = ShortnerService.statistic(req);

  new SuccessResponse('Statistics retrieved successfully', response).send(res)
}