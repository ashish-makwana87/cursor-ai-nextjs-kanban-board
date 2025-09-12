"use client";

import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
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
import { createTask, getAllUsers } from "@/utils/actions";
import { toast } from "react-toastify";
import { IoCloseCircleSharp } from "react-icons/io5";

type CreateTaskDialogProps = {
  columnId: string;
};

const initialState = { message: "", success: false };

export function CreateTaskDialog({ columnId }: CreateTaskDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [state, action, isPending] = useActionState(createTask, initialState);

  useEffect(() => {
    if(!state.message) return;

    if (state.success) {
      toast.success(state.message);
      setOpen(false)
    } else{toast.error(state.message)}
    
  }, [state.message, state.success]);

  useEffect(() => {
    async function getUsers() {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    }

    getUsers();
  }, []);

  return (
    <section>
        <button className='text-sm md:text-base cursor-pointer p-2' onClick={() => setOpen((prev) => !prev)}>
          + Create task 
        </button>
     {open && <div className="modal-overlay">
      <div className='relative bg-white w-[90vw] md:w-[28rem] lg:w-[30rem] p-8 rounded-md'>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close edit task modal" className="absolute top-4 right-4"><IoCloseCircleSharp className="w-6 h-6" /></button>
      <form action={action} className='space-y-4'>
          <input type='hidden' name='columnId' value={columnId} />
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input id='title' name='title' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='content'>Description</Label>
            <Textarea
              id='content'
              name='content'
              placeholder='Add a short description (min 5 characters)'
              />
          </div>
          <div className='space-y-2'>
            <Label>Assignee</Label>
            <Select name='assigneeId'>
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
            <Button type='submit'>
              {isPending ? "Creating..." : "Create task"}
            </Button>
        </form></div>
     </div>}
    </section>
  );
}
