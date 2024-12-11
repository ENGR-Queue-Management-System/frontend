import apiService from "@/services/apiService";
import { CounterRequestDTO } from "./dto/counter.dto";

export const roomController = (configService: any = {}) => {
  const service = apiService(configService);
  const prefix = "/counter";

  return {
    getCounters: async () => {
      return service.get(prefix);
    },
    createCounter: async (params: CounterRequestDTO) => {
      return service.post(prefix, { ...params });
    },
    deleteCounter: async (id: string) => {
      return service.get(`${prefix}/${id}`);
    },
  };
};
