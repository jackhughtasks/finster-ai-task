import { updateTask } from "@/app/api/tasks/handlers/update-task";
import { TaskStatus, taskStatusSchema } from "@/app/api/tasks/schema";
import { IconButton } from "@/components/icon-button/icon-button";
import { type Task } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { type z } from "zod";

export type TaskProps = {
  task: Task;
  className?: string;
};

export const TaskRow = ({ task, className }: TaskProps) => {
  const queryClient = useQueryClient();
  const updateTaskStatusMutation = useMutation({
    mutationFn: (newStatus: z.infer<typeof taskStatusSchema>) =>
      axios
        .put<ReturnType<typeof updateTask>>(`/api/tasks/${task.id}`, {
          status: newStatus,
        })
        .then(({ data }) => data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
  const deleteTaskMutation = useMutation({
    mutationFn: () => axios.delete(`/api/tasks/${task.id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const taskStatus = taskStatusSchema.parse(task.status);

  return (
    <tr
      className={clsx(
        "col-span-full grid grid-cols-subgrid items-center rounded-lg p-2",
        taskStatus === "Incomplete" && "bg-red-50",
        taskStatus === "In Progress" && "bg-orange-50",
        taskStatus === "Completed" && "bg-green-50",
        className,
      )}
    >
      <td className="text-lg font-medium md:px-4">{task.title}</td>
      <td className="ml-auto">
        <select
          value={taskStatus}
          className={"rounded-lg p-2"}
          onChange={(e) =>
            updateTaskStatusMutation.mutate(
              taskStatusSchema.parse(e.target.value),
            )
          }
        >
          {TaskStatus.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
      <td>
        <IconButton
          onClick={() => deleteTaskMutation.mutate()}
          className="w-9 rotate-45 bg-white text-2xl hover:bg-red-300"
        >
          +
        </IconButton>
      </td>
    </tr>
  );
};
