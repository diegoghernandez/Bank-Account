import { Link } from "react-router-dom";
import { Page } from "../../constants/Page";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";
import { AccountIcon } from "../../assets/account";
import { AutomationIcon } from "../../assets/automation";
import { TransactionsIcon } from "../../assets/transactions";
import { HomeIcon } from "../../assets/home";

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

const getActive = (isActive) => isActive 
   ? ["bg-secondary-container", "group-hover/nav:bg-onSurface/8 group-focus/nav:bg-onSurface-variant/8", "text-onSurface", "fill-onSecondary-container"]
   : ["", "group-hover/nav:bg-onSurface/12 group-focus/nav:bg-onSurface-variant/12", "text-onSurface-variant", "fill-onSurface-variant"];

const BASE_INDICATOR_CLASSES = "flex justify-center items-center w-16 h-8 rounded-2xl";

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
      <div className={"flex flex-col justify-center items-center cursor-pointer pt-3"}>
         <div className={`${BASE_INDICATOR_CLASSES} ${svgContainer} mb-1`}>
            <div className={`${BASE_INDICATOR_CLASSES} ${stateLayer}`}>
               {pageElements.svg}
            </div>
         </div>
         <span className={`text-xs font-sans font-medium ${textColor}`}>{pageElements.label}</span>
      </div>
   );
};

export const Navbar = ({ 
   page = Page.HOME,
   children
}) => {   
   return (
      <nav className="fixed flex flex-col justify-center items-center left-0 bottom-0 w-full h-20 bg-surface-container pt-3 pb-4 
         md:sticky md:h-screen md:w-fit md:justify-start md:px-3">
         <ul className="flex flex-row md:flex-col gap-2 md:gap-3 justify-center items-center">
            <li>
               <Link className="group/nav" to="/">
                  <Nav
                     active={page === Page.HOME}
                     page={Page.HOME}
                  />
               </Link>
            </li>
            <li>
               <Link className="group/nav" to="/transactions">
                  <Nav
                     active={page === Page.TRANSACTIONS}
                     page={Page.TRANSACTIONS}
                  />
               </Link>
            </li>
            <li>
               <Link className="group/nav" to="/automations">
                  <Nav
                     active={page === Page.AUTOMATIONS}
                     page={Page.AUTOMATIONS}
                  />
               </Link>
            </li>
            <li>
               <Link className="group/nav" to="/account">
                  <Nav
                     active={page === Page.ACCOUNT}
                     page={Page.ACCOUNT}
                  />
               </Link>
            </li>
         </ul>
         {children}
      </nav>
   );
}; 
