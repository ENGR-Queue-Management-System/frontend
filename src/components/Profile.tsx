import Icon from "@/components/Icon";
import IconUser from "../../public/icons/user.svg";
import IconAdminMange from "../../public/icons/adminManage.svg";
import IconHistory from "../../public/icons/history.svg";
import IconLogout from "../../public/icons/logout.svg";
import IconTopic from "../../public/icons/topic.svg";
import IconDesk from "../../public/icons/desk.svg";
import IconMessage from "../../public/icons/message.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogQueueModal from "../components/modal/LogQueueModal";
import CounterManageModal from "../components/modal/CounterManageModal";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { getUserName } from "@/helpers/function";
import Link from "next/link";
import ContactTopicManageModal from "./modal/ContactTopicManageModal";
import { logout } from "@/services/user/user.service";
import { ROLE } from "@/config/Enum";
import LoginManageModal from "./modal/LoginManageModal";
import { useNotification } from "@/notifications/useNotification";
import { Route } from "@/config/Route";
import FeedbackListModal from "./modal/FeedbackListModal";

export default function Profile() {
  const user = useAppSelector((state) => state.user.user);
  const { deviceType, isPhone } = useNotification();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center translate-x-3 hover:bg-transparent gap-2"
          >
            {!isPhone && (
              <div className="flex flex-col w-fit  py-2 font-normal text-[14px] text-default items-end acerSwift:max-macair133:text-b4">
                <p>{getUserName(user)}</p>
                {user.role == ROLE.ADMIN ? (
                  <p className="acerSwift:max-macair133:-mt-1">ผู้ดูแลระบบ</p>
                ) : user.studentId ? (
                  <p>{user.studentId}</p>
                ) : (
                  <></>
                )}
              </div>
            )}
            <Icon
              IconComponent={IconUser}
              className={` stroke-default stroke-[1px] ${
                isPhone ? "!size-10 translate-x-1" : "!size-10"
              }   acerSwift:max-macair133:!size-9`}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={` ${
            isPhone ? "!w-[94vw] rounded-xl -translate-x-3 " : "mr-14"
          } `}
        >
          {isPhone && (
            <div
              style={{
                boxShadow:
                  "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
              }}
              className="flex px-2 py-3 mt-1 mb-2 mx-1 rounded-lg gap-3 items-center"
            >
              <Icon
                IconComponent={IconUser}
                className={` stroke-primary stroke-[1.1px] size-9  acerSwift:max-macair133:!size-9`}
              />
              <div className="flex flex-col w-fit text-start justify-start items-start  py-2 font-normal text-[14px] text-default  acerSwift:max-macair133:text-b4">
                <p className="text-primary font-[500]">{getUserName(user)}</p>
                {user.role == ROLE.ADMIN ? (
                  <p className="acerSwift:max-macair133:-mt-1">ผู้ดูแลระบบ</p>
                ) : user.studentId ? (
                  <p>{user.studentId}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <ContactTopicManageModal
              triggerText="จัดการหัวข้อการบริการ"
              icon={IconTopic}
              title="จัดการหัวข้อการบริการ"
            ></ContactTopicManageModal>
            <CounterManageModal
              triggerText="จัดการเคาน์เตอร์"
              icon={IconDesk}
              title="จัดการเคาน์เตอร์"
            ></CounterManageModal>
            <LoginManageModal
              triggerText="จัดการเข้าใช้งานระบบ"
              icon={IconAdminMange}
              title="จัดการเข้าใช้งานระบบ"
            ></LoginManageModal>
            <FeedbackListModal
              triggerText="ข้อเสนอแนะของนักศึกษา"
              icon={IconMessage}
              title="ข้อคิดเห็นของนักศึกษา"
            ></FeedbackListModal>
            <LogQueueModal
              triggerText="ประวัติการบริการ"
              icon={IconHistory}
              title="ประวัติการบริการ"
            ></LogQueueModal>
            <Link href={Route.Index}>
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href={Route.StudentIndex}>
              <Button variant="ghost">Student dashboard</Button>
            </Link>
            <Link href={Route.AdminIndex}>
              <Button variant="ghost">Admin dashboard</Button>
            </Link>
            <Button
              className="bg-white hover:bg-[#f7b1b13b] text-[#f04a4a] justify-start"
              onClick={logout}
            >
              <Icon IconComponent={IconLogout} className=" stroke-[#f04a4a]" />
              <p className="translate-x-1">ออกจากระบบ</p>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
