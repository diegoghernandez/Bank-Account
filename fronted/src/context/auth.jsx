import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const isJWT = localStorage.getItem("token")?.length > 1;
   const [isAuthenticated, setIsAuthenticated] = useState(isJWT);

   const login = () => {
      setIsAuthenticated(true);
   };

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
