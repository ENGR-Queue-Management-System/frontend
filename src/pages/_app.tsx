import { checkTokenExpired } from "@/helpers/validation";
import { getCounters } from "@/services/counter/counter.service";
import { getUserInfo } from "@/services/user/user.service";
import store, { useAppDispatch, useAppSelector } from "@/store";
import { setCounters } from "@/store/counter";
import { setUser } from "@/store/user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  NotificationProvider,
  useNotification,
} from "@/notifications/useNotification";
import UnsupportedNotification from "@/components/UnsupportedNotification";
import { Route } from "@/config/Route";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const { isSupported } = useNotification();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const location = usePathname();
  const user = useAppSelector((state) => state.user);
  const counters = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
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
        if (!counters.length) {
          fetchCounters();
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

  return loading ? (
    <div className="h-screen w-screen">
      <Loading />
    </div>
  ) : !isSupported ? (
    <UnsupportedNotification />
  ) : (
    <div className="flex overflow-hidden h-screen w-screen flex-col">
     {![Route.Index, Route.CmuOAuthCallback].includes(location) && <Navbar /> }
      <Component {...pageProps} />
    </div>
  );
  // return <Component {...pageProps} />
}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <MyApp {...props} />
      </NotificationProvider>
    </Provider>
  );
}
