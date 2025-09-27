"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { encodeQuery } from "@/utils/utils"
import { serviceSlice } from "@/store/slice/service"
import { showSuccessToast, showErrorToast } from "@/styles/toast"
import { bookingApi, bookingServicesApi } from "@/store/api/booking"
import { authSLice } from "@/store/slice/auth"

// Mocked time slots
const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
]

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)

  // People & services
  const [numPeople, setNumPeople] = useState(1)
  const [peopleServices, setPeopleServices] = useState<
    Record<number, { serviceIds: string[]; personType: "Adult" | "Child" }>
  >({ 1: { serviceIds: [], personType: "Adult" } })

  // Category + pagination
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const limit = 10

  const dispatch = useAppDispatch()
  const services = useAppSelector((state) => (state?.service?.items as any)?.data) || []
  const totalServices = useAppSelector((state) => (state?.service?.items as any)?.total) || 0
  const categories = useAppSelector((state) => (state?.serviceCategory?.items as any)?.data) || []

  const [formData, setFormData] = useState({ date: "", time: "" })
  const [promoCode, setPromoCode] = useState("")

  const totalSteps = 3

  // Fetch services
  useEffect(() => {
    const query = encodeQuery({
      filters: selectedCategory ? { category_id: selectedCategory } : {},
      limit,
      offset: (page - 1) * limit,
      include: [{ model: "File", as: "File" }],
    })
    dispatch(serviceSlice.actions.fetchAllServices(query))
  }, [selectedCategory, page, dispatch])

  // Handlers
  const handleServiceToggle = (personIndex: number, serviceId: string) => {
    setPeopleServices((prev) => {
      const current = prev[personIndex] || { serviceIds: [], personType: "Adult" }
      const exists = current.serviceIds.includes(serviceId)
      const updatedIds = exists
        ? current.serviceIds.filter((id) => id !== serviceId)
        : [...current.serviceIds, serviceId]
      return { ...prev, [personIndex]: { ...current, serviceIds: updatedIds } }
    })
  }

  const handlePersonTypeChange = (personIndex: number, type: "Adult" | "Child") => {
    setPeopleServices((prev) => ({
      ...prev,
      [personIndex]: { ...prev[personIndex], personType: type },
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  // Submit booking using APIs
  const handleSubmit = async () => {
    const user = await dispatch(authSLice.actions.getProfileAuth()).unwrap()
    try {
      const bookingServicesPayload = Object.entries(peopleServices).flatMap(([_, { serviceIds, personType }]) =>
        serviceIds.map((serviceId) => {
          const service = services.find((s: any) => s.id === serviceId)
          return {
            service_id: service?.id,
            price: service?.price,
            duration: service?.duration,
            person_type: personType,
          }
        })
      )

      const totalPrice = bookingServicesPayload.reduce((sum, s) => sum + Number(s.price), 0)

      const bookingPayload = {
        user_id: user?.user?.id,
        service_id: bookingServicesPayload[0]?.service_id || "",
        date: formData.date,
        time: formData.time,
        promo_code_id: promoCode || null,
        price: String(totalPrice),
        status: "Pending",
        service_details: {
          adultNumber: numPeople,
          serviceIds: bookingServicesPayload.map((s) => s.service_id),
        },
      }

      const booking = await bookingApi.createItem(bookingPayload)
      const bookingId = booking?.id || (booking as any)?.data?.id

      for (const bs of bookingServicesPayload) {
        await bookingServicesApi.createItem({
          booking_id: bookingId,
          service_id: bs.service_id,
          price: Number(bs.price),
          duration: Number(bs.duration),
          person_type: bs.person_type,
        })
      }

      showSuccessToast("Booking successfully created!")
      setCurrentStep(4) // success step
    } catch (error) {
      console.error(error)
      showErrorToast("Error creating booking.")
    }
  }

  // Validation
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return Object.values(peopleServices).every((p) => p.serviceIds.length > 0)
      case 2:
        return formData.date !== "" && formData.time !== ""
      case 3:
        return true
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Select Services</h2>
              <p className="text-muted-foreground">
                Choose how many people and assign one or more services to each
              </p>
            </div>

            {/* Number of people */}
            <div className="flex items-center gap-4 mb-4">
              <span className="font-medium">How many people?</span>
              <Select
                value={String(numPeople)}
                onValueChange={(val) => {
                  const n = parseInt(val)
                  setNumPeople(n)
                  const updated: Record<number, { serviceIds: string[]; personType: "Adult" }> = {}
                  for (let i = 1; i <= n; i++) {
                    updated[i] = peopleServices[i] || { serviceIds: [], personType: "Adult" }
                  }
                  setPeopleServices(updated)
                }}
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category filter */}
            <div className="flex justify-end mb-4">
              <Select
                value={selectedCategory ?? "all"}
                onValueChange={(value) => {
                  setSelectedCategory(value === "all" ? null : value)
                  setPage(1)
                }}
              >
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Services per person */}
            {[...Array(numPeople)].map((_, i) => {
              const person = peopleServices[i + 1] || { serviceIds: [], personType: "Adult" }
              return (
                <div key={i} className="mb-6 space-y-2">
                  <h3 className="font-semibold mb-2">Person {i + 1}</h3>

                  {/* Person type */}
                  <div className="flex gap-4 mb-2">
                    {(["Adult", "Child"] as const).map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`person-type-${i + 1}`}
                          value={type}
                          checked={person.personType === type}
                          onChange={() => handlePersonTypeChange(i + 1, type)}
                        />
                        {type}
                      </label>
                    ))}
                  </div>

                  {/* Services */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service: any) => {
                      const selected = person.serviceIds.includes(service.id)
                      return (
                        <Card
                          key={service.id}
                          className={`cursor-pointer transition-all ${
                            selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => handleServiceToggle(i + 1, service.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold">{service.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {service.duration} min
                              </Badge>
                            </div>
                            <p className="text-lg font-bold text-primary">${service.price}</p>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              <p className="text-sm text-muted-foreground">
                Page {page} of {Math.ceil(totalServices / limit) || 1}
              </p>
              <Button
                variant="outline"
                disabled={page * limit >= totalServices}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-4">Choose Date & Time</h2>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={formData.time === time ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, time })}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {time}
                </Button>
              ))}
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Promo Code (optional)"
                className="border p-2 rounded w-full"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-blue-500" />
            <h2 className="text-2xl font-bold">Confirm Your Booking</h2>
            <div className="space-y-2 text-left">
              {Object.entries(peopleServices).map(([person, { serviceIds, personType }]) => (
                <p key={person}>
                  <strong>Person {person} ({personType}):</strong>{" "}
                  {serviceIds.map((id) => services.find((s: any) => s.id === id)?.name || "Unknown").join(", ")}
                </p>
              ))}
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Time:</strong> {formData.time}</p>
              {promoCode && <p><strong>Promo Code:</strong> {promoCode}</p>}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold">Booking Successful!</h2>
            <p>Your booking has been created successfully.</p>
            <Button onClick={() => setCurrentStep(1)}>Make Another Booking</Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Progress */}
          {currentStep <= 3 && (
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((step) => (
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
          )}

          <Card>
            <CardContent className="p-8">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation */}
          {currentStep <= 3 && (
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              {currentStep < totalSteps ? (
                <Button onClick={handleNext} disabled={!canProceed()}>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!canProceed()}>
                  Confirm Booking <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
