import { IModelTopic } from "@/models/Model";
import { createSlice } from "@reduxjs/toolkit";

export const topicSlice = createSlice({
  name: "topic",
  initialState: [] as IModelTopic[],
  reducers: {
    setTopics: (state, action) => {
      return [...action.payload];
    },
    updateTopicData: (state, action) => {
      return state.map((topic) =>
        topic.id == action.payload.id ? { ...topic, ...action.payload } : topic
      );
    },
    updateWaitingTopic: (state, action) => {
      return state.map((topic) =>
        topic.id == action.payload.id
          ? { ...topic, waiting: action.payload.waiting }
          : topic
      );
    },
    addTopic: (state, action) => {
      state.push({ ...action.payload });
      return state;
    },
    removeTopic: (state, action) => {
      return state.filter((topic) => topic.id != action.payload);
    },
  },
});

export const {
  setTopics,
  updateTopicData,
  updateWaitingTopic,
  addTopic,
  removeTopic,
} = topicSlice.actions;

export default topicSlice.reducer;
