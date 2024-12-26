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
import { useNotification } from "@/notifications/useNotification";

export default function ErrorResponse() {
  const error = useAppSelector((state) => state.errorResponse);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { deviceType, isPhone, pushSubscription } = useNotification();

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
        return "Oops!";
      case 500:
        return "Sorry, this is unexpected...";
      default:
        return "";
    }
  };

  const headerError = (): string => {
    switch (error.statusCode!) {
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "403 - Access Denied";
      case 500:
        return "SDQueue Server Error";
      default:
        return "";
    }
  };

  const messageError = (): JSX.Element | string => {
    switch (error.statusCode!) {
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return (
          <p>
            Your CMU account doesn’t have access to SDQueue <br /> Please
            contact the Student Development Room, Faculty of Engineering, CMU,
            for help.
          </p>
        );
      case 500:
        return "SDQueue Server Error";
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
        return "bg-gradient-to-b from-[#eefcff] via-[#dffaf8] to-[#f6fffd]";

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
        return "text-[#2e65e7]";
      case 500:
        return "text-[#487ded]";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col w-screen  h-screen">
      <div
        className={`${colorBg()} text-start text-white w-screen px-8 h-full flex flex-col  ${
          isPhone
            ? "justify-between items-start"
            : "justify-center items-center"
        } `}
      >
        {isPhone && <div></div>}
        <div className={`flex ${isPhone} items-start  flex-col gap-4`}>
          <p className="text-3xl   font-semibold">
            <span className=" text-gray-600 font-normal">{title()}</span>
          </p>

          <div
            className={`${
              isPhone ? "text-[26px] " : "text-4xl "
            } font-semibold flex items-center  my-4 gap-4`}
          >
            <p className={` ${colorStatusCode()}`}>{headerError()}</p>
          </div>
          <p
            className={` ${
              isPhone
                ? "text-[13px] leading-[24px] -mt-3"
                : "text-[16px] leading-[26px]"
            } font-medium text-gray-600`}
          >
            {messageError()}
          </p>
          {!isPhone && (
            <Button
              className={`  p-0 ${
                isPhone ? "mb-8 " : " mt-5"
              }   text-[16px] font-semibold`}
              variant="link"
              onClick={goToHomePage}
            >
              <Icon IconComponent={IconBack} className="!size-6" />
              Back
            </Button>
          )}
        </div>

        {isPhone && (
          <div className="flex items-start w-full justify-start">
            <Button
              className={` !w-[100%] rounded-full mt-5 h-12 text-[15px] font-semibold bg-primary hover:bg-[#3560b0] ${
                isPhone ? "mb-12  " : " "
              }   `}
              variant='default'
              onClick={goToHomePage}
            >
              <Icon IconComponent={IconBack} className="!size-6" />
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
