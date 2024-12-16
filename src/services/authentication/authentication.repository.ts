import apiService from "@/services/apiService";
import { AuthLoginRequestDTO, LoginRequestDTO } from "./dto/authentication.dto";

export const authenticationController = (configService: any = {}) => {
  const service = apiService(configService);

  return {
    loginWithAuth: async (params: AuthLoginRequestDTO) => {
      return service.post(`/authentication`, { ...params });
    },
    login: async (params: LoginRequestDTO) => {
      return service.post(`/login`, { ...params });
    },
  };
};
