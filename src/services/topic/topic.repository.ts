import apiService from "@/services/apiService";

export const topicController = (configService: any = {}) => {
  const service = apiService(configService);
  const prefix = "/topic";

  return {
    getTopics: async () => {
      return service.get(prefix);
    },
    createTopic: async (params: any) => {
      return service.post(prefix, { ...params });
    },
    updateTopic: async (params: any) => {
      return service.put(prefix, { ...params });
    },
    deleteTopic: async (id: string) => {
      return service.get(`${prefix}/${id}`);
    },
  };
};
