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
import IconTrash from "../../../public/icons/trash.svg";
import IconEdit from "../../../public/icons/edit.svg";
import IconTopic from "../../../public/icons/topic.svg";
import IconExclaimation from "../../../public/icons/exclaimation.svg";
import IconPlus from "../../../public/icons/plus.svg";
import { useNotification } from "@/notifications/useNotification";
import Icon from "@/components/Icon";
import { DEVICE_TYPE } from "@/config/Enum";
import { useAppSelector } from "@/store";
import { TopicRequestDTO } from "@/services/topic/dto/topic.dto";
import { deleteTopic } from "@/services/topic/topic.service";
import OneTopicManageModal from "./OneTopicManageModal";

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
  const [editTopic, setEditTopic] = useState<
    TopicRequestDTO & { id: number }
  >();
  const [opendTopicModal, setOpenTopicModal] = useState(false);
  const [openAddTopicModal, setOpenAddTopicModal] = useState(false);
  const [openEditTopicModal, setOpenEditTopicModal] = useState(false);
  const [openDeleteTopicPopup, setOpenDeleteTopicPopup] = useState(false);

  const onDeleteTopic = async () => {
    if (editTopic) {
      const res = await deleteTopic(editTopic.id);
      if (res) {
        // toast({
        //   title: `Topic ${editTopic.topicTH} is deleted`,
        //   variant: "success",
        //   duration: 3000,
        // });
        setOpenDeleteTopicPopup(false);
      }
    }
  };

  return (
    <Dialog open={opendTopicModal} onOpenChange={setOpenTopicModal}>
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
        className={`${
          openDeleteTopicPopup && !isPhone && "ipad11:max-w-[40vw]"
        } ipad11:max-w-[45vw]  flex flex-col justify-start  ${
          isPhone ? "w-[100vw] h-full" : "md:max-w-[50vw] min-w-fit"
        }`}
      >
        <DialogHeader
          className={`${deviceType == DEVICE_TYPE.IOS ? "pt-12" : ""}`}
        >
          <DialogTitle
            className={`text-table-foreground  !font-medium acerSwift:max-macair133:text-b1 ${
              openDeleteTopicPopup && "flex items-center gap-2 text-[#f85959]"
            }`}
          >
            {openDeleteTopicPopup && (
              <Icon IconComponent={IconTrash} className="stroke-[#f85959]" />
            )}
            {openDeleteTopicPopup ? "ลบหัวข้อการบริการ" : title}
          </DialogTitle>
        </DialogHeader>

        {openDeleteTopicPopup ? (
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
                {editTopic?.topicTH}
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
                onClick={onDeleteTopic}
              >
                ลบหัวข้อบริการ
              </Button>
            </div>
          </div>
        ) : (
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
                />
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
                            setEditTopic({
                              id: topic.id,
                              topicTH: topic.topicTH,
                              topicEN: topic.topicEN,
                              code: topic.code,
                            });
                            setOpenTopicModal(false);
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
                          onClick={() => {
                            setEditTopic({
                              id: topic.id,
                              topicTH: topic.topicTH,
                              topicEN: topic.topicEN,
                              code: topic.code,
                            });
                            setOpenDeleteTopicPopup(true);
                          }}
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
              onClick={() => {
                setOpenTopicModal(false);
                setOpenAddTopicModal(true);
              }}
            >
              <Icon IconComponent={IconPlus} />
              เพิ่มหัวข้อการบริการ
            </Button>
          </div>
        )}
      </DialogContent>
      <OneTopicManageModal
        title="เพิ่มหัวข้อการบริการ"
        type="add"
        opened={openAddTopicModal}
        onClose={() => {
          setOpenAddTopicModal(false);
          setOpenTopicModal(true);
        }}
      />
      <OneTopicManageModal
        title="แก้ไขหัวข้อการบริการ"
        type="edit"
        opened={openEditTopicModal}
        data={editTopic}
        onClose={() => {
          setOpenEditTopicModal(false);
          setTimeout(() => {
            setOpenTopicModal(true);
          }, 40);
        }}
      />
    </Dialog>
  );
}
