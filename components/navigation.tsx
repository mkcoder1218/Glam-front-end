"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, Sun, Moon, LogOut, Coins } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language-provider";
import { gsap } from "gsap";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { authSLice } from "@/store/slice/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { logout } from "@/store/store";
import {
  setDiscount,
  setreedemAmount,
  setuserpoint,
} from "@/store/slice/setDisacount";
import { PointsSlice } from "@/store/slice/point";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Booking", href: "/booking" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const coin = useAppSelector((state) => state?.promodiscount?.point);

  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch user profile and points
  useEffect(() => {
    dispatch(authSLice?.actions?.getProfileAuth())
      .unwrap()
      .then((res: any) => {
        setUsername(res.user.name);
        dispatch(setuserpoint({ point: res?.user?.point }));
        if (res?.user?.promo_code_id) {
          dispatch(
            setDiscount({
              discount: res?.user?.promoCode?.discount,
              expiry: res?.user?.promoCode?.valid_until,
            })
          );
        }
      });
    dispatch(PointsSlice?.actions?.fetchAllPoints())
      .unwrap()
      .then((res: any) => {
        dispatch(
          setreedemAmount({ reedemAmount: res?.data?.[0]?.reedem_amount })
        );
      });
  }, []);

  // Initial animations and active link setup
  useEffect(() => {
    setMounted(true);

    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }

    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, transformOrigin: "center" },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1)",
          delay: 0.2,
        }
      );
    }

    const activeLinks = document.querySelectorAll(".nav-link");
    activeLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = href === pathname;
      const underline = link.querySelector(".nav-underline") as HTMLElement;

      if (isActive) {
        link.classList.add("text-primary");
        if (underline) gsap.set(underline, { scaleX: 1 });
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("text-primary");
        if (underline) gsap.set(underline, { scaleX: 0 });
        link.removeAttribute("aria-current");
      }
    });
  }, [pathname]);

  // Click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLanguageToggle = () =>
    setLanguage(language === "en" ? "am" : "en");
  const handleThemeToggle = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const underline = target.querySelector(".nav-underline") as HTMLElement;
    if (underline)
      gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(target, { y: -2, duration: 0.2, ease: "power1.out" });
    target.classList.add("text-primary");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const underline = target.querySelector(".nav-underline") as HTMLElement;
    const isActive = target.getAttribute("aria-current") === "page";
    if (underline)
      gsap.to(underline, {
        scaleX: isActive ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    gsap.to(target, { y: 0, duration: 0.2, ease: "power1.out" });
    if (!isActive) target.classList.remove("text-primary");
  };

  const handleMobileMenuToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
      const menuItems = menuRef.current.querySelectorAll("a, button");
      gsap.fromTo(
        menuItems,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.2,
          stagger: 0.05,
          delay: 0.1,
          ease: "power1.out",
        }
      );
    }
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLElement>) =>
    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -2,
      duration: 0.2,
      ease: "power2.out",
    });
  const handleButtonLeave = (e: React.MouseEvent<HTMLElement>) =>
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) =>
    gsap.to(e.currentTarget, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });

  return (
    <nav
      ref={navRef}
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link ref={logoRef} href="/" className="flex items-center space-x-2">
            <img
              src="/logo.jpg"
              alt="Glam Nest"
              className="h-10 rounded-full w-10"
            />
            <span className="font-bold text-xl text-foreground">Glam Nest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-foreground font-medium nav-link transition-colors duration-200"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {t(item.name.toLowerCase())}
                <span className="nav-underline absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left"></span>
              </Link>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className="text-foreground hover:text-primary"
            >
              <Globe className="h-4 w-4 mr-1" />{" "}
              {language === "en" ? "አማ" : "EN"}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeToggle}
              className="text-foreground hover:text-primary"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {username ? (
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="text-xs">
                  Welcome{" "}
                  <span className="text-sm font-bold text-primary">
                    {username}
                  </span>
                </div>
                <div className="flex gap-1 items-center text-xs text-orange-300">
                  <Coins />
                  {coin || 0}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary"
                  onClick={() => {
                    localStorage.clear();
                    logout();
                    window.location.reload();
                  }}
                >
                  <LogOut />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:text-primary"
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonLeave}
                    onClick={handleButtonClick}
                  >
                    {t("signIn")}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonLeave}
                    onClick={handleButtonClick}
                  >
                    {t("signUp")}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMobileMenuToggle}
              className="text-foreground"
            >
              {username && (
                <div className="flex gap-1 items-center text-lg text-orange-300">
                  <Coins />
                  {coin || 0}
                </div>
              )}
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div
              ref={menuRef}
              className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 border border-border"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.name.toLowerCase())}
                </Link>
              ))}

              <div className="flex gap-2 px-3 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLanguageToggle}
                  className="text-foreground hover:text-primary flex-1"
                >
                  <Globe className="h-4 w-4 mr-1" />{" "}
                  {language === "en" ? "አማ" : "EN"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleThemeToggle}
                  className="text-foreground hover:text-primary flex-1"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="px-3 py-2">
                {username ? (
                  <div className="flex items-center gap-4">
                    <Link href="/profile">
                      <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="text-xs">
                      Welcome{" "}
                      <span className="text-sm font-bold text-primary">
                        {username}
                      </span>
                    </div>
                    <div className="">
                      <Coins className="text-black" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-foreground hover:text-primary"
                      onClick={() => {
                        localStorage.clear();
                        router.refresh();
                      }}
                    >
                      <LogOut />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-foreground hover:text-primary"
                        onMouseEnter={handleButtonHover}
                        onMouseLeave={handleButtonLeave}
                        onClick={handleButtonClick}
                      >
                        {t("signIn")}
                      </Button>
                    </Link>
                    <Link href="/signup" className="flex-1">
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onMouseEnter={handleButtonHover}
                        onMouseLeave={handleButtonLeave}
                        onClick={handleButtonClick}
                      >
                        {t("signUp")}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
