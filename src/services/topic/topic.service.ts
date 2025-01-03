import { isValidResponse } from "@/helpers/validation";
import { topicController } from "./topic.repository";
import { TopicRequestDTO } from "./dto/topic.dto";

const topicService = topicController();

export const getTopics = async () => {
  const res = await topicService.getTopics();
  return isValidResponse(res);
};

export const createTopic = async (params: TopicRequestDTO) => {
  const res = await topicService.createTopic(params);
  return isValidResponse(res);
};

export const updateTopic = async (
  id: number,
  params: Partial<TopicRequestDTO>
) => {
  const res = await topicService.updateTopic(id, params);
  return isValidResponse(res);
};

export const deleteTopic = async (id: number) => {
  const res = await topicService.deleteTopic(id);
  return isValidResponse(res);
};
