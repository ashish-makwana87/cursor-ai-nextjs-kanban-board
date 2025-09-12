import { KanbanColumn } from "./kanban-column";
import { TaskCard } from "./task-card";
import { getColumnsWithTasks } from "@/utils/actions";


export async function KanbanBoard() {
  
   const columnsWithTasks = await getColumnsWithTasks();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 overflow-x-auto min-h-screen'>
      {columnsWithTasks.map((column) => (
        <KanbanColumn key={column.id} title={column.name} columnId={column.id}>
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              taskId={task.id}
              title={task.title}
              content={task.content || ""}
              assignee={task.assignee || undefined}
            />
          ))}
        </KanbanColumn>
      ))}
    </div>
  );
}
