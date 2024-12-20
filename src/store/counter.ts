import { IModelCounter } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: [] as IModelCounter[],
  reducers: {
    setCounters: (state, action) => {
      return [...action.payload];
    },
    updateCounterData: (state, action) => {
      return state.map((counter) =>
        counter.id == action.payload.id
          ? { ...counter, ...action.payload }
          : counter
      );
    },
  },
});

export const { setCounters, updateCounterData } = counterSlice.actions;

export default counterSlice.reducer;
