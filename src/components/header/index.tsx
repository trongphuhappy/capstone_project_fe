"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Search from "@/components/search";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/stores/store";
import AvatarMenu from "../avatar-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useServiceProductCategories } from "@/services/product-categories/services";
import { ICategoryDescriptions } from "@/stores/categorySlice";

interface INavItem {
  label: string;
  subItems: ICategoryDescriptions[] | undefined;
  image: string;
}

const InitialNavItems: INavItem[] = [
  {
    label: "All Products",
    subItems: [],
    image: "/images/banner1.png",
  },
  {
    label: "Furnitures",
    subItems: [],
    image: "/images/banner2.png",
  },
  {
    label: "Vehicles",
    subItems: [],
    image: "/images/car1.png",
  },
  {
    label: "E-Neighbor for LESSOR",
    subItems: [],
    image: "/images/auth03.jpg",
  },
  {
    label: "Contact Us",
    subItems: [],
    image: "/images/mordern-sopha.jpg",
  },
];

export default function Header() {
  const userState = useAppSelector((state) => state.userSlice);
  const categorySlice = useAppSelector((state) => state.categorySlice);
  const [navItems, setNavItems] = useState<INavItem[]>(InitialNavItems);

  const [underlineWidth, setUnderlineWidth] = useState<number>(0);
  const [underlineLeft, setUnderlineLeft] = useState<number>(0);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [isDropdownHovered, setIsDropdownHovered] = useState<boolean>(false);

  const handleCategories = async () => {
    await useServiceProductCategories();
  };

  const handleMouseEnter = (index: number, element: HTMLLIElement) => {
    if (element) {
      const { offsetWidth, offsetLeft } = element;
      setUnderlineWidth(offsetWidth);
      setUnderlineLeft(offsetLeft);
      setDropdownIndex(index);
      if (index === 1) {
        setNavItems((prevNavItems) =>
          prevNavItems.map((item, i) =>
            i === 1 ? { ...item, subItems: categorySlice.furniture } : item
          )
        );
      } else if (index === 2) {
        setNavItems((prevNavItems) =>
          prevNavItems.map((item, i) =>
            i === 2 ? { ...item, subItems: categorySlice.vehicles } : item
          )
        );
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isDropdownHovered) {
      setDropdownIndex(null);
    }
  };

  const handleDropdownMouseEnter = () => {
    setIsDropdownHovered(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownHovered(false);
    setDropdownIndex(null);
  };

  useEffect(() => {
    handleCategories();
  }, []);

  return (
    <header className="px-[50px] mx-auto">
      <div className="py-4 flex items-center justify-between gap-x-16">
        <figure className="flex items-center gap-x-2">
          <Image src={"/images/logo.svg"} alt="logo" width={90} height={90} />
          <span className="text-[#00939F]">-</span>
          <h1 className="text-black text-2xl font-semibold font-montserrat">
            Neighbor
          </h1>
        </figure>
        <section className="w-full h-10 flex-1">
          <Search />
        </section>
        <ul className="flex items-center gap-x-3">
          <li>
            {userState.profile != null ? (
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <figure className="rounded-full border border-zinc-300 overflow-hidden w-12 h-12 flex items-center justify-center hover:bg-teal-400">
                      <img
                        id="avatarButton"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        src={
                          userState?.profile?.avatar !== ""
                            ? userState?.profile?.avatar
                            : "/images/unknown.webp"
                        }
                        alt="Avatar"
                      />
                    </figure>
                  </PopoverTrigger>
                  <PopoverContent
                    side="bottom"
                    align="center"
                    className="w-auto h-auto text-white rounded-md p-0 overflow-hidden"
                  >
                    <AvatarMenu onCloseTooltip={() => {}} />
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
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
                      <span className="whitespace-nowrap font-montserrat text-[#00000] font-semibold">
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
            )}
          </li>
          <li>
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <div className="min-w-12 flex items-center justify-center gap-x-1 hover:bg-[#ccc] cursor-pointer rounded-[24px] h-12">
                    <img src="/images/bag.svg" alt="bag" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                  <span className="text-[#00000d] text-xs font-montserrat font-normal">
                    Shopping bag
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </div>
      <div className="h-[60px] flex items-center">
        <nav>
          <ul className="flex items-center justify-start gap-x-[60px] relative">
            {navItems?.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer relative"
                onMouseEnter={(e) => handleMouseEnter(index, e.currentTarget)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="text-xs text-black font-semibold font-montserrat">
                  {item.label}
                </span>
                <AnimatePresence>
                  {dropdownIndex === index && (
                    <motion.div
                      className="absolute left-0 top-[calc(100%+10px)] bg-white shadow-lg w-[800px] h-[400px] z-50 flex"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <div className="w-1/2 p-4">
                        {item?.subItems?.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="block px-2 py-1 text-sm text-black hover:bg-gray-200"
                          >
                            {subItem.value}
                          </a>
                        ))}
                      </div>
                      <div className="w-1/2 relative">
                        <Image
                          src={item?.image}
                          alt={item?.label}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
            <motion.span
              className="absolute transition-all duration-300 rounded-lg border border-[#00939F]"
              style={{
                width: underlineWidth,
                left: underlineLeft,
                bottom: "-4px",
              }}
              layout
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}
