import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Route } from "@/config/Route";
import { useRouter } from "next/navigation";
import logoEng from "../../public/images/logoEng1.png";
import IconLocation from "../../public/icons/location.svg?react";
import cmuLogoWhite from "../../public/images/cmuLogoLogin.png";
import Icon from "@/components/Icon";
export default function Home() {
  const router = useRouter();
  return (
    <div className=" flex items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex gradient-bg h-screen w-screen justify-center  items-center bg-cover bg-center">
        <div className="flex h-screen w-screen justify-between items-center inset-0 px-36  bg-gray-100/5">
          {" "}
          <div className="text-white flex flex-col gap-5">
            <Image
              src={logoEng}
              alt="logoEng"
              className=" size-44 -translate-x-4"
            />
            <div>
              <p className=" text-[34px]">ระบบบัตรคิวอัตโนมัติ</p>
              <p className=" text-[28px]">Automatic Queuing System</p>
            </div>
            <div className="mt-1">
              <p className=" text-[18px] font-[400]">
                คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่
              </p>
              <p className=" text-[16px] font-[400] mt-[2px]">
                Faculty of Engineering, Chiang Mai University
              </p>
            </div>
            <Button
              variant="default"
              className="text-sm font-semibold py-[22px] mt-8 w-fit px-10 rounded-[8px] bg-[#ffffff] text-[#605CA4] hover:bg-[#e8e8e8]"
              onClick={() => router.push(Route.CmuOAuthCallback)}
            >
              <Image
                src={cmuLogoWhite}
                alt="cmulogo"
                className=" w-[42px] mr-2 "
              />
              Sign in CMU Account
            </Button>
          </div>
          <div className="h-[400px]  bg-[#535353]/30 rounded-[10px] shadow flex-col justify-center items-center  ">
            <div className="h-[300.38px] flex-col justify-start items-center gap-[50px] flex">
              <div className=" text-white py-2 w-full">
                <Icon IconComponent={IconLocation} />
                <p>ห้องพัฒนาคุณภาพนักศึกษา</p>
                <p>Student development Room</p>
              </div>
              <div className="self-stretch h-[38.70px] flex-col justify-start items-center gap-[15px] flex">
                <div className="px-5 py-[13px] bg-white rounded-lg flex-col justify-center items-center gap-2.5 flex">
                  <div className="self-stretch justify-center items-center gap-3 inline-flex">
                    <img
                      className="w-10 h-[12.70px]"
                      src="https://via.placeholder.com/40x13"
                    />
                    <div className="text-center text-[#696aa9] text-xs font-semibold font-['Manrope'] leading-3">
                      Sign in CMU Account
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
