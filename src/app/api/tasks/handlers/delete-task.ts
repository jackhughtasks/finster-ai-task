import { db } from "@/server/db";
import { NextRequest } from "next/server";

export const deleteTask = async (
  _req: NextRequest,
  { params }: { params: Promise<{ task_id: string }> },
) => {
  const taskId = (await params).task_id;
  await db.task.delete({
    where: {
      id: taskId,
    },
  });

  return Response.json(null);
};
