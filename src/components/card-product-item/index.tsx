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
import useAddWishlist from "@/hooks/use-add-wishlist";

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
  const { addWishlistProduct } = useAddWishlist();

  const { onOpenQuickViewProductDialog } = useQuickViewProduct();

  const handleOpenQuickView = () => {
    onOpenQuickViewProductDialog(product);
  };

  const handleAddHeart = () => {
    product.isAddedToWishlist = !product.isAddedToWishlist;
  };

  const handleAddToWishlist = async () => {
    await addWishlistProduct(
      {
        productId: product?.id || "",
      },
      handleAddHeart
    );
  };

  return (
    <div className="sale-box w-[240px] cursor-pointer font-montserrat group">
      <div>
        <Link href={`/product/${product.id}`}>
          <img
            src={product.productImagesUrl[0]}
            alt={product.name}
            className="block w-full h-[240px] object-cover"
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
                  <div onClick={handleAddToWishlist}>
                    {product.isAddedToWishlist === false ? (
                      <Heart strokeWidth={1.4} />
                    ) : (
                      <Heart strokeWidth={1.4} color="red" fill="red" />
                    )}
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
          <Link
            href={`/products?category=${product.category?.categoryId}&page=1`}
          >
            <b className="font-normal hover:text-blue-500">
              {product.category?.categoryName}
            </b>
          </Link>
        </p>
        <p className="text-xs mt-2 font-normal">
          Shop name:{" "}
          <Link href={`/public-profile/${product.lessor.accountId}`}>
            <b className="font-normal hover:text-blue-500">
              {product.lessor.shopName}
            </b>
          </Link>
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
