import { isValidResponse } from "@/helpers/validation";
import { authenticationController } from "./authentication.repository";

const authService = authenticationController();

export const logIn = async (code: string) => {
  const res = await authService.login({
    code,
    redirectUri: process.env.NEXT_PUBLIC_CMU_OAUTH_REDIRECT_URL || "",
  });
  return isValidResponse(res);
};
