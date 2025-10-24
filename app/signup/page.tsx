"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Lock, User, ArrowRight, Sparkles, Phone, Gift } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { authSLice } from "@/store/slice/auth"
import { roleSLice } from "@/store/slice/role"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const router=useRouter()
  // Get roles from store
  const roleState = useAppSelector((state: any) => state.role)
  
  useEffect(() => {
    dispatch(roleSLice?.actions?.fetchAllSelectedrole())
  }, [])
  
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    role_id: "",
    code:""
    
  })
  
  // Automatically assign "User" role
  useEffect(() => {
    if (roleState?.items?.data?.length > 0) {
      const userRole = roleState.items?.data?.find((role: any) => role.name === "User")
      if (userRole) {
        setFormData(prev => ({ ...prev, role_id: userRole?.id }))
      }
    }
  }, [roleState?.items])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const signupData = {
      name: formData.name,
      phone_number: formData.phone_number,
      password: formData.password,
      role_id: formData.role_id,
      code:formData.code,
      status:'Active'
    }

    dispatch(authSLice?.actions?.signupAuth(signupData)).unwrap().then(()=>{
      router.push('/login')
    })
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log("Signup attempt:", signupData)
  }

  // New simple password rule
  const isPasswordValid = formData.password.length > 4
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== ""

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/10 rounded-full blur-lg animate-float" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-accent/5 rounded-full blur-lg animate-float" style={{ animationDelay: "3s" }}></div>
        <div className="absolute bottom-1/3 left-10 w-20 h-20 bg-primary/5 rounded-full blur-lg animate-float" style={{ animationDelay: "4.5s" }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Badge className="bg-accent/90 text-accent-foreground border border-accent/30 text-sm px-4 py-2 font-medium backdrop-blur-sm">
              {t("joinCommunity")}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("createAccount")}</h1>
          <p className="text-muted-foreground">{t("startBeautyJourney")}</p>
        </div>

        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center text-xl font-semibold text-card-foreground flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              {t("signUp")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">{t("name")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("enterName") || "Enter your name"}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 h-11 bg-background/50 border-border/50 focus:border-accent focus:ring-accent/20"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone_number" className="text-sm font-medium text-foreground">{t("phoneNumber")}</Label>
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
              {/* Promo code */}

  <div className="space-y-2">
                <Label htmlFor="promo_code" className="text-sm font-medium text-foreground">{t("promoCode") || "Promo Code"}</Label>
                <div className="relative">
                  <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="code"
                    name="code"
                    type="text"
                    placeholder={t("enterPromoCode") || "Enter promo code"}
                    value={formData.code}
                    onChange={handleInputChange}
                    className="pl-10 h-11 bg-background/50 border-border/50 focus:border-accent focus:ring-accent/20"
                  />
                </div>
              </div>
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">{t("password")}</Label>
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
                {formData.password && !isPasswordValid && (
                  <p className="text-xs text-destructive">{t("passwordTooShort") || "Password must be more than 4 characters"}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">{t("confirmPassword") || "Confirm Password"}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("confirmPassword") || "Confirm your password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 h-11 bg-background/50 border-border/50 focus:border-accent focus:ring-accent/20 ${
                      formData.confirmPassword && !passwordsMatch ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formData.confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-destructive">{t("passwordsDontMatch") || "Passwords don't match"}</p>
                )}
              </div>

              {/* Hidden Role ID */}
              <input type="" name="role_id" value={formData.role_id} />

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading || !isPasswordValid || !passwordsMatch || !formData.role_id}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium group transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t("creatingAccount")}
                  </div>
                ) : (
                  <>
                    {t("createAccount")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center text-sm text-muted-foreground mt-4">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/login" className="text-accent hover:text-accent/80 font-medium transition-colors">
                {t("signIn")}
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-accent transition-colors">← {t("backToHome")}</Link>
        </div>
      </div>
    </div>
  )
}
