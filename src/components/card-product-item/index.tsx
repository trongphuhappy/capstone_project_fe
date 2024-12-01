"use client";

import { HiEye } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import { formatCurrencyVND } from "@/utils/format-currency";
import { Heart } from "lucide-react";
import { useAppSelector } from "@/stores/store";
import useQuickViewProduct from "@/hooks/use-quick-view-product";

interface CardProductItemProps {
  product: API.TProduct;
}
//   productId: "12345",
//   name: "Modern Sofa",
//   description: "A comfortable and stylish modern sofa for your living room.",
//   images: [
//     "/images/sofa1.jpg",
//     "/images/sofa2.jpg",
//     "/images/sofa3.jpg",
//   ],
//   lessor: {
//     shopName: "HomeStyle Furniture",
//     description: "Quality furniture for your home.",
//   },
//   price: 3500000,
//   timeUnit: "month",
//   location: "Hà Nội",
//   policies: [
//     "Return policy: Return within 30 days",
//     "Warranty: 1 year warranty included",
//     "Free delivery within 10km",
//   ],
// };

export default function CardProductItem({ product }: CardProductItemProps) {
  const userState = useAppSelector((state) => state.userSlice.profile);

  const { onOpenQuickViewProductDialog } = useQuickViewProduct();

  const handleOpenQuickView = () => {
    onOpenQuickViewProductDialog(product);
  };

  const handleToggleWishlish = () => {};

  return (
    <div className="sale-box w-[220px] cursor-pointer font-montserrat group">
      <div>
        <Link href={`/product/${product.id}`}>
          <img
            src={product.productImagesUrl[0]}
            alt={product.name}
            className="block w-full h-[220px] object-cover"
          />
        </Link>
      </div>
      <div className="mt-2">
        <div className="flex items-start justify-between">
          <p className="font-bold max-w-[180px]">{product.name}</p>
          {product.isProductBelongsToUser === false && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <div onClick={handleToggleWishlish}>
                    <Heart />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                  <span className="text-[#00000d] text-xs font-montserrat font-normal">
                    Wish list
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-xs mt-1 font-normal">
          Cateogory:{" "}
          <b className="font-normal">{product.category?.categoryName}</b>
        </p>
        <p className="text-xs mt-2 font-normal">
          Shop name: <b className="font-normal">{product.lessor.shopName}</b>
        </p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs">Rent price: </p>
            <p className="mt-2 text-xl font-bold">
              {formatCurrencyVND(product.price)} / Day
            </p>
          </div>
          {product.isProductBelongsToUser === false && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="opacity-0 group-hover:opacity-100">
                  <div
                    onClick={handleOpenQuickView}
                    className="bg-[#0058a3] rounded-full w-[30px] h-[30px] flex items-center justify-center"
                  >
                    <HiEye className={`w-[18px] h-[18px] text-white`} />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                  <span className="text-[#00000d] text-xs font-montserrat font-normal">
                    Quick view
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
}
