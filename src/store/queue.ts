import { IModelQueue } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const queueSlice = createSlice({
  name: "queue",
  initialState: {} as IModelQueue,
  reducers: {
    setQueue: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setQueue } = queueSlice.actions;

export default queueSlice.reducer;
