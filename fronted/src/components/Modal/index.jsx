import { useEffect, useRef, useState } from "react";
import { InputTypes } from "../../constants/InputType";
import { TextFieldStyles } from "../../constants/TextFieldStyles";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { Traduction } from "../../constants/Traduction";
import { getTraduction } from "../../utils/getTraduction";
import { validInputElement } from "../../utils/validInputElement";
import { Bar } from "../Loader/Bar";
import { TextField } from "../TextField";
import "./Modal.css";

/**
 * The h2 title to use in the modal
 * @param {string} title The text to be used as title
 * @returns
 */
const h2Element = (title) => <h2 className="text-2xl font-normal font-sans text-onSurface mb-4 dark:text-onSurface-dark">{title}</h2>;
/** @type {string} */
const supportText = "text-sm font-sans font-normal text-center whitespace-pre-line text-onSurface-variant dark:text-onSurface-variant-dark";
/** @type {string} */
const buttonStyles = "text-sm font-medium font-sans text-primary dark:text-primary-dark";

/**
 * @typedef {object} ListParameter
 * @param {string} label
 * @param {string} [initialInputType]
 * @param {TextFieldTypes} textFieldType
 * @param {string} [value]
 * @param {string} [support]
 * @param {string} [error]
 * @param {boolean} [isDisable]
 * @param {() => void} [functionToUpdate]
 * @param {Array<String>} [menuParameters]
 * @param {number} [max]
 */

/**
 * The list modal for the dialog
 * @param {object} props
 * @param {string} props.title The title of the list
 * @param {Array<ListParameter>} props.parameters The parameters to create the inputs
 * @param {any} props.children The buttons to accept the values or cancel
 * @returns 
 */
const ListModal = ({ 
   title, 
   parameters, 
   children 
}) => {
   return (
      <div className="w-full flex flex-col justify-center items-center p-6">
         {h2Element(title)}
         <div className="w-full flex flex-col justify-between gap-2">
            {parameters?.map?.((parameter) => (
               <TextField 
                  key={parameter.label}
                  styles={TextFieldStyles.FILLED}
                  label={parameter.label}
                  type={parameter.textFieldType}
                  initialInputType={parameter?.initialInputType}
                  required={false}
                  initialValue={parameter?.value}
                  min={0}
                  max={parameter?.max}
                  supportiveText={parameter?.support ?? parameter?.error}
                  isError={parameter?.error}
                  isDisable={parameter?.isDisable}
                  functionToUpdate={parameter?.functionToUpdate}
                  menuParameters={(parameter.textFieldType === TextFieldTypes.MENU) ? parameter?.menuParameters: ""}
                  menuClasses="w-[calc(100%-3rem)] h-28 overflow-y-scroll"
               />
            ))}
         </div>
         <div className="w-full inline-flex justify-end items-end gap-4 mt-6">
            {children}
         </div>
      </div>
   );
};

/**
 * The form modal for the dialog
 * @param {object} props
 * @param {string} props.title The title of the form
 * @param {FormUtils} props.formUtils The title of the form
 * @param {any} props.children The buttons to accept the values or cancel
 * @returns 
 */
const FormModal = ({ title, formUtils, children }) => {
   const [parameters, setParameters] = useState(formUtils?.errorParameters);

   /** @param {import("react").FormEvent<HTMLFormElement>} event */
   const handleSubmit = (event) => {
      event.preventDefault();

      const { elements } = event.currentTarget;
      const inputArray = validInputElement([elements[0], elements[1]]);
      formUtils?.handle(inputArray[0].value, inputArray[1].value); 
   };

   useEffect(() => {
      setParameters(formUtils?.errorParameters);
   }, [formUtils?.errorParameters]);

   return (
      <form 
         method="dialog"
         className="w-full flex flex-col justify-center items-center p-6"
         onSubmit={handleSubmit}
      >
         {h2Element(title)}
         {!formUtils?.successMessage && <>
            <div className="w-full flex flex-col justify-between gap-3">
               <TextField 
                  styles={TextFieldStyles.FILLED}
                  label={formUtils?.inputs[0]}
                  type={formUtils?.types?.[0]}
                  initialInputType={formUtils?.inputs[0]?.match("email") ? InputTypes.EMAIL : InputTypes.TEXT}
                  supportiveText={parameters?.first}
                  isError={Boolean(parameters?.first)}
                  isDisable={formUtils?.isLoading}
               />
               <TextField 
                  styles={TextFieldStyles.FILLED}
                  label={formUtils?.inputs[1]}
                  type={formUtils?.types?.[1]}
                  supportiveText={parameters?.second}
                  isError={Boolean(parameters?.second)}
                  isDisable={formUtils?.isLoading}
                  autoComplete="current-password"
               />
               {formUtils?.isLoading && <Bar />}
            </div>
            <div className="w-full inline-flex justify-end items-end gap-4 mt-6">
               {children}
            </div>
         </>}
         {formUtils?.successMessage && <>
            <p className={supportText}>{formUtils?.successMessage}</p>
            <div className="w-full inline-flex justify-end items-end gap-4 mt-6">
                  {children}
            </div>
         </>}
      </form>
   );
};

/**
 * @typedef {object} ListUtils
 * @property {Array<ListParameter>} parameters The values to create the list
 * @property {import("react").Dispatch<import("react").SetStateAction<object>>} [setIsClicked] 
 * The value to set the click of TextField component
 * @property {import("react").Dispatch<import("react").SetStateAction<object>>} [setValue] 
 * The value to set the value of TextField component
 * @property {import("react").Dispatch<import("react").SetStateAction<object>>} [functionToUpdate] 
 * The value to execute a function to update something in TextField component
 */

/**
 * @typedef {object} FormUtils
 * @property {Array<string>} inputs The name of the two input to be used
 * @property {Array<TextFieldTypes>} types The type of the two input to be used
 * @property {string} successMessage The message to show that all inputs will remove
 * @property {{ first: string, second: string }} errorParameters The object with the errors to be show for the inputs
 * @property {boolean} isLoading The value to change the form state to load
 * @property {(firstParameter: any, secondParameter: any) => void} handle The function to handle the form values
 * @property {import("react").Dispatch<import("react").SetStateAction<object>>} setError 
 * The value to set the error of TextField component
 * @property {import("react").Dispatch<import("react").SetStateAction<object>>} setSuccessMessage
 * The value to set the value of Account component
 * @property {() => void} [closeSession] The value to execute a function
 */

/**
 * @typedef {object} MessageUtils
 * @property {string} message The message to show
 * @property {boolean} [cancel] If the button is necessary to show
 * @property {boolean} [accept] If the button is necessary to show
 * @property {() => void} [function] The function to be executed

/**
 * The modal component with the capability to take three forms: list, form and message
 * @param {object} props
 * @param {import("react").MutableRefObject<HTMLDialogElement>} props.dialogRef
 * @param {string} [props.title] The modal title
 * @param {ListUtils} [props.listUtils] The object with the necessary values to show the list modal
 * @param {FormUtils} [props.formUtils] The object with the necessary values to show the form modal
 * @param {MessageUtils} [props.messageUtils] The object with the necessary values to show the message modal
 * @returns 
 */
export const Modal = ({
   dialogRef,
   title,
   listUtils,
   formUtils,
   messageUtils
}) => {
   /** @type {import("react").MutableRefObject<HTMLDialogElement>} */
   const storyRef = useRef();
   const { formatText, cancel, accept } = getTraduction(Traduction.MODAL);
   const { modalParameters } = getTraduction(Traduction.AUTOMATION_PAGE);

   const handleValues = () => {
      const values = [];
      let formattedValue;
      const reference = dialogRef ?? storyRef;
      const inputs = reference?.current.getElementsByTagName("input");

      if (inputs) {
         for (const target of inputs) {
            if (!target.disabled && target.ariaInvalid !== "true") {
               values.push(target.value);
            }
         }
   
         if (listUtils?.parameters[0]?.label == modalParameters[0]) {
            formattedValue = Number(values[0]) * 168;
            formattedValue = formattedValue + Number(values[1]) * 24;
            formattedValue = formattedValue + Number(values[2]);
            
            formattedValue = `${formatText[0]} ${formattedValue} ${formatText[1]}`;
         }
   
         listUtils?.setValue(formattedValue ?? values.join().replaceAll(",", " "));
      }
   };

   const showModal = () => {
      storyRef?.current?.showModal?.();
   };

   const closeModal = () => {
      dialogRef?.current?.close?.();
      storyRef?.current?.close?.();
   };

   const clearModal = () => {
      formUtils?.setError("");
      formUtils?.setSuccessMessage("");
      const inputs = dialogRef?.current?.getElementsByTagName("input");

      for (const input of inputs) {
         input.value = "";
      }
   };
   
   return (
      <>
         {dialogRef === undefined && <button onClick={showModal}>Modal</button>}
         <dialog 
            ref={dialogRef ?? storyRef} 
            className="w-[calc(100%-1rem)] min-w-[11rem] max-w-[24rem] shadow-md rounded-[1.75rem] bg-white dark:bg-surface-container-high-dark"
            onClose={(formUtils?.inputs[0].match("email") && formUtils?.successMessage) ? formUtils?.closeSession : clearModal}
         >
            {listUtils && <ListModal 
               title={title}
               parameters={listUtils?.parameters}
            >
               <button 
                  type="button"
                  onClick={() => { 
                     closeModal();
                     listUtils.setIsClicked?.();
                  }}
                  className={buttonStyles}
               >{cancel}</button>
               <button 
                  type="button"
                  onClick={() => {
                     handleValues();
                     closeModal();
                     listUtils?.setIsClicked(false);
                     listUtils?.functionToUpdate?.();
                  }}
                  className={buttonStyles}
               >{accept}</button>
            </ListModal>}
            {formUtils && <FormModal 
               title={title}
               formUtils={formUtils}
            >
               {!formUtils?.successMessage && <>
                  <button 
                     type="button"
                     className={buttonStyles}
                     disabled={formUtils?.isLoading}
                     onClick={() => { 
                        closeModal();
                        listUtils?.setIsClicked();
                     }}
                  >{cancel}</button>
                  <button 
                     type="submit"
                     className={buttonStyles}
                     disabled={formUtils?.isLoading}
                  >{accept}</button>
               </>}
               {formUtils?.successMessage && <>
                  <button 
                     type="button"
                     className={buttonStyles}
                     onClick={() => { 
                        closeModal();
                     }}
                  >{accept}</button>
               </>}
            </FormModal>}
            {messageUtils && <div className="w-full flex flex-col justify-center items-center p-6">
               {h2Element(title)}
               <p className={`${supportText} whitespace-pre-line text-center`}>{messageUtils?.message}</p>
               <div className="w-full inline-flex justify-end items-center gap-4 mt-6">
                  {messageUtils.cancel &&
                     <button 
                        type="button"
                        onClick={() => { 
                           closeModal();
                        }}
                        className={buttonStyles}
                     >{cancel}</button>
                  }
                  {messageUtils.accept &&
                     <button 
                        type="button"
                        onClick={() => { 
                           messageUtils?.function?.();
                           closeModal();
                        }}
                        className={buttonStyles}
                     >{accept}</button>
                  }
               </div>
            </div>}
         </dialog>
      </>
   );
};
