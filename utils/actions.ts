"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

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

  // TODO: Insert data into your database.
  console.log("New task created:", validatedFields.data);

  // Revalidate the path to update the UI.
  // revalidatePath("/path-to-your-kanban-board");

  return { message: "Task created successfully." };
}


