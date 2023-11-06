import { Traduction } from "../../../constants/Traduction";
import { getTraduction } from "../../../utils/getTraduction";

/**
 * Load component in circle-shaped
 * @returns 
 */
export const Spin = () => {
   const { title } = getTraduction(Traduction.LOADER);
   return (
      <div className="w-full h-12 flex justify-center items-center">
         <figure 
            title={title}
            role="progressbar"   
            className="rounded-full border-r-primary border-4 border-outline h-10 w-10 animate-spin dark:border-r-primary-dark dark:border-outline-dark"></figure>
      </div>
   );
};