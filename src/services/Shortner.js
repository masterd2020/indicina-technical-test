let {ID} = require('../CONSTANTS/shortner')
const ShortnerAlgorithm = require('../utils/core/ShortnerAlgorithm');
const ShortnerHelper = require('../utils/core/ShortnerHelper');

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
    const {url} = req.body;
    
    const encode = ShortnerHelper.isURLExist(ID, url);
    
    // Increment the global ID
    ID++

    return `${req.get('host')}/${encode}`
  }
  
  /**
   * @description A static method to handle decoding of URL
   * @param {Object} req - Express HTTP request object
   * @returns string
   */
  static decode(req) {
    const {id} = req.body;

    const originalURL = ShortnerHelper.retrieveOriginalURL(id);
    
    return originalURL
  }

  /**
   * @description A static method to handle getting stattistic of a URL path
   * @param {Object} req - Express HTTP request object
   * @returns string
   */
  static statistic(req) {
    const {url_path} = req.params;

    const hits = ShortnerHelper.statistic(url_path);

    return {url_path, hits};
  }

}

module.exports = Shortner;