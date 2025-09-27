"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "am"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: any
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    services: "Services",
    gallery: "Gallery",
    booking: "Booking",
    bookNow: "Book Now",

    // Homepage
    professionalHairStyling: "Professional Hair Styling",
    glam: "Glam",
    nest: "Nest",
    beautyMeetsInnovation: "Where beauty meets innovation",
    completeBeutyExperience: "Complete Beauty Experience",
    futureOf: "Future of",
    beautyWellness: "Beauty & Wellness",
    comprehensiveServices:
      "Experience comprehensive beauty services with cutting-edge techniques. Hair, nails, skincare, and wellness all at",
    bookExperience: "Book Experience",
    exploreServices: "Explore Services",
    happyClients: "Happy Clients",
    specialists: "Specialists",
    rating: "Rating",
    whyChooseUs: "Why Choose Us",
    completeSolutions: "Complete beauty solutions, premium results, personalized experience",
    advancedTech: "Advanced Tech",
    advancedTechDesc: "State-of-the-art tools and techniques for precision styling and optimal results.",
    expertTeam: "Expert Team",
    expertTeamDesc: "Certified professionals trained in the latest styling innovations and trends.",
    customResults: "Custom Results",
    customResultsDesc: "Personalized styling solutions tailored to your unique features and lifestyle.",
    clientExperience: "Client Experience",
    exceptionalVisit: "What makes your visit to Glam Nest truly exceptional",
    luxuryAmbiance: "Luxury Ambiance",
    luxuryAmbianceDesc: "Relaxing environment designed for your comfort",
    premiumProducts: "Premium Products",
    premiumProductsDesc: "Only the finest beauty products and tools",
    personalConsultation: "Personal Consultation",
    personalConsultationDesc: "One-on-one styling consultation included",
    aftercareSupport: "Aftercare Support",
    aftercareSupportDesc: "Ongoing styling tips and maintenance advice",
    learnMoreAboutUs: "Learn More About Us",
    readyToTransform: "Ready to Transform?",
    experienceFuture: "Experience the future of beauty and wellness. Book your complete makeover today.",
    callNumber: "Call (555) 123-4567",

    // Authentication
    welcomeBack: "Welcome Back",
    signInAccount: "Sign in to your account",
    continueBeautyJourney: "Continue your beauty journey with us",
    login: "Login",
    emailAddress: "Email Address",
    enterEmail: "Enter your email",
    password: "Password",
    enterPassword: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    signingIn: "Signing in...",
    orContinueWith: "or continue with",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign Up",
    backToHome: "Back to Home",
    
    joinCommunity: "Join Our Community",
    createAccount: "Create your account",
    startBeautyJourney: "Start your beauty journey today",
    firstName: "First Name",
    lastName: "Last Name",
    enterFirstName: "Enter first name",
    enterLastName: "Enter last name",
    phoneNumber: "Phone Number",
    enterPhone: "Enter phone number",
    confirmPassword: "Confirm Password",
    passwordRequirements: "Password Requirements",
    minLength: "8+ characters",
    uppercase: "Uppercase letter",
    lowercase: "Lowercase letter",
    number: "Number",
    passwordsDontMatch: "Passwords don't match",
    agreeToTerms: "I agree to the",
    termsAndConditions: "Terms and Conditions",
    and: "and",
    privacyPolicy: "Privacy Policy",
    subscribeNewsletter: "Subscribe to newsletter for beauty tips and offers",
    creatingAccount: "Creating account...",
    alreadyHaveAccount: "Already have an account?",
  },
  am: {
    // Navigation
    home: "ቤት",
    about: "ስለ እኛ",
    services: "አገልግሎቶች",
    gallery: "ምስሎች",
    booking: "ቀጠሮ",
    bookNow: "አሁን ይመዝገቡ",

    // Homepage
    professionalHairStyling: "ሙያዊ የፀጉር አሰራር",
    glam: "ግላም",
    nest: "ኔስት",
    beautyMeetsInnovation: "ውበት ከፈጠራ ጋር የሚገናኝበት",
    completeBeutyExperience: "ሙሉ የውበት ተሞክሮ",
    futureOf: "የወደፊቱ",
    beautyWellness: "ውበት እና ጤንነት",
    comprehensiveServices: "ዘመናዊ ቴክኒኮችን በመጠቀም ሙሉ የውበት አገልግሎቶችን ይለማመዱ። ፀጉር፣ ጥፍር፣ የቆዳ እንክብካቤ እና ጤንነት በሙሉ በ",
    bookExperience: "ተሞክሮ ይመዝገቡ",
    exploreServices: "አገልግሎቶችን ይመልከቱ",
    happyClients: "ደስተኛ ደንበኞች",
    specialists: "ባለሙያዎች",
    rating: "ደረጃ",
    whyChooseUs: "ለምን እኛን ይመርጡ",
    completeSolutions: "ሙሉ የውበት መፍትሄዎች፣ ከፍተኛ ውጤቶች፣ የግል ተሞክሮ",
    advancedTech: "ዘመናዊ ቴክኖሎጂ",
    advancedTechDesc: "ለትክክለኛ አሰራር እና ምርጥ ውጤቶች ዘመናዊ መሳሪያዎች እና ቴክኒኮች።",
    expertTeam: "ባለሙያ ቡድን",
    expertTeamDesc: "በአዳዲስ የአሰራር ፈጠራዎች እና አዝማሚያዎች የሰለጠኑ የተመሰከረላቸው ባለሙያዎች።",
    customResults: "ብጁ ውጤቶች",
    customResultsDesc: "ለእርስዎ ልዩ ባህሪያት እና የአኗኗር ዘይቤ የተበጁ የግል አሰራር መፍትሄዎች።",
    clientExperience: "የደንበኛ ተሞክሮ",
    exceptionalVisit: "የግላም ኔስት ጉብኝትዎን በእውነት ልዩ የሚያደርገው ነገር",
    luxuryAmbiance: "የቅንጦት ሁኔታ",
    luxuryAmbianceDesc: "ለእርስዎ ምቾት የተነደፈ የመዝናኛ አካባቢ",
    premiumProducts: "ከፍተኛ ጥራት ያላቸው ምርቶች",
    premiumProductsDesc: "ምርጥ የውበት ምርቶች እና መሳሪያዎች ብቻ",
    personalConsultation: "የግል ምክክር",
    personalConsultationDesc: "አንድ ለአንድ የአሰራር ምክክር ተካትቷል",
    aftercareSupport: "የድህረ እንክብካቤ ድጋፍ",
    aftercareSupportDesc: "ቀጣይ የአሰራር ምክሮች እና የጥገና ምክር",
    learnMoreAboutUs: "ስለ እኛ የበለጠ ይወቁ",
    readyToTransform: "ለመለወጥ ዝግጁ ነዎት?",
    experienceFuture: "የወደፊቱን የውበት እና ጤንነት ይለማመዱ። ዛሬ ሙሉ ለሙሉ የመለወጥ ሂደትዎን ይመዝገቡ።",
    callNumber: "ይደውሉ (555) 123-4567",

    // Authentication
    welcomeBack: "እንኳን ተመለሱ",
    signInAccount: "መለያዎ ውስጥ ይግቡ",
    continueBeautyJourney: "የውበት ጉዞዎን ከእኛ ጋር ይቀጥሉ",
    login: "መግቢያ",
    emailAddress: "የኢሜይል አድራሻ",
    enterEmail: "ኢሜይልዎን ያስገቡ",
    password: "የይለፍ ቃል",
    enterPassword: "የይለፍ ቃልዎን ያስገቡ",
    rememberMe: "አስታውሰኝ",
    forgotPassword: "የይለፍ ቃል ረሱ?",
    signIn: "ግባ",
    signingIn: "በመግባት ላይ...",
    orContinueWith: "ወይም በመጠቀም ይቀጥሉ",
    dontHaveAccount: "መለያ የለዎትም?",
    signUp: "ይመዝገቡ",
    backToHome: "ወደ ቤት ተመለስ",
    
    joinCommunity: "ማህበረሰባችንን ይቀላቀሉ",
    createAccount: "መለያዎን ይፍጠሩ",
    startBeautyJourney: "የውበት ጉዞዎን ዛሬ ይጀምሩ",
    firstName: "የመጀመሪያ ስም",
    lastName: "የአባት ስም",
    enterFirstName: "የመጀመሪያ ስም ያስገቡ",
    enterLastName: "የአባት ስም ያስገቡ",
    phoneNumber: "ስልክ ቁጥር",
    enterPhone: "ስልክ ቁጥር ያስገቡ",
    confirmPassword: "የይለፍ ቃል አረጋግጥ",
    passwordRequirements: "የይለፍ ቃል መስፈርቶች",
    minLength: "8+ ቁምፊዎች",
    uppercase: "ትልቅ ፊደል",
    lowercase: "ትንሽ ፊደል",
    number: "ቁጥር",
    passwordsDontMatch: "የይለፍ ቃሎች አይመሳሰሉም",
    agreeToTerms: "እስማማለሁ",
    termsAndConditions: "ውሎች እና ሁኔታዎች",
    and: "እና",
    privacyPolicy: "የግላዊነት ፖሊሲ",
    subscribeNewsletter: "ለውበት ምክሮች እና አቅርቦቶች ኒውዝሌተር ይመዝገቡ",
    creatingAccount: "መለያ በመፍጠር ላይ...",
    alreadyHaveAccount: "አስቀድሞ መለያ አለዎት?",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
  }

  const t = (key: string): string => {
    const translation = translations[language][key as keyof (typeof translations)["en"]] || key
    return translation
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
