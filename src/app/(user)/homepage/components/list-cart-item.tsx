import CartProductItem from "@/components/card-product-item";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

interface Lessor {
  shopName: string;
  description: string;
}

interface ListCartItemProps {
  products: API.TProduct[];
}

const ButtonCarousel = styled.div`
  background-color: black;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d1d1d;
  }

  &.disabled {
    background-color: #555;
    cursor: not-allowed;

    svg {
      opacity: 0.5;
    }
  }
`;

export default function ListCartItem({ products }: ListCartItemProps) {
  const swiperRef = useRef<any>(null);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.on("slideChange", () => {
        setIsNextDisabled(swiperInstance.isEnd);
        setIsPrevDisabled(swiperInstance.isBeginning);
      });
    }
  }, []);

  const renderCarousel = (list: API.TProduct[]) => {
    return list?.map((item, index) => (
      <SwiperSlide
        key={index}
        style={{
          marginRight: index === list.length - 1 ? "0" : "25px",
        }}
      >
        <CartProductItem product={item} />
      </SwiperSlide>
    ));
  };

  return (
    <div className="relative">
      <div className="opacity-0 group-hover:opacity-100">
        <button
          onClick={() => swiperRef.current?.swiper?.slideNext()}
          disabled={isNextDisabled}
          className={`custom-next-button absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-[20] ${
            isNextDisabled && "opacity-0"
          }`}
        >
          <ButtonCarousel>
            <ChevronRight className="text-white w-5 h-5" strokeWidth={2.5} />
          </ButtonCarousel>
        </button>
        <button
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
          disabled={isPrevDisabled}
          className={`custom-prev-button absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-[20] ${
            isPrevDisabled && "opacity-0"
          }`}
        >
          <ButtonCarousel>
            <ChevronLeft className="text-white w-5 h-5" strokeWidth={2.5} />
          </ButtonCarousel>
        </button>
      </div>

      <Swiper
        slidesPerView={products?.length < 5 ? products?.length : 5}
        spaceBetween={products?.length < 5 ? 10 : 20}
        loop={false}
        ref={swiperRef}
      >
        {renderCarousel(products)}
      </Swiper>
    </div>
  );
}
