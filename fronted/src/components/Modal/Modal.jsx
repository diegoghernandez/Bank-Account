import { useEffect, useRef, useState } from "react";
import "./Modal.css";

const valueContainer = "bg-surface-container-highest outline-none border-b border-onSurface-variant focus:border-primary caret-primary text-onSurface text-base font-sans font-normal"

const ListModal = ({ 
   title, 
   listUtils, 
   children 
}) => {
   return (
      <div className="w-full flex flex-col justify-center items-center p-6">
         <h1 className="text-2xl font-normal font-sans text-onSurface mb-4">{title}</h1>
         <div className="w-full flex flex-row justify-between">
            {Object.entries(listUtils?.parameters)?.map((array) => (
               <div key={array[0]} className="flex flex-col justify-center items-center">
                  <label htmlFor={array[0]} className="text-lg font-medium font-sans text-onSurface mb-2">{array[0]}</label>
                  <select 
                     id={array[0]} 
                     name={array[0]}
                     className={`w-fit pl-1 ${valueContainer}`} type="text"
                  >
                     {array[1]?.map((element) => (
                        <option key={element}>{element}</option>
                     ))}
                  </select> 
               </div>
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
      if (event.target[0].value && event.target[1].value) formUtils?.handle(event.target[0].value, event.target[1].value); 
      else {
         setParameters({
            first: !event.target[0].value ? "Must not be empty" : "",
            second: !event.target[1].value ? "Must not be empty" : ""
         });
      }
   }

   useEffect(() => {
      setParameters(formUtils?.errorParameters)
   }, [formUtils?.errorParameters])

   return (
      <form 
         method="dialog"
         className="w-full flex flex-col justify-center items-center p-6"
         onSubmit={handleSubmit}
      >
         <h1 className="text-2xl font-normal font-sans text-onSurface mb-4">{title}</h1>
         {!formUtils?.successMessage && <>
            <div className="w-full flex flex-col justify-between">
                  <label htmlFor="first">{formUtils?.inputs[0]}</label>
                  <input 
                     id="first"
                     type={formUtils?.inputs[0].match("email") ? "email" : "text"}
                     className={`${valueContainer}`}
                  />
                  {parameters?.first && <p className={"ml-4 mt-1 text-sm text-error"}>{parameters?.first}</p>}
                  <label htmlFor="second">{formUtils?.inputs[1]}</label>
                  <input 
                     id="second"
                     type="text" 
                     className={`${valueContainer}`}
                  />
                  {parameters?.second && <p className={"ml-4 mt-1 text-sm text-error"}>{parameters?.second}</p>}
            </div>
            <div className="w-full inline-flex justify-end items-end gap-4 mt-6">
               {children}
            </div>
         </>}
         {formUtils?.successMessage && <>
            <p>{formUtils?.successMessage}</p>
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
   formUtils
}) => {
   const storyRef = useRef();

   const handleValues = () => {
      const values = [];
      let formattedValue;
      const selects = dialogRef?.current.getElementsByTagName("select");

      if (selects) {
         for (const target of selects) {
            if (target.value) {
               values.push(target.value);
            }
         }
   
         if (listUtils?.parameters.weeks) {
            formattedValue = Number(values[0]) * 168;
            formattedValue = formattedValue + Number(values[1]) * 24;
            formattedValue = formattedValue + Number(values[2]);
            
            formattedValue = `Each ${formattedValue} hour(s)`
         }
   
         listUtils?.setValue(formattedValue ?? values.join().replace(",", " "));
      }
   };

   const showModal = () => {
      storyRef.current.showModal();
   };

   const closeModal = () => {
      dialogRef?.current?.close();
      storyRef?.current?.close();
   };

   const clearModal = () => {
      formUtils?.setError("");
      formUtils?.setSuccessMessage("");
      const inputs = dialogRef?.current?.getElementsByTagName("input");

      for (const input of inputs) {
         input.value = "";
      }
   }
   
   return (
      <>
         {dialogRef === undefined && <button onClick={showModal}>Modal</button>}
         <dialog 
            ref={dialogRef ?? storyRef} 
            className="w-72 p-0 shadow-md rounded-[1.75rem]"
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
                  className="text-sm font-medium font-sans text-primary"
               >Cancel</button>
               <button 
                  type="button"
                  onClick={() => {
                     handleValues();
                     closeModal();
                     listUtils?.setIsChange(!listUtils.isChange);
                     listUtils?.setIsClicked(false)
                  }}
                  className="text-sm font-medium font-sans text-primary"
               >Accept</button>
            </ListModal>}
            {(!listUtils && !formUtils?.logout) && <FormModal 
               title={title}
               formUtils={formUtils}
            >
               {!formUtils?.successMessage && <>
                  <button 
                     type="button"
                     onClick={() => { 
                        closeModal();
                        listUtils?.setIsClicked();
                     }}
                     className="text-sm font-medium font-sans text-primary"
                  >Cancel</button>
                  <button 
                     type="submit"
                     className="text-sm font-medium font-sans text-primary"
                  >Accept</button>
               </>}
               {formUtils?.successMessage && <>
                  <button 
                     type="button"
                     onClick={() => { 
                        closeModal();
                     }}
                     className="text-sm font-medium font-sans text-primary"
                  >Accept</button>
               </>}
            </FormModal>}
            {formUtils?.logout && <div className="w-full flex flex-col justify-center items-center p-6">
               <h1 className="text-2xl font-normal font-sans text-onSurface mb-4">{title}</h1>
               <div className="w-full inline-flex justify-center items-center gap-4 mt-6">
                  <button 
                     type="button"
                     onClick={() => { 
                        closeModal();
                     }}
                     className="text-sm font-medium font-sans text-primary"
                  >Cancel</button>
                  <button 
                     type="button"
                     onClick={() => { 
                        formUtils?.closeSession();
                     }}
                     className="text-sm font-medium font-sans text-primary"
                  >Accept</button>
               </div>
            </div>}
         </dialog>
      </>
   );
};
