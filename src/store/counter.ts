import { sortData } from "@/helpers/function";
import { IModelCounter, IModelQueue } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: [] as (IModelCounter & { currentQueue?: IModelQueue })[],
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
    updateCounterCurrentQueue: (state, action) => {
      return state.map((counter) =>
        counter.id == action.payload.counterId
          ? { ...counter, currentQueue: { ...action.payload } }
          : counter
      );
    },
    addCounter: (state, action) => {
      state.push({ ...action.payload });
      sortData(state, "counter", "string");
      return state;
    },
    removeCounter: (state, action) => {
      return state.filter((counter) => counter.id != action.payload);
    },
  },
});

export const {
  setCounters,
  updateCounterData,
  updateCounterCurrentQueue,
  addCounter,
  removeCounter,
} = counterSlice.actions;

export default counterSlice.reducer;
