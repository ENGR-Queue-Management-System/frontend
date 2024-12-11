import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Route } from "@/config/Route";
import { useRouter } from "next/navigation";
import logoEng from "../../public/images/logoEng1.png";
import Icon from "@/components/Icon";
import cmuLogoWhite from "../../public/images/cmuLogoLogin.png";
import { useAppSelector } from "@/store";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.email) {
      if (user.studentId) {
        router.push(Route.StudentIndex);
      } else {
        router.push(Route.AdminIndex);
      }
    }
  }, [user]);

  const dataDone = [
    {
      id: 1,
      studentId: "640610656",
      name: "ภัทรกณ ตาคำ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "อื่นๆ",
      description:
        "ขอคำปรึกษาเรื่องทั่วไปครับ เพราะมีหลายเรื่องที่อยากรู้เพิ่มเติม",
    },
    {
      id: 2,
      studentId: "640610652",
      name: "พันธุ์ธัช หมื่นปราบ",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ทุนการศึกษา",
      description:
        "ยื่นขอทุนการศึกษาครับ อยากได้รับการสนับสนุนเพื่อการเรียนต่อ",
    },
    {
      id: 3,
      studentId: "640610627",
      name: "ฐิตายุ ฟุ้งธรรม",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "ขอคำปรึกษาด้านวิชาการ",
      description: "ต้องการคำปรึกษาเกี่ยวกับการ path เรียน ME ครับ",
    },
    {
      id: 4,
      studentId: "630612184",
      name: "พีระ อรุณรัตน์",
      room: "งานพัฒนาคุณภาพนักศึกษา",
      category: "แจ้งปัญหาด้านการเรียนการสอน",
      description:
        "มีปัญหาบางอย่างเกี่ยวกับการเรียนการสอนที่อยากแจ้งครับ เพื่อให้ปรับปรุง",
    },
  ];
  return (
    <div className=" flex items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex gradient-bg h-screen w-screen justify-center  items-center bg-cover bg-center">
        <div className="flex h-screen w-screen justify-center items-center inset-0 px-36  ">
          <div
            className="text-white text-center justify-start items-center flex flex-col iphone:max-sm:bg-transparent iphone:max-sm:shadow-none sm:max-samsungA24:px-24 sm:max-samsungA24:py-12 samsungA24:px-28 samsungA24:py-16 gap-5 rounded-[25px] bg-[rgba(85,85,86,0.25)] shadow-[0px_0px_4px_2px_rgba(0,0,0,0.25)]
"
          >
            <Image
              src={logoEng}
              alt="logoEng"
              className=" samsungA24:size-44 macair133:max-samsungA24:size-40 iphone:max-sm:size-36 sm:max-macair133:size-[156px]"
            />
            <div>
              <p className=" sm:max-samsungA24:text-[28px] iphone:max-sm:text-[24px] text-[34px]">
                ระบบบัตรคิวอัตโนมัติ
              </p>
              <p className=" sm:max-samsungA24:text-[20px] iphone:max-sm:text-[18px] text-[28px]">
                Automatic Queuing System
              </p>
            </div>
            <div className="mt-1">
              <p className=" text-h2 sm:max-samsungA24:text-[15px] iphone:max-sm:text-[12px] font-[400]">
                คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่
              </p>
              <p className=" text-[16px] sm:max-samsungA24:text-[13px] iphone:max-sm:text-[11px] font-[400] mt-[2px]">
                Faculty of Engineering, Chiang Mai University
              </p>
            </div>
            <a href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}>
              <Button
                variant="default"
                className="text-sm font-semibold py-[22px] iphone:max-sm:rounded-full iphone:max-sm:py-[26px] iphone:max-sm:px-14 mt-8 iphone:max-sm:mt-12 w-fit px-10 rounded-[8px] bg-[#ffffff] text-[#605CA4] hover:bg-[#e8e8e8]"
              >
                <Image
                  src={cmuLogoWhite}
                  alt="cmulogo"
                  className=" w-[42px] mr-2 "
                />
                Sign in CMU Account
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
