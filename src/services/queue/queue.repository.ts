import apiService from "@/services/apiService";

export const queueController = (configService: any = {}) => {
  const service = apiService(configService);
  const prefix = "/queue";

  return {
    getQueues: async (params: any) => {
      return service.get(prefix, { ...params });
    },
    createQueue: async (params: any) => {
      return service.post(prefix, { ...params });
    },
    updateQueue: async (id: string, params: any) => {
      return service.put(`${prefix}/${id}`, { ...params });
    },
    deleteQueue: async (id: string) => {
      return service.get(`${prefix}/${id}`);
    },
  };
};
