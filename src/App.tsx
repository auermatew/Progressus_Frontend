import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Loading from './components/ui/Loading';
import ErrorBoundary from './utilities/ErrorBoundary';
import AuthProvider from './contexts/AuthContext';
import TeacherProvider from './contexts/TeacherContext';
import SubjectProvider from './contexts/SubjectContext';
import PaymentProvider from './contexts/PaymentContext';
import TransactionProvider from './contexts/TransactionContext';

// Lazy loaded oldalak
const LandingPage = lazy(() => import('./pages/Landingp/LandingPage'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Registration/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/TeacherView/DashboardPage'));
const Lessons = lazy(() => import('./pages/TeacherView/Lessons'));
const Subjects = lazy(() => import('./pages/TeacherView/Subjects'));
const Calendar = lazy(() => import('./pages/TeacherView/Calendar'));
const MyPage = lazy(() => import('./pages/TeacherView/MyPage'));
const SubjectAdminPage = lazy(() => import('./pages/SubjectAdminPage'));
const ExplorePage = lazy(() => import('./pages/StudentView/ExplorePage'));
const StudentBoard = lazy(() => import('./pages/StudentView/StudentDash'));
const StudentCalendar = lazy(() => import('./pages/StudentView/StudentCalendar'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-white text-center p-10">Loading...</div>;

  const isStudent = user?.role === 'ROLE_STUDENT';
  const isTeacher = user?.role === 'ROLE_TEACHER';

  return (
    <Routes>
      {/* Publikus oldalak */}
      <Route path="/" element={<Suspense fallback={<Loading />}><LandingPage /></Suspense>} />
      <Route path="/login" element={<Suspense fallback={<Loading />}><LoginPage /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<Loading />}><RegisterPage /></Suspense>} />
      <Route path="/unauthorized" element={<Suspense fallback={<Loading />}><UnauthorizedPage /></Suspense>} />

      {/* Tanár oldalak */}
      {isTeacher && (
        <>
          <Route path="/dashboard" element={<TeacherProvider><Suspense fallback={<Loading />}><DashboardPage /></Suspense></TeacherProvider>} />
          <Route path="/lessons" element={<TeacherProvider><Suspense fallback={<Loading />}><Lessons /></Suspense></TeacherProvider>} />
          <Route path="/students" element={<TeacherProvider><Suspense fallback={<Loading />}><Subjects /></Suspense></TeacherProvider>} />
          <Route path="/calendar" element={<TeacherProvider><Suspense fallback={<Loading />}><Calendar /></Suspense></TeacherProvider>} />
          <Route path="/mypage" element={<TeacherProvider><PaymentProvider><Suspense fallback={<Loading />}><MyPage /></Suspense></PaymentProvider></TeacherProvider>} />
        </>
      )}

      {/* Admin oldal (minden authentikált user eléri, ha kell majd role checkkel bővítjük) */}
      {user && (
        <Route path="/admin/subjects" element={<SubjectProvider><Suspense fallback={<Loading />}><SubjectAdminPage /></Suspense></SubjectProvider>} />
      )}

      {/* Diák oldalak */}
      {isStudent && (
        <>
          <Route path="/explore" element={<TeacherProvider><SubjectProvider><Suspense fallback={<Loading />}><ExplorePage /></Suspense></SubjectProvider></TeacherProvider>} />
          <Route path="/studentboard" element={<TransactionProvider><PaymentProvider><Suspense fallback={<Loading />}><StudentBoard /></Suspense></PaymentProvider></TransactionProvider>} />
          <Route path="/studentcalendar" element={<TeacherProvider><Suspense fallback={<Loading />}><StudentCalendar /></Suspense></TeacherProvider>} />
        </>
      )}

      {/* Rossz role esetén átirányítás */}
      <Route path="*" element={<Navigate to={user ? '/unauthorized' : '/login'} />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary fallback={<div className="text-red-500">Something went wrong!</div>}>
          <AppRoutes />
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
