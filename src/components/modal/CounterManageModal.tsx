import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import IconTrash from "../../../public/icons/trash.svg";
import IconEdit from "../../../public/icons/edit.svg";
import IconTopic from "../../../public/icons/topic.svg";
import IconPlus from "../../../public/icons/plus.svg";
import IconRight from "../../../public/icons/chevronRight.svg";
import IconExclaimation from "../../../public/icons/exclaimation.svg";
import OneCounterModal from "../modal/OneCounterManage";
import Icon from "@/components/Icon";
import OneCounterManage from "./OneCounterManage";
import { useNotification } from "@/notifications/useNotification";
import { DEVICE_TYPE } from "@/config/Enum";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserName } from "@/helpers/function";
import { deleteCounter } from "@/services/counter/counter.service";
import { toast } from "@/hooks/use-toast";
import { removeCounter } from "@/store/counter";
import { CounterRequestDTO } from "@/services/counter/dto/counter.dto";

type Props = {
  triggerText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
};
export default function CounterManageModal({
  triggerText,
  icon: IconComponent,
  title,
}: Props) {
  const { deviceType, isPhone } = useNotification();
  const counters = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  const [editCounter, setEditCounter] = useState<
    CounterRequestDTO & { id: number }
  >();
  const [opendCounterModal, setOpenCounterModal] = useState(false);
  const [openEditOneCounterModal, setOpenEditOneCounterModal] = useState(false);
  const [openAddOneCounterModal, setOpenAddOneCounterModal] = useState(false);
  const [openDeleteCounterPopup, setOpenDeleteCounterPopup] = useState(false);

  const onDeleteCounter = async () => {
    if (editCounter) {
      const res = await deleteCounter(editCounter.id);
      if (res) {
        // toast({
        //   title: `Counter ${editCounter.counter} is deleted`,
        //   variant: "success",
        //   duration: 3000,
        // });
        setOpenDeleteCounterPopup(false);
      }
    }
  };

  return (
    <>
      <Dialog open={opendCounterModal} onOpenChange={setOpenCounterModal}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="bg-white hover:bg-table-background text-[#333333] justify-start acerSwift:max-macair133:text-b4"
          >
            {IconComponent && (
              <IconComponent className="h-5 w-5 -translate-x-1 stroke-[#333333] acerSwift:max-macair133:w-4 acerSwift:max-macair133:h-4" />
            )}
            <span className="ml-1 ">{triggerText}</span>
          </Button>
        </DialogTrigger>
        <DialogContent
          classNameClose={`${deviceType == DEVICE_TYPE.IOS ? "pt-12 " : ""}`}
          className={`${
            openDeleteCounterPopup && !isPhone && "ipad11:max-w-[40vw]"
          } ipad11:max-w-[45vw]  flex flex-col justify-start  ${
            isPhone ? "w-[100vw] px-3 h-full" : "md:max-w-[50vw] min-w-fit"
          }`}
        >
          <DialogHeader
            className={`${deviceType == DEVICE_TYPE.IOS ? "pt-12" : ""}`}
          >
            <DialogTitle
              className={`text-primary !font-medium acerSwift:max-macair133:text-b1 ${
                openDeleteCounterPopup &&
                "flex items-center gap-2 text-[#f85959]"
              }`}
            >
              {openDeleteCounterPopup && (
                <Icon IconComponent={IconTrash} className="stroke-[#f85959]" />
              )}
              {openDeleteCounterPopup ? "ลบเคาน์เตอร์ที่ให้บริการ" : title}
            </DialogTitle>
          </DialogHeader>
          {openDeleteCounterPopup ? (
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-3 items-start justify-start w-full p-4 rounded-md bg-[#ffecec] ">
                <Icon
                  IconComponent={IconExclaimation}
                  className="text-delete"
                />
                <p className="text-b2 acerSwift:max-macair133:text-b3 text-delete w-full text-[500]">
                  การดำเนินการนี้ไม่สามารถย้อนกลับได้ หลังจากคุณลบเคาน์เตอร์นี้
                  เคาน์เตอร์จะถูกลบออกจากระบบนี้อย่างถาวร
                  คุณแน่ใจจะลบเคาน์เตอร์นี้ใช่ไหม?
                </p>
              </div>
              <div className="mt-4 flex flex-col  ">
                <p className="text-b2 acerSwift:max-macair133:text-b3 text-describe">
                  เคาน์เตอร์
                </p>
                <p className="text-b1 acerSwift:max-macair133:text-b2">
                  {editCounter?.counter}
                </p>
              </div>
              <div className="flex gap-3 mt-3 justify-end text-default">
                <Button
                  variant="ghost"
                  onClick={() => setOpenDeleteCounterPopup(false)}
                >
                  ยกเลิก
                </Button>
                <Button
                  className="bg-delete hover:bg-delete/90"
                  onClick={onDeleteCounter}
                >
                  ลบเคาน์เตอร์ที่ให้บริการ
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
                <div className="flex bg-table-background rounded-t-md text-table-foreground acerSwift:max-macair133:text-b3 gap-3 items-center font-medium py-3 px-4">
                  <Icon
                    IconComponent={IconTopic}
                    className="acerSwift:max-macair133:size-5"
                  />
                  เคาน์เตอร์ที่ให้บริการ
                </div>
                <div
                  className={`max-h-[500px] acerSwift:max-macair133:max-h-[325px]   overflow-y-auto ${
                    isPhone ? "h-full overflow-y-auto" : ""
                  }`}
                >
                  {counters.map((counter) => (
                    <div key={counter.id} className="flex px-6 flex-col ">
                      <div
                        key={counter.id}
                        className="flex justify-between  items-center border-b-[1px] py-4 acerSwift:max-macair133:py-3 w-full"
                      >
                        <div className="flex items-center w-[65%]  gap-4">
                          <p
                            className={`border rounded-full p-2 px-[14px] acerSwift:max-macair133:text-b3 ${
                              isPhone ? "hidden" : ""
                            }`}
                          >
                            {counter.counter}
                          </p>
                          <div className="flex flex-col">
                            <p
                              className={`text-b2 acerSwift:max-macair133:text-b3 ${
                                isPhone ? "text-b3" : ""
                              }`}
                            >
                              เคาน์เตอร์ {counter.counter}
                            </p>
                            <p
                              className={`text-b3 text-ellipsis overflow-hidden whitespace-nowrap acerSwift:max-macair133:text-b4 text-primary ${
                                isPhone ? "text-b3" : ""
                              }`}
                            >
                              {getUserName(counter.user)}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-[35%] gap-3 justify-end iphone:max-sm:justify-end iphone:max-sm:w-full">
                          <Button
                            onClick={() => {
                              setEditCounter({
                                id: counter.id,
                                counter: counter.counter,
                                email: counter.user.email!,
                                timeClosed: counter.timeClosed as any,
                                topics: counter.topics.map(({ id }) => id),
                              });
                              setOpenEditOneCounterModal(true);
                            }}
                            variant="outline"
                            className={` !border-orange-500 text-orange-500 rounded-full ${
                              isPhone ? "size-8" : ""
                            } hover:bg-[#f7cbb13b] hover:text-orange-600 acerSwift:max-macair133:text-b4`}
                            size={isPhone ? "icon" : "default"}
                          >
                            <Icon
                              IconComponent={IconEdit}
                              className="stroke-orange-500 acerSwift:max-macair133:!size-4"
                            />
                            {!isPhone && "แก้ไข"}
                          </Button>
                          <Button
                            onClick={() => {
                              setEditCounter({
                                id: counter.id,
                                counter: counter.counter,
                                email: counter.user.email!,
                                timeClosed: counter.timeClosed as any,
                                topics: counter.topics.map(({ id }) => id),
                              });
                              setOpenDeleteCounterPopup(true);
                            }}
                            variant="outline"
                            className={` !border-red-500 text-red-500 rounded-full ${
                              isPhone ? "size-8" : ""
                            } hover:bg-[#f7cbb13b] hover:text-red-600 acerSwift:max-macair133:text-b4`}
                            size={isPhone ? "icon" : "default"}
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
                onClick={() => setOpenAddOneCounterModal(true)}
                className={`px-5 ${
                  isPhone ? "h-12 text-[15px] font-[500] rounded-full" : ""
                }`}
              >
                <Icon IconComponent={IconPlus} />
                เพิ่มเคาน์เตอร์ที่ให้บริการ
              </Button>
            </div>
          )}
        </DialogContent>
        <OneCounterModal
          title="เพิ่มเคาน์เตอร์ที่ให้บริการ"
          type="add"
          opened={openAddOneCounterModal}
          onClose={() => {
            setOpenAddOneCounterModal(false);
            setOpenCounterModal(true);
          }}
        />
        <OneCounterManage
          title={`แก้ไขเคาน์เตอร์ ${editCounter?.counter}`}
          type="edit"
          opened={openEditOneCounterModal}
          data={editCounter}
          onClose={() => {
            setOpenEditOneCounterModal(false);
            setTimeout(() => {
              setOpenCounterModal(true);
            }, 40);
          }}
        />
      </Dialog>
    </>
  );
}
