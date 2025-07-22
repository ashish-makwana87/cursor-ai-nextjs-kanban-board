"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

// This is a placeholder for your actual data store.
// In a real app, this would be a database.
let tasks = [
    {
    id: "TASK-1",
    title: "Implement authentication",
    description: "Set up NextAuth.js for user authentication",
    status: "Todo",
    assigneeId: "1",
  },
  {
    id: "TASK-2",
    title: "Design system",
    description: "Create consistent component library",
    status: "Todo",
  },
  {
    id: "TASK-3",
    title: "Kanban board",
    description: "Create drag and drop kanban board",
    status: "In Progress",
    assigneeId: "2",
  },
  {
    id: "TASK-4",
    title: "Project setup",
    description: "Initial project configuration",
    status: "Done",
    assigneeId: "3",
  },
]

const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().optional(),
  assigneeId: z.string().optional(),
});

export type FormState = {
  message: string;
  errors?: {
    title?: string[];
    description?: string[];
    assigneeId?: string[];
  };
};

export async function createTask(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = taskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    assigneeId: formData.get("assigneeId"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  // This is where you would insert the data into your database.
  console.log("New task created:", validatedFields.data);
  // For demonstration, we're not persisting the new task.
  // In a real app you would update your data source and revalidate.

  revalidatePath("/");

  return { message: "Task created successfully." };
}

const updateTaskSchema = taskSchema.extend({
  id: z.string(),
});

export async function updateTask(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = updateTaskSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    assigneeId: formData.get("assigneeId"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // This is where you would update the data in your database.
  console.log("Task updated:", validatedFields.data);
  // For demonstration, we're not persisting the updated task.
  // In a real app you would update your data source and revalidate.
  
  revalidatePath("/");
  return { message: "Task updated successfully." };
}