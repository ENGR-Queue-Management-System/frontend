import { IModelConfig } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: { prevPath: "/" as string } as IModelConfig & {
    prevPath: string;
  },
  reducers: {
    setPrevPath: (state, action) => {
      state.prevPath = action.payload;
    },
    setConfigData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setLoginNotCmu: (state, action) => {
      state.loginNotCmu = action.payload;
    },
  },
});

export const { setPrevPath, setConfigData, setLoginNotCmu } =
  configSlice.actions;

export default configSlice.reducer;
