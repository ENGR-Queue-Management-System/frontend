import { RESPONSE_MESSAGE, STATUS_CODE } from "@/config/response.enum";
import { Route } from "@/config/Route";
import { jwtDecode } from "jwt-decode";

export const checkTokenExpired = (
  token: string,
  decodeData: boolean = false
) => {
  try {
    const decode: any = jwtDecode(token);
    // check expired
    if (decode.exp && decode.exp * 1000 <= new Date().getTime()) {
      return true;
    }
    if (decodeData) return decode;
    return false;
  } catch (err) {
    // token invalid
    return true;
  }
};

export const isValidResponse = async (res: any) => {
  if (res.message === RESPONSE_MESSAGE.SUCCESS) {
    return res.data;
  } else {
    switch (res.statusCode) {
      case STATUS_CODE.NOT_FOUND:
        break;
      case STATUS_CODE.FORBIDDEN:
      case STATUS_CODE.UNAUTHORIZED:
        const isExpired = await checkTokenExpired(
          localStorage.getItem("token") || ""
        );
        if (localStorage.getItem("token") && isExpired) {
          localStorage.removeItem("token");
          window.location.assign(Route.Index);
          return;
        }
        break;
      default:
        break;
    }
    return;
  }
};

export const validateTextInput = (
  value: string | null | undefined,
  title: string,
  maxLength = 70,
  checkCha = true
) => {
  if (!value) return `${title} is required`;
  if (!value.trim().length) return "Cannot have only spaces";
  if (maxLength != 0 && value.length > maxLength)
    return `You have ${value.length - maxLength} characters too many`;
  if (checkCha) {
    const isValid = /^[0-9A-Za-z "%&()*+,-./<=>?@[\]\\^_]+$/.test(value);
    return isValid
      ? null
      : `only contain 0-9, a-z, A-Z, space, "%&()*+,-./<=>?@[]\\^_`;
  }
};

export const validateEmail = () => {
  return /^\S+@cmu\.ac\.th$/i;
};

export const validateEngThai = () => {
  return /^[a-zA-Zก-๙\s]+$/;
};

export const validateThaiLanguage = () => {
  return /[\u0E00-\u0E7F]/;
};

export const ellipsisText = (text: string, limit: number = 10) => {
  if (typeof text !== "string") {
    return "";
  }
  return text.length <= limit ? text : text.substring(0, limit).concat("...");
};
