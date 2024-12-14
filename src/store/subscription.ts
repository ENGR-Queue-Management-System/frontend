import { IModelSubscription } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {} as IModelSubscription,
  reducers: {
    setSubscription: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
