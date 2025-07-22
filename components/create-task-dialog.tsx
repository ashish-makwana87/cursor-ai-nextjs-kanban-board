"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createTask, type FormState } from "@/utils/actions";
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
import { users } from "@/lib/data";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending}>
      {pending ? "Creating..." : "Create Task"}
    </Button>
  );
}

type CreateTaskDialogProps = {
  children: React.ReactNode;
};

export function CreateTaskDialog({ children }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: FormState = { message: "", errors: {} };
  const [state, action] = useActionState(createTask, initialState);

  useEffect(() => {
    if (state.message === "Task created successfully.") {
      setOpen(false);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={action} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              name='title'
              placeholder='e.g. Add a new feature'
            />
            {state.errors?.title && (
              <p className='text-sm font-medium text-destructive'>
                {state.errors.title[0]}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Add a short description (optional)'
              className='resize-none'
            />
            {state.errors?.description && (
              <p className='text-sm font-medium text-destructive'>
                {state.errors.description[0]}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label>Assignee</Label>
            <Select name='assigneeId'>
              <SelectTrigger>
                <SelectValue placeholder='Select an assignee' />
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
            {state.errors?.assigneeId && (
              <p className='text-sm font-medium text-destructive'>
                {state.errors.assigneeId[0]}
              </p>
            )}
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
