export interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  date: string;
  time: string;
  promo_code_id?: string;
  price: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  service_details?: {
    adultNumber: number;
    serviceIds: string[];
  };
}

export interface BookingServices {
  id: string;
  booking_id: string;
  service_id: string;
  price: number;
  duration: number;
  person_type: "Adult" | "Child";
}

export interface CreateBookingRequest {
  user_id: string;
  service_id: string;
  date: string;
  time: string;
  promo_code_id?: string;
  price: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  service_details?: string;
}

export interface CreateBookingServicesRequest {
  booking_id: string;
  service_id: string;
  price: number;
  duration: number;
  person_type: "Adult" | "Child";
}










export interface Booking_service_Root {
  status: string
  message: string
  count: number
  data: Booking_service_Daum[]
  meta: Meta
  timestamp: string
}

export interface Booking_service_Daum {
  id: string
  booking_id: string
  service_id: string
  price: number
  duration: any
  person_type: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  Booking: Booking_service_Booking
  Service: Booking_service_Service
}

export interface Booking_service_Booking {
  id: string
  user_id: string
  service_id: string
  date: string
  time: string
  promo_code_id: any
  price: string
  status: string
  service_details: Booking_service_ServiceDetails
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface Booking_service_ServiceDetails {
  adultNumber: number
  serviceIds: string[]
}

export interface Booking_service_Service {
  id: string
  name: string
  price: string
  duration: string
  description: string
  category_id: string
  discount: number
  rating: number
  review_id: any
  file_id: string
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface Meta {
  limit: number
  offset: number
}
