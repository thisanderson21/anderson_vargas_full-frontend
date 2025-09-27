"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "next-auth/react";
import { RepositoryIocProvider } from '../services/context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RepositoryIocProvider>
      <SessionProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SessionProvider>
    </RepositoryIocProvider>
  );
}