import { title } from 'process'
import {z, ZodSchema} from 'zod'

export const taskSchema = z.object({
 title: z.string().min(2, {message: 'Title must be of at least 2 characters.'}).max(50, {message: 'Title must be less than 50 characters long.'}),
 content: z.string().min(5, {message: "Description must be of at least 5 characters."}).max(500, {message: "Description must be less than 500 characters."}),
 columnId: z.string(),
 assigneeId: z.string(),
})


export const validateWithZodSchema = <T>(schema: ZodSchema<T>, data: unknown): T => {

 const result = schema.safeParse(data)
 
 if(!result.success) {
  const errors = result.error.errors.map((item) => item.message)
  throw new Error(errors.join(' '))
 }

 return result.data; 
}