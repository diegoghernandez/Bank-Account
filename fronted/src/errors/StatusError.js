export class StatusError extends Error {
   constructor (message, status) {
      super(message);
      this.name = "Status error";
      this.status = status;
   }
}