import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk"; 
import { ThemeProvider, createTheme } from "@mui/material/styles"; 
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import reducers from "./reducers"; 
import "./main.css"

// Create Redux store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

// Create a Material-UI theme
const theme = createTheme(); 
const clientId =
 "522966842354-7qqe3d1pqi77bi64a750vp4bef458b9l.apps.googleusercontent.com";

// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
         <GoogleOAuthProvider clientId={clientId}>
          <App />
         </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
