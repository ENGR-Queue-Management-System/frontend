import Router from "next/router";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Route } from "@/config/Route";
import { useEffect } from "react";
import { loginWithAuth } from "@/services/authentication/authentication.service";
import { useAppDispatch, useAppSelector } from "@/store";
import { setQueue, setUser } from "@/store/user";
import { jwtDecode } from "jwt-decode";
import { StudentQueueRequestDTO } from "@/services/queue/dto/queue.dto";
import { getStudentQueue } from "@/services/queue/queue.service";

export default function CmuEntraIDCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!code && !localStorage.getItem("token")) {
      Router.replace(Route.Index);
      return;
    }
    fetchData();
  }, [code]);

  const fetchData = async () => {
    if (code?.length) {
      const res = await loginWithAuth(code);
      if (res) {
        localStorage.setItem("token", res.token);
        const decodedToken: any = jwtDecode(res.token);
        if (res.user) {
          dispatch(setUser({ ...res.user, role: decodedToken.role }));
          Router.push(Route.AdminIndex);
        } else {
          dispatch(
            setUser({
              role: decodedToken.role,
              studentId: decodedToken.studentId,
              firstNameTH: decodedToken.firstName,
              lastNameTH: decodedToken.lastName,
            })
          );
          fetchQueue({
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
          });
        }
      }
    }
  };

  const fetchQueue = async (payload: StudentQueueRequestDTO) => {
    const res = await getStudentQueue(payload);
    if (res.queue.no) {
      dispatch(setQueue({ ...res.queue, waiting: res.waiting }));
      Router.push(Route.StudentQueue);
    } else {
      Router.push(Route.StudentIndex);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen gap-10 -rounded font-extrabold justify-center items-center">
      <h1 className="text-3xl whitespace-break-spaces">Redirecting ...</h1>
      <div className="justify-center flex gap-10 text-xl">
        <Button
          variant="destructive"
          className="!text-lg"
          onClick={() => Router.back()}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
