import { useState } from "react";
import Icon from "@/components/Icon";
import IconNext from "../../../public/icons/next.svg";
import IconRecall from "../../../public/icons/repeat.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import IconSpeech from "../../../public/icons/speechBubble.svg";
import IconLocation from "../../../public/icons/location.svg";
import IconUsers from "../../../public/icons/users.svg";
import IconCalendar from "../../../public/icons/calender.svg";
import IconClock from "../../../public/icons/clock.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import IconStar from "../../../public/icons/star.svg";
import IconStarFull from "../../../public/icons/starFull.svg";
import IconExclaimation from "../../../public/icons/exclaimation.svg";
import { useAppSelector } from "@/store";
import { dateFormatter } from "@/helpers/function";
export default function StudentQueue() {
  const queue = useAppSelector((state) => state.user.queue);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(true);
  const [rateFeedback, setRateFeedback] = useState(0);
  return (
    <>
      <Dialog open={openFeedbackModal} onOpenChange={setOpenFeedbackModal}>
        <DialogContent className="flex flex-col sm:max-w-fit gap-5 acerSwift:max-macair133:p-6 acerSwift:max-macair133:w-fit">
          <DialogHeader>
            <DialogTitle className="acerSwift:max-macair133:text-b2 text-defaultColor">
              แชร์ความคิดเห็นของท่านกับเรา
            </DialogTitle>
            <DialogDescription className="acerSwift:max-macair133:text-b3 iphone:max-sm:!text-b3">
              ท่านพอใจกับบริการของเราแค่ไหน เลือกระดับความพึงพอใจได้เลย
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full gap-3 items-center justify-center acerSwift:max-macair133:w-[40vw] p-4 acerSwift:max-macair133:p-3 rounded-md bg-[#1F93EF]/10">
            <Icon IconComponent={IconExclaimation} className="text-[#1F93EF]" />
            <p className="text-b2 acerSwift:max-macair133:text-b3 text-[#1F93EF] w-full font-medium">
              ความคิดเห็นของคุณจะถูกแสดงในรูปแบบที่ไม่ระบุตัวตน{" "}
              <span className="font-semibold">(anonymous)</span>
            </p>
          </div>
          <div className="flex max-w-full justify-between gap-0 py-4 px-16 iphone:max-sm3:px-5 acerSwift:max-macair133:w-[40vw]">
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                IconComponent={rateFeedback > index ? IconStarFull : IconStar}
                className={`size-10 stroke-[1.5px] hover:cursor-pointer hover:text-[#FBA21C] text-[#ffba08]`}
                onClick={() => {
                  setRateFeedback(index + 1);
                }}
              />
            ))}
          </div>
          <div className="flex flex-col max-w-full gap-2 items-start text-b2 font-medium acerSwift:max-macair133:text-b3 text-default acerSwift:max-macair133:w-[40vw]">
            <p>
              มีข้อเสนอแนะเพิ่มเติมไหม? เราชื่นชอบที่จะได้ยินความคิดเห็นของท่าน!
              (ไม่บังคับ)
            </p>
            <Textarea
              maxLength={150}
              className="max-w-full font-normal acerSwift:max-macair133:text-b4 acerSwift:max-macair133:w-[40vw] acerSwift:max-macair133:px-5 acerSwift:max-macair133:h-20 acerSwift:max-macair133:py-3"
              placeholder="กรอกข้อเสนอแนะของท่านที่นี่"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setOpenFeedbackModal(false)}>
              ยกเลิก
            </Button>
            <Button type="submit" onClick={() => setOpenFeedbackModal(false)}>
              ส่งความคิดเห็น
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex justify-center overflow-y-auto items-center h-full ">
        <div
          className="flex iphone:max-sm:overflow-clip flex-col h-fit  iphone:w-[90%] sm:w-[35%] acerSwift:max-macair133:w-[33%]  bg-white rounded-lg border border-[#E5DDEA] overflow-clip"
          style={{
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center gap-3 bg-primary  text-white px-6 py-3 iphone:max-sm:text-b2 acerSwift:max-macair133:text-b3">
            <Icon IconComponent={IconLocation} className="!size-6" />
            <p>
              ห้องงานพัฒนาคุณภาพนักศึกษา <br />{" "}
              <span className="font-medium">Student Development Room</span>
            </p>
          </div>

          <div className="flex flex-col gap-10 acerSwift:max-macair133:gap-8 justify-between items-center px-6 py-6 iphone:max-sm:px-2 ">
            <div className="flex justify-start flex-col gap-5 items-center samsungA24:mt-7 samsungA24:gap-5 acerSwift:max-macair133:gap-3">
              <div className="text-center">
                <p className="text-h1 samsungA24:text-[23px] acerSwift:max-macair133:text-h2 iphone:max-sm:text-h2 font-normal">
                  หมายเลขคิวของคุณ
                </p>
                <p className="text-h2 samsungA24:text-[23px] acerSwift:max-macair133:text-b1 iphone:max-sm:text-h2 font-medium ">
                  Your queue number
                </p>
              </div>

              <div className="flex flex-col items-center samsungA24:mt-3 iphone:max-sm:mt-3 ipad11:max-samsungA24:mt-0 text-primary samsungA24:text-[100px] iphone:max-macair133:text-[50px] font-medium text-[65px] ">
                {queue.no}
                <div className="flex items-center justify-center gap-3 top-6">
                  <div
                    className={`bg-contactList-scholarship 
                      h-3 w-3 rounded-[100%] iphone:max-sm:hidden mt-1`}
                  ></div>
                  <p className="text-b1 acerSwift:max-macair133:text-b2 text-default">
                    {queue.topic?.topicTH} ({queue.topic?.topicEN})
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-4 acerSwift:max-macair133:gap-2.5">
              <div className="flex items-center justify-between w-full px-6">
                <div className="flex items-center gap-3 ">
                  <Icon
                    IconComponent={IconUsers}
                    className="!size-5 acerSwift:max-macair133:!size-4"
                  />
                  <div className="text-start text-b1 iphone:max-macair133:text-b3">
                    <p className="font-medium">
                      มีคิวก่อนหน้าคุณ
                      <span className="font-semibold">(Waiting)</span>
                    </p>
                  </div>
                </div>
                <p className="text-h2 iphone:max-macair133:text-b2 font-semibold text-default">
                  {queue.waiting || 0} คิว
                </p>
              </div>
              <div className="border-t-2 border-dashed w-full"></div>
              <div className="flex items-center justify-between w-full text-describe px-6 iphone:max-macair133:text-b3">
                <div className="flex items-center gap-3">
                  <Icon
                    IconComponent={IconCalendar}
                    className="!size-5 acerSwift:max-macair133:!size-4"
                  />

                  <p className="font-medium">
                    {dateFormatter(queue.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Icon
                    IconComponent={IconClock}
                    className="!size-5 acerSwift:max-macair133:!size-4"
                  />

                  <p className="font-medium">
                    {dateFormatter(queue.createdAt, true)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-center text-describe text-b2 iphone:max-macair133:text-b4 iphone:max-sm:mx-8">
              <p>ขอสงวนสิทธิในการข้ามคิว กรณีที่นักศึกษาไม่แสดงตน</p>
              <p>
                We reserve the right to skip your queue if you do not show up.
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-b1  iphone:max-sm:text-b2 text-delete font-semibold hover:bg-delete/10 w-fit"
            >
              Leave the Queues
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
