import apiService from "@/services/apiService";
import { StudentQueueRequestDTO } from "./dto/queue.dto";

export const queueController = (configService: any = {}) => {
  const service = apiService(configService);
  const prefix = "/queue";

  return {
    getQueues: async (params: any) => {
      return service.get(prefix, { ...params });
    },
    getStudentQueue: async (params: StudentQueueRequestDTO) => {
      return service.get(`${prefix}/student`, { ...params });
    },
    createQueue: async (params: any) => {
      return service.post(prefix, { ...params });
    },
    updateQueue: async (id: number, params: any) => {
      return service.put(`${prefix}/${id}`, { ...params });
    },
    deleteQueue: async (id: number) => {
      return service.delete(`${prefix}/${id}`, {});
    },
  };
};
