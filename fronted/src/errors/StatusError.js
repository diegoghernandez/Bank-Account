/**
 * @class To be used when you are representing a fetch error
 * @extends {Error}
 */
export class StatusError extends Error {
   /**
    * @constructor
    * @param {string} message The message to describe the error
    * @param {number} status The fetch status
    */
   constructor (message, status) {
      super(message);
      this.name = "Status error";
      this.status = status;
   }
}