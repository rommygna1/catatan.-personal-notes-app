import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import AddNotePage from './pages/AddNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
        <Routes>
          <Route
            path="/login"
            element={(
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            )}
          />
          <Route
            path="/register"
            element={(
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            )}
          />
          <Route
            path="/"
            element={(
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/archives"
            element={(
              <ProtectedRoute>
                <ArchivePage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/notes/new"
            element={(
              <ProtectedRoute>
                <AddNotePage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/notes/:id"
            element={(
              <ProtectedRoute>
                <NoteDetailPage />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
