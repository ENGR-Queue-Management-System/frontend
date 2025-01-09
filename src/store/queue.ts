import { STATUS } from "@/config/Enum";
import { IModelQueue } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const queueSlice = createSlice({
  name: "queues",
  initialState: [] as IModelQueue[],
  reducers: {
    setQueueList: (state, action) => {
      return [...action.payload];
    },
    addNewQueue: (state, action) => {
      state.push({ ...action.payload });
      return state;
    },
    updateQueueByID: (state, action) => {
      const updatedState = state.map((queue) =>
        queue.id === action.payload.id ? { ...queue, ...action.payload } : queue
      );
      return updatedState.filter(
        ({ status }) => ![STATUS.CALLED, STATUS.IN_PROGRESS].includes(status)
      );
    },
    removeQueueByID: (state, action) => {
      return state.filter(({ id }) => id != action.payload);
    },
  },
});

export const { setQueueList, addNewQueue, updateQueueByID, removeQueueByID } =
  queueSlice.actions;

export default queueSlice.reducer;
