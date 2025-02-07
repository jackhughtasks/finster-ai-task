import { type NextRequest } from "next/server";
import { db } from "@/server/db";
import { updateTaskSchema } from "../schema";

export const updateTask = async (
  req: NextRequest,
  { params }: { params: Promise<{ task_id: string }> },
) => {
  const requestInput = updateTaskSchema.safeParse(await req.json());
  if (requestInput.error) {
    return Response.json({ errors: ["Bad request"] }, { status: 400 });
  }

  const taskId = (await params).task_id;

  const task = await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      status: requestInput.data.status,
    },
  });

  return Response.json(task);
};
