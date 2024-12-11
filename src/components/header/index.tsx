"use client";
import Image from "next/image";
import Search from "@/components/search";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Fragment, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/stores/store";
import AvatarMenu from "@/components/avatar-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, SquarePen } from "lucide-react";
import useCheckExsitLessor from "@/hooks/use-check-exist-lessor";
import useToast from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Category from "@/components/category";

export default function Header() {
  const { addToast } = useToast();
  const router = useRouter();
  const userState = useAppSelector((state) => state?.userSlice);
  const [avatarMenuTooltip, setAvatarMenuTooltip] = useState<boolean>(false);

  const { checkExistLessorApi } = useCheckExsitLessor();

  const handleToggleAvatarMenuTooltip = () => {
    setAvatarMenuTooltip((prev) => !prev);
  };

  const handleCloseAvatarMenuTooltip = () => {
    setAvatarMenuTooltip(false);
  };

  const handlePostNow = async () => {
    const res = await checkExistLessorApi();
    if (res === false) {
      addToast({
        type: "error",
        description: "Please update information to become a lessor",
      });
    } else {
      router.push("/create-product");
    }
  };

  return (
    <header className="mx-auto font-montserrat">
      <div className="px-[50px] py-4 flex items-center justify-between gap-x-4 md:gap-x-8 lg:gap-x-16 w-full flex-wrap">
        <Link href="/">
          <figure className="flex items-center gap-x-2">
            <Image src={"/images/logo.svg"} alt="logo" width={50} height={50} />
            <span className="text-[#00939F]">-</span>
            <h1 className="text-black md:text-2xl text-xl font-semibold font-montserrat">
              Neighbor
            </h1>
          </figure>
        </Link>

        <section className="w-full h-10 flex-1 hidden sm:block">
          <Search />
        </section>

        <ul className="flex items-center gap-x-7">
          {userState.profile === null && (
            <li>
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-x-1 p-2 hover:bg-[#ccc] cursor-pointer rounded-[24px] h-12 px-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="1.5rem"
                        height="1.5rem"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.6724 6.4678c.2734-.2812.6804-.4707 1.3493-.4707.3971 0 .705.0838.9529.2225.241.1348.4379.3311.5934.6193l.0033.006c.1394.2541.237.6185.237 1.1403 0 .7856-.2046 1.2451-.4796 1.5278l-.0048.005c-.2759.2876-.679.4764-1.334.4764-.3857 0-.6962-.082-.956-.2241-.2388-.1344-.4342-.3293-.5888-.6147-.1454-.275-.2419-.652-.2419-1.1704 0-.7902.2035-1.2442.4692-1.5174zm1.3493-2.4717c-1.0834 0-2.054.3262-2.7838 1.0766-.7376.7583-1.0358 1.781-1.0358 2.9125 0 .7656.1431 1.483.4773 2.112l.0031.0058c.3249.602.785 1.084 1.3777 1.4154l.0062.0035c.5874.323 1.2368.4736 1.9235.4736 1.0818 0 2.0484-.3333 2.7755-1.0896.7406-.7627 1.044-1.786 1.044-2.9207 0-.7629-.1421-1.4784-.482-2.0996-.3247-.6006-.7844-1.0815-1.376-1.4125-.5858-.3276-1.2388-.477-1.9297-.477zM6.4691 16.8582c.2983-.5803.7228-1.0273 1.29-1.3572.5582-.3191 1.2834-.5049 2.2209-.5049h4.04c.9375 0 1.6626.1858 2.2209.5049.5672.3299.9917.7769 1.29 1.3572.3031.5896.4691 1.2936.4691 2.1379v1h2v-1c0-1.1122-.2205-2.1384-.6904-3.0523a5.3218 5.3218 0 0 0-2.0722-2.1769c-.9279-.5315-2.0157-.7708-3.2174-.7708H9.98c-1.1145 0-2.2483.212-3.2225.7737-.8982.5215-1.5928 1.2515-2.0671 2.174C4.2205 16.8577 4 17.8839 4 18.9961v1h2v-1c0-.8443.166-1.5483.4691-2.1379z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="whitespace-nowrap font-montserrat text-[#00000] font-semibold hidden sm:block">
                        Hello! Log in or sign up
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                    <span className="text-[#00000d] text-xs font-montserrat font-normal">
                      My profile
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          )}
          <li className="inline-flex">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <div className="flex items-center justify-center gap-x-1 cursor-pointer rounded-[24px] h-12 w-12 group">
                    <Link href="/wishlist">
                      <img
                        src="/images/heart-svgrepo-com.svg"
                        alt="heart-svgrepo-com"
                        className="w-full h-full object-contain"
                      />
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                  <span className="text-[#00000d] text-xs font-montserrat font-normal">
                    Wish list
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>

          {userState.profile !== null && (
            <Fragment>
              <li>
                <div className="flex items-center justify-center gap-x-1 cursor-pointer rounded-[24px] h-12 group">
                  <Bell className="group-hover:text-purple-400" />
                </div>
              </li>
              <li>
                <Popover
                  open={avatarMenuTooltip}
                  onOpenChange={setAvatarMenuTooltip}
                >
                  <PopoverTrigger asChild>
                    <div onClick={handleToggleAvatarMenuTooltip}>
                      <figure className="rounded-full border border-zinc-300 overflow-hidden w-10 h-10 flex items-center justify-center hover:bg-gray-200">
                        <img
                          id="avatarButton"
                          className="w-9 h-9 rounded-full cursor-pointer"
                          src={
                            userState?.profile?.cropAvatarLink !== ""
                              ? userState?.profile?.cropAvatarLink
                              : "/images/unknown.webp"
                          }
                          alt="Avatar"
                        />
                      </figure>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    side="bottom"
                    align="center"
                    className="w-auto h-auto text-white rounded-md p-0"
                  >
                    <AvatarMenu onCloseTooltip={handleCloseAvatarMenuTooltip} />
                  </PopoverContent>
                </Popover>
              </li>
              <li>
                <button type="button" onClick={handlePostNow}>
                  <div className="flex items-center gap-x-2 px-5 py-2 rounded-md bg-[#00939f] hover:bg-[#15757e]">
                    <SquarePen className="w-5 h-5 text-white" />
                    <span className="text-[14px] font-semibold text-white">
                      POST
                    </span>
                  </div>
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </div>

      <div className="h-[60px] flex items-center">
        <Category />
      </div>
    </header>
  );
}
