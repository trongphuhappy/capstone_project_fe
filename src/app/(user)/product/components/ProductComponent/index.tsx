"use client";

import BreadcrumbComponent from "@/components/breadcrumb";
import ImageGallery from "@/app/(user)/product/components/ImageGallery";
import useGetProductDetail from "@/app/(user)/product/hooks/useGetProduct";
import { useEffect } from "react";
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

interface ProductComponentProps {
  productId: string;
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

const images = [
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
];

export default function ProductComponent({ productId }: ProductComponentProps) {
  const { product, handleGetProduct } = useGetProductDetail();

  const { onOpenAddedCartDialog } = useAddedCartDialog();

  const handleFetchData = async () => {
    await handleGetProduct(productId);
  };

  const handleAddToCart = () => {
    if (product) {
      const productCart = convertToProductCard(product);
      onOpenAddedCartDialog(productCart);
    } else {
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="mt-2 py-3 px-[50px] font-montserrat">
      <div className="pb-2 border-b-2">
        <BreadcrumbComponent breadcrumbs={breadcrumbs} />
      </div>
      <div className="py-3 flex items-start gap-x-3 border-b-2">
        <div className="w-[55%]">
          <ImageGallery
            images={product ? product?.images?.map((src) => ({ src })) : []}
          />
        </div>
        <div className="w-[45%]">
          <div className="pb-4 border-b">
            <h1 className="font-semibold text-[#111111]">{product?.name}</h1>
            <div className="flex items-center gap-x-3 mt-4">
              <p className="text-base font-montserrat">Rating: </p>
              <Ratings variant="yellow" rating={product?.averageStar || 0} />
            </div>
            <div className="mt-4 flex items-baseline gap-x-3">
              <span className="text-base font-montserrat">Price:</span>
              <p className="text-2xl text-black font-semibold">
                {product && formatCurrencyVND(product?.price)}
                {product && productLocale[product?.timeUnit]}
              </p>
            </div>
            <div className="flex items-center gap-x-3 mt-4">
              <p className="text-base font-montserrat">Lessor: </p>
              <p>{product?.lessor?.shopName}</p>
            </div>
            <div className="flex items-center gap-x-3 mt-4">
              <p className="text-base font-montserrat">Location: </p>
              <p>
                {product &&
                  translationKeys[
                    product?.location as keyof typeof translationKeys
                  ]}
              </p>
            </div>
          </div>
          <div className="my-2">
            <div className="flex items-center gap-x-3">
              <button
                type="button"
                className="w-full h-[56px] px-[12px] border border-[#0056a3] rounded-3xl hover:bg-[#0056a3] group"
                onClick={handleAddToCart}
              >
                <span className="font-semibold text-[#0056a3] group-hover:text-white">
                  Add to cart
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
      <div className="mt-3">
        <h2 className="text-2xl font-semibold mb-7">Detail</h2>
        <div className="my-2">
          <Accordion type="multiple">
            <AccordionItem value="item-1" className="py-4 border-t">
              <AccordionTrigger>
                <h3 className="text-[18px] font-semibold">Description</h3>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[16px]">{product?.description}</p>
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
                  {product?.policies?.map((policy, index) => (
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
    </div>
  );
}
