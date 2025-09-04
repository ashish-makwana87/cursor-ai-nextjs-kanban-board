import { ThemeToggle } from "@/components/theme-toggle";
import { KanbanBoard } from "@/components/kanban-board";
import { getAllUsers, getColumnsWithTasks } from "@/utils/actions";

export default async function Home() {

  const columnsWithTasks = await getColumnsWithTasks();
  const allUsers = await getAllUsers()
  
  
  return (
    <main className='relative'>
      <div className='absolute top-4 right-4 z-10'>
        <ThemeToggle />
      </div>
      <section className='alignment'>
        <KanbanBoard columnsWithTasks={columnsWithTasks} allUsers={allUsers} />
      </section>
    </main>
  );
}
