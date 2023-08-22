import { Link } from "react-router-dom";
import { Page } from "../../constants/Page";
import { Nav } from "../Buttons/Nav/Nav"

export const Navbar = ({ 
   page = Page.Home,
}) => {   
   return (
      <nav className="fixed flex justify-center items-center left-0 bottom-0 w-full h-20 bg-surface-container pt-3 pb-4">
         <ul className="flex flex-row gap-2 justify-center items-center">
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
      </nav>
   );
}; 
