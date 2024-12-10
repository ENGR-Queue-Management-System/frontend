import { isValidResponse } from "@/helpers/validation";
import { userController } from "./user.repository";

const userService = userController();

export const getUserInfo = async () => {
  const res = await userService.getUserInfo();
  return isValidResponse(res);
};

export const updateUser = async (params: any) => {
  const res = await userService.updateUser(params);
  return isValidResponse(res);
};
