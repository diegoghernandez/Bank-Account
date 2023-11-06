import { createContext, useState } from "react";

/** @type {import("react").Context} */
export const AuthContext = createContext({});

/**
 * Provider in charge of verify if the user have the jwt token
 * @param {object} props 
 * @param {import("react").ReactElement} props.children 
 * @returns
 */
export const AuthProvider = ({ children }) => {
   /** @type {boolean} */
   const isJWT = localStorage.getItem("token")?.length > 1;
   /** @type {[boolean, import("react").Dispatch<import("react").SetStateAction<boolean>>]} */
   const [isAuthenticated, setIsAuthenticated] = useState(isJWT);

   /** @type {() => void} */
   const login = () => {
      setIsAuthenticated(true);
   };

   /** @type {() => void} */
   const logout = () => {
      setIsAuthenticated(false);
   };

   return (
      <AuthContext.Provider value={{
         isAuthenticated,
         login,
         logout
      }}>
         {children}
      </AuthContext.Provider>
   );
};
