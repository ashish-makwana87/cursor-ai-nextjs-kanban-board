"use server";
import { prisma } from "@/utils/prisma";
import { ColumnWithTasks } from "./types";
import { revalidatePath } from "next/cache";
import { editTaskSchema, taskSchema, validateWithZodSchema } from "./zod";


export async function getAllUsers() {
 
  try {
    const allUsers = await prisma.user.findMany()
    return allUsers;
  } catch (error) {
    console.log(error)
  }
}


export async function getColumnsWithTasks(): Promise<ColumnWithTasks[]> {
  try {
    const columns = await prisma.column.findMany({
      include: {
        tasks: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            assignee: true,
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


export async function createTask(initialState: any, formData: FormData): Promise<{message: string}> {

try {
 const rawData = Object.fromEntries(formData);
 const validatedFields = validateWithZodSchema(taskSchema, rawData)
 
  await prisma.task.create({data: validatedFields})
  revalidatePath('/')
  return {message: "task created successfully"};
} catch (error) {
  
  return {message: error instanceof Error ? error.message : "There was an error creating a task" };
}
}



export async function editTask(initialState: any, formData: FormData): Promise<{message: string}> {

try {
  const rawData = Object.fromEntries(formData);
  const validatedFields = validateWithZodSchema(editTaskSchema, rawData);
  
  const {id,...data} = validatedFields

  await prisma.task.update({where: {id: validatedFields.id}, data})
  revalidatePath("/")
  return {message: "Task updated successfully."}
} catch (error) {
  
  return {message: error instanceof Error ? error.message : "Error updating the task."}
}
}