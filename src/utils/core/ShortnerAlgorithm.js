/**
 * @class ShortnerAlgorithm
 * @classdesc This class is responsible for putting together of encoding and decoding of the URL's
 */
class ShortnerAlgorithm {
  /**
   * We leverage a bijective function so as to satisfy the uniqueness requirement i.e (one long url is map to exactly one key. 1-1 mapping)
   * 
   */
  constructor() {
    this.letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    this.base = this.letters.length;
  }
  
  /**
   * @param {number} id 
   * @description This method encode the @params id, pass into the method
   * @returns {string} an encoded string in base 64,
   */
  encodeToBase64(id) {
    let encoded = '';
    while (id){
      let remainder = id % this.base;
      id = Math.floor(id / this.base);
      encoded = this.letters[remainder].toString() + encoded;
    }
    return encoded;
  }

  /**
   * 
   * @param {string} shortenURLPath 
   * @description This method decode the @params shortenURLPath pass into this method
   * @returns {number} A unique id for each URL we stored in the db array
   */
  decodeToBase10(shortenURLPath)  {
    let decoded = 0;
    while (shortenURLPath){
      let index = this.letters.indexOf(shortenURLPath[0]);
      let power = shortenURLPath.length - 1;
      decoded += index * (Math.pow(this.base, power));
      shortenURLPath = shortenURLPath.substring(1);
    }
    return decoded;
  }
}

  module.exports = ShortnerAlgorithm;