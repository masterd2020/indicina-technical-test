const ShortnerAlgorithm = require('./ShortnerAlgorithm')

/**
 * In memory db
 */
let db = {
  stats: [],
  urls: [],
}

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
    db.urls = [...db.urls, {id: ID, longURL: url, hits: 1, createdAt: new Date()}]
  }

  /**
   * @description This static method increment the hits of the url provided
   * @param {String} url 
   */
  static incrementURLHits(url) {
    const urlExist = db.urls.find((data) => data.longURL === url);

    db.urls = [...db.urls, {...urlExist, hits: urlExist.hits++}]
  }
  
  /**
   * @description This method check to see if there is any duplicate entry of the url in the in memory db
   * based on that certain operations are carried out
   * @param {Number} ID 
   * @param {String} url 
   * @returns 
   */
  static isURLExist(ID, url) {
    const urlExist = db.urls.find((data) => data.longURL === url);

    if(urlExist) {
      const encode = new ShortnerAlgorithm().encodeToBase64(urlExist.id)
      this.incrementURLHits(ID, url)
      
      return encode;
    } else {
      const encode = new ShortnerAlgorithm().encodeToBase64(ID)
      this.saveToDB(ID, url)
      return encode;
    }
  } 

  /**
   * @description This static method decode the id given and return the original url
   * @param {String} id 
   * @returns {String}s
   */
  static retrieveOriginalURL(id) {
    const decode = new ShortnerAlgorithm().decodeToBase10(id)
    const urlExist = db.urls.find((data) => data.id === decode);
    
    return  urlExist ? urlExist.longURL : null;
  }
  
  /**
   *  @description This statistic method return the hits for a particular urlPath pass to the method
   * @param {String} urlPath 
   * @returns {String}
   */
  static statistic(urlPath) {
    const decode = new ShortnerAlgorithm().decodeToBase10(urlPath)
    const urlExist = db.urls.find((data) => data.id === decode);
    
    return  urlExist ? urlExist.hits : null;
  }
}

module.exports = ShortnerHelper;