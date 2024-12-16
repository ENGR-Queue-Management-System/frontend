import { checkTokenExpired } from "@/helpers/validation";
import { getCounters } from "@/services/counter/counter.service";
import { getUserInfo } from "@/services/user/user.service";
import store, { useAppDispatch, useAppSelector } from "@/store";
import { setCounters } from "@/store/counter";
import { setUser } from "@/store/user";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider } from "react-redux";
import {
  NotificationProvider,
  useNotification,
} from "@/notifications/useNotification";
import UnsupportedNotification from "@/components/UnsupportedNotification";

function MyApp({ Component, pageProps }: AppProps) {
  const { isSupported } = useNotification();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const counters = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = checkTokenExpired(token);
      if (!decodedToken) {
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
      }
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

  return !isSupported ? (
    <UnsupportedNotification />
  ) : (
    <Component {...pageProps} />
  );
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
