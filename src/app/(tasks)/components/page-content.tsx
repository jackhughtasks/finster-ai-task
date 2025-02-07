"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { CreateTaskModal } from "./create-task-modal/create-task-modal";
import { Container } from "@/components/container/container";
import { TaskRow } from "./task-row/task-row";
import { Task } from "@prisma/client";
import { IconButton } from "@/components/icon-button/icon-button";

export const PageContent = () => {
  const [showCreateTasksModal, setShowCreateTasksModal] = useState(false);

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => axios.get<Task[]>("/api/tasks").then((res) => res.data),
  });

  return (
    <>
      {showCreateTasksModal && (
        <CreateTaskModal
          onComplete={() => setShowCreateTasksModal(false)}
          onClose={() => setShowCreateTasksModal(false)}
        />
      )}

      <Container className="flex flex-col gap-4">
        <h1 className="mt-2 text-2xl font-bold md:mt-8 md:text-4xl">
          Finster AI Tasks App
        </h1>

        <IconButton
          onClick={() => setShowCreateTasksModal(true)}
          className="w-12 self-end bg-blue-200 text-3xl hover:bg-blue-300"
        >
          +
        </IconButton>

        <table className="grid grid-cols-[max-content_1fr_auto]">
          <tbody className="col-span-full grid grid-cols-subgrid gap-2">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
};
