import { Traduction } from "../../../constants/Traduction";
import { getTraduction } from "../../../utils/getTraduction";
import "./Bar.css";

export const Bar = () => {
   const { title } = getTraduction(Traduction.LOADER);
   return (
      <div className="w-full">
         <span 
            title={title}
            role="progressbar"
            className="inline-flex h-1.5 w-full overflow-hidden bg-onPrimary dark:bg-onPrimary-dark"
         >
            <span className="progress inline-flex w-full h-full bg-primary dark:bg-primary-dark left-right"></span>
         </span>
      </div>
   );
};