"use client";

import { useState, useEffect } from "react";
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
import { getAllUsers } from "@/utils/actions";


function SubmitButton() {
  
  return (
    <Button type='submit'>
      Saving...
    </Button>
  );
}

type EditTaskDialogProps = {
  task: {
    id: string;
    title: string;
    description?: string;
    assignee?: User;
  };
};

export function EditTaskDialog({ task }: EditTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[] | undefined>(undefined)
 
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
        <button className='w-full text-left'>Edit</button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form className='space-y-4'>
          <input type='hidden' name='id' value={task.id} />
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input id='title' name='title' defaultValue={task.title} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              defaultValue={task.description}
              className='resize-none'
            />
          </div>
          <div className='space-y-2'>
            <Label>Assignee</Label>
            <Select name='assigneeId' defaultValue={task.assignee?.id}>
              <SelectTrigger>
                <SelectValue placeholder='Select an assignee' />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
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
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
