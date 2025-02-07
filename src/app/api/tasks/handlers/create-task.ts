import { db } from "@/server/db";
import { type NextRequest } from "next/server";
import { createTaskSchema } from "../schema";

export const createTask = async (req: NextRequest) => {
  const requestInput = createTaskSchema.safeParse(await req.json());
  if (requestInput.error) {
    return Response.json({ errors: ["Bad request"] }, { status: 400 });
  }

  const task = await db.task.create({
    data: {
      title: requestInput.data.title,
      status: "Incomplete",
    },
  });

  return Response.json(task);
};
