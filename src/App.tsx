// Code: Main App Component
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/ui/Loading";
import ErrorBoundary from "./utilities/ErrorBoundary";
const LandingPage = lazy(() => import("./pages/Landingp/LandingPage"));
const HomePage = lazy(() => import("./pages/Homep/HomePage"));
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const RegisterPage = lazy(() => import("./pages/Registration/RegisterPage"));

const App = () => {
    return (
        <>
            {/* <Loading /> */}
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ErrorBoundary fallback="Error">
                                <Suspense fallback={<Loading />}>
                                    <LandingPage />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />

                    <Route
                        path="/home"
                        element={
                            <ErrorBoundary fallback="Error">
                                <Suspense fallback={<Loading />}>
                                    <HomePage />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <ErrorBoundary fallback="Error">
                                <Suspense fallback={<Loading />}>
                                    <LoginPage />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <ErrorBoundary fallback="Error">
                                <Suspense fallback={<Loading />}>
                                    <RegisterPage />
                                </Suspense>
                            </ErrorBoundary>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
