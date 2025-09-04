"use client";

import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";
import { editTask, getAllUsers} from "@/utils/actions";


function SubmitButton() {
  
  return (
    <Button type='submit'>
      Submit
    </Button>
  );
}

type EditTaskDialogProps = {
  task: {
    id: string;
    title: string;
    content?: string;
    assignee?: User;
  };
};

const initialState = {message: ""}

export function EditTaskDialog({ task }: EditTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[] | undefined>(undefined)
  const [state, action] = useActionState(editTask, initialState)
   
  
  useEffect(() => {
    async function getUsers() {
      const allUsers = await getAllUsers()
      setUsers(allUsers)
    }

    getUsers()
  }, [])
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className='w-full text-left'>Edit Task</span>
      </DialogTrigger>
      <DialogContent className='max-w-[90vw] md:max-w-[50vw] lg:max-w-[40vw]'>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
  <input type="hidden" name="id" value={task.id}  />
  <div className='space-y-2'>
  <Label htmlFor="title">Title</Label>
  <Input id="title" name="title" defaultValue={task.title} />
  </div>
  <div className='space-y-2'>
  <Label htmlFor="content">Description</Label>
  <Textarea id="content" name="content" defaultValue={task.content} />
  </div>
  <Select name="assigneeId" defaultValue={task.assignee?.id}>
    <SelectTrigger>
     <SelectValue placeholder="Select an assignee" />
    </SelectTrigger>
    <SelectContent>
     {users?.map((user) => {
      
      return <SelectItem key={user.id} value={user.id}>
        <div className="flex items-center gap-x-2">
         <Avatar className="h-5 w-5">
          {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.name} /> : <AvatarFallback className="text-xs">
            {user.name.charAt(0)}
          </AvatarFallback> }
         </Avatar>
         <p>{user.name}</p> 
        </div>
      </SelectItem>
     })}
    </SelectContent>
  </Select>
  <DialogFooter><SubmitButton /></DialogFooter>
</form>
      </DialogContent>
    </Dialog>
  );
}
