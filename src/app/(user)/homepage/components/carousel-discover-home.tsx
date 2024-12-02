"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import styled from "styled-components";
import Link from "next/link";
import { Slide, SlideWorks } from "@/mock/homepage";


const CarouselContainer = styled.div`
  &:hover h3 {
    text-decoration: underline;
  }
`;

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

export default function CarouselDiscoverHome() {
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

  const renderCarousel = (list: Slide[]) => {
    return list.map((item, index) => (
      <SwiperSlide key={index}>
        <CarouselContainer className="w-full cursor-pointer border">
          <Link href="#!">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="block object-cover w-full h-[350px] md:h-[400px]"
            />
            <div
              className="h-[300px] xl:h-[350px] lg:h-[400px] p-[30px] flex flex-col justify-between flex-1"
              style={{ background: item.backgroundContent }}
            >
              <div className="mb-16 flex flex-col gap-y-5">
                <h3 className="text-base lg:text-xl font-montserrat font-bold text-white">
                  {item.title}
                </h3>
                <p className="font-montserrat text-white text-sm lg:text-base">{item.description}</p>
              </div>
              <div className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-[#000]">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="1.5rem"
                    height="1.5rem"
                    className={
                      item.backgroundButton === "#ffffff"
                        ? "text-[#000000]"
                        : "text-[#ffffff]"
                    }
                  >
                    <path
                      fillRule="evenodd"
                      d="m20.0008 12.0001-8-8.001-1.4143 1.414L16.1727 11H4v2h12.1723l-5.5868 5.5866 1.4141 1.4142 8.0012-8.0007z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </CarouselContainer>
      </SwiperSlide>
    ));
  };

  return (
    <div className="flex items-start justify-between relative group">
      <div className="opacity-0 group-hover:opacity-100">
        <button
          onClick={() => swiperRef.current?.swiper?.slideNext()}
          disabled={isNextDisabled}
          className={`custom-next-button absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-[20] ${
            isNextDisabled === true && "opacity-0"
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
            isPrevDisabled === true && "opacity-0"
          }`}
        >
          <ButtonCarousel>
            <ChevronLeft className="text-white w-5 h-5" strokeWidth={2.5} />
          </ButtonCarousel>
        </button>
      </div>

      <Swiper
        modules={[Navigation, Scrollbar]}
        slidesPerView={SlideWorks.length < 3 ? SlideWorks.length : 3}
        spaceBetween={30}
        ref={swiperRef}
        breakpoints={{
          1024: {
            slidesPerView: SlideWorks.length < 3 ? SlideWorks.length : 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2, 
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1, 
            spaceBetween: 10,
          },
        }}
      >
        {renderCarousel(SlideWorks)}
      </Swiper>
    </div>
  );
}
