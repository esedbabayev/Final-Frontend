import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// BrowserRouter
import { BrowserRouter } from "react-router-dom";

// Provider
import { Provider } from "react-redux";

// Store
import store from "./store/store.js"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
