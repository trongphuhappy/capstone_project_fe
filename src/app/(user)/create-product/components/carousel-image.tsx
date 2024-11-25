"use client";

import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface CarouselStaffCat {
  otherImages: string[];
  handleDeleteImage: (previewUrl: string) => void;
}

export default function CarouselImage({
  otherImages,
  handleDeleteImage,
}: CarouselStaffCat) {
  return (
    <div>
      {otherImages?.length > 0 && (
        <div className="relative overflow-x-auto whitespace-nowrap">
          <div>
            {otherImages.map((image) => (
              <div
                key={image}
                className="inline-block md:basis-1/3 lg:basis-1/4 p-1"
              >
                <Card>
                  <CardContent className="relative w-full p-1 transition-transform transform hover:scale-105">
                    <img
                      src={image}
                      alt={`Other image`}
                      className="h-20 w-20 object-cover rounded-lg cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-[5px] right-2"
                    >
                      <span>
                        <X className="text-gray-100 w-5 h-5 bg-slate-400 rounded-md" />
                      </span>
                    </button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
