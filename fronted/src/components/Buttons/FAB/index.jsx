import { AddIcon } from "../../../assets/add";

const BASE_BUTTON_CLASSES = "flex flex-row justify-center items-center cursor-pointer w-fit h-14 rounded-2xl shadow md:shadow-none md:hover:shadow";

export const Fab = ({ label }) => {
   return (
      <div type="div" className={`fixed bottom-24 right-4 md:static md:mt-3  ${BASE_BUTTON_CLASSES} bg-primary-container`}>
         <div className={`${BASE_BUTTON_CLASSES} gap-2 px-3 group-hover/fab:bg-onPrimary-container/8 group-focus/fab:bg-onPrimary-container/12`}>
            <AddIcon fillClass={"fill-onPrimary-container"} />
            <span className="text-onPrimary-container text-sm font-sans font-medium">{label}</span>
         </div>
      </div>
   );
};