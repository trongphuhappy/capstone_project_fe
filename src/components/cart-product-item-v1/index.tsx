
"use client";
import { HiEye, HiShoppingCart } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import styles from "@/components/cart-product-item-v1/cart-product-item.module.css";
import useQuickViewProduct from "@/hooks/use-quick-view-product";

import { productCategories, productLocale } from "@/utils/locales/en-US/product";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

interface Lessor {
  shopName: string;
  description: string;
}

interface IProductCard {
  productId: string;
  name: string;
  description: string;
  images: string[];
  lessor: Lessor;
  price: number;
  timeUnit: string;
  location: string;
  policies: string[];
}

interface CartProductItemProps {
  product: IProductCard;
}

const product: IProductCard = {
  productId: "12345",
  name: "Modern Sofa",
  description: "A comfortable and stylish modern sofa for your living room.",
  images: [
    "/images/sofa1.jpg",
    "/images/sofa2.jpg",
    "/images/sofa3.jpg",
  ],
  lessor: {
    shopName: "HomeStyle Furniture",
    description: "Quality furniture for your home.",
  },
  price: 3500000,
  timeUnit: "month",
  location: "Hà Nội",
  policies: [
    "Return policy: Return within 30 days",
    "Warranty: 1 year warranty included",
    "Free delivery within 10km",
  ],
};

export default function CartProductItem({ product }: CartProductItemProps) {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleOpenQuickView = () => {
    setAlertOpen(true);
  };

  const handleCloseAlertDialog = () => {
    setAlertOpen(false);
  };

  return (
    <div className="cart max-w-[450px] min-h-[250px] relative">
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden duration-300 ease-in-out hover:scale-105">
          <div className="relative group cursor-pointer">
            <div className="absolute w-full z-20 bottom-0 opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 transition-all">
              <div className="flex items-center justify-center gap-x-1">
                <div className="rounded-sm w-[100px] h-[40px] flex items-center">
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="basis-1/2 h-full">
                        <div className="w-full rounded-l-md h-full inline-flex items-center justify-center bg-gray-200 hover:bg-black">
                          <HiShoppingCart className="text-[18px] text-black hover:text-white" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black shadow-tooltip px-2 py-3 select-none">
                        <Link href={`/product/${product.productId}`}>
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
                          className="w-full rounded-r-md h-full inline-flex items-center justify-center bg-gray-200 hover:bg-black"
                        >
                          <HiEye className="text-[18px] text-black hover:text-white" />
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
            <div
              className="h-[300px] bg-cover bg-center group overflow-hidden relative"
              style={{
                backgroundImage: `url(${selectedImage || product.images[0]})`,
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-95"
                style={{
                  backgroundImage: `url(${selectedImage || product.images[0]})`,
                }}
              ></div>
            </div>
          </div>
          <div className="p-4 sm:p-6 min-h-[150px]">
            <p className="font-bold text-[#1e2022] text-[20px] leading-8 mb-1 font-mulish">{product.name}</p>
            <div className="flex flex-row">
              <p className="text-[14px] text-[#677788]">
                {product.price.toLocaleString("vi-VN")} VND / {product.timeUnit}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="flex max-w-6xl mx-auto p-8">
          <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setAlertOpen(false)}>
            <IoMdClose className="text-2xl text-gray-700" />
          </div>

          <div className="flex-1 p-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="flex flex-wrap mt-4 justify-between">
              {product.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className={`w-1/4 h-[100px] object-cover max-w-full p-2 border rounded-sm cursor-pointer ${selectedImage === image ? "border-1 border-black" : "border" // Nếu là hình ảnh chính thì thêm viền đen
                    }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 p-4">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-3xl font-extralight">{product.name}</AlertDialogTitle>
              <AlertDialogDescription>{product.description}</AlertDialogDescription>
              <AlertDialogDescription>Location: {product.location}</AlertDialogDescription>
              <div className="mt-4">
                <p className="text-2xl font-extralight text-gray-900">
                  {product.price.toLocaleString("vi-VN")} VND
                </p>
              </div>
            </AlertDialogHeader>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
