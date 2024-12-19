import apiService from "@/services/apiService";
import {
  AuthLoginRequestDTO,
  ReserveRequestDTO,
} from "./dto/authentication.dto";

export const authenticationController = (configService: any = {}) => {
  const service = apiService(configService);

  return {
    loginWithAuth: async (params: AuthLoginRequestDTO) => {
      return service.post(`/authentication`, { ...params });
    },
    reserveNotLogin: async (params: ReserveRequestDTO) => {
      return service.post(`/reserve`, { ...params });
    },
  };
};
