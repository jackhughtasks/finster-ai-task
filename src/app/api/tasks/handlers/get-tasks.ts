import { db } from "@/server/db";

export const getTasks = async () => {
  const tasks = await db.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(tasks);
};
