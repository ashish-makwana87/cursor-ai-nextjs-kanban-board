import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";
import { editTask, getAllUsers } from "@/utils/actions";
import { type Dispatch, type SetStateAction } from "react";
import ReactDOM from "react-dom"
import { IoCloseCircleSharp } from "react-icons/io5";

type EditTaskDialogProps = {
  id: string;
  title: string;
  content: string;
  assignee: User | undefined;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const initialState = { message: "" };

export function EditTaskDialog({
  id,
  title,
  content,
  assignee,
  isModalOpen,
  setIsModalOpen
}: EditTaskDialogProps) {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [state, action] = useActionState(editTask, initialState);
  

  useEffect(() => {
    async function getUsers() {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    }

    getUsers();
  }, []);
  
  if(!isModalOpen) return null;

  return ReactDOM.createPortal(<div
        className="modal-overlay show-modal"
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
            <Button type='submit'>Submit</Button>
          </form>
        </div>
      </div>, document.body)
}
