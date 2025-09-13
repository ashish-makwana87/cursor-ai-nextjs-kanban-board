import {z, ZodSchema} from 'zod'

export const taskSchema = z.object({
 title: z.string().min(2, {message: 'Title must be of at least 2 characters.'}).max(50, {message: 'Title must be less than 50 characters long.'}),
 content: z.string().transform((val) => val.length > 0 ? val : null),
 columnId: z.string(),
 assigneeId: z.string().transform((val) => val.length > 0 ? val : null),
})

export const editTaskSchema = z.object({
 id: z.string(),
 title: z.string().min(2, {message: 'Title must be of at least 2 characters.'}).max(50, {message: 'Title must be less than 50 characters long.'}),
 content: z.string().transform((val) => val.length > 0 ? val : null),
 assigneeId: z.string().transform((val) => val.length > 0 ? val : null),
})

export const validateWithZodSchema = <T>(schema: ZodSchema<T>, data: unknown):T => {

 const result = schema.safeParse(data)
 
 if(!result.success) {
  const errors = result.error.errors.map((item) => item.message)
  throw new Error(errors.join(' '))
 }

 return result.data; 
}
