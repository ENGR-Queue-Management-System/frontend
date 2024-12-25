import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: { prevPath: "/" as string },
  reducers: {
    setPrevPath: (state, action) => {
      state.prevPath = action.payload;
    },
  },
});

export const { setPrevPath } = configSlice.actions;

export default configSlice.reducer;
