// src/components/ClientProviders.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/toaster";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { authSLice } from "@/store/slice/auth";
const protectedRoutes = ["/booking", "/services"]; // add your protected pages here

// --- Auth Wrapper ---
function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = localStorage.getItem("token");
  useEffect(() => {
    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtected && !user) {
      router.push("/login");
    }
  }, [pathname]);

  return <>{children}</>;
}
export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <LanguageProvider>
          <Toaster />
          <AuthGuard>{children}</AuthGuard>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}
