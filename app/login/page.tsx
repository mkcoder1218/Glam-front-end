"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useAppDispatch } from "@/store/hook"
import { userApi } from "@/store/api/userApi"
import { userSLice } from "@/store/slice/user"
import { authSLice } from "@/store/slice/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true) // Set loading state
    try {
      const result = await dispatch(authSLice?.actions?.signinAuth(formData))
localStorage?.setItem("token", result?.payload?.token) 
     if (result?.meta?.requestStatus === "fulfilled") { // Check if the login was successful
        router.push("/") // Navigate to the home page
      } else {
        console.error("Login failed:", result?.payload?.message || "Unknown error")
      }
    } catch (error) {
      console.error("An error occurred during login:", error)
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/10 rounded-full blur-lg animate-float" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/5 rounded-full blur-lg animate-float" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
        
          
          <div className="mb-6">
            <Badge className="bg-accent/90 text-accent-foreground border border-accent/30 text-sm px-4 py-2 font-medium backdrop-blur-sm">
              {t("welcomeBack")}
            </Badge>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("signInAccount")}
          </h1>
          <p className="text-muted-foreground">
            {t("continueBeautyJourney")}
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center text-xl font-semibold text-card-foreground flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              {t("login")}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t("emailAddress")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("enterEmail")}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-11 bg-background/50 border-border/50 focus:border-accent focus:ring-accent/20"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  {t("password")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("enterPassword")}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-11 bg-background/50 border-border/50 focus:border-accent focus:ring-accent/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border text-accent focus:ring-accent/20" />
                  <span className="text-muted-foreground">{t("rememberMe")}</span>
                </label>
                <Link href="/forgot-password" className="text-accent hover:text-accent/80 font-medium transition-colors">
                  {t("forgotPassword")}
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium group transition-all duration-300 hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t("signingIn")}
                  </div>
                ) : (
                  <>
                    {t("signIn")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t("orContinueWith")}</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-11 bg-background/50 border-border/50 hover:bg-accent/5 hover:border-accent/30">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-11 bg-background/50 border-border/50 hover:bg-accent/5 hover:border-accent/30">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-muted-foreground">
              {t("dontHaveAccount")}{" "}
              <Link href="/signup" className="text-accent hover:text-accent/80 font-medium transition-colors">
                {t("signUp")}
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer Link */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-accent transition-colors">
            ← {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  )
}