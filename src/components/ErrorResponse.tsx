import { STATUS_CODE } from "@/config/response.enum";
import { Route } from "@/config/Route";
import { useAppDispatch, useAppSelector } from "@/store";
import { setErrorResponse } from "@/store/errorResponse";
import { setLoading, setLoadingOverlay } from "@/store/loading";
import { setUser } from "@/store/user";
import Router from "next/router";
import { useEffect } from "react";
import { Button } from "./ui/button";
import Icon from "./Icon";
import IconBack from "../../public/icons/arrowLeft.svg";
import { ROLE } from "@/config/Enum";

export default function ErrorResponse() {
  const error = useAppSelector((state) => state.errorResponse);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
    dispatch(setLoadingOverlay(false));
  }, []);

  const goToHomePage = () => {
    dispatch(setErrorResponse({}));
    if (localStorage.getItem("token")) {
      Router.replace(
        user.user.role == ROLE.ADMIN
          ? Route.AdminIndex
          : user.queue.no
          ? Route.StudentQueue
          : user.user.studentId
          ? Route.StudentIndex
          : Route.Login
      );
    } else {
      dispatch(setUser({}));
      Router.replace(Route.Index);
    }
  };

  const title = (): string => {
    switch (error.statusCode!) {
      case 400:
        return "Whoops!";
      case 401:
        return "Oh No!";
      case 403:
        return "Hold on...";
      case 500:
        return "Sorry, this is unexpected...";
      default:
        return "";
    }
  };

  const colorBg = (): string => {
    switch (error.statusCode!) {
      case 400:
        return "bg-[#faefdc]";
      case 401:
        return "bg-[#fff1f1]";
      case 403:
        return "bg-[#f1fff8]";
      case 500:
        return "bg-[#e9fdff]";
      default:
        return "";
    }
  };

  const colorStatusCode = (): string => {
    switch (error.statusCode!) {
      case 400:
        return "text-amber-600";
      case 401:
        return "text-pink-500";
      case 403:
        return "text-[#24aa79]";
      case 500:
        return "text-[#487ded]";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <div
        className={`${colorBg()} text-start text-white w-screen px-36 h-full flex justify-between items-center`}
      >
        <div className="flex flex-col gap-4">
          <p className="text-3xl   font-semibold">
            <span className=" text-gray-600 font-normal">{title()}</span>
          </p>
          <div className="text-4xl font-semibold flex items-center my-4 gap-4">
            <p className={`-translate-x-2 ${colorStatusCode()}`}>
              {error.error}
            </p>
          </div>
          <p className="text-lg  font-medium text-gray-600">{error.message}</p>
          <Button variant="default" onClick={goToHomePage}>
            <Icon IconComponent={IconBack} />
            Back to The Home Page
          </Button>
        </div>
        <p className={`text-[120px] font-medium ${colorStatusCode()}`}>
          {error.statusCode}
        </p>
      </div>
    </div>
  );
}
