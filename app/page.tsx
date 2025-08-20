import { ThemeToggle } from "@/components/theme-toggle";
import { KanbanBoard } from "@/components/kanban-board";
import { getColumnsWithTasks } from "@/utils/actions";

export default async function Home() {
  // Fetch data server-side
  const columnsWithTasks = await getColumnsWithTasks();

  return (
    <main className='relative'>
      <div className='absolute top-4 right-4 z-10'>
        <ThemeToggle />
      </div>
      <section className='alignment'>
        <KanbanBoard columnsWithTasks={columnsWithTasks} />
      </section>
    </main>
  );
}
