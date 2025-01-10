import { checkTokenExpired } from "@/helpers/validation";
import { getCounters } from "@/services/counter/counter.service";
import { getUserInfo } from "@/services/user/user.service";
import store, { useAppDispatch, useAppSelector } from "@/store";
import { setCounters } from "@/store/counter";
import { setQueue, setUser } from "@/store/user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";
import { StrictMode, useEffect } from "react";
import { Provider } from "react-redux";
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
import { ROLE } from "@/config/Enum";
import { getStudentQueue } from "@/services/queue/queue.service";
import { StudentQueueRequestDTO } from "@/services/queue/dto/queue.dto";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import SubscribeNotification from "@/components/SubscribeNotification";
import { getTopics } from "@/services/topic/topic.service";
import { setTopics } from "@/store/topic";
import { setConfigData, setPrevPath } from "@/store/config";
import { getConfigData } from "@/services/config/config.service";
import ErrorResponse from "@/components/ErrorResponse";
import setupSocket, { socket } from "@/config/socket";

function MyApp({ Component, pageProps }: AppProps) {
  const { isSupported, isGranted } = useNotification();
  const loading = useAppSelector((state) => state.loading);
  const error = useAppSelector((state) => state.errorResponse);
  const router = useRouter();
  const location = usePathname();
  const user = useAppSelector((state) => state.user.user);
  const counters = useAppSelector((state) => state.counter);
  const topics = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // setupSocket();
    const timeout = setTimeout(() => dispatch(setLoading(false)), 2000);
    return () => {
      clearTimeout(timeout);
      // socket.close();
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      dispatch(setPrevPath(router.asPath));
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    const fetchPeriodicData = async () => {
      try {
        const [configRes, countersRes, topicsRes] = await Promise.all([
          getConfigData(),
          getCounters(),
          getTopics(),
        ]);
        if (configRes) {
          dispatch(setConfigData(configRes));
        }
        if (countersRes) {
          dispatch(setCounters(countersRes));
        }
        if (topicsRes) {
          dispatch(setTopics(topicsRes));
        }

        if (user.role == ROLE.STUDENT && user.firstNameTH && user.lastNameTH) {
          fetchQueue({
            firstName: user.firstNameTH,
            lastName: user.lastNameTH,
          });
        }
      } catch (error) {
        console.error("Error fetching periodic data:", error);
      }
    };

    const interval = setInterval(fetchPeriodicData, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
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
            dispatch(setUser({ ...data, role: ROLE.STUDENT }));
          }
        }
      } else if (location != Route.Index) {
        // router.replace(Route.Index);
      }
    } else if (![Route.Index, Route.CmuEntraIDCallback].includes(location)) {
      // router.replace(Route.Index);
    }
  }, [dispatch, user.role]);

  const fetchUser = async () => {
    const res = await getUserInfo();
    if (res) {
      dispatch(setUser({ ...res, role: ROLE.ADMIN }));
    }
  };

  const fetchQueue = async (payload: StudentQueueRequestDTO) => {
    const res = await getStudentQueue(payload);
    if (res) {
      if (res.queue.no) {
        dispatch(setQueue({ ...res.queue, waiting: res.waiting }));
        if (location != Route.StudentQueue) Router.push(Route.StudentQueue);
      }
    }
  };

  // return (
  //   <>
  //     <Head>
  //       <meta
  //         name="viewport"
  //         content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
  //       />
  //     </Head>
  //     {loading.loading ? (
  //       <div className="h-screen w-screen">
  //         <Loading />
  //       </div>
  //     ) : !isSupported ? (
  //       <UnsupportedNotification />
  //     ) : !isGranted ? (
  //       <SubscribeNotification />
  //     ) : error.statusCode ? (
  //       <ErrorResponse />
  //     ) : (
  //       <div className="flex flex-col h-screen w-screen overflow-hidden">
  //         {loading.loadingOverlay && <LoadingOverlay />}
  //         {![
  //           Route.Index,
  //           Route.DisplayQueue,
  //           Route.CmuEntraIDCallback,
  //         ].includes(location) && <Navbar />}
  //         <div className="flex flex-col h-full w-full overflow-hidden">
  //           <Component {...pageProps} />
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );
  return (
    <>
  {error.statusCode ? (
        <ErrorResponse />
       ) : (
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        {![Route.Index, Route.DisplayQueue, Route.CmuEntraIDCallback].includes(
          location
        ) && <Navbar />}
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Component {...pageProps} />
        </div>
      </div>)}
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <StrictMode>
      <Provider store={store}>
        <NotificationProvider>
          <MyApp {...props} />
          <Toaster />
        </NotificationProvider>
      </Provider>
    </StrictMode>
  );
}
