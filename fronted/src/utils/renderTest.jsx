import { render } from "@testing-library/react";
import { AuthProvider } from "../hooks/useAuth";
import { BrowserRouter } from "react-router-dom";

export const customRender = (ui) => {
   return render(<AuthProvider>{ui}</AuthProvider>, {wrapper: BrowserRouter})
};