"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { authSLice } from "@/store/slice/auth";
import { bookingServicesSlice } from "@/store/slice/booking";
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
import { encodeQuery } from "@/utils/utils";
import { Calendar, Coins, Phone } from "lucide-react";

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
}

interface Booking {
  id: string;
  Booking: {
    date: string;
    time: string;
    status: string;
  };
  Service: {
    name: string;
    price: string;
    duration: string;
    description: string;
  };
}

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      try {
        
        const profileRes = await dispatch(
          authSLice.actions.getProfileAuth()
        ).unwrap();
        setUserProfile(profileRes.user);

        const query = encodeQuery({
          include: [{ model: "Booking", as: "Booking" }, { model: "Service" }],
        });

        const bookingsRes = await dispatch(
          bookingServicesSlice.actions.fetchAllBookingservices(query)
        ).unwrap();
        setUserBookings(bookingsRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile or bookings.");
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
                {userProfile?.name?.charAt(0) + userProfile?.name?.charAt(1)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{userProfile?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <p className="flex gap-2">
                <span className="font-semibold text-gray-400">Phone:</span>{" "}
                <a
                  href={`tel:${(userProfile as any)?.phone_number}`}
                  className="flex gap-1 text-accent hover:text-foreground"
                >
                  <Phone className="w-5 h-5" />{" "}
                  {(userProfile as any).phone_number || "N/A"}
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-400">Status:</span>{" "}
                <Badge
                  className={
                    userProfile?.status === "Active"
                      ? "bg-green-500 rounded-3xl"
                      : "bg-red-500 rounded-3xl"
                  }
                >
                  {userProfile?.status}
                </Badge>
              </p>
              <div className="flex gap-1">
                <span className="font-semibold text-orange-500 flex gap-2">
                  Points:
                </span>{" "}
                <div className="flex gap-1 items-center text-xs text-orange-700">
                  <Coins className="" />
                  {userProfile?.point}
                </div>
              </div>

              <p className="text-gray-400 flex gap-1 items-center">
                <Calendar /> <span className="font-semibold">Created:</span>{" "}
                {format(new Date(userProfile?.createdAt), "PPP p")}
              </p>
              <p className="text-gray-400 flex gap-1 items-center">
                <Calendar /> <span className="font-semibold">Updated:</span>{" "}
                {format(new Date(userProfile?.updatedAt), "PPP p")}
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
              <p className="text-muted-foreground">No bookings found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userBookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className="border hover:shadow-lg transform transition-all duration-300 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-lg font-semibold">
                        {booking?.Service?.name}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <Badge
                        className={
                          booking.Booking.status === "Pending"
                            ? "bg-yellow-500 text-black"
                            : booking.Booking.status === "confirmed"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                      >
                        {booking?.Booking?.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setIsModalOpen(true);
                        }}
                      >
                        Show More
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal for Booking Details */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-3 mt-2">
              <p>
                <span className="font-semibold">Service:</span>{" "}
                {selectedBooking?.Service?.name}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {selectedBooking?.Service?.description}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {selectedBooking?.Service?.duration}
              </p>
              <p>
                <span className="font-semibold">Price:</span> $
                {selectedBooking?.Service?.price}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {format(new Date(selectedBooking.Booking.date), "PPP")} at{" "}
                {selectedBooking?.Booking?.time}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <Badge
                  className={
                    selectedBooking?.Booking?.status === "Pending"
                      ? "bg-yellow-500 text-black"
                      : selectedBooking?.Booking?.status === "confirmed"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }
                >
                  {selectedBooking?.Booking?.status}
                </Badge>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
