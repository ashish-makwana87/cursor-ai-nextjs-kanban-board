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

// _initialState to ignore unused variable warnings
export async function createTask(_initialState: { message: string; success: boolean }, formData: FormData): Promise<{message: string, success: boolean}> {

try {
 const rawData = Object.fromEntries(formData);
 const validatedFields = validateWithZodSchema(taskSchema, rawData)
 
  await prisma.task.create({data: validatedFields})
  revalidatePath('/')
  return {message: "task created successfully", success: true};
} catch (error) {
  
  return {message: error instanceof Error ? error.message : "There was an error creating a task", success: false };
}
}


// _initialState to ignore unused variable warnings
export async function editTask(_initialState: { message: string; success: boolean }, formData: FormData): Promise<{message: string, success: boolean}> {

try {
  const rawData = Object.fromEntries(formData);
  const validatedFields = validateWithZodSchema(editTaskSchema, rawData);
  
  const {id,...data} = validatedFields;

  await prisma.task.update({where: {id: validatedFields.id}, data})
  revalidatePath("/")
  return {message: "Task updated successfully.", success: true}
} catch (error) {
  
  return {message: error instanceof Error ? error.message : "Error updating the task.", success: false}
}
}


export const deleteTask = async (taskId: string) => {

  try {
    await prisma.task.delete({where: {id: taskId}})
    revalidatePath('/')
  } catch (error) {
    console.error(error instanceof Error ? error.cause : "Something went wrong.");
  }
}
