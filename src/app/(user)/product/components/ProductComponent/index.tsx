"use client";

import BreadcrumbComponent from "@/components/breadcrumb";
import { TBreadcrumb } from "@/typings";
import ImageGallery from "@/app/(user)/product/components/ImageGallery";

interface ProductComponentProps {
  productId: string;
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

const images = [
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
  { src: "/images/home-bg1.jpg", caption: "Ảnh 1" },
  { src: "/images/auth02.jpg", caption: "Ảnh 2" },
  { src: "/images/auth03.jpg", caption: "Ảnh 3" },
];

export default function ProductComponent({ productId }: ProductComponentProps) {
  return (
    <div className="mt-2 py-3 px-[50px]">
      <div className="pb-2 border-b-2">
        <BreadcrumbComponent breadcrumbs={breadcrumbs} />
      </div>
      <div className="py-3 flex items-start gap-x-3">
        <div className="w-[55%]">
          <ImageGallery images={images} />
        </div>
        <div className="w-[45%] bg-orange-400">Name</div>
      </div>
    </div>
  );
}
