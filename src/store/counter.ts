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
    removeCounter: (state, action) => {
      return state.filter((counter) => counter.id != action.payload);
    },
  },
});

export const { setCounters, updateCounterData, removeCounter } =
  counterSlice.actions;

export default counterSlice.reducer;
