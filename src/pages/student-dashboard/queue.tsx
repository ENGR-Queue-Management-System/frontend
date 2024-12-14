import { useState } from "react";
import Navbar from "@/components/Navbar";
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
export default function StudentQueue() {
  const [openFeedbackModal, setOpenFeedbackModal] = useState(true);
  const [rateFeedback, setRateFeedback] = useState(0);
  return (
    <>
      <Dialog open={openFeedbackModal} onOpenChange={setOpenFeedbackModal}>
        <DialogContent className="sm:max-w-fit gap-5">
          <DialogHeader>
            <DialogTitle>แชร์ความคิดเห็นของท่านกับเรา</DialogTitle>
            <DialogDescription>
              ท่านพอใจกับบริการของเราแค่ไหน เลือกระดับความพึงพอใจได้เลย
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between gap-0 py-4 px-20">
            <Icon
              IconComponent={rateFeedback > 0 ? IconStarFull : IconStar}
              className="size-12 stroke-[1.5px] hover:cursor-pointer text-[#ffba08]"
              onClick={() => {
                setRateFeedback(1);
              }}
            />
            <Icon
              IconComponent={rateFeedback > 1 ? IconStarFull : IconStar}
              className="size-12 stroke-[1.5px] hover:cursor-pointer text-[#ffba08]"
              onClick={() => {
                setRateFeedback(2);
              }}
            />
            <Icon
              IconComponent={rateFeedback > 2 ? IconStarFull : IconStar}
              className="size-12 stroke-[1.5px] hover:cursor-pointer text-[#ffba08]"
              onClick={() => {
                setRateFeedback(3);
              }}
            />
            <Icon
              IconComponent={rateFeedback > 3 ? IconStarFull : IconStar}
              className="size-12 stroke-[1.5px] hover:cursor-pointer text-[#ffba08]"
              onClick={() => {
                setRateFeedback(4);
              }}
            />
            <Icon
              IconComponent={rateFeedback > 4 ? IconStarFull : IconStar}
              className="size-12 stroke-[1.5px] hover:cursor-pointer text-[#ffba08] "
              onClick={() => {
                setRateFeedback(5);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 items-start text-b2 w-full font-medium">
            <p>
              มีข้อเสนอแนะเพิ่มเติมไหม? เราชื่นชอบที่จะได้ยินความคิดเห็นของท่าน!
              (ไม่บังคับ)
            </p>
            <Textarea
              maxLength={150}
              className="font-normal"
              placeholder="กรอกข้อเสนอแนะของท่านที่นี่"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenFeedbackModal(false)}>
              ยกเลิก
            </Button>
            <Button type="submit" onClick={() => setOpenFeedbackModal(false)}>
              ส่งความคิดเห็น
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col h-screen  w-screen overflow-hidden text-default">
        <Navbar role1="student" />

        <div className="flex justify-center items-center h-full ">
          <div
            className="flex iphone:max-sm:overflow-clip flex-col h-fit  iphone:w-[90%] sm:w-[35%] bg-white rounded-lg border border-[#E5DDEA] overflow-clip"
            style={{
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center gap-3 bg-primary  text-white px-6 py-3 iphone:max-sm:text-b2">
              <Icon IconComponent={IconLocation} className="!size-6" />
              <p>
                ห้องงานพัฒนาคุณภาพนักศึกษา <br />{" "}
                <span className="font-medium">Student Development Room</span>
              </p>
            </div>

            <div className="flex flex-col gap-10 justify-between items-center px-6 py-6 iphone:max-sm:px-2 ">
              <div className="flex justify-start flex-col gap-5 items-center samsungA24:mt-7 samsungA24:gap-5">
                <div className="text-center ">
                  <p className="text-h1 samsungA24:text-[23px] iphone:max-sm:text-h2 font-normal">
                    หมายเลขคิวของคุณ{" "}
                  </p>
                  <p className="text-h2 samsungA24:text-[23px] iphone:max-sm:text-h2 font-medium ">
                    Your queue number
                  </p>
                </div>

                <div className="flex flex-col items-center samsungA24:mt-3 iphone:max-sm:mt-3 ipad11:max-samsungA24:mt-0 text-primary samsungA24:text-[100px] iphone:max-sm:text-[50px] font-medium text-[65px] ">
                  A016
                  <div className="flex items-center justify-center gap-3 top-6">
                    <div
                      className={`bg-contactList-scholarship 
                      h-3 w-3 rounded-[100%] iphone:max-sm:hidden mt-1`}
                    ></div>
                    <p className="text-b1 text-default">
                      ทุนการศึกษา (scholarship)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-4">
                <div className="flex items-center justify-between w-full px-6">
                  <div className="flex items-center gap-3">
                    <Icon IconComponent={IconUsers} className="!size-5" />
                    <div className="text-start text-b1 iphone:max-sm:text-b2">
                      <p className="font-medium">
                        มีคิวก่อนหน้าคุณ
                        <span className="font-semibold">(Waiting)</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-h2 iphone:max-sm:text-b1 font-semibold text-default">
                    11 คิว
                  </p>
                </div>
                <div className="border-t-2 border-dashed w-full"></div>
                <div className="flex items-center justify-between w-full text-describe px-6 iphone:max-sm:text-b2">
                  <div className="flex items-center gap-3">
                    <Icon IconComponent={IconCalendar} className="!size-5" />

                    <p className="font-medium">21 พ.ย. 2567</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon IconComponent={IconClock} className="!size-5" />

                    <p className="font-medium">16:08:58</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-center text-describe text-b2 iphone:max-sm:text-b4 iphone:max-sm:mx-8">
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
      </div>
    </>
  );
}
