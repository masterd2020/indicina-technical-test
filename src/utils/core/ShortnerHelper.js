const ShortnerAlgorithm = require('./ShortnerAlgorithm')

/**
 * In memory db
 */
let db = []

/**
 * @class ShortnerHelper
 * @classdesc This class holds all the helpers method
 */

class ShortnerHelper {
  /**
   * @description This method save a new entry to the in memory db
   * @param {Number} ID 
   * @param {String} url 
   * @return
   */
  static saveToDB(ID, url) {
    db = [...db, {id: ID, longURL: url, createdAt: new Date()}]
  }
  
  /**
   * @description This method check to see if there is any duplicate entry of the url in the in memory db
   * @param {Number} ID 
   * @param {String} url 
   * @returns 
   */
  static isURLExist(ID, url) {
    const urlExist = db.find((data) => data.longURL === url);

    if(urlExist) {
      const encode = new ShortnerAlgorithm().encodeToBase64(urlExist.id)
      return encode;
    } else {
      const encode = new ShortnerAlgorithm().encodeToBase64(ID)
      this.saveToDB(ID, url)
      return encode;
    }
  } 
}

module.exports = ShortnerHelper;