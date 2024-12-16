import { isValidResponse } from "@/helpers/validation";
import { authenticationController } from "./authentication.repository";
import { LoginRequestDTO } from "./dto/authentication.dto";

const authService = authenticationController();

export const loginWithAuth = async (code: string) => {
  const res = await authService.loginWithAuth({
    code,
    redirectUri: process.env.NEXT_PUBLIC_CMU_OAUTH_REDIRECT_URL || "",
  });
  return isValidResponse(res);
};

export const login = async (params: LoginRequestDTO) => {
  const res = await authService.login(params);
  return isValidResponse(res);
};
