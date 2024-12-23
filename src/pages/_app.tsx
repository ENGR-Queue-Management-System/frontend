import { checkTokenExpired } from "@/helpers/validation";
import { getCounters } from "@/services/counter/counter.service";
import { getUserInfo } from "@/services/user/user.service";
import store, { useAppDispatch, useAppSelector } from "@/store";
import { setCounters } from "@/store/counter";
import { setUser } from "@/store/user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
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
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function MyApp({ Component, pageProps }: AppProps) {
  const { isSupported, isGranted, handleSubscribe } = useNotification();
  const loading = useAppSelector((state) => state.loading);
  const router = useRouter();
  const location = usePathname();
  const user = useAppSelector((state) => state.user);
  const counters = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
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
        if (!user.email) {
          if (decodedToken.email) {
            fetchUser();
          } else {
            dispatch(
              setUser({
                firstNameTH: decodedToken.firstName,
                lastNameTH: decodedToken.lastName,
              })
            );
          }
        }
      } else if (location != Route.Index) {
        // router.replace(Route.Index);
      }
    } else if (![Route.Index, Route.CmuOAuthCallback].includes(location)) {
      // router.replace(Route.Index);
    }
  }, [dispatch, router, user.email]);

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

  return loading.loading ? (
    <div className="h-screen w-screen">
      <Loading />
    </div>
  ) : !isSupported ? (
    <UnsupportedNotification />
  ) : !isGranted ? (
    <div className="flex flex-col h-screen w-screen justify-center items-center overflow-hidden">
      <Button onClick={handleSubscribe}>Subscribe</Button>
    </div>
  ) : loading.loadingOverlay ? (
    <LoadingOverlay />
  ) : (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {![Route.Index, Route.DisplayQueue, Route.CmuOAuthCallback].includes(
        location
      ) && <Navbar />}
      <div className="flex flex-col h-full w-full overflow-hidden">
        <Component {...pageProps} />
      </div>
    </div>
  );
  // return (
  //   <div className="flex flex-col h-screen w-screen overflow-hidden">
  //     {![Route.Index, Route.DisplayQueue, Route.CmuOAuthCallback].includes(
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
