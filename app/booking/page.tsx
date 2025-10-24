"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Users,
  Calendar,
  Gift,
} from "lucide-react";
import { gsap } from "gsap";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { encodeQuery } from "@/utils/utils";
import { serviceSlice } from "@/store/slice/service";
import { showSuccessToast, showErrorToast } from "@/styles/toast";
import { bookingApi, bookingServicesApi } from "@/store/api/booking";
import { authSLice } from "@/store/slice/auth";
import { serviceCategorySlice } from "@/store/slice/service-category";
import { serviceTypeSlice } from "@/store/slice/service-type";

// Mocked time slots
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
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  // People & services
  const [numPeople, setNumPeople] = useState(1);
  const [peopleServices, setPeopleServices] = useState<
    Record<
      number,
      {
        personType: "Adult" | "Child";
        selectedServices: Record<string, number>;
        selectedCategory: string | null;
        selectedType: string | null;
      }
    >
  >({
    1: {
      personType: "Adult",
      selectedServices: {},
      selectedCategory: null,
      selectedType: null,
    },
  });

  // Global filters for pagination
  const [page, setPage] = useState(1);
  const limit = 10;
const discountPromo=useAppSelector((state)=>state.promodiscount)
  const dispatch = useAppDispatch();
  const services =
    useAppSelector((state) => (state?.service?.items as any)?.data) || [];
  const totalServices =
    useAppSelector((state) => (state?.service?.items as any)?.total) || 0;
  const categories =
    useAppSelector((state) => (state?.serviceCategory?.items as any)?.data) ||
    [];
  const serviceTypes =
    useAppSelector((state) => (state?.serviceType?.items as any)?.data) || [];

  const [formData, setFormData] = useState({ date: "", time: "" });
  const [promoCode, setPromoCode] = useState("");
  const totalSteps = 3;
  console.log('discount promo',discountPromo)
function isDiscountExpired(validUntil: string): boolean {
  const expiryDate = new Date(validUntil);
  const today = new Date();

  // Set time of both dates to midnight for accurate comparison
  expiryDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return today > expiryDate;
}
  const animateSelection = (element: HTMLElement) => {
    gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  };

  const animateFadeIn = (element: HTMLElement) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  };

  // Fetch categories and types
  useEffect(() => {
    dispatch(serviceCategorySlice.actions.fetchAllServiceCategory());
    dispatch(serviceTypeSlice.actions.fetchAllCategorytype());
  }, [dispatch]);

  // Fetch services with combined filters from all people
  useEffect(() => {
    // Combine filters from all people
    const allCategoryIds = Object.values(peopleServices)
      .map((person) => person.selectedCategory)
      .filter(Boolean) as string[];

    const allTypeIds = Object.values(peopleServices)
      .map((person) => person.selectedType)
      .filter(Boolean) as string[];

    const filters: any = {};

    // If any person has selected categories/types, apply them as OR filters
    if (allCategoryIds.length > 0) {
      filters.category_id = allCategoryIds;
    }

    if (allTypeIds.length > 0) {
      filters.type_id = allTypeIds;
    }

    const query = encodeQuery({
      filters: Object.keys(filters).length > 0 ? filters : {},
      limit,
      offset: (page - 1) * limit,
      include: [{ model: "File", as: "File" }],
    });
    dispatch(serviceSlice.actions.fetchAllServices(query));
  }, [peopleServices, page, dispatch]);

  // Animate on step change
  useEffect(() => {
    const content = document.querySelector(".step-content");
    if (content) {
      animateFadeIn(content as HTMLElement);
    }
  }, [currentStep]);

  const isPerWig = (service: any) =>
    service.description?.toLowerCase().includes("per wig");

  // Handlers
  const handleServiceToggle = (personIndex: number, serviceId: string) => {
    setPeopleServices((prev) => {
      const current = prev[personIndex] || {
        personType: "Adult" as const,
        selectedServices: {},
        selectedCategory: null,
        selectedType: null,
      };
      const selectedServices = { ...current.selectedServices };
      if (selectedServices[serviceId]) {
        delete selectedServices[serviceId];
      } else {
        selectedServices[serviceId] = 1;
      }
      return {
        ...prev,
        [personIndex]: {
          ...current,
          selectedServices,
        },
      };
    });
  };

  const handleQuantityChange = (
    personIndex: number,
    serviceId: string,
    quantity: number
  ) => {
    setPeopleServices((prev) => ({
      ...prev,
      [personIndex]: {
        ...prev[personIndex],
        selectedServices: {
          ...prev[personIndex].selectedServices,
          [serviceId]: quantity,
        },
      },
    }));
  };

  const calculateDiscountedPrice = (price: string, discount: number) => {
    if (!discount || discount <= 0) return price;
    return (Number(price) * (1 - discount / 100)).toFixed(2);
  };
  const handlePersonTypeChange = (
    personIndex: number,
    type: "Adult" | "Child"
  ) => {
    setPeopleServices((prev) => ({
      ...prev,
      [personIndex]: {
        ...prev[personIndex],
        personType: type,
      },
    }));
  };

  const handleCategoryChange = (
    personIndex: number,
    categoryId: string | null
  ) => {
    setPeopleServices((prev) => ({
      ...prev,
      [personIndex]: {
        ...prev[personIndex],
        selectedCategory: categoryId,
        selectedType: null, // Reset type when category changes
      },
    }));
    setPage(1); // Reset to first page when filters change
  };

  const handleTypeChange = (personIndex: number, typeId: string | null) => {
    setPeopleServices((prev) => ({
      ...prev,
      [personIndex]: {
        ...prev[personIndex],
        selectedType: typeId,
      },
    }));
    setPage(1); // Reset to first page when filters change
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Submit booking using APIs
  const handleSubmit = async () => {
    const user = await dispatch(authSLice.actions.getProfileAuth()).unwrap();
    try {
      const bookingServicesPayload: any[] = [];
      Object.entries(peopleServices).forEach(
        ([personIdxStr, { selectedServices, personType }]) => {
          const personIdx = parseInt(personIdxStr);
          Object.entries(selectedServices).forEach(([serviceId, quantity]) => {
            const service = services.find((s: any) => s.id === serviceId);
            if (service) {
              for (let i = 0; i < quantity; i++) {
                bookingServicesPayload.push({
                  service_id: service.id,
                  price: service.price,
                  duration: service.duration,
                  person_type: personType,
                });
              }
            }
          });
        }
      );

      const totalPrice = bookingServicesPayload.reduce(
        (sum, s) => sum + Number(s.price),
        0
      );

      const numAdults = Object.values(peopleServices).filter(
        (p: any) => p.personType === "Adult"
      ).length;
      const allServiceIds = new Set(
        Object.values(peopleServices).flatMap((p: any) =>
          Object.keys(p.selectedServices)
        )
      );

      const bookingPayload = {
        user_id: user?.user?.id,
        service_id: bookingServicesPayload[0]?.service_id || "",
        date: formData.date,
        time: formData.time,
        promo_code_id: promoCode || null,
        price: String(totalPrice),
        status: "Pending",
        service_details: {
          adultNumber: numAdults,
          serviceIds: Array.from(allServiceIds),
        },
      };

      const booking = await bookingApi.createItem(bookingPayload);
      const bookingId = booking?.id || (booking as any)?.data?.id;

      for (const bs of bookingServicesPayload) {
        await bookingServicesApi.createItem({
          booking_id: bookingId,
          service_id: bs.service_id,
          price: Number(bs.price),
          duration: Number(bs.duration),
          person_type: bs.person_type,
        });
      }

      showSuccessToast("Booking successfully created!");
      setCurrentStep(4); // success step
    } catch (error) {
      console.error(error);
      showErrorToast("Error creating booking.");
    }
  };

  // Validation
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return Object.values(peopleServices).every(
          (p: any) => Object.keys(p.selectedServices).length > 0
        );
      case 2:
        return formData.date !== "" && formData.time !== "";
      case 3:
        return true;
      default:
        return false;
    }
  };

  // Get filtered services for a specific person based on their filters
  const getFilteredServicesForPerson = (personIndex: number) => {
    const person = peopleServices[personIndex];
    if (!person) return services;

    return services.filter((service: any) => {
      const categoryMatch =
        !person.selectedCategory ||
        service.category_id === person.selectedCategory;
      const typeMatch =
        !person.selectedType || service.type_id === person.selectedType;
      return categoryMatch && typeMatch;
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 step-content">
            <div className="text-center mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Select Services
              </h2>
              <p className="text-muted-foreground">
                Choose how many people and assign one or more services to each
              </p>
            </div>
            {/* Number of people */}
            <div className="flex items-center gap-4 mb-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-border/50">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">How many people?</span>
              <Select
                value={String(numPeople)}
                onValueChange={(val) => {
                  const n = parseInt(val);
                  setNumPeople(n);
                  const updated: Record<
                    number,
                    {
                      personType: "Adult" | "Child";
                      selectedServices: Record<string, number>;
                      selectedCategory: string | null;
                      selectedType: string | null;
                    }
                  > = {};
                  for (let i = 1; i <= n; i++) {
                    updated[i] = peopleServices[i] || {
                      personType: "Adult" as const,
                      selectedServices: {},
                      selectedCategory: null,
                      selectedType: null,
                    };
                  }
                  setPeopleServices(updated);
                }}
              >
                <SelectTrigger className="w-28 border-primary/30 focus:ring-primary">
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

            {/* Services per person */}
            {[...Array(numPeople)].map((_, i) => {
              const personIndex = i + 1;
              const person = peopleServices[personIndex] || {
                personType: "Adult" as const,
                selectedServices: {},
                selectedCategory: null,
                selectedType: null,
              };
              const personServices = getFilteredServicesForPerson(personIndex);

              return (
                <div key={i} className="mb-8">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-t-2xl shadow-lg mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Person {personIndex}
                    </h3>
                  </div>

                  {/* Person type and filters */}
                  <div className="flex flex-col md:flex-row gap-4 mb-4 p-4 bg-white rounded-xl shadow-sm border">
                    {/* Person type */}
                    <div className="flex gap-4">
                      {(["Adult", "Child"] as const).map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-primary/5 transition-colors"
                        >
                          <input
                            type="radio"
                            name={`person-type-${personIndex}`}
                            value={type}
                            checked={person.personType === type}
                            onChange={() =>
                              handlePersonTypeChange(personIndex, type)
                            }
                            className="text-primary focus:ring-primary"
                          />
                          <span
                            className={
                              person.personType === type
                                ? "font-semibold text-primary"
                                : ""
                            }
                          >
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Category filter for this person */}
                    <div className="flex-1">
                      <Select
                        value={person.selectedCategory ?? "all"}
                        onValueChange={(value) =>
                          handleCategoryChange(
                            personIndex,
                            value === "all" ? null : value
                          )
                        }
                      >
                        <SelectTrigger className="w-full border-primary/30 focus:ring-primary">
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

                    {/* Type filter for this person */}
                    {person.selectedCategory && (
                      <div className="flex-1">
                        <Select
                          value={person.selectedType ?? "all"}
                          onValueChange={(value) =>
                            handleTypeChange(
                              personIndex,
                              value === "all" ? null : value
                            )
                          }
                        >
                          <SelectTrigger className="w-full border-primary/30 focus:ring-primary">
                            <SelectValue placeholder="Filter by Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            {serviceTypes
                              .filter(
                                (t: any) =>
                                  t.service_category_id ===
                                  person.selectedCategory
                              )
                              .map((t: any) => (
                                <SelectItem key={t.id} value={t.id}>
                                  {t.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Services grid for this person */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {personServices.map((service: any) => {
                      const selected = !!person.selectedServices[service.id];
                      const discountedPrice = calculateDiscountedPrice(
                        service?.price,
                        !isDiscountExpired(discountPromo?.expiry as any)?discountPromo?.discount:service.discount
                      );
                const hasDiscount = !isDiscountExpired(discountPromo?.expiry as any)||service.discount && service.discount > 0

                      return (
                        <Card
                          key={service.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 overflow-hidden ${
                            selected
                              ? "bg-gradient-to-br from-primary to-primary/80 shadow-2xl border-primary/20"
                              : "bg-white shadow-sm hover:shadow-md border-border/50"
                          }`}
                          onClick={(e) => {
                            animateSelection(e.currentTarget as HTMLElement);
                            handleServiceToggle(personIndex, service.id);
                          }}
                        >
                          <CardContent className="p-0">
                            <div className="flex flex-col">
                              <div className="">
                                <img
                                  className="w-full h-[70%] rounded-lg"
                                  src={`http://localhost:3002/${service?.File?.path}`}
                                  crossOrigin="anonymous"
                                  alt=""
                                />
                              </div>
                              <div className="col-span-2 px-2 py-2">
                                <div className="flex justify-between items-start mb-3">
                                  <h3
                                    className={`font-bold text-xl ${
                                      selected
                                        ? "text-primary-foreground"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {service.name}
                                  </h3>
                                  <Badge
                                    variant={selected ? "secondary" : "outline"}
                                    className={`text-xs ${
                                      selected
                                        ? "bg-primary/20 text-primary"
                                        : ""
                                    }`}
                                  >
                                    {service.duration} min
                                  </Badge>
                                </div>
                               
                                   <span className="font-semibold text-primary">
                          {hasDiscount ? (
                            <>
                              <span className="line-through  mr-1 text-red-500">
                                {service.price } ETB
                              </span>
                              <span>{discountedPrice } ETB</span>
                            </>
                          ) : (
                            service.price
                          )}
                        </span>
                                <p
                                  className={`text-sm mt-2 ${
                                    selected
                                      ? "text-primary-foreground/80"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* No services message */}
                  {personServices.length === 0 && (
                    <div className="text-center p-8 bg-muted/50 rounded-xl">
                      <p className="text-muted-foreground">
                        No services found for the selected filters.
                      </p>
                    </div>
                  )}

                  {/* Selected Services for this person */}
                  {Object.keys(person.selectedServices).length > 0 && (
                    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green/20">
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 flex items-center gap-2 text-green-800">
                          <CheckCircle className="h-5 w-5" />
                          Selected Services for Person {personIndex}
                        </h4>
                        <div className="space-y-3">
                          {Object.entries(person.selectedServices).map(
                            ([serviceId, quantity]) => {
                              const service = services.find(
                                (s: any) => s.id === serviceId
                              );
                              if (!service) return null;
                              const perWig = isPerWig(service);
                              const displayQuantity = perWig ? quantity : 1;
                              const displayPrice =
                                Number(service.price) * displayQuantity;
                              return (
                                <div
                                  key={serviceId}
                                  className="flex justify-between items-center py-2 px-4 bg-white rounded-lg shadow-inner"
                                >
                                  <span className="font-medium text-green-800">
                                    {service.name} {perWig && `(x${quantity})`}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <span className="font-bold text-xl text-green-700">
                                      ${displayPrice}
                                    </span>
                                    {perWig && (
                                      <Select
                                        value={String(quantity)}
                                        onValueChange={(val) =>
                                          handleQuantityChange(
                                            personIndex,
                                            serviceId,
                                            parseInt(val)
                                          )
                                        }
                                      >
                                        <SelectTrigger className="w-16 border-green/30 focus:ring-green">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                            (n) => (
                                              <SelectItem
                                                key={n}
                                                value={String(n)}
                                              >
                                                {n}
                                              </SelectItem>
                                            )
                                          )}
                                        </SelectContent>
                                      </Select>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 p-4 bg-white rounded-xl shadow-sm border">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                className="hover:bg-primary/5 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <p className="text-sm text-muted-foreground font-medium">
                Page {page} of {Math.ceil(totalServices / limit) || 1}
              </p>
              <Button
                variant="outline"
                disabled={page * limit >= totalServices}
                onClick={() => setPage((prev) => prev + 1)}
                className="hover:bg-primary/5 transition-colors"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 step-content">
            <div className="text-center mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center justify-center gap-2 mx-auto">
                <Calendar className="h-8 w-8" />
                Choose Date & Time
              </h2>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border">
              <input
                type="date"
                className="w-full p-4 border-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl text-center text-lg font-semibold focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-white rounded-xl shadow-sm border">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={formData.time === time ? "default" : "outline"}
                  className={`h-12 rounded-xl transition-all duration-300 hover:shadow-md ${
                    formData.time === time
                      ? "bg-gradient-to-r from-primary to-primary/80 shadow-lg transform scale-105"
                      : "hover:bg-primary/5 hover:border-primary/50"
                  }`}
                  onClick={(e) => {
                    animateSelection(e.currentTarget as HTMLElement);
                    setFormData({ ...formData, time: time });
                  }}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 step-content text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full p-4 mx-auto w-fit shadow-lg">
              <CheckCircle className="mx-auto h-16 w-16 text-blue-500 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Confirm Your Booking
            </h2>
            <Card className="bg-white shadow-xl border-0">
              <CardContent className="p-6">
                <div className="space-y-4 text-left">
                  {Object.entries(peopleServices).map(
                    ([personIdxStr, { selectedServices, personType }]) => {
                      const personIdx = parseInt(personIdxStr);
                      return (
                        <div
                          key={personIdx}
                          className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg"
                        >
                          <p className="font-bold text-lg flex items-center gap-2 text-primary">
                            <Users className="h-5 w-5" />
                            Person {personIdx} ({personType})
                          </p>
                          <div className="ml-6 space-y-1 mt-2">
                            {Object.entries(selectedServices).map(
                              ([serviceId, quantity]) => {
                                const service = services.find(
                                  (s: any) => s.id === serviceId
                                );
                                if (!service) return null;
                                const perWig = isPerWig(service);
                                const displayName = `${service.name}${
                                  perWig && quantity > 1
                                    ? ` (x${quantity})`
                                    : ""
                                }`;
                                return (
                                  <p
                                    key={serviceId}
                                    className="ml-2 text-sm text-muted-foreground"
                                  >
                                    {displayName}
                                  </p>
                                );
                              }
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
                    <p className="font-semibold flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-emerald-600" />
                      <strong>Date:</strong> {formData.date}
                    </p>
                    <p className="font-semibold flex items-center gap-2 mt-2">
                      <Clock className="h-5 w-5 text-emerald-600" />
                      <strong>Time:</strong> {formData.time}
                    </p>
                    {promoCode && (
                      <p className="font-semibold flex items-center gap-2 mt-2 text-amber-700">
                        <Gift className="h-5 w-5" />
                        <strong>Promo Code:</strong> {promoCode}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 step-content text-center">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-full p-4 mx-auto w-fit shadow-lg animate-bounce">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Booking Successful!
            </h2>
            <p className="text-lg text-muted-foreground">
              Your booking has been created successfully. We'll see you soon!
            </p>
            <Button
              onClick={() => setCurrentStep(1)}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              Make Another Booking
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <section className="py-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          {/* Progress */}
          {currentStep <= 3 && (
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute inset-0 flex items-center">
                {[1, 2].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1 bg-gradient-to-r ${
                      i + 1 <= currentStep
                        ? "from-primary to-primary"
                        : "from-muted to-muted"
                    }`}
                  />
                ))}
              </div>
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-gradient-to-r from-primary to-primary/80 border-primary text-primary-foreground shadow-primary/25"
                      : "bg-white border-2 border-border/50 text-muted-foreground hover:bg-primary/5"
                  }`}
                >
                  <span className="font-bold text-sm">{step}</span>
                </div>
              ))}
            </div>
          )}
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">{renderStepContent()}</CardContent>
          </Card>
          {/* Navigation */}
          {currentStep <= 3 && (
            <div className="flex justify-between mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-border/50">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="hover:bg-primary/5 transition-all border-primary/30 hover:border-primary/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`${
                    canProceed()
                      ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl"
                      : "bg-muted hover:bg-muted"
                  } transition-all`}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className={`${
                    canProceed()
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-muted hover:bg-muted"
                  } transition-all`}
                >
                  Confirm Booking
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
