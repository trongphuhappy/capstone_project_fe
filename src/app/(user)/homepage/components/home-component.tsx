"use client";

import CartProductItem from "@/components/cart-product-item-v1";
import HomeBanner from "@/components/home-banner";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const CarouselDiscoverHome = dynamic(
  () => import("@/app/(user)/homepage/components/carousel-discover-home"),
  {
    ssr: false,
  }
);

export default function HomeComponent() {
  return (
    <div>
      <HomeBanner />
      <main className="px-[50px] mx-auto mt-10 py-8 flex flex-col gap-y-14">
        <section>
          <h2 className="text-[28px] font-bold font-montserrat mb-[5px]">
            Discover
          </h2>
          <div className="py-[20px]">
            <CarouselDiscoverHome />
          </div>
        </section>
        <section>
          <div className="bg-[url('/images/home-bg.jpg')] bg-cover bg-no-repeat bg-bottom w-full h-[60vh] shadow-md flex flex-col items-start justify-center relative p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 w-full p-20 ml-0">
              <div className="flex justify-center">
                <div className="w-[700px] text-center flex flex-col gap-y-3 items-center">
                  <h1 className="text-white text-3xl font-bold font-montserrat">
                    Convenient Furniture Rental
                  </h1>
                  <p className="font-montserrat text-white text-base">
                    Furniture rental services offer cost savings, flexibility in
                    style changes, and optimization of living and working
                    spaces.
                  </p>
                  <button className="inline-flex w-max items-center justify-center gap-x-2 bg-gray-50 h-10 px-5 rounded-md hover:bg-gray-200">
                    <span className="text-[15px] font-montserrat text-black font-normal">
                      Explore
                    </span>
                    <div className="w-4 h-4 relative rounded-full border border-black">
                      <ChevronRight className="text-black w-3 h-3 block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 py-5">
            <h2 className="text-[28px] font-bold font-montserrat mb-[5px]">
              Furniture
            </h2>
            <div className="mt-5">
              <div className="flex">
                <CartProductItem />
              </div>
            </div>
          </div>
        </section>
        <section className="py-4">
          <div className="bg-[url('/images/home-bg1.jpg')] bg-cover bg-no-repeat bg-center w-full h-[60vh] shadow-md flex flex-col items-start justify-center relative p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 w-full p-20 ml-0">
              <div className="flex justify-center">
                <div className="w-[700px] text-center flex flex-col gap-y-3 items-center">
                  <h1 className="text-white text-3xl font-bold font-montserrat">
                    Explore with a Car, Share Memories
                  </h1>
                  <p className="font-montserrat text-white text-base">
                    Rent a car and embark on unforgettable journeys with your
                    loved ones, discovering new places and creating lasting
                    memories together.
                  </p>
                  <button className="inline-flex w-max items-center justify-center gap-x-2 bg-gray-50 h-10 px-5 rounded-md hover:bg-gray-200">
                    <span className="text-[15px] font-montserrat text-black font-normal">
                      Explore
                    </span>
                    <div className="w-4 h-4 relative rounded-full border border-black">
                      <ChevronRight className="text-black w-3 h-3 block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}