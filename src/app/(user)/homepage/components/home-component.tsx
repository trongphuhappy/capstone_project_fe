"use client";

import HomeBanner from "@/components/home-banner";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import ListCartItem from "./list-cart-item";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useGetProducts from "@/hooks/use-get-products";
import { useEffect, useState } from "react";
import { confirmStatus } from "@/const/products";

const CarouselDiscoverHome = dynamic(
  () => import("@/app/(user)/homepage/components/carousel-discover-home"),
  {
    ssr: false,
  }
);

export default function HomeComponent() {
  const router = useRouter();

  const handleCarViewmore = () => {
    location.href = "/products?category=vehicles&page=1";
  };

  const handleFurnitureViewmore = () => {
    location.href = "/products?category=furnitures&page=1";
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.2 });

  const { getProductsApi, isPending } = useGetProducts();
  const [furnitures, setFurnitures] = useState<API.TProduct[]>([]);
  const [cars, setCars] = useState<API.TProduct[]>([]);

  const handleFetchFurnitureProducts = async () => {
    const response = await getProductsApi({
      confirmStatus: confirmStatus.Approved,
      statusType: 1,
      pageIndex: 1,
      pageSize: 5,
      isVehicle: false,
    });
    if (response) {
      setFurnitures(response.value.data.items);
    }
  };

  const handleFetchCarProducts = async () => {
    const response = await getProductsApi({
      confirmStatus: confirmStatus.Approved,
      statusType: 1,
      pageIndex: 1,
      pageSize: 5,
      isVehicle: true,
    });
    if (response) {
      setCars(response.value.data.items);
    }
  };

  useEffect(() => {
    if (furnitures?.length === 0) handleFetchFurnitureProducts();
    if (cars?.length === 0) handleFetchCarProducts();
  }, []);

  return (
    <div>
      <motion.div
        ref={ref1}
        initial="hidden"
        animate={inView1 ? "visible" : "hidden"}
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
      >
        <HomeBanner />
      </motion.div>
      <main className="px-[50px] mx-auto mt-10 py-8 flex flex-col gap-y-14">
        <section>
          <motion.div
            ref={ref2}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            variants={sectionVariants}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-[28px] font-bold font-montserrat mb-[5px]">
              Discover
            </h2>
            <div className="py-[20px]">
              <CarouselDiscoverHome />
            </div>
          </motion.div>
        </section>
        <section>
          <div className="bg-[url('/images/home-bg.jpg')] bg-cover bg-no-repeat bg-bottom w-full md:h-[60vh] h-[75vh] shadow-md flex items-center justify-center relative p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <motion.div
              ref={ref3}
              initial="hidden"
              animate={inView3 ? "visible" : "hidden"}
              variants={sectionVariants}
              transition={{ duration: 0.7 }}
              className="relative z-10 w-full"
            >
              <div className="flex justify-center w-full md:p-20 p-5 ml-0">
                <div className="w-[700px] text-center flex flex-col gap-y-3 items-center">
                  <h1 className="text-white md:text-3xl text-lg font-bold font-montserrat">
                    Convenient Furniture Rental
                  </h1>
                  <p className="font-montserrat text-white md:text-base text-sm">
                    Furniture rental services offer cost savings, flexibility in
                    style changes, and optimization of living and working
                    spaces.
                  </p>
                  <button
                    type="button"
                    className="inline-flex w-max items-center justify-center gap-x-2 bg-gray-50 h-10 px-5 rounded-md hover:bg-gray-200"
                    onClick={handleFurnitureViewmore}
                  >
                    <span className="text-[12px] md:text-[15px] font-montserrat text-black font-normal">
                      Explore
                    </span>
                    <div className="w-4 h-4 relative rounded-full border border-black">
                      <ChevronRight className="text-black w-3 h-3 block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            ref={ref4}
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
            variants={sectionVariants}
            transition={{ duration: 1 }}
            className="mt-3 py-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="md:text-[25px] text-[16px] font-bold font-montserrat mb-[5px]">
                Furniture
              </h2>
              {furnitures?.length > 0 && (
                <button
                  type="button"
                  className="h-10 px-2 rounded-lg border border-gray-500"
                  onClick={handleFurnitureViewmore}
                >
                  <span className="text-black font-montserrat">View all</span>
                </button>
              )}
            </div>
            <div className="mt-5">
              <div>
                {furnitures.length > 0 ? (
                  <ListCartItem products={furnitures} />
                ) : (
                  <h2 className="md:text-base text-sm">No furniture</h2>
                )}
              </div>
            </div>
          </motion.div>
        </section>
        <section className="py-4">
          <div className="bg-[url('/images/home-bg1.jpg')] bg-cover bg-no-repeat bg-center w-full lg:h-[60vh] md:h-[90vh] h-[85vh] shadow-md flex flex-col items-start justify-center relative p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <motion.div
              ref={ref5}
              initial="hidden"
              animate={inView5 ? "visible" : "hidden"}
              variants={sectionVariants}
              transition={{ duration: 0.7 }}
              className="relative z-10 w-full"
            >
              <div className="flex justify-center w-full md:p-20 p-5 ml-0">
                <div className="w-[700px] text-center flex flex-col gap-y-3 items-center">
                  <h1 className="text-white md:text-3xl text-lg font-bold font-montserrat">
                    Explore with a Car, Share Memories
                  </h1>
                  <p className="font-montserrat text-white md:text-base text-sm">
                    Rent a car and embark on unforgettable journeys with your
                    loved ones, discovering new places and creating lasting
                    memories together.
                  </p>
                  <button
                    type="button"
                    className="inline-flex w-max items-center justify-center gap-x-2 bg-gray-50 h-10 px-5 rounded-md hover:bg-gray-200"
                    onClick={handleCarViewmore}
                  >
                    <span className="text-[12px] md:text-[15px] font-montserrat text-black font-normal">
                      Explore
                    </span>
                    <div className="w-4 h-4 relative rounded-full border border-black">
                      <ChevronRight className="text-black w-3 h-3 block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            ref={ref6}
            initial="hidden"
            animate={inView6 ? "visible" : "hidden"}
            variants={sectionVariants}
            transition={{ duration: 2 }}
            className="mt-3 py-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="md:text-[25px] text-[16px] font-bold font-montserrat mb-[5px]">
                Vehicle
              </h2>
              {cars?.length > 0 && (
                <button
                  type="button"
                  className="h-10 px-2 rounded-lg border border-gray-500"
                  onClick={handleCarViewmore}
                >
                  <span className="text-black font-montserrat">View all</span>
                </button>
              )}
            </div>
            <div className="mt-5">
              <div>
                {cars?.length > 0 ? (
                  <ListCartItem products={cars} />
                ) : (
                  <h2 className="md:text-base text-sm">No products available yet</h2>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
