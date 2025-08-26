"use server";
import { prisma } from "@/utils/prisma";
import { ColumnWithTasks } from "./types";


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


