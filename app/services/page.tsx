"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { serviceCategorySlice } from "@/store/slice/service-category"
import { Skeleton } from "@/components/ui/skeleton"
import { serviceSlice } from "@/store/slice/service"
import { encodeQuery } from "@/utils/utils"
import Link from "next/link"

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const dispatch = useAppDispatch()
const discountPromo=useAppSelector((state)=>state.promodiscount)

  const categories = useAppSelector((state) => (state.serviceCategory.items as any)?.data)
  const categoriesLoading = useAppSelector((state) => state.serviceCategory.loading)

  const services = useAppSelector((state) => (state.service.items as any)?.data)
  const servicesLoading = useAppSelector((state) => state.service.loading)

  useEffect(() => {
    dispatch(serviceCategorySlice.actions.fetchAllServiceCategory())
  }, [])

  useEffect(() => {
    const query = encodeQuery({
      filters: selectedCategory ? { category_id: selectedCategory } : {},
      include: [{ model: "File", as: "File" }],
    })
    dispatch(serviceSlice.actions.fetchAllServices(query))
  }, [selectedCategory])

  // Loading fallback
  if (!categories || !services) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
        <Skeleton className="w-64 h-10 rounded-md" />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-7xl">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-56 rounded-md" />
          ))}
        </div>
      </div>
    )
  }
function isDiscountExpired(validUntil: string): boolean {
  const expiryDate = new Date(validUntil);
  const today = new Date();

  // Set time of both dates to midnight for accurate comparison
  expiryDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return today > expiryDate;
}
  const filteredServices = selectedCategory
    ? services.filter((s: any) => s.category_id === selectedCategory)
    : services

  const calculateDiscountedPrice = (price: string, discount: number) => {
    if (!discount || discount <= 0) return price
    return (Number(price) * (1 - discount / 100)).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Category Filter */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
          {categoriesLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="w-20 h-8 rounded-md" />
              ))
            : <>
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  size="sm"
                >
                  All
                </Button>
                {categories.map((category: any) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-1 text-sm"
                    size="sm"
                  >
                    {category.name}
                  </Button>
                ))}
              </>
          }
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {servicesLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-56 rounded-md" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredServices.map((service: any, idx: number) => {
                console.log('discount',service)
                const discountedPrice = calculateDiscountedPrice(
                        service?.price,
                        !isDiscountExpired(discountPromo?.expiry as any)?discountPromo?.discount:service.discount
                      );
                const hasDiscount = !isDiscountExpired(discountPromo?.expiry as any)||service.discount && service.discount > 0

                return (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                  >
                    <div className="relative h-28 w-full">
                      {service.popular && (
                        <Badge className="absolute top-2 right-2 z-10 bg-accent text-accent-foreground text-xs">
                          Popular
                        </Badge>
                      )}
                      <img
                        src={
                          'http://api.glamnestsalon.com/'+service.File?.path
                            
                        }
                        crossOrigin="anonymous"
                        alt={service.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="text-sm font-semibold text-card-foreground line-clamp-1">
                        {service.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {service.description}
                      </p>

                      <div className="flex items-center justify-between text-xs mt-2 mb-3 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{service.duration}</span>
                        </div>
                        <span className="font-semibold text-primary">
                          {hasDiscount ? (
                            <>
                              <span className="line-through mr-1 text-red-500">
                                {service.price } ETB
                              </span>
                              <span>{discountedPrice } ETB</span>
                            </>
                          ) : (
                            service.price
                          )}
                        </span>
                      </div>

                      <Button className="w-full text-xs py-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href={'/booking'} className="w-full h-full items-center justify-center flex">
                          Book
                        </Link>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
