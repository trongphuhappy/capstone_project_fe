"use client";

import { formatCurrencyVND } from "@/utils/format-currency";
import { HiEye, HiShoppingCart } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import styles from "@/components/cart-product-item-v1/cart-product-item.module.css";
import useQuickViewProduct from "@/hooks/useQuickViewProduct";

import { productCategories } from "@/utils/locales/en-US/product";
import Link from "next/link";

interface CartProductItemProps {
  product: API.IProductCard;
}

export default function CartProductItem({ product }: CartProductItemProps) {
  const { onOpenQuickViewProductDialog } = useQuickViewProduct();

  const handleOpenQuickView = () => {
    onOpenQuickViewProductDialog();
  };

  return (
    <div className={`${styles.cart} cart max-w-[250px] min-h-[250px] relative`}>
      <div className="w-full rounded-[15px] bg-[#f5f5f5] shadow-tooltip overflow-hidden relative group cursor-pointer">
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
                    <Link href={`/product/${product.id}`}>
                      <span className="text-[#ffffff] text-xs font-montserrat font-normal">
                        View details
                      </span>
                    </Link>
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
        <div className="h-full rounded-[10px] overflow-hidden bg-[#e6e6e6] group-hover:scale-95 transition-all">
          <div className="w-full mx-auto flex items-center justify-center bg-transparent">
            <img
              src={product?.image}
              // src="/images/car1.png"
              alt={`Furniture`}
              className="w-full h-[280px] block object-cover"
            />
          </div>
        </div>
      </div>
      <div className="py-2 flex flex-col gap-y-1">
        <div>
          <h1
            className={`${styles.title} title font-montserrat font-semibold text-[14px]`}
          >
            {product?.name}
          </h1>
        </div>

        <p className="font-montserrat text-[12px]">
          {productCategories[product?.category?.name]}
        </p>
        <div className="flex gap-x-2">
          <p className="text-[22px] font-semibold">
            {formatCurrencyVND(product?.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
