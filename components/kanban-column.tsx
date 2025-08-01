import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { CreateTaskDialog } from "./create-task-dialog";
import { Button } from "./ui/button";


type KanbanColumnProps = {
  title: string;
  children: React.ReactNode;
};

export function KanbanColumn({ title, children }: KanbanColumnProps) {

  return (
    <Card className="w-full min-w-[320px]">
      <CardHeader className="px-4 text-center">
        <CardTitle className="text-center text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pt-0">
        <div className="mb-2">
        <CreateTaskDialog>
          <Button variant='ghost' className='justify-start p-2'>
            + Create Task
          </Button>
        </CreateTaskDialog>
        </div>
        {children}</CardContent>
    </Card>
  );
}