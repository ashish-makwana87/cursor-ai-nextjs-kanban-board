"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { User } from "@prisma/client";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { EditTaskDialog } from "./edit-task-dialog";

type TaskCardProps = {
  taskId: string,
  title: string;
  content?: string;
  assignee?: User | undefined;
  allUsers:  User[] | undefined
};

export function TaskCard({
  taskId,
  title,
  content,
  assignee,
  allUsers
}: TaskCardProps) {
  return (
    <Card className='mb-4 overflow-hidden shadow-sm border-muted'>
      <CardHeader className='flex flex-row items-start justify-between'>
        <CardTitle className='text-sm font-medium mb-0 capitalize'>{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='h-6 w-6'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <EditTaskDialog
                task={{
                  id: taskId,
                  title,
                  content,
                  assignee,
                }}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {content && (
        <CardContent className='text-sm text-muted-foreground'>
          {content}
        </CardContent>
      )}

      <CardFooter className='pt-0 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Select defaultValue={assignee?.id}>
            <SelectTrigger className='h-8 w-fit gap-1 text-xs'>
              {assignee ? (
                <div className='flex items-center gap-2'>
                  <Avatar className='h-5 w-5'>
                    {assignee.avatarUrl ? (
                      <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                    ) : (
                      <AvatarFallback className='text-xs'>
                        {assignee.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>{assignee.name}</span>
                </div>
              ) : (
                <span>Assign</span>
              )}
            </SelectTrigger>
            <SelectContent>
              {allUsers?.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-5 w-5'>
                      {user.avatarUrl ? (
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                      ) : (
                        <AvatarFallback className='text-xs'>
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardFooter>
    </Card>
  );
}
