"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";


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

export type ColumnWithTasks = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: {
    id: string;
    title: string;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export async function getColumnsWithTasks(): Promise<ColumnWithTasks[]> {
  try {
    const columns = await prisma.column.findMany({
      include: {
        tasks: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return columns;
  } catch (error) {
    console.error("Error fetching columns with tasks:", error);
    return [];
  }
}

export async function getColumns() {
  try {
    return await prisma.column.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching columns:", error);
    return [];
  }
}

export async function getTasks() {
  try {
    return await prisma.task.findMany({
      include: {
        column: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}
