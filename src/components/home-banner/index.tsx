"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const BannerImages = [
  {
    image: "/images/banner1.png",
  },
  {
    image: "/images/banner2.png",
  },
  {
    image: "/images/banner3.png",
  },
  {
    image: "/images/banner4.png",
  },
];

export default function HomeBanner() {
  return (
    <div className="banner-wrapper relative">
      <div className="banner-container w-full">
        <Swiper
          spaceBetween={1}
          effect={"fade"}
          navigation={false}
          pagination={{
            clickable: false,
          }}
          autoplay={{
            delay: 3000,
          }}
          modules={[EffectFade, Autoplay]}
          className="mySwiper"
        >
          {BannerImages.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.image}
                alt={`Banner ${index + 1}`}
                className="image-banner w-full h-[800px] object-cover select-none"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="absolute left-[100px] top-1/3 z-[20]">
        <div className="w-[812px] flex flex-col gap-y-[17px]">
          <h2 className="font-montserrat text-[40px] text-white font-bold">
            Borrow Joy, Be Neighborly <br /> Instant Rentals, Seamless
            Connections
          </h2>
          <div className="flex items-center">
            <div className="flex flex-col">
              <span className="font-poppins text-[32px] text-white font-medium">
                50+
              </span>
              <span className="font-poppins text-[18px] text-white font-medium">
                Species
              </span>
            </div>
            <div className="w-16 h-[1px] bg-white rotate-90 rounded-xl"></div>
            <div className="flex flex-col">
              <span className="font-poppins text-[32px] text-white font-medium">
                100+
              </span>
              <span className="font-poppins text-[18px] text-white font-medium">
                Users
              </span>
            </div>
          </div>
          <div className="flex items-stretch">
            <div className="bg-white rounded-l-sm py-4 pl-7 w-[50%] flex h-full">
              <input
                type="text"
                placeholder="Search"
                className="outline-none border-none w-full pr-2"
              />
            </div>
            <div className="px-[21px] py-5 h-full bg-[#3B8D8A] flex items-center rounded-r-sm">
              <span>
                <img src="/images/search.svg" alt="search" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
