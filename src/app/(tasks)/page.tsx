import { PageContent } from "./components/page-content";
import { getTasks } from "../api/tasks/handlers/get-tasks";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Tasks() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks().then((res) => res.json()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContent />
    </HydrationBoundary>
  );
}
