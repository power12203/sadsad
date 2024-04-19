import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./modules";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { set_user, check } from "./modules/user";
import { createLogger } from "redux-logger";

const logger = createLogger();

const store = legacy_createStore(rootReducer, applyMiddleware(thunk, logger));
function localUser() {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;
    store.dispatch(set_user(JSON.parse(user)));
    store.dispatch(check());
  } catch (e) {
    console.log(e);
  }
}
localUser();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
