import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../shared/components/Layout';
import { Loader } from '../shared/components/Loader';

const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const StudyPage = lazy(() => import('../pages/StudyPage'));
const LearnedPage = lazy(() => import('../pages/LearnedPage'));
const GrammarPage = lazy(() => import('../pages/GrammarPage'));
const GrammarDetailPage = lazy(() => import('../pages/GrammarDetailPage'));
const ProgressPage = lazy(() => import('../pages/ProgressPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));

function LazyRoute({ children }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LazyRoute>
            <LoginPage />
          </LazyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <LazyRoute>
            <RegisterPage />
          </LazyRoute>
        }
      />
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <LazyRoute>
              <CategoriesPage />
            </LazyRoute>
          }
        />
        <Route
          path="study"
          element={
            <LazyRoute>
              <StudyPage />
            </LazyRoute>
          }
        />
        <Route
          path="study/:categorySlug"
          element={
            <LazyRoute>
              <StudyPage />
            </LazyRoute>
          }
        />
        <Route
          path="learned"
          element={
            <LazyRoute>
              <LearnedPage />
            </LazyRoute>
          }
        />
        <Route
          path="grammar"
          element={
            <LazyRoute>
              <GrammarPage />
            </LazyRoute>
          }
        />
        <Route
          path="grammar/:id"
          element={
            <LazyRoute>
              <GrammarDetailPage />
            </LazyRoute>
          }
        />
        <Route
          path="profile"
          element={
            <LazyRoute>
              <ProgressPage />
            </LazyRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export function Router() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
