"use client";

import { getCroppedImg } from "@/utils/CropImage/CropImage";
import { Save, SquareX } from "lucide-react";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

interface CropImageCoverProps {
  image?: string | null;
  onCancel: () => void;
  onSubmit?: (image: string) => void;
}

export default function CropImageCover({
  image,
  onCancel,
  onSubmit,
}: CropImageCoverProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (newCrop: { x: number; y: number }) => {
    setCrop(newCrop);
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSubmit = async () => {
    if (croppedAreaPixels && image && onSubmit) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onSubmit(croppedImage);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      {image && (
        <div className="relative w-full h-[300px] overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1425 / 300}
            cropShape="rect"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={false}
            restrictPosition={true}
            zoomWithScroll={false}
            objectFit="horizontal-cover"
          />
        </div>
      )}

      {image && (
        <div className="absolute bottom-[5%] right-[2%] z-40 flex gap-x-2">
          <button
            className="px-3 py-2 bg-white rounded-xl hover:bg-blue-500 shadow-header-shadown group"
            onClick={handleCancel}
          >
            <div className="flex items-center gap-x-3">
              <i>
                <SquareX className="text-black w-5 h-5 group-hover:text-gray-200" />
              </i>
              <span className="text-base font-medium group-hover:text-gray-200">
                Cancel
              </span>
            </div>
          </button>
          <button
            className="px-3 py-2 bg-white rounded-xl hover:bg-blue-500 shadow-header-shadown group"
            onClick={handleSubmit}
          >
            <div className="flex items-center gap-x-3">
              <i>
                <Save className="text-black w-5 h-5 group-hover:text-gray-200" />
              </i>
              <span className="text-base font-medium group-hover:text-gray-200">
                Save
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
