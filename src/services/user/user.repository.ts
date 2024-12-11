import apiService from "@/services/apiService";

export const userController = (configService: any = {}) => {
  const service = apiService(configService);
  const prefix = "/user";

  return {
    getUserInfo: async () => {
      return service.get(prefix);
    },
  };
};
