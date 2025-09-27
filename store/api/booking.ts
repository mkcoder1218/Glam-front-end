import { createEntityApi } from "@/store/Dal/BaseDal";
import { Booking, BookingServices, CreateBookingRequest, CreateBookingServicesRequest } from "@/store/types/booking";

// Create booking API
export const bookingApi = createEntityApi<Booking>("booking");

// Create booking services API
export const bookingServicesApi = createEntityApi<BookingServices>("bookingservices");

