import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scissors, Palette, Sparkles, Heart, Clock, Star, Users } from "lucide-react"

const services = [
  {
    category: "Hair Cutting",
    icon: Scissors,
    services: [
      {
        name: "Precision Cut",
        description:
          "Expert cutting techniques tailored to your face shape and lifestyle. Includes consultation, wash, cut, and style.",
        duration: "60 min",
        price: "From $85",
        image: "professional precision hair cutting with expert stylist",
        popular: false,
      },
      {
        name: "Luxury Cut & Style",
        description: "Premium cutting service with deep conditioning treatment, scalp massage, and signature styling.",
        duration: "90 min",
        price: "From $125",
        image: "luxury hair cutting service with premium styling",
        popular: true,
      },
      {
        name: "Trim & Touch-up",
        description:
          "Quick maintenance cut to keep your style fresh. Perfect for regular upkeep between full services.",
        duration: "30 min",
        price: "From $45",
        image: "hair trim and touch up service",
        popular: false,
      },
    ],
  },
  {
    category: "Color Services",
    icon: Palette,
    services: [
      {
        name: "Full Color",
        description:
          "Complete color transformation using premium products. Includes color consultation and protective treatment.",
        duration: "2-3 hours",
        price: "From $150",
        image: "full hair color transformation service",
        popular: false,
      },
      {
        name: "Highlights & Lowlights",
        description:
          "Natural-looking dimension with expertly placed highlights and lowlights. Customized to your skin tone.",
        duration: "2-4 hours",
        price: "From $180",
        image: "hair highlights and lowlights coloring service",
        popular: true,
      },
      {
        name: "Balayage",
        description: "Hand-painted highlights for a natural, sun-kissed look. Low maintenance with beautiful grow-out.",
        duration: "3-4 hours",
        price: "From $220",
        image: "balayage hair coloring technique",
        popular: true,
      },
      {
        name: "Root Touch-up",
        description: "Quick color refresh for roots. Maintains your existing color between full services.",
        duration: "60 min",
        price: "From $75",
        image: "hair root touch up color service",
        popular: false,
      },
    ],
  },
  {
    category: "Styling & Special Occasions",
    icon: Sparkles,
    services: [
      {
        name: "Blowout & Style",
        description:
          "Professional blowout with your choice of styling. Perfect for special events or everyday glamour.",
        duration: "45 min",
        price: "From $65",
        image: "professional hair blowout and styling service",
        popular: false,
      },
      {
        name: "Updo & Formal Styling",
        description: "Elegant updos and formal hairstyles for weddings, proms, and special events. Includes trial run.",
        duration: "90 min",
        price: "From $120",
        image: "elegant updo and formal hair styling",
        popular: false,
      },
      {
        name: "Bridal Hair Package",
        description: "Complete bridal hair experience including trial, wedding day styling, and touch-up kit.",
        duration: "4 hours",
        price: "From $350",
        image: "bridal hair styling package for wedding",
        popular: false,
      },
    ],
  },
  {
    category: "Treatments & Care",
    icon: Heart,
    services: [
      {
        name: "Deep Conditioning Treatment",
        description:
          "Intensive moisture treatment to restore damaged hair. Includes scalp massage and protective styling.",
        duration: "45 min",
        price: "From $55",
        image: "deep conditioning hair treatment service",
        popular: false,
      },
      {
        name: "Keratin Treatment",
        description: "Smoothing treatment that reduces frizz and adds shine. Results last 3-4 months.",
        duration: "2-3 hours",
        price: "From $280",
        image: "keratin hair smoothing treatment",
        popular: true,
      },
      {
        name: "Scalp Treatment",
        description: "Therapeutic scalp treatment to promote healthy hair growth and relieve tension.",
        duration: "30 min",
        price: "From $40",
        image: "therapeutic scalp treatment and massage",
        popular: false,
      },
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Professional Hair Services</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-card-foreground mb-6 text-balance">
            Our Signature Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From precision cuts to vibrant colors, we offer a comprehensive range of professional hair services designed
            to enhance your natural beauty and boost your confidence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">{category.category}</h2>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <Card
                    key={serviceIndex}
                    className="group hover:shadow-lg transition-all duration-300 border-border bg-card relative overflow-hidden"
                  >
                    {service.popular && (
                      <Badge className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground">Popular</Badge>
                    )}

                    <div className="aspect-video overflow-hidden">
                      <img
                        src={`/abstract-geometric-shapes.png?height=200&width=400&query=${service.image}`}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-card-foreground">{service.name}</CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{service.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.duration}
                        </div>
                        <div className="text-lg font-semibold text-primary">{service.price}</div>
                      </div>

                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="sm">
                        Book This Service
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">Additional Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We also offer specialized services to complete your beauty experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Hair Extensions",
                description: "Premium quality extensions for length and volume",
                icon: Sparkles,
              },
              {
                name: "Eyebrow Shaping",
                description: "Professional eyebrow trimming and shaping",
                icon: Star,
              },
              {
                name: "Makeup Application",
                description: "Special event makeup by certified artists",
                icon: Heart,
              },
              {
                name: "Group Bookings",
                description: "Special packages for bridal parties and events",
                icon: Users,
              },
            ].map((service, index) => (
              <Card key={index} className="text-center border-border bg-background hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">Pricing Information</h3>
            <p className="text-muted-foreground mb-6">
              All prices are starting rates and may vary based on hair length, thickness, and specific requirements. We
              provide detailed consultations to give you accurate pricing for your desired service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Schedule Consultation</Button>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
                Call for Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
