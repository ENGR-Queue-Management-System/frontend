import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import IconUsers from "../../../public/icons/users.svg";
import IconUser from "../../../public/icons/user.svg";
import IconTrash from "../../../public/icons/trash.svg";
import IconEdit from "../../../public/icons/edit.svg";
import IconTopic from "../../../public/icons/topic.svg";
import IconExclaimation from "../../../public/icons/exclaimation.svg";
import IconPlus from "../../../public/icons/plus.svg";
import { useNotification } from "@/notifications/useNotification";
import Icon from "@/components/Icon";
import { DEVICE_TYPE } from "@/config/Enum";
import { useAppSelector } from "@/store";

type PopupProps = {
  triggerText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
export default function ContactTopicMangeModal({
  triggerText,
  icon: IconComponent,
  title,
}: PopupProps) {
  const { deviceType, isPhone } = useNotification();
  const topics = useAppSelector((state) => state.topic);
  const [openAddTopicModal, setOpenAddTopicModal] = useState(false);
  const [openEditTopicModal, setOpenEditTopicModal] = useState(false);
  const [openDeleteTopicPopup, setOpenDeleteTopicPopup] = useState(false);

  const [inputValues, setInputValues] = useState({
    topicTH: "",
    topicEN: "",
  });

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setOpenDeleteTopicPopup(false);
          setOpenAddTopicModal(false);
          setOpenEditTopicModal(false);
        }
      }}
    >
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
          (openAddTopicModal || openEditTopicModal || openDeleteTopicPopup) &&
          !isPhone &&
          "ipad11:max-w-[40vw]"
        } ipad11:max-w-[45vw]  flex flex-col justify-start  ${
          isPhone ? "w-[100vw] h-full" : "md:max-w-[50vw] min-w-fit"
        }`}
      >
        <DialogHeader
          className={`  ${deviceType == DEVICE_TYPE.IOS ? "pt-12" : ""}`}
        >
          <DialogTitle
            className={`text-table-foreground  !font-medium acerSwift:max-macair133:text-b1 ${
              openDeleteTopicPopup && "flex items-center gap-2 text-[#f85959]"
            }`}
          >
            {openDeleteTopicPopup && (
              <Icon IconComponent={IconTrash} className="stroke-[#f85959]" />
            )}
            {openAddTopicModal
              ? "เพิ่มหัวข้อการบริการ"
              : openEditTopicModal
              ? "แก้ไขหัวข้อการบริการ"
              : openDeleteTopicPopup
              ? "ลบหัวข้อการบริการ"
              : title}
          </DialogTitle>
        </DialogHeader>

        {!openAddTopicModal && !openEditTopicModal && !openDeleteTopicPopup ? (
          <div className="flex flex-col gap-4 justify-between h-full ">
            <div
              className={`p-0 rounded-lg mt-2 flex ${
                isPhone ? "h-[76vh]" : ""
              } flex-col gap-1 text-b2 acerSwift:max-macair133:text-b3 `}
              style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px" }}
            >
              <div className="flex bg-table-background rounded-t-md text-table-foreground gap-3 items-center font-medium py-3 px-4">
                <Icon
                  IconComponent={IconTopic}
                  className="acerSwift:max-macair133:size-5"
                />{" "}
                รายชื่อหัวข้อการบริการ
              </div>
              <div
                className={`max-h-[500px] acerSwift:max-macair133:max-h-[325px]   overflow-y-auto ${
                  isPhone ? "h-full overflow-y-auto" : ""
                }`}
              >
                {topics.map((topic) => (
                  <div key={topic.id} className="flex px-6 flex-col ">
                    <div
                      key={topic.topicTH}
                      className="flex justify-between  items-center border-b-[1px] py-4 acerSwift:max-macair133:py-3 w-full"
                    >
                      <div className="flex items-center  w-[65%] gap-5">
                        <div className="flex text-ellipsis w-full  overflow-hidden whitespace-nowrap  flex-col  text-b2 acerSwift:max-macair133:text-b4 acerSwift:max-macair133:py-1">
                          <p
                            className={`text-ellipsis overflow-hidden whitespace-nowrap ${
                              isPhone ? "text-[13px]" : ""
                            }`}
                          >
                            {topic.topicTH}
                          </p>
                          <p
                            className={`text-ellipsis overflow-hidden whitespace-nowrap ${
                              isPhone ? "text-[12px]" : ""
                            } `}
                          >
                            {topic.topicEN}
                          </p>
                          <p className="font-normal text-b4 text-table-foreground"></p>
                        </div>
                      </div>
                      <div className="flex w-[35%] justify-end gap-3 iphone:max-sm:justify-end iphone:max-sm:w-full">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setInputValues({
                              topicTH: topic.topicTH,
                              topicEN: topic.topicEN,
                            });
                            setOpenEditTopicModal(true);
                          }}
                          size={isPhone ? "icon" : "default"}
                          className={` !border-orange-500 text-orange-500 rounded-full ${
                            isPhone ? "size-8" : ""
                          } hover:bg-[#f7cbb13b] hover:text-orange-600 acerSwift:max-macair133:text-b4`}
                        >
                          <Icon
                            IconComponent={IconEdit}
                            className="stroke-orange-500 acerSwift:max-macair133:!size-4"
                          />
                          {!isPhone && "แก้ไข"}
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => setOpenDeleteTopicPopup(true)}
                          size={isPhone ? "icon" : "default"}
                          className={` !border-red-500 text-red-500 rounded-full ${
                            isPhone ? "size-8" : ""
                          } hover:bg-[#f7cbb13b] hover:text-red-600 acerSwift:max-macair133:text-b4`}
                        >
                          <Icon
                            IconComponent={IconTrash}
                            className="stroke-delete acerSwift:max-macair133:!size-4"
                          />
                          {!isPhone && "ลบ"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button
              className={`px-5 ${
                isPhone ? "h-12 text-[15px] font-[500] rounded-full" : ""
              } `}
              onClick={() => setOpenAddTopicModal(true)}
            >
              <Icon IconComponent={IconPlus} />
              เพิ่มหัวข้อการบริการ
            </Button>
          </div>
        ) : openEditTopicModal || openAddTopicModal ? (
          <div>
            <div className="flex flex-col  gap-4 pb-4">
              <div
                // style={{
                //   boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                // }}
                className=" gap-4 rounded-lg text-b2  text-start flex flex-col "
              >
                <div className="grid w-full max-w-full items-center gap-1.5">
                  <p className="text-b2 acerSwift:max-macair133:text-b4 font-medium">
                    หัวข้อภาษาไทย
                  </p>
                  <Input
                    type="text"
                    value={openEditTopicModal ? inputValues.topicEN : ""}
                    className="iphone:max-sm:text-b2"
                    placeholder="เช่น ขอคำปรึกษาด้านวิชาการ"
                  />
                </div>
                <div className="grid w-full max-w-full items-center gap-1.5">
                  <p className="text-b2 acerSwift:max-macair133:text-b4 font-medium">
                    หัวข้อภาษาอังกฤษ
                  </p>
                  <Input
                    type="text"
                    value={openEditTopicModal ? inputValues.topicEN : ""}
                    className="iphone:max-sm:text-b2"
                    placeholder="e.g. Academic Consultation"
                  />
                </div>
                <div className="grid w-full max-w-full items-center gap-1.5">
                  <p className="text-b2 acerSwift:max-macair133:text-b4 font-medium  ">
                    โค้ดสำหรับหัวข้อบริการ{" "}
                    <span className="text-secondary font-normal iphone:max-sm:hidden">
                      (กรอกตัวอักษรภาษาอังกฤษระหว่าง A ถึง Z)
                    </span>
                    <p className="text-secondary font-normal ipad11:hidden">
                      (กรอกตัวอักษรภาษาอังกฤษระหว่าง A ถึง Z)
                    </p>
                  </p>
                  <Input
                    type="text"
                    placeholder="e.g. S"
                    className="iphone:max-sm:text-b2"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end text-default">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpenEditTopicModal(false);
                  setOpenAddTopicModal(false);
                }}
              >
                ยกเลิก
              </Button>
              <Button
                onClick={() => {
                  setOpenEditTopicModal(false);
                  setOpenAddTopicModal(false);
                }}
              >
                เสร็จสิ้น
              </Button>
            </div>
          </div>
        ) : // ) : openAddTopicModal ? (
        //   <div>
        //     <div className="flex flex-col gap-4 pb-4">
        //       <div
        //         style={{
        //           boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        //         }}
        //         className=" gap-4   py-5 rounded-lg px-4 text-b2  text-start flex flex-col "
        //       >
        //         <div className="grid w-full max-w-full items-center gap-1.5">
        //           <p className="text-b2 acerSwift:max-macair133:text-b3 font-medium">
        //             หัวข้อภาษาไทย
        //           </p>
        //           <Input type="text" placeholder="เช่น ขอคำปรึกษาด้านวิชาการ" />
        //         </div>
        //         <div className="grid w-full max-w-full items-center gap-1.5">
        //           <p className="text-b2 acerSwift:max-macair133:text-b3 font-medium">
        //             หัวข้อภาษาอังกฤษ
        //           </p>
        //           <Input type="text" placeholder="e.g. Academic Consultation" />
        //         </div>
        //         <div className="grid w-full max-w-full items-center gap-1.5">
        //           <p className="text-b2 acerSwift:max-macair133:text-b3 font-medium  ">
        //             โค้ดสำหรับหัวข้อบริการ{" "}
        //             <span className="text-secondary font-normal">
        //               (กรอกตัวอักษรภาษาอังกฤษระหว่าง A ถึง Z)
        //             </span>
        //           </p>
        //           <Input type="text" placeholder="e.g. S" />
        //         </div>
        //       </div>
        //     </div>

        //     <div className="flex gap-3 justify-end text-default">
        //       <Button
        //         className="mt-4"
        //         variant="ghost"
        //         onClick={() => setOpenAddTopicModal(false)}
        //       >
        //         ยกเลิก
        //       </Button>
        //       <Button
        //         className="mt-4"
        //         onClick={() => setOpenAddTopicModal(false)}
        //       >
        //         เสร็จสิ้น
        //       </Button>
        //     </div>
        //   </div>
        openDeleteTopicPopup ? (
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-3 items-start justify-start w-full p-4 rounded-md bg-[#ffecec] ">
              <Icon IconComponent={IconExclaimation} className="text-delete" />
              <p className="text-b2 acerSwift:max-macair133:text-b3 text-delete w-full text-[500]">
                การดำเนินการนี้ไม่สามารถย้อนกลับได้ หลังจากคุณลบหัวข้อบริการนี้
                หัวข้อบริการจะถูกลบออกจากระบบนี้อย่างถาวร
                คุณแน่ใจจะลบหัวข้อบริการนี้ใช่ไหม?
              </p>
            </div>
            <div className="mt-4 flex flex-col  ">
              <p className="text-b2 acerSwift:max-macair133:text-b3 text-describe">
                หัวข้อบริการ
              </p>
              <p className="text-b1 acerSwift:max-macair133:text-b2">
                ทุนการศึกษา
              </p>
            </div>
            <div className="flex gap-3 mt-3 justify-end text-default">
              <Button
                variant="ghost"
                onClick={() => setOpenDeleteTopicPopup(false)}
              >
                ยกเลิก
              </Button>
              <Button
                className="bg-delete hover:bg-delete/90"
                onClick={() => setOpenDeleteTopicPopup(false)}
              >
                ลบหัวข้อบริการ
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
