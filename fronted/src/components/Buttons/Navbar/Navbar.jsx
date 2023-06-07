/* eslint-disable react/prop-types */
import "./Navbar.css"

const getActive = (isActive) => isActive 
   ? ["bg-secondary-container", "nav--state--active", "text-onSurface"]
   : ["", "nav--state--inactive", "text-onSurface-variant"];
 
const BASE_BUTTON_CLASSES = "flex flex-col justify-center items-center cursor-pointer pt-3";

const BASE_INDICATOR_CLASSES = "flex justify-center items-center w-16 h-8 rounded-2xl";

export const Navbar = ({
   active = false,
   icon,
   label, 
   ...props 
}) => {
   const svgContainer = getActive(active)[0];
   const stateLayer = getActive(active)[1];
   const textColor = getActive(active)[2];

   return (
      <button type="button" className={BASE_BUTTON_CLASSES } {...props}>
         <div className={`${BASE_INDICATOR_CLASSES} ${svgContainer} mb-1`}>
            <div className={`${BASE_INDICATOR_CLASSES} ${stateLayer}`}>
               {icon}
            </div>
         </div>
         <p className={`text-xs font-sans font-medium ${textColor}`}>{label}</p>
      </button>
   );
}
