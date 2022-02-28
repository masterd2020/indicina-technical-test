/**
 * @enum an object that holds all possible response status code. The object.freeze method is called to prevent addition of properties
 * later in the code. This emulates the ENUM type of other languages like JAVA
 */
const STATUS_CODE_ENUM = Object.freeze({
  SUCCESS: '200',
  CREATED: '201',
  ACCEPTED: '202',
  FOUND: '302',
  NOT_MODIFIED: '304',
  TEMP_REDIRECT: '307',
  PERMANENT_REDIRECT: '308',
  BAD_REQUEST: '400',
  UNAUTHORIZED: '401',
  FORBIDDEN: '403',
  NOT_FOUND: '404',
  METHOD_NOT_ALLOWED: '405',
  INTERNAL_ERROR: '500',
});


/**
 * @enum an object that holds the response status
 */
const RESPONSE_STATUS_ENUM = Object.freeze({
  TRUE: true,
  FALSE: false,
})


/**
 * @enum an object that's holds all possible API errors. The object.freeze
 * method is called to prevent addition of properties later in the code.
 *  This emulates the ENUM type of other languages like JAVA
 */
const ERROR_TYPE_ENUM = Object.freeze({
  NOT_FOUND: 'NotFoundError',
  BAD_REQUEST: 'BadRequestError',
});


module.exports = {STATUS_CODE_ENUM, RESPONSE_STATUS_ENUM, ERROR_TYPE_ENUM}