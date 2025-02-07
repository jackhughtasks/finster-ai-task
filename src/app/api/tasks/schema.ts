import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title should contain at least 1 character" }),
});

export const TaskStatus = ["Incomplete", "In Progress", "Completed"] as const;
export const taskStatusSchema = z.enum(TaskStatus);

export const updateTaskSchema = z.object({
  status: taskStatusSchema,
});
