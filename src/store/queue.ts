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
  },
});

export const { setQueueList, setCurrentQueue } = queueSlice.actions;

export default queueSlice.reducer;
