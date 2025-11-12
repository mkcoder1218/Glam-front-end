"use client";

import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/toaster";
import { usePathname, useRouter } from "next/navigation";

const protectedRoutes = ["/booking", "/services"]; // add your protected pages here

// --- Auth Wrapper ---
function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtected && !token) {
      router.push("/login");
    }
  }, [isClient, pathname, token, router]);

  return <>{children}</>;
}

// --- Main Provider ---
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
