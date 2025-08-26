import { KanbanColumn } from "./kanban-column";
import { TaskCard } from "./task-card";
import { ColumnWithTasks } from "@/utils/actions";

type KanbanBoardProps = {
  columnsWithTasks: ColumnWithTasks[];
};

export function KanbanBoard({ columnsWithTasks }: KanbanBoardProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 overflow-x-auto min-h-screen'>
      {columnsWithTasks.map((column) => (
        <KanbanColumn key={column.id} title={column.name}>
          {column.tasks.map((task) => (
            console.log(task),

            <TaskCard
              key={task.id}
              title={task.title}
              description={task.content || ""}
              assignee={task.assignee || undefined}
            />
          ))}
        </KanbanColumn>
      ))}
    </div>
  );
}
