import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";
import { editTask, getAllUsers } from "@/utils/actions";
import { type Dispatch, type SetStateAction } from "react";
import { createPortal } from "react-dom"
import { IoCloseCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EditTaskDialogProps = {
  id: string;
  title: string;
  content: string;
  assignee: User | undefined;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const initialState = { message: "", success: false };

export function EditTaskDialog({
  id,
  title,
  content,
  assignee,
  isModalOpen,
  setIsModalOpen
}: EditTaskDialogProps) {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [state, action, isPending] = useActionState(editTask, initialState);
  
  useEffect(() => {
    if(!state.message) return; 

    if(state.success) {
      toast.success(state.message)
      setIsModalOpen(false)
    } else {toast.error(state.message)}
  }, [state.message, state.success])

  useEffect(() => {
    async function getUsers() {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    }

    getUsers();
  }, []);
  
  if(!isModalOpen) return null;
  

  return createPortal(<div
        className="modal-overlay"
      >
        <div className='relative bg-white w-[90vw] md:w-[28rem] lg:w-[30rem] p-8 rounded-md'> 
          <button type="button" onClick={() => setIsModalOpen(false)} aria-label="Close edit task modal" className="absolute top-4 right-4"><IoCloseCircleSharp className="w-6 h-6" /></button>
          <form action={action} className='space-y-4'>
            <input type='hidden' name='id' value={id} />
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input id='title' name='title' defaultValue={title} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='content'>Description</Label>
              <Textarea id='content' name='content' defaultValue={content} />
            </div>
            <div className="space-y-2">
            <Label>Assignee</Label>
            <Select name='assigneeId' defaultValue={assignee?.id || ""}>
             <SelectTrigger>
              <SelectValue placeholder= "Select an assignee" />
             </SelectTrigger>
             <SelectContent>
              {users?.map((user) => {
                return <SelectItem key={user.id} value={user.id} >
                  <div className="flex gap-2 items-center">
                  <Avatar className="h-5 w-5">
                   {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.name} /> : <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback> }
                  </Avatar>
                  <span>{user.name}</span>
                  </div>
                </SelectItem>
              })}
             </SelectContent>
            </Select>
            </div>
            <Button type='submit'>{isPending ? "Submitting..." : "Submit"}</Button>
          </form>
        </div>
      </div>, document.body)
}
