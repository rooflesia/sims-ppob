import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import topupReducer from "./slices/topupSlice";
import historyReducer from "./slices/historySlice";
import transactionReducer from "./slices/transactionSlice";
import menuReducer from "./slices/menuSlice";
import homeReducer from "./slices/homeSlice";


export const store = configureStore({
  reducer: {
    profile: profileReducer,
    transaction: transactionReducer,
    topup: topupReducer,
    history: historyReducer,
    menu: menuReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
