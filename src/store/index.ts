import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import loadingReducer from "./loading";
import userReducer from "./user";
import subscriptionReducer from "./subscription";
import counterReducer from "./counter";

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
    subscription: subscriptionReducer,
    counter: counterReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
