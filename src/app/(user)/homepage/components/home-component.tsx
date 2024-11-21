"use client";

import HomeBanner from "@/components/home-banner";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import ListCartItem from "./list-cart-item";
import { useEffect } from "react";
import useProductView from "../hooks/useProductView";
import { useRouter } from "next/navigation";
import FurnitureItem from "@/components/furniture-item";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const mockFurnitures = [
  {
    productId: "1",
    name: "Sofa Set",
    description: "Comfortable sofa set for living room.",
    images: ["/images/Furniture1.webp", "/images/Furniture2.webp", "/images/Furniture3.webp", "/images/Furniture4.webp", "/images/Furniture5.webp"],
    lessor: { shopName: "Furniture Shop", description: "Best furniture for your home" },
    price: 199.99,
    timeUnit: "month",
    location: "Hanoi",
    policies: ["Free shipping", "30-day return"]
  },
  {
    productId: "2",
    name: "Dining Table",
    description: "Stylish dining table for your kitchen.",
    images: ["/images/Dinning-table1.webp", "/images/Dinning-table2.webp", "/images/Dinning-table3.webp", "/images/Dinning-table4.webp", "/images/Dinning-table5.webp"],
    lessor: { shopName: "Furniture Shop", description: "Best furniture for your home" },
    price: 150.99,
    timeUnit: "month",
    location: "Hanoi",
    policies: ["Free shipping", "30-day return"]
  },
  {
    productId: "3",
    name: "Natural Wood Office Desk",
    description: "An office desk with a natural wood surface, simple yet elegant design, suitable for any work environment.",
    images: ["/images/office-desk1.jpg", "/images/office-desk2.jpg", "/images/office-desk3.jpg", "/images/office-desk4.jpg", "/images/office-desk5.jpg"],
    lessor: { shopName: "Furniture Shop", description: "Best furniture for your home" },
    price: 150.99,
    timeUnit: "month",
    location: "Hanoi",
    policies: ["Free shipping", "30-day return"]
  },
  {
    productId: "4",
    name: "Premium Wooden Bed",
    description: "A bed made from premium wood, offering durability and comfort. Ideal for a luxurious bedroom.",
    images: ["/images/wood-bed1.webp", "/images/wood-bed2.webp", "/images/wood-bed3.webp", "/images/wood-bed4.webp", "/images/wood-bed5.webp"],
    lessor: { shopName: "Furniture Shop", description: "Best furniture for your home" },
    price: 150.99,
    timeUnit: "month",
    location: "Hanoi",
    policies: ["Free shipping", "30-day return"]
  },
  {
    productId: "5",
    name: "Industrial Wood TV Stand",
    description: "A TV stand with a sleek, industrial design made from high-quality wood, adding elegance to your living room.",
    images: ["/images/TV-stand1.webp", "/images/TV-stand2.webp", "/images/TV-stand3.webp", "/images/TV-stand4.webp", "/images/TV-stand5.webp"],
    lessor: { shopName: "Furniture Shop", description: "Best furniture for your home" },
    price: 150.99,
    timeUnit: "month",
    location: "Hanoi",
    policies: ["Free shipping", "30-day return"]
  },

];

const mockCars = [
  {
    productId: "1",
    name: "Lamborghini Aventador",
    description: "Perfect car for long road trips.",
    images: ["/images/car.png", "/images/lamborghini3.jpg"],
    lessor: { shopName: "Car Rental Shop", description: "Reliable car rentals" },
    price: 250,
    timeUnit: "day",
    location: "Hanoi",
    policies: ["Unlimited mileage", "Free cancellation"]
  },
  {
    productId: "2",
    name: "Premium 7-Seater SUV",
    description: "A spacious SUV perfect for families and long trips. With 7 seats and high ground clearance, it provides both luxury and utility, ideal for both city roads and rough terrains.",
    images: ["/images/suv1.jpg", "/images/suv2.jpg", "/images/suv3.jpg", "/images/suv4.jpg", "/images/suv5.jpg"],
    lessor: { shopName: "Car Rental Shop", description: "Reliable car rentals" },
    price: 180,
    timeUnit: "day",
    location: "Hanoi",
    policies: ["Unlimited mileage", "Free cancellation"]
  },
  {
    productId: "3",
    name: "Luxury Sedan",
    description: "A sleek and stylish sedan designed for comfort and elegance. It offers a smooth ride with advanced safety features, ideal for business trips or family outings.",
    images: ["/images/sedan1.jpg", "/images/sedan2.jpg", "/images/sedan3.jpg", "/images/sedan4.jpg", "/images/sedan5.jpg"],
    lessor: { shopName: "Car Rental Shop", description: "Reliable car rentals" },
    price: 180,
    timeUnit: "day",
    location: "Hanoi",
    policies: ["Unlimited mileage", "Free cancellation"]
  },
  {
    productId: "4",
    name: "Norton Dominator",
    description: "Comfortable sedan for city drives.",
    images: ["/images/motorcycle1.jpg", "/images/motorcycle2.jpg", "/images/motorcycle3.jpg", "/images/motorcycle4.webp", "/images/motorcycle5.jpg"],
    lessor: { shopName: "Car Rental Shop", description: "Reliable car rentals" },
    price: 180,
    timeUnit: "day",
    location: "Hanoi",
    policies: ["Unlimited mileage", "Free cancellation"]
  },
  {
    productId: "5",
    name: "Lamborghini",
    description: "Comfortable sedan for city drives.",
    images: ["/images/lamborghini1.jpg", "/images/lamborghini2.webp"],
    lessor: { shopName: "Car Rental Shop", description: "Reliable car rentals" },
    price: 180,
    timeUnit: "day",
    location: "Hanoi",
    policies: ["Unlimited mileage", "Free cancellation"]
  },
];

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
          <div className="bg-[url('/images/home-bg.jpg')] bg-cover bg-no-repeat bg-bottom w-full h-[60vh] shadow-md flex items-center justify-center relative p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <motion.div
              ref={ref3}
              initial="hidden"
              animate={inView3 ? "visible" : "hidden"}
              variants={sectionVariants}
              transition={{ duration: 0.7 }}
              className="relative z-10 w-full"
            >
              <div className="flex justify-center w-full p-20 ml-0">
                <div className="w-[700px] text-center flex flex-col gap-y-3 items-center">
                  <h1 className="text-white text-3xl font-bold font-montserrat">
                    Convenient Furniture Rental
                  </h1>
                  <p className="font-montserrat text-white text-base">
                    Furniture rental services offer cost savings, flexibility in
                    style changes, and optimization of living and working
                    spaces.
                  </p>
                  <button
                    type="button"
                    className="inline-flex w-max items-center justify-center gap-x-2 bg-gray-50 h-10 px-5 rounded-md hover:bg-gray-200"
                    onClick={handleFurnitureViewmore}
                  >
                    <span className="text-[15px] font-montserrat text-black font-normal">
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
              <h2 className="text-[25px] font-bold font-montserrat mb-[5px]">
                Furniture
              </h2>
              {mockFurnitures.length > 0 && (
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
                {mockFurnitures.length > 0 ? (
                  <ListCartItem products={mockFurnitures} />
                ) : (
                  <h2>No furniture</h2>
                )}
              </div>
            </div>
          </motion.div>
        </section>
        <section className="py-4">
          <div className="bg-[url('/images/home-bg1.jpg')] bg-cover bg-no-repeat bg-center w-full h-[60vh] shadow-md flex flex-col items-start justify-center relative p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <motion.div
              ref={ref5}
              initial="hidden"
              animate={inView5 ? "visible" : "hidden"}
              variants={sectionVariants}
              transition={{ duration: 0.7 }}
              className="relative z-10 w-full"
            >
              <div className="flex justify-center w-full p-20 ml-0">
                <div className="w-[700px] text-center flex flex-col gap-y-3 items-center">
                  <h1 className="text-white text-3xl font-bold font-montserrat">
                    Explore with a Car, Share Memories
                  </h1>
                  <p className="font-montserrat text-white text-base">
                    Rent a car and embark on unforgettable journeys with your
                    loved ones, discovering new places and creating lasting
                    memories together.
                  </p>
                  <button
                    type="button"
                    className="inline-flex w-max items-center justify-center gap-x-2 bg-gray-50 h-10 px-5 rounded-md hover:bg-gray-200"
                    onClick={handleCarViewmore}
                  >
                    <span className="text-[15px] font-montserrat text-black font-normal">
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
              <h2 className="text-[25px] font-bold font-montserrat mb-[5px]">
                Vehicle
              </h2>
              {mockCars.length > 0 && (
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
                {mockCars.length > 0 ? (
                  <ListCartItem products={mockCars} />
                ) : (
                  <h2>No vehicles</h2>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
