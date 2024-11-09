"use client";

import { useState } from "react";
import { formatCurrencyVND } from "@/utils/format-currency";
import { HiEye, HiShoppingCart } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import styles from "@/components/cart-product-item/cart-product-item.module.css";
import QuickViewCart from "@/components/quick-view-cart";

export default function CartProductItem() {
  const [quickView, setQuickView] = useState<boolean>(false);

  const handleOpenQuickView = () => setQuickView(true);

  const handleCloseQuickView = () => setQuickView(false);

  return (
    <div className="max-w-[280px] min-h-[350px] relative">
      <div className="w-full h-[280px] bg-[#fbfbfb] hover:shadow-product-item overflow-hidden relative group cursor-pointer">
        <div className="absolute w-full z-20 bottom-0 opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 transition-all">
          <div className="flex items-center justify-center gap-x-1">
            <div className="rounded-sm w-[100px] h-[40px] flex items-center">
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger className="basis-1/2 h-full">
                    <div
                      className={`${styles.hoverIconCart} w-full rounded-l-md h-full inline-flex items-center justify-center`}
                    >
                      <HiShoppingCart
                        className={`${styles.iconCart} text-[18px]`}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black shadow-tooltip px-2 py-3 select-none">
                    <span className="text-[#ffffff] text-xs font-montserrat font-normal">
                      View details
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger className="basis-1/2 h-full">
                    <div
                      onClick={handleOpenQuickView}
                      className={`${styles.hoverIconCart} w-full rounded-r-md h-full inline-flex items-center justify-center hover:bg-black`}
                    >
                      <HiEye className={`${styles.iconCart} text-[18px]`} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black shadow-tooltip px-2 py-3 select-none">
                    <span className="text-[#ffffff] text-xs font-montserrat font-normal">
                      Quick view
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="h-full bg-[#e6e6e6] group-hover:scale-95 transition-all">
          <div className="w-full mx-auto flex items-center justify-center bg-transparent">
            <img
              // src={images[0]}
              src="/images/car1.png"
              alt={`Furniture`}
              className="w-full h-[280px] block object-cover"
            />
          </div>
        </div>
      </div>
      <div className="py-2 flex flex-col gap-y-1">
        <div>
          <h1 className="font-montserrat font-semibold text-[15px]">
            Seoul dining chair
          </h1>
        </div>
        <div>
          <p className="text-[16px] font-semibold">
            {formatCurrencyVND(10000)}
          </p>
          <div className="flex items-center gap-x-2">
            <p className="text-[13px] font-semibold">
              {formatCurrencyVND(1000000)}
            </p>
            <div className="rounded-xl px-3 bg-red-600">
              <span className="text-white">-39%</span>
            </div>
          </div>
        </div>
      </div>
      <QuickViewCart open={quickView} onClose={handleCloseQuickView} />
    </div>
  );
}
