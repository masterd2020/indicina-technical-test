
/**
 * @class Shortner Service
 * @classdesc This class is responsible for the business logic for URL shortners
 */
class Shortner {
  /**
   * @description A static method to handle encoding of URL
   * @param {Object} req - Express HTTP request object
   * @returns string
   */
  static encode(req) {
    return 'Encode'
  }

  /**
   * @description A static method to handle decoding of URL
   * @param {Object} req - Express HTTP request object
   * @returns string
   */
  static decode(req) {
    return 'Decode'
  }

  /**
   * @description A static method to handle getting stattistic of a URL path
   * @param {Object} req - Express HTTP request object
   * @returns string
   */
  static statistic(req) {
    return 'Statistics'
  }

}

module.exports = Shortner;