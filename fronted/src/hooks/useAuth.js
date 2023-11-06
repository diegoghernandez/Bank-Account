import { useContext } from "react";
import { AuthContext } from "../context/auth";

/**
 * Return the Auth context with the values of provider
 * @returns {{ isAuthenticated: boolean, login: () => void, logout: () => void }}
 */
export const useAuth = () => {
   return useContext(AuthContext);
};