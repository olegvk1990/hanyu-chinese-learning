import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../shared/api/baseApi';
import authReducer from '../features/auth/slices/authSlice';
import themeReducer from '../features/auth/slices/themeSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
