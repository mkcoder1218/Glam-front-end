"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"

const services = [
  { id: "precision-cut", name: "Precision Cut", duration: "60 min", price: 85 },
  { id: "luxury-cut", name: "Luxury Cut & Style", duration: "90 min", price: 125 },
  { id: "full-color", name: "Full Color", duration: "2-3 hours", price: 150 },
  { id: "highlights", name: "Highlights & Lowlights", duration: "2-4 hours", price: 180 },
  { id: "balayage", name: "Balayage", duration: "3-4 hours", price: 220 },
  { id: "blowout", name: "Blowout & Style", duration: "45 min", price: 65 },
  { id: "updo", name: "Updo & Formal Styling", duration: "90 min", price: 120 },
  { id: "keratin", name: "Keratin Treatment", duration: "2-3 hours", price: 280 },
]

const stylists = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    role: "Master Stylist & Owner",
    specialties: ["Color Correction", "Bridal Styling"],
  },
  { id: "michael", name: "Michael Chen", role: "Senior Colorist", specialties: ["Balayage", "Fashion Colors"] },
  { id: "emma", name: "Emma Rodriguez", role: "Style Director", specialties: ["Curly Hair", "Updos"] },
  { id: "david", name: "David Kim", role: "Cutting Specialist", specialties: ["Men's Cuts", "Precision Styling"] },
]

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
]

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    service: "",
    stylist: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  })

  const totalSteps = 4

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Booking submitted:", formData)
    setCurrentStep(5) // Show confirmation
  }

  const selectedService = services.find((s) => s.id === formData.service)
  const selectedStylist = stylists.find((s) => s.id === formData.stylist)

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Service</h2>
              <p className="text-muted-foreground">Choose the service you'd like to book</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.service === service.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setFormData({ ...formData, service: service.id })}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {service.duration}
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-primary">From ${service.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Stylist</h2>
              <p className="text-muted-foreground">Select your preferred stylist or let us choose for you</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Card
                className={`cursor-pointer transition-all duration-200 ${
                  formData.stylist === "any" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => setFormData({ ...formData, stylist: "any" })}
              >
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Any Available Stylist</h3>
                      <p className="text-sm text-muted-foreground">
                        We'll match you with the best stylist for your service
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {stylists.map((stylist) => (
                <Card
                  key={stylist.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.stylist === stylist.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setFormData({ ...formData, stylist: stylist.id })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <img
                        src={`/abstract-geometric-shapes.png?height=48&width=48&query=professional hair stylist portrait`}
                        alt={stylist.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{stylist.name}</h3>
                        <p className="text-sm text-primary mb-1">{stylist.role}</p>
                        <div className="flex flex-wrap gap-1">
                          {stylist.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Select Date & Time</h2>
              <p className="text-muted-foreground">Choose your preferred appointment time</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-foreground mb-2 block">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Preferred Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-sm font-medium text-foreground mb-2 block">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Preferred Time
                </Label>
                <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Contact Information</h2>
              <p className="text-muted-foreground">We'll use this information to confirm your appointment</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-foreground mb-2 block">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-foreground mb-2 block">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-foreground mb-2 block">
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Special Requests or Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special requests, allergies, or additional information..."
                rows={4}
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground">
                Thank you for booking with Luxe Salon. We'll send you a confirmation email shortly.
              </p>
            </div>
            <Card className="border-border bg-card text-left">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium text-card-foreground">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stylist:</span>
                  <span className="font-medium text-card-foreground">
                    {formData.stylist === "any" ? "Any Available" : selectedStylist?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time:</span>
                  <span className="font-medium text-card-foreground">
                    {formData.date} at {formData.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium text-card-foreground">{selectedService?.duration}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-muted-foreground">Estimated Price:</span>
                  <span className="font-bold text-primary">${selectedService?.price}</span>
                </div>
              </CardContent>
            </Card>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => (window.location.href = "/")}
            >
              Return to Home
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.service !== ""
      case 2:
        return formData.stylist !== ""
      case 3:
        return formData.date !== "" && formData.time !== ""
      case 4:
        return formData.firstName !== "" && formData.lastName !== "" && formData.email !== "" && formData.phone !== ""
      default:
        return false
    }
  }

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">{renderStepContent()}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Book Appointment</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-card-foreground mb-6 text-balance">Schedule Your Visit</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Book your appointment in just a few simple steps. Our team is ready to create the perfect look for you.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step <= currentStep
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <Card className="border-border bg-card">
            <CardContent className="p-8">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-border text-foreground hover:bg-secondary bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Confirm Booking
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
