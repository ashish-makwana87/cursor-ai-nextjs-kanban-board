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
import { type User, users } from "@/lib/data";
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
  title: string;
  description?: string;
  assignee?: User;
  onAssigneeChange?: (userId: string) => void;
};

export function TaskCard({
  title,
  description,
  assignee,
  onAssigneeChange,
}: TaskCardProps) {
  return (
    <Card className='mb-4 overflow-hidden shadow-sm border-muted'>
      <CardHeader className='p-2 pb-0 flex flex-row items-start justify-between'>
        <CardTitle className='text-sm font-medium mb-0'>{title}</CardTitle>
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
                  id: "some-id", // You'll need to pass the real task ID here
                  title,
                  description,
                  assignee,
                }}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {description && (
        <CardContent className='p-2 pt-1 text-sm text-muted-foreground'>
          {description}
        </CardContent>
      )}

      <CardFooter className='p-2 pt-0 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Select defaultValue={assignee?.id} onValueChange={onAssigneeChange}>
            <SelectTrigger className='h-8 w-fit gap-1 text-xs'>
              {assignee ? (
                <div className='flex items-center gap-2'>
                  <Avatar className='h-5 w-5'>
                    {assignee.avatar ? (
                      <AvatarImage src={assignee.avatar} alt={assignee.name} />
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
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-5 w-5'>
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
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
