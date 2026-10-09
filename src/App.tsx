import { AppHeader } from './components/AppHeader';
import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskSummary } from './components/TaskSummary';





export default function App() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <TaskForm />
        <TaskFilters />
        <TaskSummary total={3} pending={2} completed={1} />
        <TaskList />
      </main>
      <footer className="app-footer">
        <div className="app-footer__content">
          <p>Administrador de tareas - Frontend EC2</p>
        </div>
      </footer>
    </div>
  );
}