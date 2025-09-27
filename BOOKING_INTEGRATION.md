# Booking System Integration

This document explains the integration of the booking system with the hair salon website.

## Files Created/Modified

### 1. Types (`/store/types/booking.ts`)
- `Booking`: Main booking interface
- `BookingServices`: Services associated with a booking
- `CreateBookingRequest`: Request format for creating bookings
- `CreateBookingServicesRequest`: Request format for creating booking services

### 2. API Layer (`/store/api/booking.ts`)
- `bookingApi`: Basic CRUD operations for bookings
- `bookingServicesApi`: Basic CRUD operations for booking services
- `extendedBookingApi`: Extended API with custom methods:
  - `createBooking()`: Creates a single booking
  - `createBookingServices()`: Creates booking services
  - `createCompleteBooking()`: Creates both booking and booking services in one transaction

### 3. Redux Slice (`/store/slice/booking.ts`)
- State management for bookings and booking services
- Actions for CRUD operations
- Loading and error state management

### 4. Updated Store (`/store/store.ts`)
- Added booking reducer to the Redux store

### 5. Updated Booking Page (`/app/booking/page.tsx`)
- Integrated with Redux store and booking API
- **Uses existing service slice to fetch and display services dynamically**
- Added user authentication checks
- Pre-populates form with user data when available
- Handles loading states and error display for both booking and service operations
- Creates complete booking with services
- Shows loading state while services are being fetched
- Displays "No services available" message when no services exist

## API Endpoints Used

### POST /booking
Creates a new booking with the following structure:
```json
{
  "user_id": "string",
  "service_id": "string", 
  "date": "string",
  "time": "string",
  "promo_code_id": "string",
  "price": "string",
  "status": "string",
  "service_details": "string"
}
```

### POST /bookingservices
Creates booking services with:
```json
{
  "booking_id": "string",
  "service_id": "string",
  "price": 0,
  "duration": 0,
  "person_type": "string"
}
```

## How It Works

1. **Service Loading**: Component fetches services from backend using existing service slice on mount
2. **User Flow**: User goes through 4-step booking process with real service data
3. **Authentication Check**: System checks if user is logged in before final step
4. **Data Collection**: Collects service, stylist, date/time, and contact information
5. **Booking Creation**: Creates both booking and booking services records using real service data
6. **Confirmation**: Shows booking confirmation with details

## Key Features

- **Redux Integration**: Full state management with Redux Toolkit
- **Dynamic Service Loading**: Fetches services from backend via existing service slice
- **Service State Management**: Shows loading states while fetching services
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Shows loading indicators during API calls
- **User Authentication**: Requires login for booking completion
- **Form Pre-population**: Automatically fills user data from auth state
- **Complete Transaction**: Creates both booking and booking services in one flow
- **Graceful Degradation**: Handles empty service lists and loading failures

## Usage

The booking system is now fully integrated and ready to use. Users can:

1. Browse and select services
2. Choose stylists (or any available)
3. Pick date and time
4. Enter contact information (pre-filled if logged in)
5. Complete booking and receive confirmation

The system will handle all API calls, state management, and error scenarios automatically.