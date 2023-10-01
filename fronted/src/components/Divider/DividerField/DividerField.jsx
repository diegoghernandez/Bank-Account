import { useRef } from "react";
import { Modal } from "../../Modal/Modal";
import { ChevronIcon } from "../../../assets/chevron_right";

export const DividerField = ({ label, modalUtils }) => {
   const dialogRef = useRef();
   
   const showModal = () => {
      dialogRef.current?.showModal?.();
   };

   return (
      <>
         <button 
            className="w-full h-12 p-4 inline-flex flex-row items-center justify-between outline-none border-b border-outline-variant focus:bg-onSurface/12 hover:bg-onSurface/8"
            onClick={showModal}
         >
            {label}
            <ChevronIcon fillClass={"fill-onSurface"} />

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