"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";
import CustomDropDown from "./custom-drop-down";

type TaskCardProps = {
  taskId: string;
  title: string;
  content: string;
  assignee: User | undefined;
};

export function TaskCard({
  taskId,
  title,
  content,
  assignee,
}: TaskCardProps) {


  return (
    <Card className='mb-4 overflow-hidden border-muted'>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle className='text-sm font-medium mb-0 capitalize'>
          {title}
        </CardTitle>
        <CustomDropDown
          taskInfo={{
            id: taskId,
            title,
            content,
            assignee,
          }}
        />
      </CardHeader>
      {content && (
        <CardContent className='text-sm text-muted-foreground'>
          {content}
        </CardContent>
      )}

      <CardFooter className='pt-0 flex items-center justify-between'>
        {assignee ? (
          <div className='flex items-center gap-2 border rounded-md p-2'>
            <Avatar className='h-5 w-5'>
              {assignee.avatarUrl ? (
                <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
              ) : (
                <AvatarFallback className='text-xs'>
                  {assignee.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <span className='text-sm'>{assignee.name}</span>
          </div>
        ) : (
          <p className='text-sm border-2 rounded-md p-2'>No assignee</p>
        )}
      </CardFooter>
    </Card>
  );
}
