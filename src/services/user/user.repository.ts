import Router from "next/router";
import { Route } from "@/config/Route";
import apiService from "@/services/apiService";
import store from "@/store";
import { setUser } from "@/store/user";

export const userController = (configService: any = {}) => {
  const service = apiService(configService);
  const prefix = "/user";

  return {
    getUserInfo: async () => {
      return service.get(prefix);
    },
    logout: () => {
      localStorage.removeItem("token");
      store.dispatch(setUser({}));
      Router.push(Route.Index);
    },
  };
};
