import { KanbanBoard } from "@/components/kanban-board";


export default async function Home() {

  return (
    <main className='relative'>
      <section className='alignment'>
        <KanbanBoard />
      </section>
    </main>
  );
}
