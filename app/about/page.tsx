import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Heart,
  Users,
  Star,
  Scissors,
  Sparkles,
  Clock,
  MapPin,
} from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Master Stylist & Owner",
    experience: "15+ years",
    specialties: ["Color Correction", "Bridal Styling", "Precision Cuts"],
    bio: "Sarah founded Luxe Salon with a vision to create a space where artistry meets luxury. With over 15 years of experience, she specializes in complex color corrections and bridal styling.",
    image: "professional female hair stylist with elegant appearance",
  },
  {
    name: "Michael Chen",
    role: "Senior Colorist",
    experience: "12+ years",
    specialties: ["Balayage", "Fashion Colors", "Color Theory"],
    bio: "Michael is our color expert, known for his innovative balayage techniques and ability to create stunning fashion colors while maintaining hair health.",
    image: "professional male hair colorist in modern salon",
  },
  {
    name: "Emma Rodriguez",
    role: "Style Director",
    experience: "10+ years",
    specialties: ["Curly Hair", "Texture Specialist", "Updos"],
    bio: "Emma brings expertise in working with all hair textures, specializing in curly hair care and creating beautiful updos for special occasions.",
    image: "professional female hair stylist specializing in curly hair",
  },
  {
    name: "David Kim",
    role: "Cutting Specialist",
    experience: "8+ years",
    specialties: ["Men's Cuts", "Precision Styling", "Beard Grooming"],
    bio: "David is our men's grooming expert, offering precision cuts and styling services tailored specifically for the modern gentleman.",
    image: "professional male hair stylist cutting men's hair",
  },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Beauty",
    description:
      "We believe everyone deserves to feel beautiful and confident. Our passion drives us to create looks that enhance your natural beauty.",
  },
  {
    icon: Star,
    title: "Excellence in Service",
    description:
      "We maintain the highest standards in everything we do, from our techniques to our customer service and salon environment.",
  },
  {
    icon: Users,
    title: "Client-Centered Approach",
    description:
      "Your satisfaction is our priority. We listen to your needs and work collaboratively to achieve your hair goals.",
  },
  {
    icon: Sparkles,
    title: "Continuous Innovation",
    description:
      "We stay current with the latest trends and techniques, continuously educating ourselves to offer you the best services.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Our Story
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-card-foreground mb-6 text-balance">
                Where Artistry Meets Luxury
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2019, Luxe Salon has been dedicated to providing
                exceptional hair services in an elegant, welcoming environment.
                Our team of expert stylists combines years of experience with
                the latest techniques to create beautiful, personalized looks
                for every client.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe that great hair is more than just a service—it's an
                art form that enhances your confidence and expresses your unique
                personality.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Meet Our Team
              </Button>
            </div>
            <div className="relative">
              <img
                src="/elegant-hair-salon-interior-with-modern-styling-ch.jpg?height=500&width=600&query=elegant modern hair salon interior with luxury styling chairs"
                alt="Luxe Salon Interior"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and shape the
              experience we create for our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-border bg-card hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              Our talented stylists bring years of experience and passion to
              every service, ensuring you receive the best care possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-border bg-background hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3">
                      <img
                        src={`/abstract-geometric-shapes.png?height=300&width=250&query=${member.image}`}
                        alt={member.name}
                        className="w-full h-64 sm:h-full object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="sm:w-2/3 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground">
                          {member.name}
                        </h3>
                        <Badge className="bg-accent/10 text-accent border-accent/20">
                          {member.experience}
                        </Badge>
                      </div>
                      <p className="text-primary font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {member.bio}
                      </p>
                      <div className="mb-4">
                        <h4 className="font-semibold text-foreground mb-2 text-sm">
                          Specialties:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials & Awards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Awards & Recognition
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're proud to be recognized for our excellence in hair styling
              and customer service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-border bg-card">
              <CardContent className="p-8">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Best Salon 2023
                </h3>
                <p className="text-muted-foreground">City Beauty Awards</p>
              </CardContent>
            </Card>

            <Card className="text-center border-border bg-card">
              <CardContent className="p-8">
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  5-Star Rating
                </h3>
                <p className="text-muted-foreground">Google Reviews & Yelp</p>
              </CardContent>
            </Card>

            <Card className="text-center border-border bg-card">
              <CardContent className="p-8">
                <Scissors className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  Certified Professionals
                </h3>
                <p className="text-muted-foreground">
                  Licensed & Insured Stylists
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Salon Info */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-6">
                Visit Our Salon
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    123 Beauty Street, Downtown City, ST 12345
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div className="text-muted-foreground">
                    <div>Monday - Friday: 9:00 AM - 8:00 PM</div>
                    <div>Saturday: 8:00 AM - 6:00 PM</div>
                    <div>Sunday: 10:00 AM - 5:00 PM</div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our modern salon features state-of-the-art equipment, premium
                products, and a relaxing atmosphere designed to make your visit
                as comfortable and enjoyable as possible.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Your Visit
              </Button>
            </div>
            <div className="relative">
              <img
                src="/elegant-hair-salon-interior-with-modern-styling-ch.jpg?height=400&width=600&query=luxury hair salon reception area with modern decor"
                alt="Salon Reception Area"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
