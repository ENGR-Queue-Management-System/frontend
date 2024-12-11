import { IModelCounter } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: [] as IModelCounter[],
  reducers: {
    setCounters: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { setCounters } = counterSlice.actions;

export default counterSlice.reducer;
