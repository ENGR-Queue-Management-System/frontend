import { IModelQueue } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const queueSlice = createSlice({
  name: "queues",
  initialState: { queues: [] as IModelQueue[], current: {} as IModelQueue },
  reducers: {
    setQueueList: (state, action) => {
      return { ...state, queues: [...action.payload] };
    },
    setCurrentQueue: (state, action) => {
      return { ...state, current: { ...action.payload } };
    },
    removeFirstWaitingQueue: (state) => {
      return { ...state, queues: state.queues.slice(1) };
    },
  },
});

export const { setQueueList, setCurrentQueue, removeFirstWaitingQueue } =
  queueSlice.actions;

export default queueSlice.reducer;
