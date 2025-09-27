import { bookingApi, bookingServicesApi } from "../api/booking";
import { createDynamicCrudSlice } from "../Dal/Crud-slice";
import { auth } from "../types/auth";
import { Booking_service_Daum, Booking_service_Root } from "../types/booking";
import { User } from "../types/user";


export const bookingSlice=createDynamicCrudSlice<User,auth>('booking',bookingApi as unknown as Record<string, (...args: any[]) => Promise<any>>);
export const bookingServicesSlice=createDynamicCrudSlice<Booking_service_Root,Booking_service_Daum>('bookingservices',bookingServicesApi as unknown as Record<string, (...args: any[]) => Promise<any>>);
