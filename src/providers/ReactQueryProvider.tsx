"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
        staleTime: 1000 * 60 * 5,
      },
    },
  });
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
