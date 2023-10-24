import { useEffect, useRef, useState } from "react";
import "./Modal.css";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { TextField } from "../TextField";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { InputTypes } from "../../constants/InputType";
import { TextFieldStyles } from "../../constants/TextFieldStyles";
import { Bar } from "../Loader/Bar";

const h2Element = (title) => <h2 className="text-2xl font-normal font-sans text-onSurface mb-4 dark:text-onSurface-dark">{title}</h2>;
const supportText = "text-sm font-sans font-normal text-onSurface-variant dark:text-onSurface-variant-dark";
const buttonStyles = "text-sm font-medium font-sans text-primary dark:text-primary-dark";

const ListModal = ({ 
   title, 
   listUtils, 
   children 
}) => {
   return (
      <div className="w-full flex flex-col justify-center items-center p-6">
         {h2Element(title)}
         <div className="w-full flex flex-col justify-between gap-2">
            {listUtils?.parameters?.map?.((parameter) => (
               <TextField 
                  key={parameter.label}
                  styles={TextFieldStyles.FILLED}
                  label={parameter.label}
                  required={false}
                  min={0}
                  max={parameter?.max}
                  inputType={parameter.inputType}
                  type={parameter.textFieldType}
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

const FormModal = ({ title, formUtils, children }) => {
   const [parameters, setParameters] = useState(formUtils?.errorParameters);

   const handleSubmit = (event) => {
      event.preventDefault();
      formUtils?.handle(event.target.elements[0].value, event.target.elements[1].value); 
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
                  type={TextFieldTypes.DEFAULT}
                  inputType={formUtils?.inputs[0]?.match("email") ? InputTypes.EMAIL : InputTypes.TEXT}
                  supportiveText={parameters?.first}
                  isError={parameters?.first}
                  isDisable={formUtils?.isLoading}
               />
               <TextField 
                  styles={TextFieldStyles.FILLED}
                  label={formUtils?.inputs[1]}
                  type={TextFieldTypes.DEFAULT}
                  inputType={InputTypes.PASSWORD}
                  supportiveText={parameters?.second}
                  isError={parameters?.second}
                  isDisable={formUtils?.isLoading}
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

export const Modal = ({
   dialogRef,
   title,
   listUtils,
   formUtils,
   messageUtils
}) => {
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
            values.push(target.value);
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
            className="w-[calc(100%-1rem)] min-w-[11rem] max-w-[24rem] shadow-md rounded-[1.75rem] bg-surface-container-high dark:bg-surface-container-high-dark"
            onClose={(formUtils?.inputs[0].match("email") && formUtils?.successMessage) ? formUtils?.closeSession : clearModal}
         >
            {listUtils && <ListModal 
               title={title}
               listUtils={listUtils}
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
                     listUtils?.setIsChange(!listUtils.isChange);
                     listUtils?.setIsClicked(false);
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
                     disabled={formUtils?.isLoading}
                     onClick={() => { 
                        closeModal();
                     }}
                  >{accept}</button>
               </>}
            </FormModal>}
            {messageUtils && <div className="w-full flex flex-col justify-center items-center p-6">
               {h2Element(title)}
               <p className={supportText}>{messageUtils?.message}</p>
               <div className="w-full inline-flex justify-center items-center gap-4 mt-6">
                  <button 
                     type="button"
                     onClick={() => { 
                        closeModal();
                     }}
                     className={buttonStyles}
                  >{cancel}</button>
                  <button 
                     type="button"
                     onClick={() => { 
                        messageUtils?.function?.();
                        messageUtils?.changeLanguage?.();
                        messageUtils?.closeSession?.();
                        closeModal();
                     }}
                     className={buttonStyles}
                  >{accept}</button>
               </div>
            </div>}
         </dialog>
      </>
   );
};
