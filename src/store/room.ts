import { IModelRoom } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: [] as IModelRoom[],
  reducers: {
    setRooms: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { setRooms } = roomSlice.actions;

export default roomSlice.reducer;
