import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";
import { editTask, getAllUsers} from "@/utils/actions";
import { type Dispatch, type SetStateAction } from "react";

type EditTaskDialogProps = {
    id: string;
    title: string;
    content: string;
    assignee: User | undefined;
};

const initialState = {message: ""}

export function EditTaskDialog({id, title, content, assignee }: EditTaskDialogProps) {
  const [users, setUsers] = useState<User[] | undefined>(undefined)
  const [state, action] = useActionState(editTask, initialState)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  
  const handleClick = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    async function getUsers() {
      const allUsers = await getAllUsers()
      setUsers(allUsers)
    }

    getUsers()
  }, [])
  

  return (
    <section>
      <button type="button" onClick={handleClick}>Edit Task</button>
      <div className={isModalOpen ? "modal-overlay show-modal" : "modal-overlay" }>
        <div className="bg-white w-[90vw] md:w-[28rem] lg:w-[30rem] p-8 rounded-md">
          <form action={action} className="space-y-4">
  <input type="hidden" name="id" value={id}  />
  <div className='space-y-2'>
  <Label htmlFor="title">Title</Label>
  <Input id="title" name="title" defaultValue={title} />
  </div>
  <div className='space-y-2'>
  <Label htmlFor="content">Description</Label>
  <Textarea id="content" name="content" defaultValue={content} />
  </div>
  <Button type='submit'>
      Submit
    </Button>
</form>
        </div>
        
        </div>
    </section>
  );
}
