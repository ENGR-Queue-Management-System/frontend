import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Route } from "@/config/Route";
import { useRouter } from "next/navigation";
import logoSD from "../../public/images/logoSD.png";
import cmuLogoWhite from "../../public/images/cmuLogoLogin.png";
import Icon from "@/components/Icon";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import IconClock from "../../public/icons/clock.svg";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const [time, setTime] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const currentTime = new Intl.DateTimeFormat("en-US", options).format(
        new Date()
      );
      setTime(currentTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Bangkok",
        weekday: "short",
        day: "numeric",
        month: "short",
      };
      const currentDate = new Intl.DateTimeFormat("en-EN", options).format(
        new Date()
      );
      setDateTime(currentDate);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const QueueCallTable = ({ queueData }: any) => {
    return (
      <Table className="w-full " striped={true}>
        <TableHeader>
          <TableRow className="sticky text-b2 samsungA24:text-b1 font-bold top-0 z-30">
            <TableHead className=" rounded-tl-2xl bg-[#001F3F] text-[3vh] text-center border-b-[2px] border-r-[2px] border-[#8ff5a7] p-3 py-4 text-[#ffffff]">
              หมายเลขคิวที่เรียก <br /> Called Queue
            </TableHead>
            <TableHead className=" bg-[#001F3F] rounded-tr-2xl border-b-[2px] border-[#8ff5a7]  text-[3vh] text-center text-[#ffffff] p-3">
              เคาท์เตอร์ <br /> (Counter)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-normal rounded-br-2xl text-center text-b2 samsungA24:text-b1">
          {queueData && queueData.length > 0 ? (
            queueData.map((item: any) => (
              <TableRow className="" key={item.queueNumber}>
                <TableCell className="font-semibold bg-[#0b1734] border-r-[2px] border-[#8ff5a7] rounded-bl-2xl  text-white text-[14vh] ">
                  {item.queueNumber}
                  <p className="text-[3.8vh]  -mt-4 my-10">วรพิชชา เมืองยศ</p>
                </TableCell>
                <TableCell className=" bg-[#0b1734] rounded-br-2xl text-white font-semibold text-[14vh]">
                  {item.counter}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-4">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  const queueData = [{ queueNumber: "A081", counter: "A" }];

  const calledQueueData = [
    { queueNumber: "A080" },
    { queueNumber: "B021" },
    { queueNumber: "B020" },
    { queueNumber: "A079" },
    { queueNumber: "C025" },
    { queueNumber: "A078" },
    { queueNumber: "A077" },
    { queueNumber: "A076" },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar (Sticky and does not scroll) */}
      <div
        style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
        className="sticky top-0 flex min-h-[11vh] bg-[#001F3F] border-b border-[#000000] justify-between items-center px-10 z-50"
      >
        <div className="flex flex-col text-white text-[2.4vh] gap-[2px]">
          <p className="font-medium">คิวห้องงานพัฒนาคุณภาพนักศึกษา</p>
          <p className="font-semibold">Student Development Room Queue</p>
        </div>
        <p className="text-white text-[5.2vh] font-medium">{time}</p>
        <div className="flex flex-col text-end text-white text-[2.4vh] gap-[2px]">
          <p className="font-medium">คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่</p>
          <p className="font-semibold">Faculty of Engineering, CMU</p>
        </div>
      </div>

      {/* Main Content (Flex-grow to fill remaining height) */}
      <div className="flex flex-col flex-grow">
        <div className="flex bg-[#8ff5a7] p-4 w-full flex-col flex-grow">
          <QueueCallTable queueData={queueData} />
        </div>

        {/* Footer Section */}
        <div className="flex flex-grow bg-slate-800 p-3 pl-3 w-full">
          <div className="flex flex-col gap-5 w-[70%]">
            <div className="grid grid-cols-3 gap-5">
              <div className="flex rounded-2xl justify-center items-center p-5 text-white bg-[#FF5733] flex-col">
                <p className="text-[3.3vh]">Counter A</p>
                <p className="text-[7vh] font-semibold">A081</p>
              </div>
              <div className="flex rounded-2xl justify-center items-center p-5 text-white bg-[#1E90FF] flex-col">
                <p className="text-[3.3vh]">Counter B</p>
                <p className="text-[7vh] font-semibold">B081</p>
              </div>
              <div className="flex rounded-2xl justify-center items-center p-5 text-white bg-[#918123] flex-col">
                <p className="text-[3.3vh]">Counter C</p>
                <p className="text-[7vh] font-semibold">C081</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="flex rounded-2xl justify-center items-center p-5 text-white bg-[#28A745] flex-col">
                <p className="text-[3.3vh]">Counter D</p>
                <p className="text-[7vh] font-semibold">D081</p>
              </div>
              <div className="flex rounded-2xl justify-center items-center p-5 text-white bg-[#FF69B4] flex-col">
                <p className="text-[3.3vh]">Counter E</p>
                <p className="text-[7vh] font-semibold">E081</p>
              </div>
              <div className="flex rounded-2xl justify-center items-center p-5 text-white  bg-[#8A2BE2] flex-col">
                <p className="text-[3.3vh]">Counter F</p>
                <p className="text-[7vh] font-semibold">F081</p>
              </div>
            </div>
          </div>
          <div className="text-white">จองคิวได้ที่</div>
        </div>
      </div>
    </div>
  );
}
