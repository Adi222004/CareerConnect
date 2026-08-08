import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { Toaster } from "./components/ui/sonner";

import { Provider } from "react-redux";
import store from "./redux/store";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);