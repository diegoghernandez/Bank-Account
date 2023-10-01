import { Link } from "react-router-dom";
import { Page } from "../../constants/Page";
import { getTraduction } from "../../utils/getTraduction";
import { Traduction } from "../../constants/Traduction";

const getPage = (page, svgColor) => {
   const t = getTraduction(Traduction.NAVBAR);
   
   switch (page) {
      case Page.Home:
         return {
            svg: <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                     <path fill={svgColor} d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z"/>
                  </svg>,
            label: t.home
         };
      case Page.Transactions:
         return {
            svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <g mask="url(#mask0_7_19)">
                     <path fill={svgColor} d="M6 22C5.16667 22 4.45833 21.7083 3.875 21.125C3.29167 20.5417 3 19.8333 3 19V16H6V2L7.5 3.5L9 2L10.5 3.5L12 2L13.5 3.5L15 2L16.5 3.5L18 2L19.5 3.5L21 2V19C21 19.8333 20.7083 20.5417 20.125 21.125C19.5417 21.7083 18.8333 22 18 22H6ZM18 20C18.2833 20 18.5208 19.9042 18.7125 19.7125C18.9042 19.5208 19 19.2833 19 19V5H8V16H17V19C17 19.2833 17.0958 19.5208 17.2875 19.7125C17.4792 19.9042 17.7167 20 18 20ZM9 9V7H15V9H9ZM9 12V10H15V12H9ZM17 9C16.7167 9 16.4792 8.90417 16.2875 8.7125C16.0958 8.52083 16 8.28333 16 8C16 7.71667 16.0958 7.47917 16.2875 7.2875C16.4792 7.09583 16.7167 7 17 7C17.2833 7 17.5208 7.09583 17.7125 7.2875C17.9042 7.47917 18 7.71667 18 8C18 8.28333 17.9042 8.52083 17.7125 8.7125C17.5208 8.90417 17.2833 9 17 9ZM17 12C16.7167 12 16.4792 11.9042 16.2875 11.7125C16.0958 11.5208 16 11.2833 16 11C16 10.7167 16.0958 10.4792 16.2875 10.2875C16.4792 10.0958 16.7167 10 17 10C17.2833 10 17.5208 10.0958 17.7125 10.2875C17.9042 10.4792 18 10.7167 18 11C18 11.2833 17.9042 11.5208 17.7125 11.7125C17.5208 11.9042 17.2833 12 17 12ZM6 20H15V18H5V19C5 19.2833 5.09583 19.5208 5.2875 19.7125C5.47917 19.9042 5.71667 20 6 20Z"/>
                     </g>
                  </svg>,
            label: t.transactions
         };
      case Page.Automation:
         return {
            svg: <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path fill={svgColor} d="M0 16V14H2.75L2.35 13.65C1.48333 12.8833 0.875 12.0083 0.525 11.025C0.175 10.0417 0 9.05 0 8.05C0 6.2 0.554167 4.55417 1.6625 3.1125C2.77083 1.67083 4.21667 0.716667 6 0.25V2.35C4.8 2.78333 3.83333 3.52083 3.1 4.5625C2.36667 5.60417 2 6.76667 2 8.05C2 8.8 2.14167 9.52917 2.425 10.2375C2.70833 10.9458 3.15 11.6 3.75 12.2L4 12.45V10H6V16H0ZM17.925 7H15.9C15.8167 6.41667 15.6375 5.85833 15.3625 5.325C15.0875 4.79167 14.7167 4.28333 14.25 3.8L14 3.55V6H12V0H18V2H15.25L15.65 2.35C16.3333 3.05 16.8583 3.79167 17.225 4.575C17.5917 5.35833 17.825 6.16667 17.925 7ZM14 19L13.7 17.5C13.5 17.4167 13.3125 17.3292 13.1375 17.2375C12.9625 17.1458 12.7833 17.0333 12.6 16.9L11.15 17.35L10.15 15.65L11.3 14.65C11.2667 14.4167 11.25 14.2 11.25 14C11.25 13.8 11.2667 13.5833 11.3 13.35L10.15 12.35L11.15 10.65L12.6 11.1C12.7833 10.9667 12.9625 10.8542 13.1375 10.7625C13.3125 10.6708 13.5 10.5833 13.7 10.5L14 9H16L16.3 10.5C16.5 10.5833 16.6875 10.675 16.8625 10.775C17.0375 10.875 17.2167 11 17.4 11.15L18.85 10.65L19.85 12.4L18.7 13.4C18.7333 13.6 18.75 13.8083 18.75 14.025C18.75 14.2417 18.7333 14.45 18.7 14.65L19.85 15.65L18.85 17.35L17.4 16.9C17.2167 17.0333 17.0375 17.1458 16.8625 17.2375C16.6875 17.3292 16.5 17.4167 16.3 17.5L16 19H14ZM15 16C15.55 16 16.0208 15.8042 16.4125 15.4125C16.8042 15.0208 17 14.55 17 14C17 13.45 16.8042 12.9792 16.4125 12.5875C16.0208 12.1958 15.55 12 15 12C14.45 12 13.9792 12.1958 13.5875 12.5875C13.1958 12.9792 13 13.45 13 14C13 14.55 13.1958 15.0208 13.5875 15.4125C13.9792 15.8042 14.45 16 15 16Z"/>
                  </svg>,            
            label: t.automations
         };
      case Page.Account:
         return {
            svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <g mask="url(#mask0_1_32)">
                     <path fill={svgColor} d="M10 12C8.9 12 7.95833 11.6083 7.175 10.825C6.39167 10.0417 6 9.1 6 8C6 6.9 6.39167 5.95833 7.175 5.175C7.95833 4.39167 8.9 4 10 4C11.1 4 12.0417 4.39167 12.825 5.175C13.6083 5.95833 14 6.9 14 8C14 9.1 13.6083 10.0417 12.825 10.825C12.0417 11.6083 11.1 12 10 12ZM2 20V17.2C2 16.65 2.14167 16.1333 2.425 15.65C2.70833 15.1667 3.1 14.8 3.6 14.55C4.45 14.1167 5.40833 13.75 6.475 13.45C7.54167 13.15 8.71667 13 10 13H10.35C10.45 13 10.55 13.0167 10.65 13.05C10.5167 13.35 10.4042 13.6625 10.3125 13.9875C10.2208 14.3125 10.15 14.65 10.1 15H10C8.81667 15 7.75417 15.15 6.8125 15.45C5.87083 15.75 5.1 16.05 4.5 16.35C4.35 16.4333 4.22917 16.55 4.1375 16.7C4.04583 16.85 4 17.0167 4 17.2V18H10.3C10.4 18.35 10.5333 18.6958 10.7 19.0375C10.8667 19.3792 11.05 19.7 11.25 20H2ZM16 21L15.7 19.5C15.5 19.4167 15.3125 19.3292 15.1375 19.2375C14.9625 19.1458 14.7833 19.0333 14.6 18.9L13.15 19.35L12.15 17.65L13.3 16.65C13.2667 16.4167 13.25 16.2 13.25 16C13.25 15.8 13.2667 15.5833 13.3 15.35L12.15 14.35L13.15 12.65L14.6 13.1C14.7833 12.9667 14.9625 12.8542 15.1375 12.7625C15.3125 12.6708 15.5 12.5833 15.7 12.5L16 11H18L18.3 12.5C18.5 12.5833 18.6875 12.675 18.8625 12.775C19.0375 12.875 19.2167 13 19.4 13.15L20.85 12.65L21.85 14.4L20.7 15.4C20.7333 15.6 20.75 15.8083 20.75 16.025C20.75 16.2417 20.7333 16.45 20.7 16.65L21.85 17.65L20.85 19.35L19.4 18.9C19.2167 19.0333 19.0375 19.1458 18.8625 19.2375C18.6875 19.3292 18.5 19.4167 18.3 19.5L18 21H16ZM17 18C17.55 18 18.0208 17.8042 18.4125 17.4125C18.8042 17.0208 19 16.55 19 16C19 15.45 18.8042 14.9792 18.4125 14.5875C18.0208 14.1958 17.55 14 17 14C16.45 14 15.9792 14.1958 15.5875 14.5875C15.1958 14.9792 15 15.45 15 16C15 16.55 15.1958 17.0208 15.5875 17.4125C15.9792 17.8042 16.45 18 17 18ZM10 10C10.55 10 11.0208 9.80417 11.4125 9.4125C11.8042 9.02083 12 8.55 12 8C12 7.45 11.8042 6.97917 11.4125 6.5875C11.0208 6.19583 10.55 6 10 6C9.45 6 8.97917 6.19583 8.5875 6.5875C8.19583 6.97917 8 7.45 8 8C8 8.55 8.19583 9.02083 8.5875 9.4125C8.97917 9.80417 9.45 10 10 10Z"/>
                     </g>
                  </svg>,
            label: t.account
         };
      default:
         break;
   }
};

const getActive = (isActive) => isActive 
   ? ["bg-secondary-container", "group-hover/nav:bg-onSurface/8 group-focus/nav:bg-onSurface-variant/8", "text-onSurface", "#191B2B"]
   : ["", "group-hover/nav:bg-onSurface/12 group-focus/nav:bg-onSurface-variant/12", "text-onSurface-variant", "#45454E"];

const BASE_INDICATOR_CLASSES = "flex justify-center items-center w-16 h-8 rounded-2xl";

const Nav = ({
   active = false,
   page = Page.Home,
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
   page = Page.Home,
   children
}) => {   
   return (
      <nav className="fixed flex flex-col justify-center items-center left-0 bottom-0 w-full h-20 bg-surface-container pt-3 pb-4 
         md:sticky md:h-screen md:w-fit md:justify-start md:px-3">
         <ul className="flex flex-row md:flex-col gap-2 md:gap-3 justify-center items-center">
            <li>
               <Link className="group/nav" to="/">
                  <Nav
                     active={page === Page.Home}
                     page={Page.Home}
                  />
               </Link>
            </li>
            <li>
               <Link className="group/nav" to="/transactions">
                  <Nav
                     active={page === Page.Transactions}
                     page={Page.Transactions}
                  />
               </Link>
            </li>
            <li>
               <Link className="group/nav" to="/automations">
                  <Nav
                     active={page === Page.Automation}
                     page={Page.Automation}
                  />
               </Link>
            </li>
            <li>
               <Link className="group/nav" to="/account">
                  <Nav
                     active={page === Page.Account}
                     page={Page.Account}
                  />
               </Link>
            </li>
         </ul>
         {children}
      </nav>
   );
}; 
