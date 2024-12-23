import { IModelQueue, IModelUser } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: {} as IModelUser, queue: {} as IModelQueue },
  reducers: {
    setUser: (state, action) => {
      return { user: { ...action.payload }, queue: {} as IModelQueue };
    },
    setQueue: (state, action) => {
      return { ...state, queue: { ...action.payload } };
    },
  },
});

export const { setUser, setQueue } = userSlice.actions;

export default userSlice.reducer;
