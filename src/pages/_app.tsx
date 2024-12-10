import { Route } from "@/config/Route";
import { checkTokenExpired } from "@/helpers/validation";
import { getAllRooms } from "@/services/room/room.service";
import { getUserInfo } from "@/services/user/user.service";
import store, { useAppDispatch, useAppSelector } from "@/store";
import { setRooms } from "@/store/room";
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
  const rooms = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken.email) return;
      if (decodedToken.exp * 1000 <= new Date().getTime()) {
        localStorage.removeItem("token");
        router.replace(Route.Index);
        return;
      }
      if (!user.email) {
        if (decodedToken.studentId) {
          dispatch(setUser(decodedToken));
        } else {
          fetchUser();
        }
      }
      if (!rooms.length) {
        fetchRooms();
      }
    }
  }, [dispatch, router, user.email]);

  const fetchUser = async () => {
    const res = await getUserInfo();
    if (res) {
      dispatch(setUser(res));
    }
  };

  const fetchRooms = async () => {
    const res = await getAllRooms();
    if (res) {
      dispatch(setRooms(res));
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
