import { User } from "@prisma/client";


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
    assignee: User | null;
  }[] ;
}; 


export type FormState = {
  message: string;
  errors?: {
    title?: string[];
    description?: string[];
    assigneeId?: string[];
  };
};

