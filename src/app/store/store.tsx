import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import toogleModalReducer from "./toogleModalSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    toogleModal:toogleModalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;