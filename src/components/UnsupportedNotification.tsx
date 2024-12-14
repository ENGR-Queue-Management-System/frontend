import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Route } from "@/config/Route";
import { useRouter } from "next/navigation";
import logoEng from "../../public/images/logoEng1.png";
import instIOS from "../../public/images/instIOS.png";
import { useAppSelector } from "@/store";
import { useEffect } from "react";

export default function UnsupportedNotification() {
  return (
    <div className="flex flex-col gradient-bg h-full w-full  bg-cover bg-center">
      <div className="flex  justify-center     ">
        <div className="text-white text-center py-5 w-full h-full justify-start items-center flex flex-col gap-5  bg-[rgba(85,85,86,0.25)] ">
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

          <div className="mt-12 flex flex-col">
            <p className=" font-medium">
              การใช้งานระบบบัตรคิวอัตโนมัติ <br />
              บน iOS และ iPadOS
            </p>
            <p className=" font-medium mt-4">
              How to use Automatc Queuing System <br />
              on iOS and iPadOS
            </p>
          </div>
          <Image src={instIOS} alt="logoEng" className=" w-[95vw]" />
        </div>
      </div>
      <div className="flex  w-screen justify-center   ">
        <div className="text-white text-center py-5 w-full h-full justify-start items-center flex flex-col     gap-5 r bg-[rgba(85,85,86,0.25)] border-[#bdbdbd89] border-t-2">
          <div className="mt- flex flex-col">
            <p className=" font-medium">
              การใช้งานระบบบัตรคิวอัตโนมัติ <br />
              บน Android
            </p>
            <p className=" font-medium mt-4">
              How to use Automatc Queuing System <br />
              on Android
            </p>
          </div>
          <Image src={instIOS} alt="logoEng" className=" w-[95vw]" />
        </div>
      </div>
    </div>
  );
}
