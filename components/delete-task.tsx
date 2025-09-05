import { deleteTask } from "@/utils/actions";
import { useTransition, type Dispatch, type FormEventHandler, type SetStateAction } from "react";

type ChildProps = {
  taskId: string
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function DeleteTask({setOpen, taskId}: ChildProps ) {
 const [isPending, startTransition] = useTransition()
const deleteTaskAction = deleteTask.bind(null, taskId)
 
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

 e.preventDefault();
 
 startTransition(async () => {
  
  await deleteTaskAction()
setOpen(false)
 }) 
}

  return (
    <form onSubmit={handleSubmit}>
     <button type="submit" disabled={isPending}>{isPending ? "Deleting..." : "Delete task"}</button>
    </form>
  )
}

export default DeleteTask;