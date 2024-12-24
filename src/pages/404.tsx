import { Button } from "@/components/ui/button";
import IconBack from "../../public/icons/arrowLeft.svg";
import Icon from "@/components/Icon";
import Image from "next/image";
import pageNotFound from "../../public/images/404.png";

export default function Custom404() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <div className="flex iphone:max-sm:flex-col gap-1 acerSwift:gap-20 acerSwift:-mr-4 w-full items-center justify-center">
        <div className="flex flex-col items-start iphone:max-sm:-mt-14 acerSwift:gap-1">
          <h1 className="text-primary text-h1  font-medium">Oops!</h1>
          <p className="-mt-2 acerSwift:-mt-2 w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#ec407a] via-[#a06ee1] to-[#fb8c00] font-[500] text-[80px] iphone:max-sm:text-[60px]">
            404
          </p>
          <div>
            <p className="text-primary iphone:max-sm:text-h1 font-medium -mt-2 acerSwift:text-h2 acerSwift:-mt-3">
              Page Not Found
            </p>
            <p className="text-describe mt-1 acerSwift:text-b1 font-medium">
              The page you're looking for can't be found.
            </p>
          </div>

          <Button
            variant="default"
            className="iphone:max-sm:hidden acerSwift:mt-5"
          >
            <Icon IconComponent={IconBack} />
            Back to The Home Page
          </Button>
        </div>
        <Image
          className="iphone:max-sm:w-[90vw]  iphone:max-sm:-mt-3 acerSwift:max-macair133:w-[35vw]  -z-50"
          src={pageNotFound}
          alt="Page Not Found"
        />
      </div>

      <Button
        variant="default"
        className="iphone:max-sm:!h-[50px] acerSwift:hidden"
      >
        <Icon IconComponent={IconBack} />
        Back to The Home Page
      </Button>
    </div>
  );
}
