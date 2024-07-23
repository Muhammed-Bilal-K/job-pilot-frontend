import React from "react";
import ReactDOM from "react-dom/client";
import App from "./page.tsx";
import "./Global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { SocketProvider } from "./context/SocketProvider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Provider store={store}>
        <SocketProvider>
          <Router>
            <App />
          </Router>
        </SocketProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
