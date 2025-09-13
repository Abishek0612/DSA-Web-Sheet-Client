import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./store/store";
import App from "./App";
import ErrorFallback from "./components/ErrorFallback";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
              }}
            />
          </ErrorBoundary>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
