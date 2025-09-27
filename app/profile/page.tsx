"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { authSLice } from "@/store/slice/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { bookingServicesSlice } from "@/store/slice/booking";
import { encodeQuery } from "@/utils/utils";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface Booking {
  _id: string;
  service: { name: string };
  date: string;
  time: string;
  status: string;
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
        // Fetch user profile
        const profileRes = await dispatch(authSLice.actions.getProfileAuth()).unwrap();
        setUserProfile(profileRes.user);
const query=encodeQuery({
 include: [{ model: "Booking",as :'Booking' },{ model: "Services" }],
})
        // Fetch user bookings
        const bookingsRes = await dispatch(bookingServicesSlice.actions.fetchAllBookingservices(query)).unwrap();
        setUserBookings(bookingsRes.data);
      } catch (err) {
        console.error("Failed to fetch profile or bookings:", err);
        setError("Failed to load profile or bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndBookings();
  }, [dispatch]);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  if (!userProfile) {
    return <div className="container mx-auto p-4 text-center">No user profile found. Please log in.</div>;
  }
console.log('userBookings',userBookings)
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/placeholder-user.jpg" alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
            <p className="text-muted-foreground">{userProfile.email}</p>
          </CardHeader>
          <CardContent className="text-center">
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">Phone: {userProfile.phone || "N/A"}</p>
            {/* Add more profile details here if available */}
          </CardContent>
        </Card>

        {/* Bookings List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {userBookings.length === 0 ? (
              <p className="text-muted-foreground">No bookings found.</p>
            ) : (
              <div className="space-y-4">
                {userBookings?.map((booking) => (
                  <div key={booking?.id} className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <p className="font-medium">{booking?.Service?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(booking?.Booking?.date), "PPP")} at {booking?.Booking.time}
                      </p>
                    </div>
                    <Badge
                      className={
                        booking?.status === "confirmed"
                          ? "bg-green-500"
                          : booking?.Booking?.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }
                    >
                      {booking?.Booking?.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}