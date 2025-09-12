"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Scissors, Globe, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Booking", href: "/booking" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "am" : "en")
  }

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">Glam Nest</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <div className="w-8 h-8"></div> {/* Placeholder for theme button */}
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-foreground">Glam Nest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
              {t("home")}
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              {t("about")}
            </Link>
            <Link
              href="/services"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              {t("services")}
            </Link>
            <Link
              href="/gallery"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              {t("gallery")}
            </Link>
            <Link
              href="/booking"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              {t("booking")}
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className="text-foreground hover:text-primary"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === "en" ? "አማ" : "EN"}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeToggle}
              className="text-foreground hover:text-primary"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">{t("bookNow")}</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 border border-border">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t("home")}
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t("about")}
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t("services")}
              </Link>
              <Link
                href="/gallery"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t("gallery")}
              </Link>
              <Link
                href="/booking"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {t("booking")}
              </Link>

              <div className="flex gap-2 px-3 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLanguageToggle}
                  className="text-foreground hover:text-primary flex-1"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  {language === "en" ? "አማ" : "EN"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleThemeToggle}
                  className="text-foreground hover:text-primary flex-1"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>

              <div className="px-3 py-2">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  {t("bookNow")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
