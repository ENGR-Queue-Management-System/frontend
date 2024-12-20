import apiService from "@/services/apiService";
import { CounterRequestDTO, CounterUpdateRequestDTO } from "./dto/counter.dto";

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
    updateCounter: async (id: number, params: CounterUpdateRequestDTO) => {
      return service.put(`${prefix}/${id}`, { ...params });
    },
    deleteCounter: async (id: number) => {
      return service.get(`${prefix}/${id}`);
    },
  };
};
