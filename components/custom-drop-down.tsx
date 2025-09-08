'use client'
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useState } from "react"
import { Button } from "./ui/button"
import { User } from "@prisma/client";
import DeleteTask from "./delete-task";
import { EditTaskDialog } from "./edit-task-dialog";

type TaskInfo = {
    id: string;
    title: string;
    content: string;
    assignee: User | undefined;
};

function CustomDropDown({taskInfo}:{taskInfo: TaskInfo}) {
 const [open, setOpen] = useState<boolean>(false)
 const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section className='relative'>
     <Button onClick={() => setOpen((prev) => !prev)} size='icon' variant='ghost' ><IoEllipsisHorizontalSharp /></Button>
     {open && <div className="absolute w-28 top-10 right-0 border rounded-md p-1 bg-white">
      <ul>
       <li className="p-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer"><button type="button" onClick={() => {setIsModalOpen(true); setOpen(false)}}>Edit task</button></li>
       <li className="p-2 text-sm text-red-600 hover:bg-gray-100 rounded-md cursor-pointer"><DeleteTask setOpen={setOpen} taskId={taskInfo.id} /></li>
      </ul>
      </div>}
      <EditTaskDialog id={taskInfo.id} title={taskInfo.title} assignee={taskInfo.assignee} content={taskInfo.content} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </section>
    
  )
}

export default CustomDropDown