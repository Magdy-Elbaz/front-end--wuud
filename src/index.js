import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./Pages/Auth/AuthOperations/Auth.css";
import "./Css/alerts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-image-gallery/styles/image-gallery.css";
import MenueProvider from "./Context/MenueContext";
import WindowProvider from "./Context/WindowContext";
import CartProvider from "./Context/CartShopContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenueProvider>
        <WindowProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </WindowProvider>
      </MenueProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
