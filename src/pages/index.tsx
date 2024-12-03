import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Route } from "@/config/Route";
import { useRouter } from "next/navigation";
import logoEng from "../../public/images/logoEng1.png";
// import IconLocation from "../../public/icons/location.svg?react";
import cmuLogoWhite from "../../public/images/cmuLogoLogin.png";
import Icon from "@/components/Icon";
export default function Home() {
  const router = useRouter();

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
        <div className="flex h-screen w-screen justify-between items-center inset-0 px-36  bg-gray-100/5">
          {" "}
          <div className="text-white flex flex-col gap-5">
            <Image
              src={logoEng}
              alt="logoEng"
              className=" size-44 -translate-x-4"
            />
            <div>
              <p className=" text-[34px]">ระบบบัตรคิวอัตโนมัติ</p>
              <p className=" text-[28px]">Automatic Queuing System</p>
            </div>
            <div className="mt-1">
              <p className=" text-[18px] font-[400]">
                คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่
              </p>
              <p className=" text-[16px] font-[400] mt-[2px]">
                Faculty of Engineering, Chiang Mai University
              </p>
            </div>
            <Button
              variant="default"
              className="text-sm font-semibold py-[22px] mt-8 w-fit px-10 rounded-[8px] bg-[#ffffff] text-[#605CA4] hover:bg-[#e8e8e8]"
              onClick={() => router.push(Route.CmuOAuthCallback)}
            >
              <Image
                src={cmuLogoWhite}
                alt="cmulogo"
                className=" w-[42px] mr-2 "
              />
              Sign in CMU Account
            </Button>
          </div>
          <div
            className="flex gap-5 flex-col  h-[70%] w-[40%] bg-white rounded-lg border border-[#E5DDEA] text-[14px] px-6 py-4 pb-8 justify-start items-center"
            style={{
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex  flex-col flex-1 w-full text-[14px]">
              <div className="flex justify-between w-full pb-4 border-b">
                <p>21 พ.ย. 2567</p>
                <p>16:10:12</p>
              </div>

              <div className="flex flex-col gap-6 px-6 justify-between items-center h-full text-medium">
                <div className="flex flex-col gap-8 mt-4 h-full items-center justify-center">
                  <div className="text-center font-medium">
                    <p className="text-[24px]">คิวที่กำลังให้บริการ </p>
                    <p className="text-[20px]">Current Serving </p>
                  </div>
                  <div className="w-40 h-40 border-[3px] border-primary text-primary rounded-[100%] flex items-center justify-center font-semibold text-[40px]">
                    004
                  </div>
                </div>

                <div className="flex justify-between items-center w-full gap-2 text-[20px] text-primary">
                  <div className="text-start text-default">
                    <p>คิวล่าสุด</p>
                    <p className="font-medium">Latest Queue</p>
                  </div>
                  <p className="text-[36px]">022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
