import { configureStore } from "@reduxjs/toolkit"
import { booksApi } from "./api/booksApi"

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
})
