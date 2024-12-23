import { isValidResponse } from "@/helpers/validation";
import { authenticationController } from "./authentication.repository";
import { ReserveRequestDTO } from "./dto/authentication.dto";

const authService = authenticationController();

export const loginWithAuth = async (code: string) => {
  const res = await authService.loginWithAuth({
    code,
    redirectUri: process.env.NEXT_PUBLIC_CMU_ENTRAID_REDIRECT_URL!,
  });
  return isValidResponse(res);
};

export const reserveNotLogin = async (params: ReserveRequestDTO) => {
  const res = await authService.reserveNotLogin(params);
  return isValidResponse(res);
};
