"use client";

import { createTaskSchema } from "@/app/api/tasks/schema";
import { Container } from "@/components/container/container";
import { IconButton } from "@/components/icon-button/icon-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

type CreateTaskModalProps = {
  onComplete: () => void;
  onClose: () => void;
};

export const CreateTaskModal = ({
  onComplete,
  onClose,
}: CreateTaskModalProps) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setFocus,
  } = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const createTaskMutation = useMutation({
    mutationFn: (task: z.infer<typeof createTaskSchema>) =>
      axios.post("/api/tasks", task),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onComplete();
    },
  });

  const onSubmit = (inputs: z.infer<typeof createTaskSchema>) => {
    createTaskMutation.mutate(inputs);
  };

  return (
    <div className="fixed m-auto flex h-screen w-screen items-center justify-center">
      <Container>
        <div className="w-full rounded-xl bg-white p-4 shadow-2xl md:w-[500px] md:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Create a task</h2>
            <IconButton
              type="button"
              className="w-9 rotate-45 bg-red-200 text-2xl hover:bg-red-300"
              onClick={onClose}
            >
              +
            </IconButton>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 flex flex-col gap-10 p-2">
              <div className="flex flex-col">
                <label className="flex items-center gap-2">
                  <span className="font-semibold">Task name</span>
                  <input
                    type="text"
                    placeholder="Task name"
                    className="flex-1 rounded-lg border-2 border-gray-200 p-2"
                    {...register("title")}
                  />
                </label>
                <span className="mt-2 font-semibold text-red-500">
                  {errors.title?.message}
                </span>
              </div>

              <button
                disabled={!isValid}
                type="submit"
                className="rounded-lg bg-green-100 p-2 font-semibold transition-colors hover:bg-green-200 disabled:bg-gray-100"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};
