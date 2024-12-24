import React from "react";
import Image from "next/image";
import logoEng from "../../public/images/logoSDColor.png";
import instIOS from "../../public/images/instIOS.png";
import Icon from "./Icon";
import iconBlock from "../../public/icons/block.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UnsupportedNotification() {
  return (
    <div className="flex flex-col gradient-unsupport h-full w-full font-[500]  bg-cover bg-center">
      <div className="flex  justify-center items-center text-center     ">
        <div className="text-black text-center py-5 w-full h-full justify-start items-center flex flex-col gap-5  bg-[rgba(85,85,86,0.25)] ">
          <Image
            src={logoEng}
            alt="logoEng"
            className=" samsungA24:w-[10vw] mb-3 mt-7 macair133:max-samsungA24:w-[35vw] iphone:max-sm:w-[42vw] sm:max-macair133:w-[30vw]"
          />
          <div>
            <p className=" sm:max-samsungA24:text-[28px] font-normal iphone:max-sm:text-[24px] text-[34px]">
              ระบบบัตรคิวอัตโนมัติ
            </p>
            <p className=" sm:max-samsungA24:text-[20px] iphone:max-sm:text-[18px] text-[28px]">
              Automatic Queuing System
            </p>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="flex p-4 rounded-2xl bg-[#ffffff] flex-col text-[12px] gap-1 mb-8">
              <div className="flex gap-3 text-primary items-center">
                <Icon
                  IconComponent={iconBlock}
                  className="stroke-[1.3px] size-7"
                />
                <div className="flex items-center flex-col">
                  <p className=" notSelectable font-medium">
                    กรุณาทำตามขั้นตอนข้างล่างเพื่อเข้าใช้งาน
                  </p>
                  <p className=" font-medium ">
                    Please follow the steps below to login
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="iOS" className="w-[100vw]">
            <TabsList className="  justify-center text-center items-center flex ">
              <TabsTrigger value="iOS">iOS & iPadOS</TabsTrigger>
              <TabsTrigger value="Android">Android</TabsTrigger>
            </TabsList>
            <TabsContent value="iOS">
              <Image src={instIOS} alt="logoEng" className=" mt-4 w-[95vw]" />
            </TabsContent>
            <TabsContent value="Android">
              <Image src={instIOS} alt="logoEng" className=" mt-4 w-[95vw]" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
