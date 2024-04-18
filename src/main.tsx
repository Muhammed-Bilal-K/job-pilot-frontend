import React from "react";
import ReactDOM from "react-dom/client";
import App from "./page.tsx";
import "./Global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { SocketProvider } from "./context/SocketProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <Router>
          <App />
        </Router>
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);
