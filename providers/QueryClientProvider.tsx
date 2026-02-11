"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const queryClient = new QueryClient();
export default function Providers({ children }: Props) {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
