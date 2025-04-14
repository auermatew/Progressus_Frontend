// Code: Main App Component
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './components/ui/Loading';
import ErrorBoundary from './utilities/ErrorBoundary.tsx';
import ProtectedRoute from './utilities/ProtectedRoute';
import MyPage from './pages/TeacherView/MyPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

const LandingPage = lazy(() => import('./pages/Landingp/LandingPage'));
const HomePage = lazy(() => import('./pages/Homep/HomePage'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Registration/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/TeacherView/DashboardPage'));
const Lessons = lazy(() => import('./pages/TeacherView/Lessons'));
const Students = lazy(() => import('./pages/TeacherView/Students'));
const Calendar = lazy(() => import('./pages/TeacherView/Calendar'));

const App = () => {
  return (
    <>
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
            path="/unauthorized"
            element={
              <ErrorBoundary fallback="Error">
                <Suspense fallback={<Loading />}>
                  <UnauthorizedPage />
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

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="TEACHER">
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <DashboardPage />
                  </Suspense>
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />

          <Route
            path="/lessons"
            element={
              <ProtectedRoute>
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <Lessons />
                  </Suspense>
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              <ProtectedRoute requiredRole="TEACHER">
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <Students />
                  </Suspense>
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute requiredRole="TEACHER">
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <Calendar />
                  </Suspense>
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />

          <Route
            path="/mypage"
            element={
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <MyPage />
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
