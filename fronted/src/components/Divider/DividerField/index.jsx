import { useRef } from "react";
import { Modal } from "../../Modal";
import { ChevronIcon } from "../../../assets/chevron_right";

/**
 * A component when you make a click, show a modal
 * @param {object} props
 * @param {string} props.label The text to be displayed by the component
 * @param {{formUtils?: import("../../Modal").FormUtils, messageUtils?: import("../../Modal").MessageUtils}} props.modalUtils 
 * The object with the necessary values to show the modal
 * @returns 
 */
export const DividerField = ({ label, modalUtils }) => {
   /** @type {import("react").MutableRefObject<HTMLDialogElement>} */
   const dialogRef = useRef();
   
   const showModal = () => {
      dialogRef.current?.showModal?.();
   };

   return (
      <>
         <button 
            className="w-full h-12 p-4 inline-flex flex-row items-center justify-between outline-none border-b text-onSurface border-outline-variant focus:bg-onSurface/12 hover:bg-onSurface/8
               dark:text-onSurface-dark dark:border-outline-variant-dark dark:focus:bg-onSurface-dark/12 dark:hover:bg-onSurface-dark/8"
            onClick={showModal}
         >
            {label}
            <ChevronIcon fillClass={"fill-onSurface dark:fill-onSurface-dark"} />

         </button>
         {modalUtils && <Modal 
            dialogRef={dialogRef}
            title={label}
            formUtils={modalUtils.formUtils}
            messageUtils={modalUtils.messageUtils}
         />}
      </>
   );
};