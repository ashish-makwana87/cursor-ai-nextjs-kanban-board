import { User } from "@prisma/client";
import { KanbanColumn } from "./kanban-column";
import { TaskCard } from "./task-card";
import { ColumnWithTasks } from "@/utils/types";

type KanbanBoardProps = {
  columnsWithTasks: ColumnWithTasks[];
  allUsers: User[] | undefined
};

export function KanbanBoard({ columnsWithTasks, allUsers }: KanbanBoardProps) {

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 overflow-x-auto min-h-screen'>
      {columnsWithTasks.map((column) => (
        <KanbanColumn key={column.id} title={column.name}>
          {column.tasks.map((task) => (

            <TaskCard
              key={task.id}
              title={task.title}
              description={task.content || ""}
              assignee={task.assignee || undefined}
              allUsers={allUsers}
            />
          ))}
        </KanbanColumn>
      ))}
    </div>
  );
}
