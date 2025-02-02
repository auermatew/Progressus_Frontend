// Code: Main App Component
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/ui/Loading";
const LandingPage = lazy(() => import("./pages/Landingp/LandingPage"));
const HomePage = lazy(() => import("./pages/Homep/HomePage"));
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const RegisterPage = lazy(() => import("./pages/Registration/RegisterPage"));

const App = () => {
    return (
        <>
            {/* <Loading /> */}
            <Router>
                <Routes>
                    <Route
                        path="/progressus"
                        element={
                            <Suspense fallback={<Loading />}>
                                <LandingPage />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/progressus/home"
                        element={
                            <Suspense fallback={<Loading />}>
                                <HomePage />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/progressus/login"
                        element={
                            <Suspense fallback={<Loading />}>
                                <LoginPage />
                            </Suspense>
                        }
                    />

                    <Route
                        path="/progressus/register"
                        element={
                            <Suspense fallback={<Loading />}>
                                <RegisterPage />
                            </Suspense>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
};

export default App;
