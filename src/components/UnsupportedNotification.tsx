import React from "react";
import Image from "next/image";
import logoEng from "../../public/images/logoSDShadow.png";
import instIOS from "../../public/images/instIOS.png";

export default function UnsupportedNotification() {
  return (
    <div className="flex flex-col gradient-bg h-full w-full font-[500]  bg-cover bg-center">
      <div className="flex  justify-center     ">
        <div className="text-white text-center py-5 w-full h-full justify-start items-center flex flex-col gap-5  bg-[rgba(85,85,86,0.25)] ">
          <Image
            src={logoEng}
            alt="logoEng"
            className=" samsungA24:w-[10vw] mb-3 mt-5 macair133:max-samsungA24:w-[35vw] iphone:max-sm:w-[45vw] sm:max-macair133:w-[30vw]"
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
            <div className="flex flex-col text-b2 gap-1 mb-16">
              <p className=" font-medium">
                กรุณาทำตามขั้นตอนข้างล่างเพื่อจองคิว และเข้าใช้งานระบบ
              </p>
              <p className=" font-medium ">
                Please follow the steps below to login the system
              </p>
            </div>
            <p className=" font-medium text-[20px]">iOS & iPadOS</p>
          </div>
          <Image src={instIOS} alt="logoEng" className=" w-[95vw]" />
        </div>
      </div>
      <div className="flex  w-screen justify-center   ">
        <div className="text-white text-center py-5 w-full h-full justify-start items-center flex flex-col     gap-5  bg-[rgba(85,85,86,0.25)]  ">
          <div className="mt- flex flex-col">
            <p className="font-medium text-[20px] mt-5">Android</p>
          </div>
          <Image src={instIOS} alt="logoEng" className=" w-[95vw]" />
        </div>
      </div>
    </div>
  );
}
