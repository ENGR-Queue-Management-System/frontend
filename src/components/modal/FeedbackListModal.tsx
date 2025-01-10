import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import LoginPage from "@/pages/index";
import { useAppSelector } from "@/store";
import { updateLoginNotCmu } from "@/services/config/config.service";
import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react";
import IconTopic from "../../../public/icons/topic.svg";
import { useNotification } from "@/notifications/useNotification";
import { DEVICE_TYPE } from "@/config/Enum";
import IconExclaimation from "../../../public/icons/exclaimation.svg";
import Icon from "../Icon";
import IconStar from "../../../public/icons/star.svg";
import IconStarFull from "../../../public/icons/starFull.svg";

type PopupProps = {
  triggerText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
export default function FeedbackListModal({
  triggerText,
  icon: IconComponent,
  title,
}: PopupProps) {
  const config = useAppSelector((state) => state.config);
  const { deviceType, isPhone } = useNotification();

  const onChangeLoginNotCmu = async (value: boolean) => {
    const res = await updateLoginNotCmu({ loginNotCmu: value });
    if (res) {
      // toast({
      //   title: `${
      //     value ? "เปิดจองคิว" : "ปิดจองคิว"
      //   } โดยไม่ต้องใช้ CMU Account`,
      //   variant: "success",
      //   duration: 3000,
      // });
    }
  };

  const totalReviews = 30;

  const mockData = [
    { value: 5, rating: 5 },
    { value: 4, rating: 4 },
    { value: 10, rating: 3 },
    { value: 8, rating: 2 },
    { value: 3, rating: 1 },
  ];

  const data = mockData.map((item) => ({
    ...item,
    percent: (item.value / totalReviews) * 100,
  }));

  const feedback = [
    {
      No: 20,
      rating: 4,
      description: "โดยรวมแล้วก็ถือว่าดีค่ะ แต่ก็ยังมีจุดที่สามารถพัฒนาได้บ้าง",
    },
    {
      No: 19,
      rating: 5,
      description:
        "บริการเยี่ยมมาก! พอใจสุดๆ เลยค่ะ ได้รับการบริการที่ดีเยี่ยมจริงๆ! ทั้งรวดเร็วและมีความเป็นมืออาชีพ",
    },
    {
      No: 18,
      rating: 3,
      description:
        "บริการดีค่ะ แต่บางครั้งรู้สึกว่ามีบางจุดที่สามารถปรับปรุงได้บ้าง",
    },
    {
      No: 17,
      rating: 2,
      description:
        "บริการอาจจะต้องปรับปรุงค่ะ พอใจในบางจุด แต่ยังมีบางอย่างที่ยังไม่สมบูรณ์เท่าที่ควร",
    },
    {
      No: 16,
      rating: 1,
      description:
        "ประสบการณ์ไม่ค่อยดีเท่าไรค่ะ บริการช้าและไม่มีการตอบสนองที่ดี",
    },
    {
      No: 15,
      rating: 4,
      description: "โดยรวมแล้วก็ดีค่ะ แต่สามารถปรับปรุงในบางจุดได้บ้าง",
    },
    {
      No: 14,
      rating: 3,
      description: "บริการดีค่ะ แต่ยังต้องปรับปรุงอีกหลายจุด",
    },
    {
      No: 13,
      rating: 5,
      description: "บริการเยี่ยมมากค่ะ! ทุกอย่างสมบูรณ์แบบ. พอใจสุดๆ เลยค่ะ",
    },
    {
      No: 12,
      rating: 2,
      description: "การบริการยังต้องปรับปรุงค่ะ ไม่ค่อยพอใจเท่าไร",
    },
    {
      No: 11,
      rating: 4,
      description: "โดยรวมแล้วบริการดีค่ะ พอใจในระดับหนึ่ง",
    },
    {
      No: 10,
      rating: 1,
      description: "ประสบการณ์แย่ค่ะ บริการช้าและไม่ค่อยตอบสนอง",
    },
    {
      No: 9,
      rating: 3,
      description: "บริการดีค่ะ แต่ยังมีบางจุดที่ต้องปรับปรุง",
    },
    { No: 8, rating: 2, description: "บริการยังไม่ดีเท่าที่ควร" },
    {
      No: 7,
      rating: 5,
      description: "บริการสุดยอดค่ะ! ทุกอย่างเป็นไปตามที่คาดหวังไว้",
    },
    {
      No: 6,
      rating: 1,
      description: "ประสบการณ์ไม่ดีค่ะ คิดว่าไม่ได้รับบริการที่ดี",
    },
    {
      No: 5,
      rating: 3,
      description: "บริการโอเคค่ะ แต่ยังมีช่องว่างสำหรับการปรับปรุง",
    },
    {
      No: 4,
      rating: 4,
      description: "บริการดีค่ะ แต่ยังสามารถทำให้ดีกว่านี้ได้",
    },
    {
      No: 3,
      rating: 2,
      description: "บริการไม่ค่อยพอใจเท่าไรค่ะ หวังว่าจะดีขึ้นในอนาคต",
    },
    { No: 2, rating: 5, description: "บริการเยี่ยมค่ะ! ไม่มีข้อผิดพลาดใดๆ" },
    { No: 1, rating: 1, description: "บริการไม่ดีค่ะ ประสบการณ์แย่" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-white hover:bg-table-background text-[#333333] justify-start acerSwift:max-macair133:text-b4"
        >
          {IconComponent && (
            <IconComponent className="h-5 w-5 -translate-x-1 stroke-[#333333]" />
          )}
          <span className="ml-1">{triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        classNameClose={`${deviceType == DEVICE_TYPE.IOS ? "pt-12" : ""}`}
        className={`  ${
          !isPhone && "ipad11:max-w-[40vw] "
        } ipad11:max-w-[55vw]  flex flex-col justify-start  ${
          isPhone ? "w-[100vw] px-3 h-full" : "md:max-w-[50vw] min-w-fit"
        } `}
      >
        <DialogHeader
          className={`  ${deviceType == DEVICE_TYPE.IOS ? "pt-12" : ""}`}
        >
          <DialogTitle
            className={`text-table-foreground acerSwift:max-macair133:text-b1 mb-2 font-medium`}
          >
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 overflow-y-auto justify-between h-full iphone:max-sm:myt-1">
          <div className="flex w-full gap-3   items-center justify-center acerSwift:max-macair133:w-[40vw] p-4 acerSwift:max-macair133:p-3 rounded-md bg-[#1F93EF]/10">
            <Icon IconComponent={IconStar} className="text-[#1F93EF] size-4" />
            <p className=" text-[12px] ipad11:max-samsungA24:text-[14px] text-[#1F93EF] w-full font-medium">
              ความคิดเห็นของนักศึกษาจะถูกแสดงในรูปแบบที่ไม่ระบุตัวตน{" "}
            </p>
          </div>
          <div
            className={` ${
              isPhone ? "p-0 py-[2px] " : "p-2"
            } rounded-md border`}
            style={{
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex justify-between items-center py-2">
              <div
                className={`flex flex-col justify-center items-center ${
                  isPhone ? "w-[20%] border-none" : "w-[20%]"
                } gap-2 border-r-2 py-6`}
              >
                <p
                  className={`${
                    isPhone ? "ml-3" : ""
                  } text-4xl iphone:max-ipad11:text-2xl font-bold`}
                >
                  4.7
                </p>
                <p className={` ${isPhone ? "text-[10px] ml-3" : "text-b2"}`}>
                  {totalReviews} เรตติ้ง
                </p>
              </div>

              <div
                className={`h-fit ${
                  isPhone ? "w-[80%]" : "w-[80%]"
                } flex flex-col gap-1.5 px-4 `}
              >
                {data.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="flex gap-1 items-center">
                      {[...Array(5)].map((_, indexRate) => (
                        <Icon
                          key={indexRate}
                          IconComponent={
                            indexRate + 1 <= item.rating
                              ? IconStarFull
                              : IconStar
                          }
                          className={`${
                            isPhone ? "size-3" : "size-4"
                          }  stroke-[1.5px] text-[#ffba08]`}
                        />
                      ))}
                    </div>

                    <Progress value={item.percent} className="max-w-full" />
                    <p
                      className={`${isPhone ? "text-[8px] " : "text-[13px]"}  `}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
              style={{
                position: "sticky", // Make the div sticky
                top: "0",
                zIndex: 10, // Ensure it stays above other elements when overlapping
                background: "white", // Optional: Avoid transparency when sticking
              }}
              className="flex mt-2 border-b pb-4"
            >
              <div className="flex gap-2">
                {[...Array(5)].map((_, indexFill) => (
                  <Toggle key={indexFill}>
                    <p>{5 - indexFill}</p>
                    <IconStar className="size-3 text-default" />
                  </Toggle>
                ))}
              </div>
            </div>
          <div className={`flex flex-col   mt-1 ${isPhone ? " " : "h-[300px]"}`}>
           
            <div className={`  ${isPhone ? "h-full" : " "} `}>
              {feedback.map((e, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 pb-5 border-b mb-5"
                >
                  <p className="font-medium text-b2">ความคิดเห็นที่ {e.No}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, indexRate) => (
                      <Icon
                        key={indexRate}
                        IconComponent={
                          indexRate + 1 <= e.rating ? IconStarFull : IconStar
                        }
                        className={`size-4 stroke-[1.5px] text-[#ffba08]`}
                      />
                    ))}
                  </div>
                  <p className={`${isPhone ? 'text-[12px]' : 'text-b2'} `}>{e.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden">
            <LoginPage />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
