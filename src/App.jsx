import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { loadUser } from "./store/slices/authSlice";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import NotificationSystem from "./components/Notifications/NotificationSystem";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Topics = React.lazy(() => import("./pages/Topics"));
const TopicDetail = React.lazy(() => import("./pages/TopicDetail"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Settings = React.lazy(() => import("./pages/Settings"));
const AIResearch = React.lazy(() => import("./pages/AIResearch"));
const ProblemGenerator = React.lazy(() => import("./pages/ProblemGenerator"));
const Progress = React.lazy(() => import("./pages/Progress"));
const TopicManagement = React.lazy(() =>
  import("./pages/Admin/TopicManagement")
);

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/topics"
              element={
                <ProtectedRoute>
                  <Topics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/topics/:id"
              element={
                <ProtectedRoute>
                  <TopicDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ai-research"
              element={
                <ProtectedRoute>
                  <AIResearch />
                </ProtectedRoute>
              }
            />

            <Route
              path="/problem-generator"
              element={
                <ProtectedRoute>
                  <ProblemGenerator />
                </ProtectedRoute>
              }
            />

            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/topics"
              element={
                <ProtectedRoute>
                  <TopicManagement />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>

      {isAuthenticated && <NotificationSystem />}
    </>
  );
}

export default App;
