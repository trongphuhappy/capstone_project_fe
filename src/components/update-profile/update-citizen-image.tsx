"use client";

import { Input } from "@/components/ui/input";
import useToast from "@/hooks/use-toast";
import { Camera } from "lucide-react";
import { ChangeEvent, DragEvent, useEffect } from "react";
import CarouselImage from "@/app/(user)/create-product/components/carousel-image";

interface UpdateCitizenImageProps {
  content: string;
  fileList: { file: File; previewUrl: string }[];
  setFileList: React.Dispatch<
    React.SetStateAction<{ file: File; previewUrl: string }[]>
  >;
}

export default function UpdateCitizenImage({
  fileList,
  setFileList,
  content,
}: UpdateCitizenImageProps) {
  const { addToast } = useToast();

  // Upload image
  useEffect(() => {
    return () => {
      fileList.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [fileList]);

  const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (fileList?.length >= 1) {
      return addToast({
        type: "error",
        description: "You can only upload up to 1 images",
        duration: 3000,
      });
    }

    const newFiles = event.target.files;
    if (!newFiles) return;

    const newFileList = Array.from(newFiles).map((file) => {
      const fileType = file.type;
      if (!fileType.startsWith("image/")) {
        addToast(
          {
            type: "error",
            description: "Please upload an image file",
            duration: 3000,
          },
          true
        );
        return null;
      }
      return {
        file,
        previewUrl: URL.createObjectURL(file),
      };
    });

    const validFiles = newFileList.filter((file) => file !== null);
    setFileList((prev) => [...prev, ...validFiles]);
  };

  const handleDeleteImage = (previewUrl: string) => {
    setFileList((prev) =>
      prev.filter((item) => item.previewUrl !== previewUrl)
    );
  };

  return (
    <div className="w-full flex flex-col gap-y-4 font-montserrat">
      <div className="relative border-2 border-dashed h-[150px] rounded-md border-gray-500 hover:border-gray-800 transition-all group overflow-hidden">
        <Input
          onDragEnter={onDragEnter}
          onChange={onFileChange}
          type="file"
          className="absolute w-full h-full opacity-0 z-20 cursor-pointer"
          title=""
          multiple
        />
        <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-full flex flex-col items-center justify-center gap-y-2">
            <figure className="px-16 py-4">
              <div className="flex flex-col items-center gap-y-1 w-max">
                <Camera className="w-[50px] h-[50px] text-[#00939f]" />
                <span className="text-base font-semibold text-[#00939f]">
                  {content}
                </span>
              </div>
            </figure>
          </div>
        </div>
      </div>
      <div>
        <CarouselImage
          otherImages={fileList?.map((item) => item.previewUrl)}
          handleDeleteImage={handleDeleteImage}
        />
      </div>
    </div>
  );
}
