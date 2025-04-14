import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './utilities/ErrorBoundary.js';
import AuthProvider from './contexts/AuthContext.tsx';
import TeacherProvider from './contexts/TeacherContext.tsx';
import SubjectProvider from './contexts/SubjectContext.tsx';
import PaymentProvider from './contexts/PaymentContext.tsx';
import TransactionProvider from './contexts/TransactionContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TeacherProvider>
        <SubjectProvider>
          <PaymentProvider>
            <TransactionProvider>
              <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <App />
              </ErrorBoundary>
            </TransactionProvider>
          </PaymentProvider>
        </SubjectProvider>
      </TeacherProvider>
    </AuthProvider>
  </StrictMode>
);
