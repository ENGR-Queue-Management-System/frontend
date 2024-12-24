import { Button } from "@/components/ui/button";
import IconBack from "../../public/icons/arrowLeft.svg";
import Icon from "@/components/Icon";
import Image from "next/image";
import pageNotFound from "../../public/images/404.png";

export default function Custom404() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-start -mt-14">
        <h1 className="text-default text-[20px] font-medium">Oops!</h1>
        <p className="-mt-2 w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ec407a] via-[#a06ee1] to-[#fb8c00] font-[500] text-[80px] iphone:max-macair133:text-[60px]">
          404
        </p>
        <p className="text-primary text-h2 font-medium -mt-2">Page Not Found</p>
        <p className="text-describe mt-1">
          The page you're looking for can't be found.
        </p>
      </div>
      <Image
        className="w-[110px] iphone:max-sm:w-[90vw] iphone:max-sm:-mt-3 acerSwift:max-macair133:w-[100px] -z-50"
        src={pageNotFound}
        alt="Page Not Found"
      />

      <Button variant="default" className="iphone:max-sm:!h-[50px]">
        <Icon IconComponent={IconBack} />
        Back to The Home Page
      </Button>
    </div>
  );
}
