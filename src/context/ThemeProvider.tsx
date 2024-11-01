"use client";
import { ThemeProvider } from "@/components/ThemeProvider/theme-provider";

import React from "react";
// import { SessionProvider } from "next-auth/react";
function RootThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="your-storage-key-theme" // Optional. The default is "theme"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

export default RootThemeProvider;
