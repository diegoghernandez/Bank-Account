import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<HelmetProvider>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</HelmetProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
