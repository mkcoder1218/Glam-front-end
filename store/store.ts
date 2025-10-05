import { configureStore, Reducer } from '@reduxjs/toolkit';
import { userSLice } from './slice/user';
import { authSLice } from './slice/auth';
import { serviceSlice } from './slice/service';
import { serviceCategorySlice } from './slice/service-category';
import { bookingSlice, bookingServicesSlice } from './slice/booking';

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
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { roleSLice } from './slice/role';
import { serviceTypeSlice } from './slice/service-type';

// Helper function to wrap any slice reducer with persist
const createPersistedReducer = (key: string, reducer: Reducer, whitelist: string[] = []) => {
  const config: PersistConfig<any> = {
    key,
    storage,
    whitelist,
  };
  return persistReducer(config, reducer);
};

export const store = configureStore({
  reducer: {
    users: createPersistedReducer('users', userSLice.reducer, ['admin']), // persist 'admin' field
    auth: createPersistedReducer('auth', authSLice.reducer, ['admin']),
    service: serviceSlice.reducer, // not persisted
    serviceCategory: serviceCategorySlice.reducer, // not persisted
    serviceType: serviceTypeSlice.reducer, // not persisted
    booking: bookingSlice.reducer, // not persisted
    bookingServices: bookingServicesSlice.reducer, // not persisted
    role: roleSLice.reducer, // not persisted
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
