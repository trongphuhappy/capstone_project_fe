import { formatCurrencyVND } from "@/utils/format-currency";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const images: string[] = [
  "https://assets.boconcept.com/d1c7086f-10f1-4516-8fd2-b18201160d6c/2733259_PNG-Web%2072dpi.png?format=pjpg&auto=webp&fit=bounds&width=375&quality=75%2C60",
  "https://assets.boconcept.com/8d5c1aab-cdf7-43e8-867e-b18b00be376f/2676456_PNG-Web%2072dpi.png?format=pjpg&auto=webp&fit=bounds&width=3020&quality=75%2C60",
  "https://assets.boconcept.com/8c02b41e-9ce0-49ba-9bb3-ae32010e5ee2/1504522_PNG-Web%2072dpi.png?format=pjpg&auto=webp&fit=bounds&width=3020&quality=75%2C60",
];

const FurnitureItem: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleSlideChange = () => {
    const swiperInstance = swiperRef.current?.swiper;
    setIsAtStart(swiperInstance?.isBeginning);
    setIsAtEnd(swiperInstance?.isEnd);
  };

  return (
    <div className="max-w-[360px] h-[350px] relative">
      <div className="w-full h-full bg-[#f4f4f4] relative overflow-hidden">
        <div className="absolute w-full z-20 bottom-0 py-4">
          <div className="flex items-center justify-center gap-x-5">
            <button
              type="button"
              onClick={() => swiperRef.current?.swiper?.slidePrev()}
              disabled={isAtStart}
            >
              <ChevronLeft
                strokeWidth={0.75}
                size={23}
                className={`${isAtStart && "cursor-not-allowed opacity-40"}`}
              />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.swiper?.slideNext()}
              disabled={isAtEnd}
            >
              <ChevronRight
                strokeWidth={0.75}
                size={23}
                className={`${isAtEnd && "cursor-not-allowed opacity-40"}`}
              />
            </button>
          </div>
        </div>

        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSlideChange={handleSlideChange}
          className="h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="w-[70%] h-full mx-auto flex items-center justify-center bg-transparent">
                <img
                  src={src}
                  alt={`Furniture ${index + 1}`}
                  className="object-cover block"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="py-1 flex flex-col gap-y-1">
        <h1 className="font-montserrat text-[15px]">Seoul dining chair</h1>
        <span className="font-montserrat text-[13px]">Wood</span>
        <p className="text-[13px]">{formatCurrencyVND(1000000)}</p>
      </div>
    </div>
  );
};

export default FurnitureItem;
