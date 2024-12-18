import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: { loading: false, loadingOverlay: false },
  reducers: {
    setLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
    setLoadingOverlay: (state, action) => {
      return { ...state, loadingOverlay: action.payload };
    },
  },
});

export const { setLoading, setLoadingOverlay } = loadingSlice.actions;

export default loadingSlice.reducer;
