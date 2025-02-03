import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundary from "./utilities/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary fallback="Valaminemjogec...">
            <App />
        </ErrorBoundary>
    </StrictMode>
);
