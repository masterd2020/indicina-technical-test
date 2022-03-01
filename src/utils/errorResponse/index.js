/**
 * Response
 */
const {InternalErrorResponse, BadRequestResponse, NotFoundResponse} = require('../response')

/**
 * Enums
 */
const {ERROR_TYPE_ENUM} = require('../../CONSTANTS/response')

/**
 * @class ResponseError
 * @abstract this class cannot be instantiated
 * @classdesc An abstract class that defines and handles errors. Its extends the built-in Error class.
 */
class ResponseError extends Error {
  /**
   * @constructor - since the class is abstract, this constructor must be called from the subclass using the super(...)
   * @param errorType - Type of error caught
   * @param message - Error message to be displayed
   * @param errorDetails - Additional details describing the error
   */
  constructor(errorType, message = 'Error', errorDetails) {
    /**
     * since abstract classes cannot be created naturally in javascript, we induced it by throwing an
     * error when this class is instantiated directly and not subclassed
     * @see {@link https://stackoverflow.com/questions/29480569/does-ecmascript-6-have-a-convention-for-abstract-classes/30560792}
     */
    if (new.target === ResponseError) {
      throw new TypeError('Cannot Construct Abstract Instance Directly');
    }
    super(message);
    this.type = errorType;
    this.details = errorDetails;
  }
  
  /**
   * @method Handle
   * @static - this method should be called statically from its subclass
   * @param error - this is the error encountered and thrown.
   * @param res - response type from expressJs
   * @returns {Response}
   * @description - this method handles the thrown error by using a switch statement to determine the type of error and
   * returns the appropriate response for that error.
   */
  static handle(error, res) {
    switch (this.type) {
      case ERROR_TYPE_ENUM.NOT_FOUND:
      case ERROR_TYPE_ENUM.NO_ENTRY:
      case ERROR_TYPE_ENUM.NO_DATA:
        return new NotFoundResponse(error.message, error.details).send(res);
      case ERROR_TYPE_ENUM.BAD_REQUEST:
        return new BadRequestResponse(error.message, error.details).send(res);
      default: {
        let { message } = error;
        // Do not send failure message in production as it may send sensitive data
        if (process.env.NODE_ENV === 'production')
          message = 'Something wrong happened.';

        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}


/**
 * @class NotFoundError
 * @classdesc this error class should be thrown when a resource like route path could not be found, its subclasses the
 * abstract @see ResponseError class and calls its constructor using the @see ERROR_TYPE_ENUM const and the message
 * to be displayed.
 */
class NotFoundError extends ResponseError {
  constructor(message = 'Not Found', errorDetails = null) {
    super(ERROR_TYPE_ENUM.NOT_FOUND, message, errorDetails);
  }
}


/**
 * @class BadRequestError
 * @classdesc this error class should be thrown when there is a bad request i.e the server cannot understand the request
 * its subclasses the abstract @see ApiError class and calls its constructor using the @see ERROR_TYPE_ENUM const and the message
 * to be displayed.
 */
class BadRequestError extends ResponseError {
  constructor(message = 'Bad Request', errorDetails = null) {
    super(ERROR_TYPE_ENUM.BAD_REQUEST, message, errorDetails);
  }
}


/**
 * @class InternalError
 * @classdesc this error class should be thrown when a server error occurs within the API, its subclasses the
 * abstract @see ResponseError class and calls its constructor using the @see ERROR_TYPE_ENUM const and the message
 * to be displayed.
 */
class InternalError extends ResponseError {
  constructor(
    message = 'An error occurred. Please try again later',
    errorDetails = null
  ) {
    super(ERROR_TYPE_ENUM.INTERNAL, message, errorDetails);
  }
}


module.exports = {NotFoundError, BadRequestError, ResponseError, InternalError}