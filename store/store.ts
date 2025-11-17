// store.ts
import { configureStore, Reducer } from "@reduxjs/toolkit";
import { userSLice } from "./slice/user";
import { authSLice } from "./slice/auth";
import { serviceSlice } from "./slice/service";
import { serviceCategorySlice } from "./slice/service-category";
import {
  bookingSlice,
  bookingServicesSlice,
  myBookingSlice,
} from "./slice/booking";
import { roleSLice } from "./slice/role";
import { serviceTypeSlice } from "./slice/service-type";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { useRouter } from "next/navigation";
import { GallerySlice } from "./slice/Gallery";
import discountSlice from "./slice/setDisacount";
import { PointsSlice } from "./slice/point";

// Helper function to wrap any slice reducer with persist
const createPersistedReducer = (
  key: string,
  reducer: Reducer,
  whitelist: string[] = []
) => {
  const config: PersistConfig<any> = {
    key,
    storage,
    whitelist,
  };
  return persistReducer(config, reducer);
};

// Configure store
export const store = configureStore({
  reducer: {
    users: createPersistedReducer("users", userSLice.reducer, ["admin"]),
    auth: createPersistedReducer("auth", authSLice.reducer, ["admin"]),
    service: serviceSlice.reducer,
    serviceCategory: serviceCategorySlice.reducer,
    serviceType: serviceTypeSlice.reducer,
    gallery: GallerySlice.reducer,
    booking: bookingSlice.reducer,
    bookingServices: bookingServicesSlice.reducer,
    mybooking: myBookingSlice.reducer,
    Points: PointsSlice.reducer,
    role: roleSLice.reducer,
    promodiscount: discountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Clears persisted state, resets slices, and removes tokens.
 */

export const logout = () => {
  localStorage.removeItem("token");

  // Purge persisted state
  persistor.purge();

  // Redirect to login
};
