import apiService from "@/services/apiService";
import { TopicRequestDTO } from "./dto/topic.dto";

export const topicController = (configService: any = {}) => {
  const service = apiService(configService);
  const prefix = "/topic";

  return {
    getTopics: async () => {
      return service.get(prefix);
    },
    createTopic: async (params: TopicRequestDTO) => {
      return service.post(prefix, { ...params });
    },
    updateTopic: async (id: number, params: Partial<TopicRequestDTO>) => {
      return service.put(`${prefix}/${id}`, { ...params });
    },
    deleteTopic: async (id: number) => {
      return service.delete(`${prefix}/${id}`, {});
    },
  };
};
