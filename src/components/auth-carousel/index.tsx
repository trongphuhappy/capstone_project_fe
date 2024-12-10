"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function AuthCarousel() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2500,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="absolute w-full h-[100vh]">
            <Image
              src={"/images/auth.jpg"}
              alt="Authen01"
              layout="fill"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <p className="font-montserrat text-2xl leading-normal text-gray-50 text-center font-montserrat_alternates">
                Luxury without ownership
                <br />
                Just the experience.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="absolute w-full h-[100vh]">
            <Image
              src={"/images/auth01.jpg"}
              alt="Authen02"
              layout="fill"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <p className="font-montserrat text-2xl leading-normal text-gray-50 text-center font-montserrat_alternates">
                Elegant in every detail
                <br />
                Simple yet sophisticated
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="absolute w-full h-[100vh]">
            <Image
              src={"/images/auth02.jpg"}
              alt="Authen03"
              layout="fill"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <p className="font-montserrat text-2xl leading-normal text-gray-50 text-center font-montserrat_alternates">
                Enjoy the journey
                <br />
                Forget the worry of ownership.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="relative w-full h-[100vh]">
            <Image
              src={"/images/auth03.jpg"}
              alt="Authen04"
              layout="fill"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <p className="font-montserrat text-2xl leading-normal text-gray-50 text-center font-montserrat_alternates">
                No need to own.
                <br />
                Freedom to experience
              </p>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
