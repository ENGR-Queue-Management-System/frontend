import { createSlice } from "@reduxjs/toolkit";

export const errorResponseSlice = createSlice({
  name: "errorResponse",
  initialState: { error: undefined, statusCode: 403, message: undefined },
  reducers: {
    setErrorResponse: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setErrorResponse } = errorResponseSlice.actions;

export default errorResponseSlice.reducer;
