import { Route } from "@/config/Route";
import { checkTokenExpired } from "@/helpers/validation";
import { getCounters } from "@/services/counter/counter.service";
import { getUserInfo } from "@/services/user/user.service";
import store, { useAppDispatch, useAppSelector } from "@/store";
import { setCounters } from "@/store/counter";
import { setUser } from "@/store/user";
import "@/styles/globals.css";
import { jwtDecode } from "jwt-decode";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
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
          if (decodedToken.studentId) {
            dispatch(setUser(decodedToken));
          } else {
            fetchUser();
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

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  );
}
