"use client";

import { useAppSelector } from "@/stores/store";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import CropImageCover from "@/components/update-cover-photo/crop-image-cover";
import { convertBase64ToFile } from "@/utils/Convert/ConvertBase64ToFile";

export default function UpdateCoverPhoto() {
  const userState = useAppSelector((state) => state.userSlice.profile);
  const [coverPhotoSrc, setCoverPhotoSrc] = useState<any>(null);
  const [isCancelCoverPhoto, setIsCancelCoverPhoto] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleUploadImage = (e: any) => {
    setIsCancelCoverPhoto(false);
    const newFile = e.target.files[0];
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];

    // if (!allowedTypes.includes(newFile?.type)) {
    //   return Toast({
    //     err: 1,
    //     mess: "Please choose image have format JPG, JPEG, PNG",
    //   });
    // }

    const reader = new FileReader();
    reader.onload = () => {
      setCoverPhotoSrc(reader.result as string);
    };
    reader.readAsDataURL(newFile);
  };

  const handleCancelSaveCoverPhoto = () => {
    setCoverPhotoSrc(null);
  };

  const handleCloseUpdateCoverPhoto = () => {
    handleCancelSaveCoverPhoto();
  };

  const handleSubmit = async (base64UrlImage: any) => {
    const fullFileCoverPhoto = await convertBase64ToFile(
      coverPhotoSrc,
      `fullFile_coverphoto_${userState?.userId}.jpg`
    );

    const cropFileCoverPhoto = await convertBase64ToFile(
      base64UrlImage,
      `crop_coverphoto_${userState?.userId}.jpg`
    );
  };

  return (
    <div className="w-full">
      <figure className="w-full h-[300px] overflow-hidden rounded-lg">
        {coverPhotoSrc === null ? (
          <div>
            <img
              src={"/images/auth.jpg"}
              alt="Thumnail"
              className="w-full h-[300px] object-cover"
            />
          </div>
        ) : (
          <div>
            <CropImageCover
              image={coverPhotoSrc}
              onCancel={handleCancelSaveCoverPhoto}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </figure>
      <div className="absolute bottom-[5%] right-[2%] z-40 hover group">
        <input
          className="absolute inset-0 w-full h-full opacity-0"
          type="file"
          ref={fileInputRef}
          title=""
          onChange={handleUploadImage}
        />
        {coverPhotoSrc === null && (
          <button
            type="button"
            className="px-3 py-2 bg-white rounded-xl group-hover:bg-[#00939f] group shadow-header-shadown"
          >
            <div className="flex items-center gap-x-3">
              <i>
                <Camera className="text-black w-5 h-5 group-hover:text-gray-200" />
              </i>
              <span className="text-base font-medium group-hover:text-gray-200">
                Edit cover photo
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
