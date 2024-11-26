"use client";

import BreadcrumbComponent from "@/components/breadcrumb";
import ImageGallery from "@/app/(user)/product/components/ImageGallery";
import { Ratings } from "@/components/ui/rating";

import { translationKeys } from "@/utils/locales/en-US/common";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { convertToProductCard } from "@/services/products/services";
import CustomerReviews from "@/components/customer-reviews";
import { PiListHeart } from "react-icons/pi";
import { useEffect, useState } from "react";
// import useAddedCartDialog from "@/hooks/use-added-cart-dialog";
import { formatCurrencyVND } from "@/utils/format-currency";
import { productLocale } from "@/utils/locales/en-US/product";

interface ProductComponentProps {
  productId: string;
}

interface Lessor {
  shopName: string;
  description: string;
}

interface Surcharge {
  name: string;
  priceSurcharge: number;
}

interface ProductDetails {
  productId: string;
  name: string;
  description: string;
  images: string[];
  insuranceImage: string;
  lessor: Lessor;
  surcharge: Surcharge[];
  value: number;
  price: number;
  timeUnit: string;
  location: string;
  maxRentDays: string;
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
  insuranceImage: "/images/banner1.png",
  lessor: {
    shopName: "GearPro Rentals",
    description: "bed frame, white stain/Luröy, 150x200 cm",
  },
  surcharge: [
    {
      name: "Surcharge 1",
      priceSurcharge: 123000,
    },
    {
      name: "Surcharge 2",
      priceSurcharge: 456000,
    },
    {
      name: "Surcharge 3",
      priceSurcharge: 789000,
    },
  ],
  value: 1200000,
  price: 1000000000,
  timeUnit: "Day",
  location: "Ho Chi Minh City",
  maxRentDays: "10 days",
  policies: ["Policy 1: Return within 30 days", "Policy 2: Warranty included"],
};


export default function ProductComponent({ productId }: ProductComponentProps) {
  const [cart, setCart] = useState<ProductDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const currentDate = new Date().toISOString().split("T")[0];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isModalOpen) {
      setStartDate(currentDate);
      setEndDate(currentDate);
    }
  }, [isModalOpen]);

  const handleRentNow = () => {
    setIsModalOpen(false);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

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
                {formatCurrencyVND(productDetails?.value)} / {productDetails?.timeUnit}
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
            <div className="flex items-center gap-x-3 mt-4">
              <p className="text-base font-montserrat">Price: </p>
              <p className="text-gray-500">
                {formatCurrencyVND(productDetails?.price)}
              </p>
            </div>
            <div className="flex items-center gap-x-3 mt-4">
              <p className="text-base font-montserrat">Maximum Rent Days: </p>
              <p className="text-gray-500">{productDetails.maxRentDays}</p>
            </div>
            <div className="mt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="text-blue-500 underline">
                    See surcharge here
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Surcharge Details</AlertDialogTitle>
                    <AlertDialogDescription>
                      Here are the surcharge details for this product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-2 mt-4">
                    {productDetails.surcharge.map((surcharge, index) => (
                      <div key={index} className="flex gap-4">
                        <span className="font-semibold">{surcharge.name}:</span>
                        <span className="text-gray-700">{surcharge.priceSurcharge.toLocaleString()} VND</span>
                      </div>
                    ))}
                  </div>

                  <AlertDialogFooter>
                    <AlertDialogAction>Close</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="mt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="text-blue-500 underline">
                    See insurance here
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Insurance Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Here is the insurance image for this product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex justify-center">
                    <img
                      src={productDetails.insuranceImage}
                      alt="Insurance Image"
                      className="w-full max-w-xl h-auto object-cover cursor-pointer"
                    />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogAction>Close</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
                onClick={() => setIsModalOpen(true)}
              >
                <span className="font-semibold text-white">Rent Now</span>
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

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Choose Start and End Dates</AlertDialogTitle>
            <AlertDialogDescription>
              Please select the start and end dates for the event.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                min={currentDate}
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                min={currentDate}
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsModalOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRentNow}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="border rounded-md p-8 mt-8">
        <CustomerReviews />
      </div>
    </div>
  );
}
