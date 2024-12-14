import apiService from "@/services/apiService";

export const subscriptionController = (configService: any = {}) => {
  const service = apiService(configService);
  return {
    subscribeNotification: async (params: any) => {
      return service.post("/subscribe", { ...params });
    },
  };
};
