import { Route, Routes } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TaskDetailPage } from './pages/TaskDetailsPage';
import { TasksPage } from './pages/TasksPage';
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route
          path="tasks/:taskId"
          element={<TaskDetailPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}