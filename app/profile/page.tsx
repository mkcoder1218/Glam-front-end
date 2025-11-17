"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { authSLice } from "@/store/slice/auth";
import { myBookingSlice } from "@/store/slice/booking";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar, Coins, Gift, Phone } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  role_id: string;
  point: number;
  createdAt: string;
  updatedAt: string;
  phone_number?: string;
  promoCode?: { code: string };
}

interface BookingService {
  id: string;
  name: string;
  price: string;
  duration: string | null;
}

interface BookingItem {
  id: string;
  date: string;
  time: string;
  status: string;
  price: string;
  booking_services: {
    service: BookingService;
  }[];
}

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userBookings, setUserBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      try {
        const profileRes = await dispatch(
          authSLice.actions.getProfileAuth()
        ).unwrap();
        setUserProfile(profileRes.user);

        const bookingsRes = await dispatch(
          myBookingSlice.actions.fetchAllMybooking()
        ).unwrap();

        // The API now returns an array directly under `data` (or sometimes just the array)
        const bookings: BookingItem[] = Array.isArray(bookingsRes)
          ? bookingsRes
          : bookingsRes?.data || [];

        setUserBookings(bookings);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err?.message || "Failed to load profile or bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndBookings();
  }, [dispatch]);

  if (loading)
    return <div className="text-center py-20 text-xl">Loading profile...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!userProfile)
    return (
      <div className="text-center py-20 text-muted-foreground">
        No profile found.
      </div>
    );

  const getStatusVariant = (status: string | undefined) => {
    if (!status) return "bg-gray-500";
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-black";
      case "confirmed":
        return "bg-green-500";
      default:
        return "bg-red-500";
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="md:col-span-1 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary">
              <AvatarImage
                src="/placeholder-userdsc.jpg"
                alt={userProfile.name}
              />
              <AvatarFallback>
                {userProfile.name?.slice(0, 2).toUpperCase() || "NA"}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">
              {userProfile.name || "Unknown"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            <div className="space-y-3 text-sm">
              <p className="flex gap-2 items-center">
                <span className="font-semibold text-gray-400">Phone:</span>
                {userProfile.phone_number ? (
                  <a
                    href={`tel:${userProfile.phone_number}`}
                    className="flex gap-1 text-accent hover:text-foreground"
                  >
                    <Phone className="w-5 h-5" />
                    {userProfile.phone_number}
                  </a>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </p>

              <p className="flex items-center gap-2">
                <span className="font-semibold text-gray-400">Status:</span>
                <Badge
                  className={
                    userProfile.status === "Active"
                      ? "bg-green-500 rounded-3xl"
                      : "bg-red-500 rounded-3xl"
                  }
                >
                  {userProfile.status || "Unknown"}
                </Badge>
              </p>

              <div className="flex gap-2 items-center">
                <span className="font-semibold text-orange-500">Points:</span>
                <div className="flex gap-1 items-center text-orange-700">
                  <Coins className="w-5 h-5" />
                  {userProfile.point ?? 0}
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <span className="font-semibold text-orange-500">
                  Promo code:
                </span>
                <div className="flex gap-1 items-center text-orange-700">
                  <Gift className="w-5 h-5" />
                  {userProfile.promoCode?.code || "No promo code"}
                </div>
              </div>

              <p className="text-gray-400 flex gap-1 items-center">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Created:</span>{" "}
                {userProfile.createdAt
                  ? format(new Date(userProfile.createdAt), "PPP p")
                  : "N/A"}
              </p>
              <p className="text-gray-400 flex gap-1 items-center">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Updated:</span>{" "}
                {userProfile.updatedAt
                  ? format(new Date(userProfile.updatedAt), "PPP p")
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Grid */}
        <Card className="md:col-span-2 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {userBookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No bookings found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBookings.map((booking) => {
                  const firstService = booking.booking_services?.[0]?.service;
                  const serviceName = firstService?.name || "Unknown Service";
                  const servicePrice = firstService?.price || booking.price;

                  return (
                    <Card
                      key={booking.id}
                      className="border hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsModalOpen(true);
                      }}
                    >
                      <div>
                        <p className="text-lg font-semibold truncate">
                          {serviceName}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {format(new Date(booking.date), "PPP")} •{" "}
                          {booking.time}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <Badge className={getStatusVariant(booking.status)}>
                          {booking.status || "Unknown"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4 mt-4">
              {selectedBooking.booking_services?.map((bs, idx) => {
                const svc = bs.service;
                return (
                  <div key={idx} className="border-b pb-3 last:border-0">
                    <p>
                      <span className="font-semibold">Service:</span>{" "}
                      {svc?.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span> $
                      {svc?.price || selectedBooking.price}
                    </p>
                    {svc?.duration && (
                      <p>
                        <span className="font-semibold">Duration:</span>{" "}
                        {svc.duration}
                      </p>
                    )}
                  </div>
                );
              })}

              <p>
                <span className="font-semibold">Date:</span>{" "}
                {format(new Date(selectedBooking.date), "PPP")} at{" "}
                {selectedBooking.time}
              </p>

              <p>
                <span className="font-semibold">Total Price:</span> $
                {selectedBooking.price}
              </p>

              <p className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>
                <Badge className={getStatusVariant(selectedBooking.status)}>
                  {selectedBooking.status || "Unknown"}
                </Badge>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
