/* eslint-disable react/prop-types */
import { Page } from "../../constants/Page";
import { Nav } from "../Buttons/Nav/Nav"

export const Navbar = ({ active = false}) => {   
   return (
      <nav className="fixed flex justify-center items-center left-0 bottom-0 w-full h-20 bg-surface-container pt-3 pb-4">
         <ul className="flex flex-row gap-2 justify-center items-center">
            <li>
               <Nav
                  active={active}
                  page={Page.Home}
               />
            </li>
            <li>
               <Nav
                  active={active}
                  page={Page.Transactions}
               />
            </li>
            <li>
               <Nav
                  active={active}
                  page={Page.Automation}
               />
            </li>
            <li>
               <Nav
                  active={active}
                  page={Page.Account}
               />
            </li>
         </ul>
      </nav>
   );
}; 
