import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import sceneReducer from "./reducers/sceneReducer";
// STORE
// import { createStore } from "redux";

// const { Provider } = require("react-redux");

const root = ReactDOM.createRoot(document.getElementById("root"));
// const store = createStore(sceneReducer);

root.render(
    <App />
  // <Provider store={store}>
  // </Provider>
);
