import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Route } from "@/config/Route";
import { useRouter } from "next/navigation";
import logoEng from "../../public/images/logoEng1.png";
import cmuLogoWhite from "../../public/images/cmuLogoLogin.png";
import { useAppSelector } from "@/store";
import { useEffect } from "react";
import { useNotification } from "@/notifications/useNotification";

export default function Home() {
  const { deviceType } = useNotification();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.email) {
      if (user.studentId) {
        router.push(Route.StudentIndex);
      } else {
        router.push(Route.AdminIndex);
      }
    }
  }, [user]);

  const onClickLogin = () => {};

  return (
    <div className=" flex items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex gradient-bg h-screen w-screen justify-center  items-center bg-cover bg-center">
        <div className="flex h-screen w-screen justify-center items-center inset-0 px-36  ">
          <div className="text-white text-center justify-start items-center flex flex-col iphone:max-sm:bg-transparent iphone:max-sm:shadow-none sm:max-samsungA24:px-24 sm:max-samsungA24:py-12 samsungA24:px-28 samsungA24:py-16 gap-5 rounded-[25px] bg-[rgba(85,85,86,0.25)] shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)]">
            <Image
              src={logoEng}
              alt="logoEng"
              className=" samsungA24:size-44 macair133:max-samsungA24:size-40 iphone:max-sm:size-36 sm:max-macair133:size-[156px]"
            />
            <div>
              <p className=" sm:max-samsungA24:text-[28px] iphone:max-sm:text-[24px] text-[34px]">
                ระบบบัตรคิวอัตโนมัติ
              </p>
              <p className=" sm:max-samsungA24:text-[20px] iphone:max-sm:text-[18px] text-[28px]">
                Automatic Queuing System
              </p>
            </div>
            <div className="mt-1">
              <p className=" text-h2 sm:max-samsungA24:text-[15px] iphone:max-sm:text-[12px] font-[400]">
                คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่
              </p>
              <p className=" text-[16px] sm:max-samsungA24:text-[13px] iphone:max-sm:text-[11px] font-[400] mt-[2px]">
                Faculty of Engineering, Chiang Mai University
              </p>
            </div>
            <div className=" border-2 border-white w-full text-white mt-2 py-3 px-5 iphone:max-sm:text-[13px] sm:max-samsungA24:text-[15px]  text-white-500 rounded-md">
              <p>
                เนื่องจากระบบอยู่ในช่วงทดลองใช้งานหากท่านพบปัญหาในการใช้งาน{" "}
                <br /> ให้ท่านปัดแอปพลิเคชันทิ้ง แล้วลองเข้าใหม่อีกครั้ง
                <p className=" text-white underline  mt-2">
                  รายงานปัญหาได้ที่นี่
                </p>
              </p>
            </div>

            <a href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}>
              <Button
                variant="default"
                className="text-sm font-semibold py-[22px] iphone:max-sm:rounded-full iphone:max-sm:py-[26px] iphone:max-sm:px-14 mt-8 iphone:max-sm:mt-10 w-fit px-10 rounded-[8px] bg-[#ffffff] text-[#605CA4] hover:bg-[#e8e8e8] 
             shadow-md hover:shadow-lg"
              >
                <Image
                  src={cmuLogoWhite}
                  alt="cmulogo"
                  className="w-[42px] mr-2"
                />
                Sign in CMU account
              </Button>
            </a>
            <div className="flex flex-col mt-5">
              <p className="sm:max-samsungA24:text-[15px] iphone:max-sm:text-[14px] font-[500]">
                ท่านไม่มี CMU account?{" "}
                <span
                  className="underline font-[500] cursor-pointer"
                  onClick={onClickLogin}
                >
                  คลิกที่นี่
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
