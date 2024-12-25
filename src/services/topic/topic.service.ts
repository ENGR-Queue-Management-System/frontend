import { isValidResponse } from "@/helpers/validation";
import { topicController } from "./topic.repository";

const topicService = topicController();

export const getTopics = async () => {
  const res = await topicService.getTopics();
  return isValidResponse(res);
};

export const createTopic = async (params: any) => {
  const res = await topicService.createTopic(params);
  return isValidResponse(res);
};

export const updateTopic = async (params: any) => {
  const res = await topicService.updateTopic(params);
  return isValidResponse(res);
};

export const deleteTopic = async (id: number) => {
  const res = await topicService.deleteTopic(id);
  return isValidResponse(res);
};
