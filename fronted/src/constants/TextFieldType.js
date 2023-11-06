/**
 * Enum to indicate which type will be the TextField component
 * @enum {Object}
 * @readonly
 */
export const TextFieldTypes = Object.freeze({
   DEFAULT: Symbol("default"),
   PASSWORD: Symbol("password"),
   SEARCH: Symbol("search"),
   MENU: Symbol("menu"),
   MODAL: Symbol("modal"),
});