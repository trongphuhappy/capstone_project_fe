'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import Search from "@/components/search";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const navItems = [
  "All Products",
  "Furniture",
  "Transportation",
  "E-Neighbor for LESSOR",
  "Contact Us",
];

export default function Header() {
  const [underlineWidth, setUnderlineWidth] = useState<number>(0);
  const [underlineLeft, setUnderlineLeft] = useState<number>(0);

  const handleMouseEnter = (index: number, element: HTMLLIElement) => {
    if (element) {
      const { offsetWidth, offsetLeft } = element;
      setUnderlineWidth(offsetWidth);
      setUnderlineLeft(offsetLeft);
    }
  };

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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center justify-center gap-x-1 p-2 hover:bg-[#ccc] cursor-pointer rounded-[24px] h-12 px-3">
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
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                  <span className="text-[#00000d] text-xs font-montserrat font-normal">
                    My profile
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <TooltipProvider>
              <Tooltip>
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
            {navItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer relative"
                onMouseEnter={(e) => handleMouseEnter(index, e.currentTarget)}
              >
                <span className="text-xs text-black font-semibold font-montserrat">
                  {item}
                </span>
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
