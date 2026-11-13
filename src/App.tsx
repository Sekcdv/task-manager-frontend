import { Route, Routes } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RegisterPage } from './pages/RegisterPage';
import { TaskDetailPage } from './pages/TaskDetailsPage';
import { TasksPage } from './pages/TasksPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicOnlyRoute } from './routes/PublicOnlyRoute';
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="register"
            element={<RegisterPage />}
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="tasks" element={<TasksPage />} />
          <Route
            path="tasks/:taskId"
            element={<TaskDetailPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}