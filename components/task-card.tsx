'use client';
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoreHorizontal, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface TaskCardProps {
  title: string;
  description?: string;
  assignee?: User;
  onAssigneeChange?: (userId: string) => void;
}

const users: User[] = [
  { id: "1", name: "John Doe", avatar: "/avatars/john.png" },
  { id: "2", name: "Jane Smith", avatar: "/avatars/jane.png" },
  { id: "3", name: "Alex Johnson" },
];

export function TaskCard({
  title,
  description,
  assignee,
  onAssigneeChange,
}: TaskCardProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <Card className='mb-4 overflow-hidden shadow-sm border-muted'>
      <CardHeader className='p-3 pb-0 flex flex-row items-start justify-between space-y-0'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger className='h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted'>
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit task</DropdownMenuItem>
            <DropdownMenuItem>Add comment</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-destructive'>
              Delete task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {description && (
        <CardContent className='p-3 pt-2 text-sm text-muted-foreground'>
          {description}
        </CardContent>
      )}

      <CardFooter className='p-3 pt-0 flex items-center justify-between'>
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

        <button
          className='flex items-center text-muted-foreground hover:text-foreground text-xs gap-1'
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare className='h-3 w-3' />
          <span>Comment</span>
        </button>
      </CardFooter>
    </Card>
  );
}
