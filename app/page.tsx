"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock,
  Users,
  Sparkles,
  Heart,
  ArrowRight,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export default function HomePage() {
  const { t } = useLanguage();

  const handleBooking = () => {
    window.location.href = "/booking";
  };

  const handleServices = () => {
    window.location.href = "/services";
  };

  const handleCall = () => {
    window.location.href = "tel:+251911123456";
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/ethiopian-beauty-model-with-professional-salon-styling.jpg"
            alt="Ethiopian Beauty Model with Professional Salon Styling"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/90"></div>

          <Tooltip open={true}>
            <TooltipTrigger asChild>
              <div
                className="
        fixed top-16 left-[40%] 
        w-10 h-10 bg-white/20  rounded-full
        bounce-anim
      "
              ></div>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              onClick={handleBooking}
              className="rounded-xl text-lg font-extralight border shadow-2xl text-black bg-white relative fade-in"
            >
              <p>Book Now</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="relative z-10 flex items-end justify-center h-full pb-20">
          <div className="text-center">
            <Badge className="mb-6 bg-accent/90 text-accent-foreground border border-accent/30 text-sm px-6 py-2 font-medium backdrop-blur-sm">
              {t("professionalHairStyling")}
            </Badge>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 text-balance leading-tight">
              <span className="text-foreground">{t("glam")}</span>
              <br />
              <span className="text-accent">{t("nest")}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
              {t("beautyMeetsInnovation")}
            </p>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center text-center py-20 space-y-16">
            <div className="relative max-w-4xl">
              <Badge className="mb-8 bg-accent text-accent-foreground border border-accent/30 text-sm px-6 py-2 font-medium animate-glow inline-flex">
                {t("completeBeutyExperience")}
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-balance leading-tight">
                <span className="text-foreground">{t("futureOf")}</span>
                <br />
                <span className="text-accent">{t("beautyWellness")}</span>
              </h1>

              <p className="text-xs font-light sm:text-xs mb-12 text-muted-foreground leading-relaxed font-light">
                {t("comprehensiveServices")}{" "}
                <span className="text-accent font-medium">
                  {t("glam")} {t("nest")}
                </span>
                .
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  onClick={handleBooking}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-medium group transition-all duration-300 hover:scale-105"
                >
                  {t("bookExperience")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleServices}
                  className="border-2 border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground px-10 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  {t("exploreServices")}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">500+</div>
                <div className="text-sm text-muted-foreground">
                  {t("happyClients")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">20+</div>
                <div className="text-sm text-muted-foreground">
                  {t("specialists")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1 flex items-center justify-center gap-1">
                  4.9 <Star className="h-4 w-4 fill-accent text-accent" />
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("rating")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {t("whyChooseUs")}
            </h2>
            <p className="text-xs  text-muted-foreground max-w-2xl mx-auto font-light">
              {t("completeSolutions")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center">
            <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-500 group hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  {t("advancedTech")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("advancedTechDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-500 group hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  {t("expertTeam")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("expertTeamDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-500 group hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  {t("customResults")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("customResultsDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-card-foreground mb-6">
              {t("clientExperience")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              {t("exceptionalVisit")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t("luxuryAmbiance"),
                icon: Sparkles,
                color: "accent",
                desc: t("luxuryAmbianceDesc"),
              },
              {
                title: t("premiumProducts"),
                icon: Heart,
                color: "primary",
                desc: t("premiumProductsDesc"),
              },
              {
                title: t("personalConsultation"),
                icon: Users,
                color: "accent",
                desc: t("personalConsultationDesc"),
              },
              {
                title: t("aftercareSupport"),
                icon: Clock,
                color: "primary",
                desc: t("aftercareSupportDesc"),
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group cursor-pointer border-0 bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-500 hover:scale-105"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${
                      feature.color === "accent"
                        ? "from-accent/20 to-accent/10"
                        : "from-primary/20 to-primary/10"
                    } rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon
                      className={`h-8 w-8 ${
                        feature.color === "accent"
                          ? "text-accent"
                          : "text-primary"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/about">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-medium group transition-all duration-300 hover:scale-105">
                {t("learnMoreAboutUs")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div
            className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-lg animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-primary-foreground">
            {t("readyToTransform")}
          </h2>
          <p className="text-xl mb-10 opacity-90 font-light max-w-2xl mx-auto text-primary-foreground">
            {t("experienceFuture")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={handleBooking}
              className="bg-white text-primary hover:bg-white/90 px-10 py-4 font-medium group transition-all duration-300 hover:scale-105"
            >
              <Clock className="h-5 w-5 mr-2" />
              {t("bookNow")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleCall}
              className="border-2 border-white/30 text-primary-foreground hover:bg-white hover:text-primary px-10 py-4 font-medium transition-all duration-300 hover:scale-105 bg-transparent"
            >
              {t("callNumber")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
