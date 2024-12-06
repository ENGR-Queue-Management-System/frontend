import apiService from "@/services/apiService";
import { AuthLoginRequestDTO } from "./dto/authentication.dto";

export const authenticationController = (configService: any = {}) => {
  const service = apiService(configService);

  return {
    login: async (params: AuthLoginRequestDTO) => {
      return service.post(`/authentication`, { ...params });
    },
  };
};
