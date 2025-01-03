import Router from "next/router";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Route } from "@/config/Route";
import logoSD from "../../public/images/logoSDBlack.png";
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
import axios from "axios";

export default function Home() {
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
      const currentDate = new Intl.DateTimeFormat("en-GB", options).format(
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
            <TableHead className=" bg-[#000000] w-[20%] !rounded-none  border-b-[2px] border-[#ffffff]  text-[4vh] text-center text-[#efde25] p-3">
              Counter
            </TableHead>
            <TableHead className="  bg-[#000000] text-[4vh]  w-[25%] text-center border-b-[2px]  border-l-[2px] border-[#fffffff] p-3 py-4 text-[#efde25]">
              Called No.
            </TableHead>
            <TableHead className="  bg-[#000000] text-[4vh]  w-[55%] text-start border-b-[2px]  border-[#fffffff] p-3 py-4 text-[#efde25]">
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-normal  text-center text-b2 samsungA24:text-b1">
          {queueData && queueData.length > 0 ? (
            queueData.map((item: any) => (
              <TableRow className="" key={item.queueNumber}>
                <TableCell className=" bg-[#0E1235]  text-white font-semibold text-[6vh]">
                  {item.counter}
                </TableCell>
                <TableCell className="font-semibold bg-[#0E1235] border-l-[2px] border-[#ffffff]  text-[#efde25] text-[6vh] ">
                  {item.queueNumber}
                </TableCell>
                <TableCell className="font-semibold text-start bg-[#0E1235]   border-[#ffffff]  text-white text-[5vh] ">
                  <p className=" font-normal font-roboto text-[4vh] -ml-3">
                    {item.name}
                  </p>
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

  const AQI_STATUS = {
    GOOD: "Good",
    MODERATE: "Moderate",
    UNHEALTHY_SG: "Concern",
    UNHEALTHY: "Unhealthy",
    VERY_UNHEALTHY: "Very Unhealthy",
    HAZARDOUS: "Hazardous",
  };

  const [aqi, setAqi] = useState<number | null>(null);
  const [aqiStatus, setAqiStatus] = useState<string>("");
  const determineAqiStatus = (value: number): string => {
    if (value <= 50) return AQI_STATUS.GOOD;
    if (value <= 100) return AQI_STATUS.MODERATE;
    if (value <= 150) return AQI_STATUS.UNHEALTHY_SG;
    if (value <= 200) return AQI_STATUS.UNHEALTHY;
    if (value <= 300) return AQI_STATUS.VERY_UNHEALTHY;
    return AQI_STATUS.HAZARDOUS;
  };
  const getAqiBackgroundColor = (status: string): string => {
    switch (status) {
      case AQI_STATUS.GOOD:
        return "bg-[#39c992] text-black";
      case AQI_STATUS.MODERATE:
        return "bg-[#fdd64b] text-black";
      case AQI_STATUS.UNHEALTHY_SG:
        return "bg-[#faa166] text-black";
      case AQI_STATUS.UNHEALTHY:
        return "bg-[#cd3030] text-white";
      case AQI_STATUS.VERY_UNHEALTHY:
        return "bg-[#70497f] text-white";
      case AQI_STATUS.HAZARDOUS:
        return "bg-[#793e50] text-white";
      default:
        return "bg-black";
    }
  };

  useEffect(() => {
    const fetchAqi = async () => {
      try {
        // const response = await axios.get(
        //   "https://api.airvisual.com/v2/nearest_city",
        //   {
        //     params: {
        //       key: "4f6af6ef-9045-4d4e-b95e-7a125bb11db8", // Replace with your API key
        //       lat: "18.79", // Example latitude
        //       lon: "98.95", // Example longitude
        //     },
        //   }
        // );
        // const aqiValue = response.data.data.current.pollution.aqius;
        
        const aqiValue = 200; // Mock test color bg and text
        setAqi(aqiValue);
        setAqiStatus(determineAqiStatus(aqiValue));
      } catch (error) {
        console.error("Error fetching AQI data:", error);
      }
    };
  
    fetchAqi(); 
    const interval = setInterval(fetchAqi, 30 * 60 * 1000); 
    return () => clearInterval(interval); 
  }, []);
  

  const queueData = [
    { queueNumber: "C081", counter: "1", name: "สวิช จารึกพูนผล" },
    { queueNumber: "S012", counter: "2", name: "ธนพร ชาญชนะโยธิน" },
    { queueNumber: "B065", counter: "3", name: "วรพิชชา เมืองยศ" },
    { queueNumber: "E034", counter: "4", name: "สุพิชญา รวมสิน" },
    { queueNumber: "T024", counter: "5", name: "เอกชัย แพร่ไพศาลภูบาล" },
    { queueNumber: "A008", counter: "6", name: "เนตรนภา สาระแปง" },
  ];


  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div
        style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
        className="sticky top-0 flex min-h-[11vh] bg-[#efde25] border-b border-[#000000] justify-between items-center px-10 z-50"
      >
        <div className="flex gap-8  h-full items-center justify-center  ">
          <p className="text-[#000000] text-[6vh] font-semibold">{dateTime}</p>
          <p className="text-[#000000] text-[6vh] font-semibold">{time}</p>
        </div>{" "}
        <div className="flex  gap-5 items-center">
          <Image src={logoSD} alt="cmulogo" className="w-[4.5vw]  " />
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <QueueCallTable queueData={queueData} />

        <div className="flex flex-grow bg-[#fffffff]  gap-4  w-full">
          <div
            className={`flex w-[40%] px-10 h-full items-center gap-9 justify-between text-black text-start ${
              aqiStatus ? getAqiBackgroundColor(aqiStatus) : "bg-gray-300"
            }`}
          >
            <p className="text-[2.7vh] ">
              <span className="font-semibold text-[6vh]">
                {" "}
                {aqi !== null ? aqi : "loading"}
              </span>{" "}
              US AQI
            </p>
            <p className="font-semibold text-[5.2vh]">
              {" "}
              {aqiStatus || "loading"}
            </p>
          </div>
          <div className="flex gap-8 px-12 w-[60%]  items-center justify-center ">
            <p className="text-[#000000] text-[5.8vh] font-medium">
              จองคิวได้ที่
              <span className="font-semibold"> q.eng.cmu.ac.th</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
