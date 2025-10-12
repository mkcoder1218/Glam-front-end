"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Lock, Phone, ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useAppDispatch } from "@/store/hook"
import { authSLice } from "@/store/slice/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await dispatch(authSLice?.actions?.signinAuth(formData))
      localStorage?.setItem("token", result?.payload?.token)
      if (result?.meta?.requestStatus === "fulfilled") {
    setTimeout(() => {
      window.location.href = "/"; // forces full reload
    }, 50);
     } else {
        console.error("Login failed:", result?.payload?.message || "Unknown error")
      }
    } catch (error) {
      console.error("An error occurred during login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/10 rounded-lg blur-lg animate-float" style={{ animationDelay: "1.5s" }}></div>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("signInAccount")}</h1>
          <p className="text-muted-foreground">{t("continueBeautyJourney")}</p>
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
              {/* Phone Number Input */}
              <div className="space-y-2">
                <Label htmlFor="phone_number" className="text-sm font-medium text-foreground">
                  {t("phoneNumber")}
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    placeholder={t("enterPhoneNumber") || "Enter your phone number"}
                    value={formData.phone_number}
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

            {/* Sign Up Link */}
            <div className="text-center text-sm text-muted-foreground mt-4">
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
