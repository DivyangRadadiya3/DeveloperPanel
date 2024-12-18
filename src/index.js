import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./Context/Store/Store";
import { AuthProvider } from "./Context/AuthContext/AuthProvider";

Store.subscribe(() => console.log(Store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));
const Root = () => {
  const value = useMemo(() => {
    return Store;
  }, []);

  return (
    <Provider store={value}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
