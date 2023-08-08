import { useRef } from "react";
import "./Modal.css"

export const Modal = ({
   dialogRef,
   title,
   parameters,
   setValue,
   setHasText
}) => {
   const storyRef = useRef();


   const handleSubmit = (event) => {
      const values = [];
      for (const target of event.target) {
         if (target.value) {
            values.push(target.value);
         }
      }

      setValue?.(values);
   }

   const showModal = () => {
      storyRef.current.showModal();
   }

   const closeModal = () => {
      dialogRef?.current?.close();
      storyRef?.current?.close();
   }
   
   return (
      <>
         {dialogRef === undefined && <button  onClick={showModal}>Modal</button>}
         <dialog ref={dialogRef ?? storyRef} className="w-72 p-0 shadow-md rounded-[1.75rem]">
            <form 
               className="w-full flex flex-col justify-center items-center p-6"
               onSubmit={handleSubmit}
               method="dialog"
            >
               <h1 className="text-2xl font-normal font-sans text-onSurface mb-4">{title}</h1>
               <div className="w-full flex flex-row justify-between">
                  {Object.entries(parameters)?.map((array) => (
                     <div key={array[0]} className="flex flex-col justify-center items-center">
                        <label htmlFor={array[0]} className="text-lg font-medium font-sans text-onSurface mb-2">{array[0]}</label>
                        <select 
                           id={array[0]} 
                           name={array[0]}
                           className="w-fit pl-1 bg-surface-container-highest outline-none border-b border-onSurface-variant focus:border-primary caret-primary 
                           text-onSurface text-base font-sans font-normal" type="text"
                        >
                           {array[1]?.map((element) => (
                              <option key={element}>{element}</option>
                           ))}
                        </select> 
                     </div>
                  ))}
               </div>
               <div className="w-full inline-flex justify-end items-end gap-4 mt-6">
                  <button 
                     type="button"
                     onClick={closeModal}
                     className="text-sm font-medium font-sans text-primary"
                  >Cancel</button>
                  <button 
                     type="submit"
                     onClick={() => setHasText?.(true)} 
                     className="text-sm font-medium font-sans text-primary"
                  >Accept</button>
               </div>
            </form>
         </dialog>
      </>
   );
};
