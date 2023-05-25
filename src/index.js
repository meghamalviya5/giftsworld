import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";

import { CategoryContext } from "./frontend/contexts/CategoryContext";
import CategoryProvider from "./frontend/contexts/CategoryContext";
import GiftProvider from "./frontend/contexts/GiftContext";
import CartProvider from "./frontend/contexts/CartContext";

// Call make Server
makeServer();

const container = document.getElementById("root");
const root = createRoot(container);

export { CategoryContext };

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <GiftProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </GiftProvider>
      </CategoryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
