"use client";

import BreadcrumbComponent from "@/components/breadcrumb";
import ImageGallery from "@/app/(user)/product/components/ImageGallery";
import CustomerReviews from "@/components/customer-reviews";
import { PiListHeart } from "react-icons/pi";
import { useEffect, useState } from "react";
import { formatCurrencyVND } from "@/utils/format-currency";
import useGetProductDetail from "@/app/(user)/product/hooks/useGetProduct";
import { useAppSelector } from "@/stores/store";
import Surcharge from "@/app/(user)/product/components/ProductComponent/surcharge";
import Insurance from "@/app/(user)/product/components/ProductComponent/insurance";
import Detail from "@/app/(user)/product/components/ProductComponent/detail";
import useRentDialog from "@/hooks/use-rent-dialog";

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
  const userState = useAppSelector((state) => state.userSlice);
  const { getProductDetail, isPending } = useGetProductDetail();
  const { onOpenRentProductDialog } = useRentDialog();

  const [product, setProduct] = useState<API.TProduct | null>(null);

  const handleAddToCart = () => {};

  const handleFetchProduct = async () => {
    const res = await getProductDetail({
      Id: productId,
      AccountId: userState.profile?.userId,
    });
    if (res) {
      setProduct(res.value.data || null);
    }
  };

  const handleRentNow = () => {
    if (product) onOpenRentProductDialog(product);
  };

  useEffect(() => {
    handleFetchProduct();
  }, [productId]);

  return (
    <div className="mt-2 py-3 px-[50px] font-montserrat">
      {isPending === false && product && (
        <div>
          <div className="pb-2 border-b-2">
            <BreadcrumbComponent breadcrumbs={breadcrumbs} />
          </div>
          <div className="py-3 flex items-start gap-10">
            <div className="w-[50%]">
              <ImageGallery
                images={product.productImagesUrl.map((src) => ({ src }))}
              />
            </div>

            {/* Detail product */}
            <div className="w-[50%]">
              <div className="pb-4">
                <h1 className="font-semibold text-[#111111] text-2xl uppercase">
                  {product?.name}
                </h1>
                <div className="mt-4 flex items-baseline">
                  <p className="text-4xl text-black font-semibold">
                    {formatCurrencyVND(product?.price || 0)} / Day
                  </p>
                </div>
                <hr className="mt-4" />
                <div className="flex items-center gap-x-3 mt-4">
                  <p className="text-base font-montserrat">Category: </p>
                  <p className="text-gray-500">
                    {product?.category?.categoryName}
                  </p>
                </div>
                <div className="flex items-center gap-x-3 mt-4">
                  <p className="text-base font-montserrat">Lessor: </p>
                  <p className="text-gray-500">{product?.lessor.shopName}</p>
                </div>
                <div className="flex items-center gap-x-3 mt-4">
                  <p className="text-base font-montserrat">Location: </p>
                  <p className="text-gray-500">
                    {product?.lessor.wareHouseAddress}
                  </p>
                </div>
                {product?.value && (
                  <div className="flex items-center gap-x-3 mt-4">
                    <p className="text-base font-montserrat">
                      Purchase price:{" "}
                    </p>
                    <p className="text-gray-500">
                      {formatCurrencyVND(product?.value)}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-x-3 mt-4">
                  <p className="text-base font-montserrat">
                    Maximum Rent Days:{" "}
                  </p>
                  <p className="text-gray-500">
                    {product?.maximumRentDays}{" "}
                    {product && product?.maximumRentDays > 1 ? "Days" : "Day"}
                  </p>
                </div>
                <div className="mt-4">
                  <Surcharge surcharges={product?.surcharges || []} />
                </div>

                {product?.insurance != null && (
                  <div className="mt-4">
                    <Insurance insurance={product?.insurance} />
                  </div>
                )}
              </div>
              <hr className="mb-4" />
              {/* if the product does not belong to the lessor*/}
              {product?.isProductBelongsToUser === false ? (
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

                    {product?.statusType === 1 ? (
                      <button
                        type="button"
                        onClick={handleRentNow}
                        className="w-full h-[56px] px-[12px] border border-[#0056a3] bg-[#0056a3] rounded-3xl hover:opacity-90"
                      >
                        <span className="font-semibold text-white">
                          Rent Now
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-full h-[56px] px-[12px] border border-[#0056a3] bg-[#0056a3] rounded-3xl hover:opacity-90 opacity-50"
                      >
                        <span className="font-semibold text-white">
                          This product is currently rented
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-full h-[56px] px-[12px] border border-[#0056a3] bg-[#0056a3] rounded-3xl hover:opacity-90"
                >
                  <span className="font-semibold text-white">Edit</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 flex-6 w-6/12">
            <Detail
              description={product?.description || ""}
              policies={product?.policies || ""}
            />
          </div>
        </div>
      )}

      <div className="border rounded-md p-8 mt-8">
        <CustomerReviews />
      </div>
    </div>
  );
}
