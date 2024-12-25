import apiService from "@/services/apiService";

export const configController = (configService: any = {}) => {
  const service = apiService(configService);
  const prefix = "/config";

  return {
    getConfigData: async () => {
      return service.get(prefix);
    },
    updateLoginNotCmu: async (params: { loginNotCmu: boolean }) => {
      return service.put(`${prefix}/login-not-cmu`, { ...params });
    },
  };
};
