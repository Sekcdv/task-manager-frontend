import type { Task } from '../models/task.interface';
import { TaskItem } from './TaskItem';
interface TaskListProps {
    tasks: Task[];
    canDelete: boolean;
    onToggleStatus: (task: Task) => Promise<boolean>;
    onEditTask: (
        task: Task,
        title: string,
    ) => Promise<boolean>;
    onDeleteTask: (task: Task) => Promise<boolean>;
}
export function TaskList({
    tasks,
    canDelete,
    onToggleStatus,
    onEditTask,
    onDeleteTask,
}: TaskListProps) {
    if (tasks.length === 0) {
        return null;
    }
    return (
        <div className="task-list" role="list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    canDelete={canDelete}
                    onToggleStatus={onToggleStatus}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                />
            ))}
        </div>
    );
}