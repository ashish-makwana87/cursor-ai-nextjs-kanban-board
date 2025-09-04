import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { CreateTaskDialog } from "./create-task-dialog";
import { Button } from "./ui/button";


type KanbanColumnProps = {
  title: string,
  columnId: string,
  children: React.ReactNode,
};

export function KanbanColumn({ title, columnId, children }: KanbanColumnProps) {

  return (
    <Card className="w-full min-w-[320px] bg-[#f2f2f2] dark:bg-transparent">
      <CardHeader className="px-4 text-center">
        <CardTitle className="text-center text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pt-0">
        <div className="mb-4">
        <CreateTaskDialog columnId={columnId} />
        </div>
        {children}</CardContent>
    </Card>
  );
}