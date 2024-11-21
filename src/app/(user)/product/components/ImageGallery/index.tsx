import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";

import "swiper/swiper-bundle.css";
import "yet-another-react-lightbox/styles.css";

import styles from "@/app/(user)/product/components/ImageGallery/ImageGallery.module.css";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Image {
  src: string;
  caption?: string;
}

interface GalleryProps {
  images: Image[];
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

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(false);

  const [showMore, setShowMore] = useState(false);
  const maxInitialThumbnails = 3;
  const thumbnailsToShow = showMore ? images : images.slice(0, maxInitialThumbnails);

  const swiperRef = useRef<any>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null); // Reference for thumbnail gallery

  const slides = images?.map((image) => ({
    src: image.src,
    caption: image.caption,
  }));

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.on("slideChange", () => {
        setCurrentIndex(swiperInstance.activeIndex);
        setIsNextDisabled(swiperInstance.isEnd);
        setIsPrevDisabled(swiperInstance.isBeginning);

        // Scroll the thumbnail gallery to keep the active thumbnail visible
        if (thumbnailsRef.current) {
          const thumbnail = thumbnailsRef.current.children[
            swiperInstance.activeIndex
          ] as HTMLElement;
          if (thumbnail) {
            thumbnailsRef.current.scrollTo({
              left:
                thumbnail.offsetLeft -
                thumbnailsRef.current.offsetWidth / 2 +
                thumbnail.offsetWidth / 2,
              behavior: "smooth", // Smooth scroll to the active thumbnail
            });
          }
        }
      });
    }
  }, []);

  const handleNext = () => {
    swiperRef.current?.swiper?.slideNext();
    setCurrentIndex(
      swiperRef.current?.swiper?.activeIndex || images?.length - 1
    );
  };

  const handlePrev = () => {
    swiperRef.current?.swiper?.slidePrev();
    setCurrentIndex(
      swiperRef.current?.swiper?.activeIndex || images?.length - 1
    );
  };

  return (
    <div>
      <div className="mb-4 bg-white relative group">
        <div className="opacity-0 group-hover:opacity-100">
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className={`custom-next-button absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-[20] ${isNextDisabled === true && "opacity-0"
              }`}
          >
            <ButtonCarousel>
              <ChevronRight className="text-white w-5 h-5" strokeWidth={2.5} />
            </ButtonCarousel>
          </button>
          <button
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className={`custom-prev-button absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-[20] ${isPrevDisabled === true && "opacity-0"
              }`}
          >
            <ButtonCarousel>
              <ChevronLeft className="text-white w-5 h-5" strokeWidth={2.5} />
            </ButtonCarousel>
          </button>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          loop={true}
          ref={swiperRef}
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image?.src}
                alt={`Image ${index + 1}`}
                className="cursor-pointer w-full h-auto object-contain"
                style={{ maxHeight: "400px", maxWidth: "100%" }}
                onClick={() => {
                  setIsOpen(true);
                  setCurrentIndex(index);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full pb-2">
        <div className={`flex gap-x-2 overflow-x-auto flex-nowrap ${styles.imageGallery}`}>
          {thumbnailsToShow.map((image, index) => (
            <figure
              key={index}
              className={`border flex-shrink-0 select-none hover:bg-slate-100 hover:border-black ${currentIndex === index ? "bg-slate-200" : ""
                }`}
              style={{
                flexBasis: "calc(100% / 4)",
              }}
              onMouseEnter={() => {
                setCurrentIndex(index);
                if (swiperRef.current) {
                  swiperRef.current.swiper.slideTo(index);
                }
              }}
            >
              <img
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-auto object-cover cursor-pointer p-1"
                onClick={() => {
                  if (swiperRef.current) {
                    swiperRef.current.swiper.slideTo(index);
                    setCurrentIndex(index);
                  }
                }}
              />
            </figure>
          ))}

          {/* button more */}
          {!showMore && images.length > maxInitialThumbnails && (
            <figure
              className="border flex-shrink-0 select-none hover:bg-slate-100"
              style={{
                flexBasis: "calc(100% / 4)",
              }}
            >
              <button
                onClick={() => setShowMore(true)}
                className="w-full h-full flex justify-center items-center border cursor-pointer"
              >
                +{images.length - maxInitialThumbnails} more
              </button>
            </figure>
          )}
        </div>
      </div>


      {isOpen && (
        <Lightbox
          open={isOpen}
          index={currentIndex}
          close={() => setIsOpen(false)}
          slides={slides}
        />
      )}
    </div>
  );
};

export default Gallery;
