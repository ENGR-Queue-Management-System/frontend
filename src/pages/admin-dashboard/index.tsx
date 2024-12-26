import Icon from "@/components/Icon";
import IconNext from "../../../public/icons/next.svg";
import IconRecall from "../../../public/icons/repeat.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { dateFormatter, getUserName } from "@/helpers/function";
import { updateCounter } from "@/services/counter/counter.service";
import { IModelCounter, IModelQueue } from "@/models/Model";
import { toast } from "@/hooks/use-toast";
import { updateCounterData } from "@/store/counter";
import { useEffect } from "react";
import { getQueues, updateQueue } from "@/services/queue/queue.service";
import { setLoadingOverlay } from "@/store/loading";
import {
  removeFirstWaitingQueue,
  setCurrentQueue,
  setQueueList,
} from "@/store/queue";
import { useNotification } from "@/notifications/useNotification";
import { STATUS } from "@/config/Enum";
import { sendQueueNotification } from "@/services/subscription/subscription.service";

export default function AdminIndex() {
  const user = useAppSelector((state) => state.user.user);
  const counter = useAppSelector((state) =>
    state.counter.find((c) => c.user.id == user.id)
  );
  const queues = useAppSelector((state) => state.queue.queues);
  const currentQueue = useAppSelector((state) => state.queue.current);
  const dispatch = useAppDispatch();
  const { isPhone } = useNotification();

  useEffect(() => {
    if (counter && counter.id) {
      fetchQueues();
    }
  }, [counter]);

  const fetchQueues = async () => {
    if (counter?.id) {
      dispatch(setLoadingOverlay(true));
      const res = await getQueues({ counter: counter.id });
      if (res) {
        dispatch(setQueueList(res.queues));
        dispatch(setCurrentQueue(res.current));
      }
      dispatch(setLoadingOverlay(false));
    }
  };

  const onChangeStatusCounter = async () => {
    const res: IModelCounter = await updateCounter(counter?.id!, {
      status: !counter?.status,
    });
    if (res) {
      dispatch(updateCounterData(res));
      toast({
        title: res.status ? "เปิดรับคิว" : "ปิดรับคิว",
        variant: "default",
        duration: 3000,
      });
    }
  };

  const callNextQueue = async (id: number) => {
    const res = await updateQueue(id, {
      counter: counter!.id,
    });
    if (res) {
      dispatch(setCurrentQueue(res));
      dispatch(removeFirstWaitingQueue());
      sendPushNotification({
        firstName: res.firstName,
        lastName: res.lastName,
        message: JSON.stringify({
          title: "ถึงคิวของคุณ",
          // body: "ถึงคิวคุณแล้ว",
        }),
      });
      toast({
        title: `เรียกคิว ${res.no}`,
        variant: "success",
        duration: 3000,
      });
      const next5Queue = queues.filter((q) => q.topicId == res.topicId)[5];
      if (next5Queue) {
        sendPushNotification({
          firstName: next5Queue.firstName,
          lastName: next5Queue.lastName,
          message: JSON.stringify({
            title: "อีก 5 คิวจะถึงคิวของคุณ",
            // body: "ใกล้ถึงคิวคุณแล้ว",
          }),
        });
      }
    }
  };

  const sendPushNotification = async (
    payload: {
      firstName: string;
      lastName: string;
      message: string;
    },
    toastMessage?: any
  ) => {
    const res = await sendQueueNotification(payload);
    if (res) {
      if (toastMessage) {
        toast({
          ...toastMessage,
          variant: "success",
          duration: 3000,
        });
      }
    }
  };

  return (
    <div
      className={`flex ${
        isPhone ? "px-3" : "px-5"
      }  flex-col min-h-full max-h-full w-full overflow-y-auto bg-[#f9f9f9] py-4 iphone:max-sm:h-fit`}
    >
      <div className="flex flex-col !w-full h-full iphone:max-sm:h-fit">
        <div className="flex h-full overflow-hidden pb-2 mb-2 gap-4 iphone:max-sm:pb-0 iphone:max-sm:flex-col-reverse iphone:max-sm:gap-4 iphone:max-sm:h-fit">
          <div
            style={{
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
            className="w-[60%] iphone:max-sm:!h-fit iphone:max-sm:w-[100%] sm:flex-1 sm:flex rounded-lg border border-[#E5DDEA] shadow-shadow-table"
          >
            {!isPhone ? (
              <div className="overflow-y-auto iphone:max-sm:!min-h-fit flex flex-1">
                <Table
                  striped={true}
                  className={`${!queues.length ? "h-full w-full" : ""}`}
                >
                  <TableHeader>
                    <TableRow className="sticky text-b2 acerSwift:max-macair133:text-b4 samsungA24:text-b1 font-bold top-0 z-30 ">
                      <TableHead>เลขคิว</TableHead>
                      <TableHead>รหัสนักศึกษา</TableHead>
                      <TableHead>ชื่อ-นามสกุล</TableHead>
                      <TableHead>รายการติดต่อ</TableHead>
                      <TableHead>เพิ่มเติม</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="font-normal text-b2 acerSwift:max-macair133:text-b4 samsungA24:text-b1">
                    {queues.length ? (
                      queues.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium py-4">
                            {item.no}
                          </TableCell>
                          <TableCell>{item.studentId || "-"}</TableCell>
                          <TableCell>{getUserName(item)}</TableCell>
                          <TableCell className="flex gap-2  translate-y-[6px] items-center">
                            <div className="flex items-center gap-2">
                              <div
                                className={` h-3 w-3 rounded-[100%] iphone:max-sm:hidden`}
                              ></div>
                              {item.topic.topicTH}
                            </div>
                          </TableCell>
                          <TableCell>{item.note || "-"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-[22px] font-medium"
                        >
                          ไม่มีคิวที่รอเรียก
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col">
                {queues.length ? (
                  queues.map((items) => (
                    <div
                      key={items.id}
                      className="flex p-4 px-5 items-center bg-white first:rounded-t-md border-b-[1px] last:border-none  justify-between"
                    >
                      <div className="flex gap-4 items-center">
                        <p className=" font-semibold text-[14px] text-primary">
                          {items.no}
                        </p>
                        <div className="flex flex-col">
                          <p className="text-[13px]">{getUserName(items)}</p>
                          <p className="text-[13px] text-primary">{items.no}</p>
                        </div>
                      </div>
                      <p className="text-[13px]"> {items.topic.topicTH}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-[15px] bg-white rounded-md items-center flex justify-center py-8">
                    {" "}
                    ไม่มีคิวที่รอเรียก{" "}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 h-full w-[40%] iphone:max-sm:w-[100%] text-[15px] font-medium">
            <div
              className="flex bg-white rounded-lg border border-[#E5DDEA] text-[15px] px-6 py-3 justify-between items-center"
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>
                <div className="flex-col">
                  <p
                    className={`acerSwift:max-macair133:text-b3 text-[14px] ${
                      isPhone ? "text-[12px]" : "text-[14px]"
                    }`}
                  >
                    รับคิวนักศึกษา (ปิดรับคิว{" "}
                    {dateFormatter(counter?.timeClosed, true)})
                  </p>
                  <p className="text-primary text-b3 acerSwift:max-macair133:text-b4 ">
                    เคาน์เตอร์ {counter?.counter}
                  </p>
                </div>
              </div>
              <Switch
                checked={counter?.status}
                onClick={onChangeStatusCounter}
              />
            </div>
            <div
              className="flex iphone:max-sm:overflow-clip flex-col m h-full bg-white rounded-lg  border border-[#E5DDEA] px-6 py-4  "
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex flex-col  justify-between items-center  h-full ">
                <div className="flex justify-start flex-col items-center mt-3 samsungA24:mt-7 acerSwift:max-macair133:mt-2 samsungA24:gap-5 h-full">
                  {
                    <>
                      <div className="text-center">
                        <p
                          className={` ${
                            isPhone ? "text-[18px]" : "text-h1"
                          } acerSwift:max-macair133:text-h2 samsungA24:text-[23px] font-medium `}
                        >
                          คิวที่คุณกำลังให้บริการ
                        </p>
                        <p
                          className={`text-primary ${
                            isPhone ? "text-[15px]" : "text-b1"
                          }   acerSwift:max-macair133:text-b2 samsungA24:text-h1`}
                        >
                          เคาน์เตอร์ {counter?.counter}
                        </p>
                      </div>
                      <div className=" samsungA24:mt-3 iphone:max-sm:mt-3 acerSwift:max-macair133:mt-2 ipad11:max-samsungA24:mt-2 mb-1 acerSwift:max-macair133:mb-0 border-primary text-primary rounded-[100%] flex items-center justify-center samsungA24:text-[100px] iphone:max-sm:text-[40px] font-medium text-[52px]">
                        {currentQueue.no || "-"}
                      </div>
                      <div className="text-center items-center justify-center flex flex-col samsungA24:text-[22px] acerSwift:max-macair133:text-b1 text-h2 text-primary">
                        <div className="mt-2">
                          <p className="font-medium">
                            {currentQueue.studentId}
                            <span className=" iphone:max-sm:block ">
                              {currentQueue.studentId && (
                                <span className="iphone:max-sm:hidden">
                                  {" "}
                                  -{" "}
                                </span>
                              )}
                              {getUserName(currentQueue)}
                            </span>
                          </p>
                        </div>
                        <div className="flex  gap-2 mt-1 acerSwift:max-macair133:mt-0.5 samsungA24:text-h2 acerSwift:max-macair133:text-b2 text-b1 items-center text-[#333333]">
                          <div
                            className={` h-3 w-3 acerSwift:max-macair133:h-2.5 acerSwift:max-macair133:w-2.5 rounded-[100%] iphone:max-sm:hidden`}
                          ></div>
                          {currentQueue.topic?.topicTH}
                        </div>
                      </div>
                    </>
                  }
                </div>
                <div className="flex flex-col gap-3 samsungA24:gap-4 w-full">
                  <div className="px-6 py-5 acerSwift:max-macair133:py-2.5 rounded-2xl iphone:max-sm:mt-4 samsungA24:text-h1 text-b1  acerSwift:max-macair133:text-b2 !w-full flex flex-col bg-[#d7e6fb]">
                    <div className=" flex items-center justify-start">
                      <div className=" text-table-foreground font-medium text-center iphone:max-sm:pl-0 iphone:max-sm:pr-4 pr-6 pl-3  border-r-2 border-table-foreground/15">
                        <p
                          className={` acerSwift:max-macair133:text-b4 ${
                            isPhone ? "text-[14px]" : "text-h1"
                          }`}
                        >
                          คิวถัดไป
                        </p>
                        <p className="font-semibold text-[28px] iphone:max-macair133:text-h1">
                          {queues[0]?.no || "-"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1 ml-6 ">
                        <p className=" text-b2 samsungA24:text-h2 acerSwift:max-macair133:text-b4">
                          {queues[0]?.studentId}
                          {queues[0]?.studentId && (
                            <span className="iphone:max-sm:hidden"> - </span>
                          )}
                          <span className="iphone:max-sm:block">
                            {getUserName(queues[0])}
                          </span>
                        </p>
                        <div className="flex text-b2  acerSwift:max-macair133:text-b4 samsungA24:text-h2 items-center gap-3">
                          <div
                            className={` h-3 w-3  acerSwift:max-macair133:h-2  acerSwift:max-macair133:w-2 rounded-[100%] iphone:max-sm:hidden`}
                          ></div>
                          {queues[0]?.topic.topicTH}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex macair133:flex-col iphone:max-acerSwift:flex-col  acerSwift:max-macair133:flex-row-reverse w-full h-fit ${
                      isPhone ? "gap-3" : "gap-4"
                    } `}
                  >
                    <Button
                      className="w-full items-center flex samsungA24:h-14 h-12 acerSwift:max-macair133:h-[42px]"
                      disabled={!queues[0]}
                      onClick={() => callNextQueue(queues[0].id)}
                    >
                      <p className="samsungA24:text-h2  acerSwift:max-macair133:text-b3">
                        คิวถัดไป
                      </p>
                      <Icon
                        IconComponent={IconNext}
                        className="!size-5 acerSwift:max-macair133:!size-4"
                      />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full samsungA24:h-14 iphone:max-sm:mb-3 h-12 text-b2 text-primary acerSwift:max-macair133:text-b3 samsungA24:text-h2 acerSwift:max-macair133:h-[42px]"
                      disabled={!currentQueue.no}
                      onClick={() =>
                        sendPushNotification(
                          {
                            firstName: currentQueue.firstName,
                            lastName: currentQueue.lastName,
                            message: JSON.stringify({
                              title: "ถึงคิวคุณแล้ว",
                              body: "เรียกซ้ำ",
                            }),
                          },
                          { title: `เรียกคิว ${currentQueue.no}` }
                        )
                      }
                    >
                      เรียกซ้ำ
                      <Icon
                        IconComponent={IconRecall}
                        className="!size-5 acerSwift:max-macair133:!size-4"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
