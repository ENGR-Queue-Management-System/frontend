import { checkTokenExpired } from "@/helpers/validation";
import { getCounters } from "@/services/counter/counter.service";
import { getUserInfo } from "@/services/user/user.service";
import store, { useAppDispatch, useAppSelector } from "@/store";
import { setCounters } from "@/store/counter";
import { setQueue, setUser } from "@/store/user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname, useRouter } from "next/navigation";
import logoSDMinimal from "../../public/images/logoSDMiColor.png";
import { useEffect } from "react";
import { Provider } from "react-redux";
import Image from "next/image";
import logoEngColor from "../../public/images/logoSDColor.png";
import logoEng from "../../public/images/logoSDShadow.png";
import iconEx from "../../public/icons/exclaimation.svg";
import iconBell from "../../public/icons/bell.svg";
import {
  NotificationProvider,
  useNotification,
} from "@/notifications/useNotification";
import UnsupportedNotification from "@/components/UnsupportedNotification";
import { Route } from "@/config/Route";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { setLoading } from "@/store/loading";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { DEVICE_TYPE, ROLE } from "@/config/Enum";
import Icon from "@/components/Icon";
import { getStudentQueue } from "@/services/queue/queue.service";
import { StudentQueueRequestDTO } from "@/services/queue/dto/queue.dto";
import Router from "next/router";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const { deviceType } = useNotification();
  const { isSupported, isGranted, handleSubscribe } = useNotification();
  const loading = useAppSelector((state) => state.loading);
  const router = useRouter();
  const location = usePathname();
  const user = useAppSelector((state) => state.user.user);
  const queue = useAppSelector((state) => state.user.queue);
  const counters = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => dispatch(setLoading(false)), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!counters.length) {
      fetchCounters();
    }
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = checkTokenExpired(token, true);
      if (decodedToken) {
        if (!user.role) {
          if (decodedToken.role == ROLE.ADMIN) {
            fetchUser();
          } else {
            const data: any = {
              firstNameTH: decodedToken.firstName,
              lastNameTH: decodedToken.lastName,
            };
            if (decodedToken.studentId) {
              data.studentId = decodedToken.studentId;
            }
            dispatch(setUser(data));
            fetchQueue({
              firstName: decodedToken.firstName,
              lastName: decodedToken.lastName,
            });
          }
        }
      } else if (location != Route.Index) {
        // router.replace(Route.Index);
      }
    } else if (![Route.Index, Route.CmuEntraIDCallback].includes(location)) {
      // router.replace(Route.Index);
    }
  }, [dispatch, router, user.role]);

  const fetchUser = async () => {
    const res = await getUserInfo();
    if (res) {
      dispatch(setUser(res));
    }
  };

  const fetchCounters = async () => {
    const res = await getCounters();
    if (res) {
      dispatch(setCounters(res));
    }
  };

  const fetchQueue = async (payload: StudentQueueRequestDTO) => {
    const res = await getStudentQueue(payload);
    if (res) {
      dispatch(setQueue({ ...res.queue, waiting: res.waiting }));
      Router.push(Route.StudentQueue);
    }
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      {loading.loading ? (
        <div className="h-screen w-screen">
          <Loading />
        </div>
      ) : !isSupported ? (
        <UnsupportedNotification />
      ) : !isGranted ? (
        <div
          className={` ${
            [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
              ? "flex-col flex !h-full w-full"
              : "flex h-screen  w-screen justify-center text-center items-center overflow-hidden"
          }  `}
        >
          <div
            className={`${
              [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                ? "hidden"
                : "gradient-try-big text-[1.8vw] font-medium text-default flex flex-col h-screen w-[55%] text-start justify-center  pl-[4vw]"
            }`}
          >
            <Image
              src={
                [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                  ? logoEngColor
                  : logoEngColor
              }
              alt="logoEng"
              className={`samsungA24:w-[10vw] ${
                [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                  ? " mt-[50px] mb-4 "
                  : "-ml-1 mt-5 mb-3"
              } acerSwift:max-macair133:w-[12vw] cursor-not-allowed macair133:max-samsungA24:w-[11vw] iphone:max-sm:hidden sm:max-macair133:w-[20vw]`}
            />
            <p className="mt-3">Welcome to </p>
            <p className=" -mt-[2px]">Automatic Queuing System</p>
            <div>
              <p className=" mt-6 leading-6  sm:max-samsungA24:text-[14px] acerSwift:max-macair133:text-[16px] font-[500] iphone:max-sm:text-[12px] text-[16px]">
                Student Development Room <br />
                Faculty of Engineering, Chiang Mai University
              </p>
            </div>
          </div>

          <div
            className={` ${
              [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                ? " !w-full !h-screen  !justify-end !items-start pb-12 !text-start gradient-try"
                : "w-[45%]"
            } flex flex-col  justify-center text-center items-center`}
          >
            <div
              className={`flex flex-col ${
                [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                  ? "w-[100%]  h-full px-8 justify-end items-start text-start"
                  : "w-[80%] justify-center  text-start"
              } `}
            >
              <Image
                src={
                  [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                    ? logoSDMinimal
                    : ""
                }
                alt="logoEng"
                className={` ${
                  [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                    ? " mt-[40px] fixed top-3 left-0 -ml-9  w-[42vw] "
                    : "hidden"
                } `}
              />{" "}
              <div
                className={` ${
                  [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                    ? ""
                    : ""
                }`}
              >
                <Icon
                  IconComponent={iconBell}
                  className={`text-default size-20 stroke-[1.2px] mb-3 ${
                    [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                      ? "-ml-2"
                      : " "
                  }`}
                />
              </div>
              <p
                className={`${
                  [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                    ? "text-default text-start font-semibold text-[3vh]  "
                    : "text-default font-medium text-center text-[1.4vw]"
                } `}
              >
                {" "}
                Get notified!
              </p>{" "}
              <p
                className={`${
                  [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                    ? "text-[#969696] text-start font-medium text-[2.2vh] "
                    : "hidden"
                } `}
              >
                {" "}
                Automatic Queuing System
              </p>
              <p
                className={`my-4  ${
                  [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                    ? "text-[13px] "
                    : "text-[16px] text-center"
                } text-default font-medium`}
              >
                Don’t miss your queue! Allow notifications, and we’ll send you a
                friendly alert as soon as your queue arrives.
              </p>
              <div
                className={`flex gap-3  items-center justify-center  ${
                  [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                    ? " w-[100%] mt-2"
                    : "w-[100%] mt-8"
                } acerSwift:max-macair133:w-[40vw] p-4 acerSwift:max-macair133:p-3 rounded-md bg-[#f63131]/15`}
              >
                <Icon IconComponent={iconEx} className="text-[#f63131]" />
                <p className="iphone:max-sm:text-[13px] text-[14px] acerSwift:max-macair133:text-b3 text-[#f63131] font-bold text-start w-full ">
                  Notifications Required <br />
                  <p className="font-medium mt-[2px]">
                    If you do not allow notifications, you won’t be able to
                    access the system.
                  </p>
                </p>
              </div>
              <div
                className={`${
                  [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                    ? " w-[100%] mt-2"
                    : "flex flex-col !text-center !items-center !justify-center w-[100%] mt-6"
                }`}
              >
                <Button
                  style={{
                    boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.45)",
                  }}
                  className={`mt-5 ${
                    [DEVICE_TYPE.IOS, DEVICE_TYPE.ANDROID].includes(deviceType!)
                      ? " w-[100%] rounded-full bg-[#1db9bc] hover:bg-[#189b9d] mt-5 h-12 text-[15px] font-semibold"
                      : "py-6 px-12 text-[15px] bg-[#1db9bc] hover:bg-[#189b9d] font-semibold"
                  }`}
                  onClick={handleSubscribe}
                >
                  Allow Notification
                </Button>
              </div>
            </div>{" "}
          </div>
        </div>
      ) : loading.loadingOverlay ? (
        <LoadingOverlay />
      ) : (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
          {![
            Route.Index,
            Route.DisplayQueue,
            Route.CmuEntraIDCallback,
          ].includes(location) && <Navbar />}
          <div className="flex flex-col h-full w-full overflow-hidden">
            <Component {...pageProps} />
          </div>
        </div>
      )}
    </>
  );
  // return (
  //   <div className="flex flex-col h-screen w-screen overflow-hidden">
  //     {![Route.Index, Route.DisplayQueue, Route.CmuEntraIDCallback].includes(
  //       location
  //     ) && <Navbar />}
  //     <div className="flex flex-col h-full w-full overflow-hidden">
  //       <Component {...pageProps} />
  //     </div>
  //   </div>
  // );
}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <MyApp {...props} />
        <Toaster />
      </NotificationProvider>
    </Provider>
  );
}
