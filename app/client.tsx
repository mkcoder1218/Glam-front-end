// src/components/ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/toaster";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <LanguageProvider>
          <Toaster />
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}
