import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './utilities/ErrorBoundary.js';
import AuthProvider from './contexts/AuthContext.tsx';
import TeacherProvider from './contexts/TeacherContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TeacherProvider>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <App />
        </ErrorBoundary>
      </TeacherProvider>
    </AuthProvider>
  </StrictMode>
);
