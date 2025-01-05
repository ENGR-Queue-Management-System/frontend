import { STATUS } from "@/config/Enum";
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
    addNewQueue: (state, action) => {
      state.queues.push({ ...action.payload });
    },
    updateQueueByID: (state, action) => {
      const index = state.queues.findIndex(
        (queue) => queue.id === action.payload.id
      );
      if (index !== -1) {
        state.queues[index] = { ...state.queues[index], ...action.payload };
      }
      return {
        ...state,
        queues: state.queues.filter(
          ({ status }) => ![STATUS.CALLED, STATUS.IN_PROGRESS].includes(status)
        ),
      };
    },
    removeQueueByID: (state, action) => {
      return {
        ...state,
        queues: state.queues.filter(({ id }) => id != action.payload),
      };
    },
  },
});

export const {
  setQueueList,
  setCurrentQueue,
  addNewQueue,
  updateQueueByID,
  removeQueueByID,
} = queueSlice.actions;

export default queueSlice.reducer;
