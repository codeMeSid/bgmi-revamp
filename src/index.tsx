import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { theme } from "./utils/styles/theme";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./utils/redux";

import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Provider store={store}>
            <App />
          </Provider>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
