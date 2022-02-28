const {STATUS_CODE_ENUM, RESPONSE_STATUS_ENUM} = require('../../CONSTANTS/response')

/**
 * @class Response class
 * @abstract this class cannot be instantiated
 * @classdesc An abstract base class that defines a uniformity for all API responses
 */
class Response {
  /**
   * @param statusCode - a status code from the STATUS_CODE_ENUM above
   * @param message - a short string that gives a description about the responses
   * @param status - a true or false boolean value indicating whether the request is successful
   * @param details - used only for errors to show details about the error
   * @description since the class is abstract, this constructor must be called from the subclass using the super(...)
   */
  constructor(statusCode, message, details, status) {
    /**
     * since abstract classes cannot be created naturally in javascript, we induced it by throwing an
     * error when this class is instantiated directly and not subclassed
     * @see {@link https://stackoverflow.com/questions/29480569/does-ecmascript-6-have-a-convention-for-abstract-classes/30560792}
     */
    if (new.target === Response) {
      throw new TypeError('Cannot Construct Abstract Instance Directly');
    }

    /**
     * Property fields
     */
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
    this.status = status;
  }

  /**
   * @method payload
   * @param data
   * @returns {{data: *, message: *, status: *}}
   * @description defines the payload structure
   */
  payload(data) {
    return {
      success: this.status,
      message: this.message,
      data,
    };
  }

  /**
   * @method prepare
   * @param res - response object from expressJs
   * @param data - payload object
   * @returns Json Payload Response
   * @description this prepares the responses and returning the response
   */
  prepare(res, data) {
    return res.status(this.statusCode).json(this.payload(data));
  }

  /**
   * @method send
   * @param res - response object
   * @returns Json Object
   * @description sends the response
   */
  send(res) {
    return this.prepare(res);
  }
}

/**
 * @class SuccessResponse
 * @classdesc this class should be used to return a success response with a payload, its subclasses the
 * abstract @see Response class and calls its constructor using the @see STATUS_CODE_ENUM, @see RESPONSE_CODE_ENUM and the message
 * to be displayed. The payload is passed as a second parameter its constructor
 */
class SuccessResponse extends Response {
  /**
   * @param message - message to be displayed
   * @param data - the payload
   * @param res - response object
   */
  constructor(message, data) {
    super(
      STATUS_CODE_ENUM.SUCCESS,
      message,
      null,
      RESPONSE_STATUS_ENUM.TRUE
    );

    this.data = data;
  }

  /**
   * @override its overrides the send method in the superclass
   * @param res res response object from expressJs
   * @returns Json Object
   * @description sends the response
   */
  send(res) {
    return super.prepare(res, this.data);
  }
}


/**
 * @class NotFoundResponse
 * @classdesc this class should be used to return a resource not found response, its subclasses the
 * abstract @see Response class and calls its constructor using the @see STATUS_CODE_ENUM, @see RESPONSE_CODE_ENUM constants
 * and the message to be displayed.
 */
class NotFoundResponse extends Response {
  constructor(message = 'Not Found', details) {
    super(
      STATUS_CODE_ENUM.NOT_FOUND,
      message,
      details,
      RESPONSE_STATUS_ENUM.FALSE
    );
  }

  /**
   * @override this method overrides the send method in the superclass
   * @param res res response object from expressJs
   * @returns Json Object
   * @description sends the response
   */
  send(res) {
    return super.prepare(res);
  }
}

/**
 * @class BadRequestResponse
 * @classdesc this class should be used to return a bad request response, its subclasses the
 * abstract @see Response class and calls its constructor using the @see STATUS_CODE_ENUM, @see RESPONSE_CODE_ENUM constants
 * and the message to be displayed.
 */
class BadRequestResponse extends Response {
  constructor(message = 'Bad Parameters', details) {
    super(
      STATUS_CODE_ENUM.BAD_REQUEST,
      message,
      details,
      RESPONSE_STATUS_ENUM.FALSE
    );
  }
}


/**
 * @class InternalErrorResponse
 * @classdesc this class should be used to return an internal server error response, its subclasses the
 * abstract @see Response class and calls its constructor using the @see STATUS_CODE_ENUM, @see RESPONSE_CODE_ENUM constants
 * and the message to be displayed.
 */
class InternalErrorResponse extends Response {
  constructor(message = 'Internal Error', details) {
    super(
      STATUS_CODE_ENUM.INTERNAL_ERROR,
      message,
      details,
      RESPONSE_STATUS_ENUM.FALSE
    );
  }
}


module.exports = {SuccessResponse, BadRequestResponse, NotFoundResponse, InternalErrorResponse}