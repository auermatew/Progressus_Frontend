import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundary from "./utilities/ErrorBoundary.jsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <ErrorBoundary fallback="Valaminemjogec...">
                <App />
            </ErrorBoundary>
        </AuthProvider>
    </StrictMode>
);
