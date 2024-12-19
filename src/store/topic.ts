import { IModelTopic } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const topicSlice = createSlice({
  name: "topic",
  initialState: [] as IModelTopic[],
  reducers: {
    setTopics: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { setTopics } = topicSlice.actions;

export default topicSlice.reducer;
