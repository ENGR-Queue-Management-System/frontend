import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import configReducer from "./config";
import loadingReducer from "./loading";
import errorResponseReducer from "./errorResponse";
import userReducer from "./user";
import queueReducer from "./queue";
import subscriptionReducer from "./subscription";
import counterReducer from "./counter";
import topicReducer from "./topic";

const store = configureStore({
  reducer: {
    config: configReducer,
    loading: loadingReducer,
    errorResponse: errorResponseReducer,
    user: userReducer,
    subscription: subscriptionReducer,
    queue: queueReducer,
    counter: counterReducer,
    topic: topicReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
