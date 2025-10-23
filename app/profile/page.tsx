"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { authSLice } from "@/store/slice/auth";
import { bookingServicesSlice } from "@/store/slice/booking";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { encodeQuery } from "@/utils/utils";

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

  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      try {
        const profileRes = await dispatch(authSLice.actions.getProfileAuth()).unwrap();
        setUserProfile(profileRes.user);

        const query = encodeQuery({
          include: [
            { model: "Booking", as: "Booking" },
            { model: "Service" },
          ],
        });

        const bookingsRes = await dispatch(bookingServicesSlice.actions.fetchAllBookingservices(query)).unwrap();
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

  if (loading) return <div className="text-center py-20 text-xl">Loading profile...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!userProfile) return <div className="text-center py-20 text-muted-foreground">No profile found.</div>;

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="md:col-span-1 hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary">
              <AvatarImage src="/placeholder-user.jpg" alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
            <p className="text-muted-foreground">{userProfile.email || "No email"}</p>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Phone:</span> {(userProfile as any).phone_number || "N/A"}</p>
              <p><span className="font-semibold">Status:</span> <Badge className={userProfile.status === "Active" ? "bg-green-500" : "bg-red-500"}>{userProfile.status}</Badge></p>
              <p><span className="font-semibold">Points:</span> {userProfile.point}</p>
              <p><span className="font-semibold">Role ID:</span> {userProfile.role_id}</p>
              <p><span className="font-semibold">Created:</span> {format(new Date(userProfile.createdAt), "PPP p")}</p>
              <p><span className="font-semibold">Updated:</span> {format(new Date(userProfile.updatedAt), "PPP p")}</p>
            </div>
          </CardContent>
        </Card>

        {/* Bookings */}
        <Card className="md:col-span-2 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userBookings.length === 0 ? (
              <p className="text-muted-foreground">No bookings found.</p>
            ) : (
              userBookings.map((booking) => (
                <Card key={booking.id} className="border hover:scale-105 transform transition-all duration-300">
                  <CardContent className="flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-2 md:space-y-0">
                    <div>
                      <p className="text-lg font-semibold">{booking.Service.name}</p>
                      <p className="text-sm text-muted-foreground">{booking.Service.description}</p>
                      <p className="text-sm text-muted-foreground">Duration: {booking.Service.duration} | Price: ${booking.Service.price}</p>
                      <p className="text-sm text-muted-foreground">Date: {format(new Date(booking.Booking.date), "PPP")} at {booking.Booking.time}</p>
                    </div>
                    <Badge
                      className={
                        booking.Booking.status === "Pending"
                          ? "bg-yellow-500 text-black"
                          : booking.Booking.status === "confirmed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }
                    >
                      {booking.Booking.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
