/**
 * Valid if all values in the array are an input element and return them
 * @param {Array<any>} inputArray The array to check
 * @returns {Array<HTMLInputElement>}
 */
export const validInputElement = (inputArray) => {
   for (const element of inputArray) {
      if (!(element instanceof HTMLInputElement) || element == null) {
         return;
      }
   }

   return inputArray;
};
