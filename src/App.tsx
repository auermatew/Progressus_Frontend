//TODO: Add ProtectedRoute component to protect routes
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './components/ui/Loading';
import ErrorBoundary from './utilities/ErrorBoundary.tsx';
// import ProtectedRoute from './utilities/ProtectedRoute';
import MyPage from './pages/TeacherView/MyPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import SubjectAdminPage from './pages/SubjectAdminPage';
import AuthProvider from './contexts/AuthContext';
import TeacherProvider from './contexts/TeacherContext';
import SubjectProvider from './contexts/SubjectContext';
import PaymentProvider from './contexts/PaymentContext';
import TransactionProvider from './contexts/TransactionContext';

const LandingPage = lazy(() => import('./pages/Landingp/LandingPage'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Registration/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/TeacherView/DashboardPage'));
const Lessons = lazy(() => import('./pages/TeacherView/Lessons'));
const Students = lazy(() => import('./pages/TeacherView/Students'));
const Calendar = lazy(() => import('./pages/TeacherView/Calendar'));

const StudentBoard = lazy(() => import('./pages/StudentView/StudentDash'));
const ExplorePage = lazy(() => import('./pages/StudentView/ExplorePage'));
const StudentCalendar = lazy(() => import('./pages/StudentView/StudentCalendar'));

const App = () => {
  return (
    <AuthProvider>
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
              // <ProtectedRoute requiredRole="TEACHER">
              <TeacherProvider>
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <DashboardPage />
                  </Suspense>
                </ErrorBoundary>
              </TeacherProvider>
              // </ProtectedRoute>
            }
          />

          <Route
            path="/lessons"
            element={
              // <ProtectedRoute>
              <TeacherProvider>
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <Lessons />
                  </Suspense>
                </ErrorBoundary>
              </TeacherProvider>
              // </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              // <ProtectedRoute requiredRole="TEACHER">
              <TeacherProvider>
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <Students />
                  </Suspense>
                </ErrorBoundary>
              </TeacherProvider>
              // </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              // <ProtectedRoute requiredRole="TEACHER">
              <TeacherProvider>
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <Calendar />
                  </Suspense>
                </ErrorBoundary>
              </TeacherProvider>
              // </ProtectedRoute>
            }
          />

          <Route
            path="/mypage"
            element={
              <TeacherProvider>
                <PaymentProvider>
                  <ErrorBoundary fallback="Error">
                    <Suspense fallback={<Loading />}>
                      <MyPage />
                    </Suspense>
                  </ErrorBoundary>
                </PaymentProvider>
              </TeacherProvider>
            }
          />

          <Route
            path="/admin/subjects"
            element={
              <SubjectProvider>
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <SubjectAdminPage />
                  </Suspense>
                </ErrorBoundary>
              </SubjectProvider>
            }
          />

          <Route
            path="/explore"
            element={
              <AuthProvider>
                <TeacherProvider>
                  <SubjectProvider>
                    <ErrorBoundary fallback="Error">
                      <Suspense fallback={<Loading />}>
                        <ExplorePage />
                      </Suspense>
                    </ErrorBoundary>
                  </SubjectProvider>
                </TeacherProvider>
              </AuthProvider>
            }
          />
          <Route
            path="/studentboard"
            element={
              <TransactionProvider>
                <PaymentProvider>
                  <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <Suspense fallback={<Loading />}>
                      <StudentBoard />
                    </Suspense>
                  </ErrorBoundary>
                </PaymentProvider>
              </TransactionProvider>
            }
          />

          <Route
            path="/studentcalendar"
            element={
              <TeacherProvider>
                <ErrorBoundary fallback="Error">
                  <Suspense fallback={<Loading />}>
                    <StudentCalendar />
                  </Suspense>
                </ErrorBoundary>
              </TeacherProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
