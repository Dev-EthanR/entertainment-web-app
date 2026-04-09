"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const LayoutWrapper = ({ children }: PropsWithChildren) => {

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      {children}
    </QueryClientProvider>
  );
};

export default LayoutWrapper;
