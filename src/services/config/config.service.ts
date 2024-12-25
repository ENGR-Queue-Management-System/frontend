import { isValidResponse } from "@/helpers/validation";
import { configController } from "./config.repository";

const configService = configController();

export const getConfigData = async () => {
  const res = await configService.getConfigData();
  return isValidResponse(res);
};

export const updateLoginNotCmu = async (params: { loginNotCmu: boolean }) => {
  const res = await configService.updateLoginNotCmu(params);
  return isValidResponse(res);
};
