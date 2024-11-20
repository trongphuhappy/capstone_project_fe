"use client";

import BreadcrumbComponent from "@/components/breadcrumb";
import ImageGallery from "@/app/(user)/product/components/ImageGallery";
import { Ratings } from "@/components/ui/rating";
import { formatCurrencyVND } from "@/utils/format-currency";
import { productLocale } from "@/utils/locales/en-US/product";
import { translationKeys } from "@/utils/locales/en-US/common";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { convertToProductCard } from "@/services/products/services";
import useAddedCartDialog from "@/hooks/useAddedCartDialog";
import CustomerReviews from "@/components/customer-reviews";
import { PiListHeart } from "react-icons/pi";
import { useState } from "react";

interface ProductComponentProps {
  productId: string;
}
interface Lessor {
  shopName: string;
  description: string;
}

interface ProductDetails {
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

const breadcrumbs: TBreadcrumb[] = [
  {
    link: "/",
    title: "Home",
    isActive: false,
  },
  {
    link: "/product",
    title: "Product",
    isActive: true,
  },
];

const productDetails: ProductDetails = {
  productId: "1",
  name: "Hemnes",
  description: "Bed frame, white stain/Luröy, 150x200 cm",
  images: [
    "/images/banner1.png",
    "/images/banner2.png",
    "/images/banner3.png",
    "/images/banner3.png",
    "/images/banner3.png",
    "/images/banner3.png",
    "/images/banner3.png",
  ],
  lessor: {
    shopName: "GearPro Rentals",
    description: "bed frame, white stain/Luröy, 150x200 cm",
  },
  price: 1200000,
  timeUnit: "month",
  location: "Ho Chi Minh City",
  policies: ["Policy 1: Return within 30 days", "Policy 2: Warranty included"],
};

export default function ProductComponent({ productId }: ProductComponentProps) {

  const [cart, setCart] = useState<ProductDetails[]>([]);

  const handleAddToCart = () => {
    setCart((prevCart) => [...prevCart, productDetails]);
  };

  return (
    <div className="mt-2 py-3 px-[50px] font-montserrat">
      <div className="pb-2 border-b-2">
        <BreadcrumbComponent breadcrumbs={breadcrumbs} />
      </div>
      <div className="py-3 flex items-start gap-10">
        <div className="w-[50%]">
          <ImageGallery
            images={productDetails.images.map((src) => ({ src }))}
          />
        </div>

        {/* Detail product */}
        <div className="w-[50%]">
          <div className="pb-4">
            <h1 className="font-semibold text-[#111111] text-2xl uppercase">
              {productDetails.name}
            </h1>
            <span className="text-gray-500">
              {productDetails.description}
            </span>
            <div className="mt-4 flex items-baseline">
              <p className="text-4xl text-black font-semibold">
                {formatCurrencyVND(productDetails.price)}
                {productLocale[productDetails.timeUnit]}
              </p>
            </div>
            <hr className="mt-4" />
            <div className="flex items-center gap-x-3 mt-4">
              <p className="text-base font-montserrat">Lessor: </p>
              <p className="text-gray-500">{productDetails.lessor.shopName}</p>
            </div>
            <div className="flex items-center gap-x-3 mt-4">
              <p className="text-base font-montserrat">Location: </p>
              <p className="text-gray-500">
                {productDetails.location}
              </p>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="my-2">
            <div className="flex items-center gap-x-3">
              <button
                type="button"
                className="w-full h-[56px] px-[12px] border border-[#0056a3] rounded-3xl group"
                onClick={handleAddToCart}
              >
                <span className="flex items-center justify-center font-semibold text-[#0056a3] group-hover:text-opacity-50">
                  <PiListHeart className="mr-2 text-lg" /> 
                  Add To Wishlist
                </span>
              </button>


              <button
                type="button"
                className="w-full h-[56px] px-[12px] border border-[#0056a3] bg-[#0056a3] rounded-3xl hover:opacity-90"
              >
                <span className="font-semibold text-white">Check out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex-6 w-6/12">
        <h2 className="text-2xl font-semibold mb-7">Detail</h2>
        <div className="my-2">
          <Accordion type="multiple">
            <AccordionItem value="item-1" className="py-4 border-t">
              <AccordionTrigger>
                <h3 className="text-[18px] font-semibold">Description</h3>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[16px]">{productDetails.description}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="multiple">
            <AccordionItem value="item-2" className="py-4">
              <AccordionTrigger>
                <h3 className="text-[18px] font-semibold">Policy</h3>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-y-2">
                  {productDetails.policies.map((policy, index) => (
                    <li key={index} className="text-[16px]">
                      {policy}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="border rounded-md p-8 mt-8">
        <CustomerReviews />
      </div>
    </div>
  );
}
