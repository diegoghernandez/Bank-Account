import { Link } from "react-router-dom";
import { Page } from "../../constants/Page";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { AccountIcon } from "../../assets/account";
import { AutomationIcon } from "../../assets/automation";
import { TransactionsIcon } from "../../assets/transactions";
import { HomeIcon } from "../../assets/home";

/**
 * Return an object with the desire icon and label of the page
 * @param {Page} page The page to represent
 * @param {string} svgColor The class with the tailwind color
 * @returns {{ svg: import("react").JSX.Element, label: string}}
 */
const getPage = (page, svgColor) => {
   const t = getTraduction(Traduction.NAVBAR);
   
   switch (page) {
      case Page.HOME:
         return {
            svg: <HomeIcon fillClass={svgColor} />,
            label: t.home
         };
      case Page.TRANSACTIONS:
         return {
            svg: <TransactionsIcon fillClass={svgColor} />,
            label: t.transactions
         };
      case Page.AUTOMATIONS:
         return {
            svg: <AutomationIcon fillClass={svgColor} />,           
            label: t.automations
         };
      case Page.ACCOUNT:
         return {
            svg: <AccountIcon fillClass={svgColor} />,
            label: t.account
         };
      default:
         break;
   }
};

/**
 * Return an array with tailwind classes for the following elements: 
 * svg-container, state-layer, text-color, and svg-color, depending in the isActive value
 * @param {boolean} isActive The value to represent which classes get for the elements
 * @returns 
 */
const getActive = (isActive) => isActive 
   ? ["bg-secondary-container dark:bg-secondary-container-dark", "group-hover/nav:bg-onSurface/8 group-focus/nav:bg-onSurface-variant/8 " +
      "dark:group-hover/nav:bg-onSurface-dark/8 dark:group-focus/nav:bg-onSurface-variant-dark/8 ", 
      "text-onSurface dark:text-onSurface-dark", "fill-onSecondary-container dark:fill-onSecondary-container-dark"]
      
   : ["", "group-hover/nav:bg-onSurface/12 group-focus/nav:bg-onSurface-variant/12 dark:group-hover/nav:bg-onSurface-dark/12 dark:group-focus/nav:bg-onSurface-variant-dark/12", 
      "text-onSurface-variant dark:text-onSurface-variant-dark", "fill-onSurface-variant dark:fill-onSurface-variant-dark"];

/** @type {string} */
const BASE_INDICATOR_CLASSES = "flex justify-center items-center w-16 h-8 rounded-2xl md:w-14";

/**
 * Component to represent the navbar pages
 * @param {object} props
 * @param {boolean} [props.active=false] The value to represent if the element is active
 * @param {Page} [props.page=Page.HOME] The value to represent the page to use
 * @returns 
 */
const Nav = ({
   active = false,
   page = Page.HOME,
}) => {
   const svgContainer = getActive(active)[0];
   const stateLayer = getActive(active)[1];
   const textColor = getActive(active)[2];
   const svgColor = getActive(active)[3];

   const pageElements = getPage(page, svgColor);

   return (
      <div className={"flex flex-col justify-center items-center cursor-pointer pt-3 md:pt-0"}>
         <div className={`${BASE_INDICATOR_CLASSES} ${svgContainer} mb-1`}>
            <div className={`transition ${BASE_INDICATOR_CLASSES} ${stateLayer}`}>
               {pageElements.svg}
            </div>
         </div>
         <span className={`text-xs font-sans font-medium ${textColor} w-16  md:w-14 text-center`}>{pageElements.label}</span>
      </div>
   );
};

/**
 * Component to be used as the navbar for the four principal pages (Home, Transactions, Automations, Account)
 * @param {object} props
 * @param {Page} [props.page=Page.HOME] The value to represent what page is active
 * @param {any} [props.children] If some value is needed inside of the navbar
 * @returns 
 */
export const Navbar = ({ 
   page = Page.HOME,
   children
}) => {   
   return (
      <nav className="fixed flex flex-col justify-center items-center left-0 bottom-0 w-full h-20 bg-surface-container md:bg-surface
         md:sticky md:h-screen md:w-20 md:justify-start md:gap-5 md:px-3 md:pt-11 md:border-r md:border-outline-variant
         dark:bg-surface-container-dark md:dark:bg-surface-dark md:dark:border-outline-variant-dark">
         {children}
         <ul className="flex flex-row h-full w-full gap-2 justify-center items-start md:flex-col md:gap-3 md:h-fit">
            <li>
               <Link className="group/nav outline-none" to="/">
                  <Nav
                     active={page === Page.HOME}
                     page={Page.HOME}
                  />
               </Link>
            </li>
            <li>
               <Link className="group/nav outline-none" to="/transactions">
                  <Nav
                     active={page === Page.TRANSACTIONS}
                     page={Page.TRANSACTIONS}
                  />
               </Link>
            </li>
            <li>
               <Link className="group/nav outline-none" to="/automations">
                  <Nav
                     active={page === Page.AUTOMATIONS}
                     page={Page.AUTOMATIONS}
                  />
               </Link>
            </li>
            <li>
               <Link className="group/nav outline-none" to="/account">
                  <Nav
                     active={page === Page.ACCOUNT}
                     page={Page.ACCOUNT}
                  />
               </Link>
            </li>
         </ul>
      </nav>
   );
}; 
