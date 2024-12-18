import { Button } from "@/components/ui/button";
import { Route } from "@/config/Route";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNotification } from "@/notifications/useNotification";
import { useForm } from "react-hook-form";
import { login } from "@/services/authentication/authentication.service";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loading";
import { checkTokenExpired, validateEngThai } from "@/helpers/validation";
import { setUser } from "@/store/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginRequestDTO } from "@/services/authentication/dto/authentication.dto";
import { useToast } from "@/hooks/use-toast";
import { setLoadingOverlay } from "@/store/loading";

export default function Login() {
  const { deviceType } = useNotification();
  const loading = useAppSelector((state) => state.loading.loadingOverlay);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onBlurHandler = async (fieldName: any) => {
    await form.trigger(fieldName);
  };

  const onClickLogin = async (data: LoginRequestDTO) => {
    dispatch(setLoadingOverlay(true));
    const res = await login(data);
    if (res) {
      localStorage.setItem("token", res.token);
      const decodeToken = await checkTokenExpired(res.token, true);
      dispatch(setUser(decodeToken));
      toast({
        title: "Login Successfully",
        // description: "",
        duration: 3,
      });
      router.push(Route.StudentIndex);
    }
    dispatch(setLoadingOverlay(false));
  };

  return (
    <div className="flex flex-col w-screen h-screen gap-10 -rounded font-extrabold justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onClickLogin)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            {...form.register("firstName", {
              required: true,
              pattern: {
                value: validateEngThai(),
                message: "invalid first name",
              },
            })}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fisrt Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="firstname"
                    {...field}
                    onBlur={() => onBlurHandler("firstName")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            {...form.register("lastName", {
              required: true,
              pattern: {
                value: validateEngThai(),
                message: "invalid last name",
              },
            })}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="lastName"
                    {...field}
                    onBlur={() => onBlurHandler("lastName")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="justify-center flex gap-10">
            <Button variant="destructive" onClick={() => router.back()}>
              Back
            </Button>
            <Button type="submit" disabled={loading} variant="default">
              {loading ? <Loading /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
