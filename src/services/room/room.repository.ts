import apiService from "@/services/apiService";

export const roomController = (configService: any = {}) => {
  const service = apiService(configService);
  const prefix = "/room";

  return {
    getAllRooms: async () => {
      return service.get(prefix);
    },
  };
};
