"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useToast from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { ChevronLeft, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import CropImageAvatar from "./crop-image-avatar";
import { convertBase64ToFile } from "@/utils/Convert/ConvertBase64ToFile";
import useUpdateAvatar from "@/hooks/use-update-avatar";
import { openBackdrop } from "@/stores/stateSlice";

interface UpdateAvatarProfileProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateAvatarProfile({
  open,
  onClose,
}: UpdateAvatarProfileProps) {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const { onUpdateAvatar, isSuccess } = useUpdateAvatar();

  const userState = useAppSelector((state) => state.userSlice.profile);
  const [avatarSrc, setAvatarSrc] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadImage = (e: any) => {
    const newFile = e.target.files[0];
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(newFile?.type)) {
      return addToast(
        {
          type: "error",
          description: "Please choose image have format JPG, JPEG, PNG",
          duration: 3500,
        },
        false
      );
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarSrc(reader.result as string);
    };
    reader.readAsDataURL(newFile);
  };

  const handleCancelUploadAvatar = () => {
    setAvatarSrc(null);
  };

  const handleCloseUpdateAvatar = () => {
    handleCancelUploadAvatar();
    onClose();
  };

  const handleSubmit = async (base64UrlImage: any) => {
    dispatch(openBackdrop());
    const fullFileAvatar = await convertBase64ToFile(
      avatarSrc,
      `fullFile_avatar_${userState?.userId}.jpg`
    );

    const cropAvatarFile = await convertBase64ToFile(
      base64UrlImage,
      `crop_avatar_${userState?.userId}.jpg`
    );

    await onUpdateAvatar({
      fullAvatar: fullFileAvatar,
      cropAvatar: cropAvatarFile,
    } as REQUEST.TUpdateAvatar);

    handleCloseUpdateAvatar();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[600px] px-3 pt-2 pb-7 my-0 overflow-y-auto">
        <div className="px-2 pt-5 pb-6 font-sans">
          {avatarSrc === null ? (
            <div>
              <div className="flex justify-end">
                <button
                  className="w-10 h-10 rounded-full text-2xl opacity-70 hover:bg-black/10 flex justify-center items-center group"
                  onClick={handleCloseUpdateAvatar}
                >
                  <i>
                    <X
                      strokeWidth={2.75}
                      className="text-gray-500 group-hover:text-gray-950 w-6 h-6"
                    />
                  </i>
                </button>
              </div>
              <form className="px-6">
                <div>
                  <h2 className="text-2xl font-bold">Update avatar</h2>
                  <p className="mt-2 text-base opacity-90">
                    Your profile picture helps people recognize you more easily
                    through posts, messages...
                  </p>
                </div>
                <div className="py-10 flex justify-around">
                  <figure
                    style={{
                      borderRadius: "50%",
                      overflow: "hidden",
                      width: "170px",
                      height: "170px",
                      position: "relative",
                    }}
                  >
                    {userState?.cropAvatarLink ? (
                      <img
                        src={userState?.cropAvatarLink}
                        width={170}
                        height={170}
                        alt="avatar"
                      />
                    ) : (
                      //   <Skeleton variant="circular" width={170} height={170} />
                      <div></div>
                    )}
                  </figure>
                </div>
                <div className="relative group">
                  <input
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    type="file"
                    ref={fileInputRef}
                    title=""
                    onChange={handleUploadImage}
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center py-3 px-4 rounded-xl bg-gray-200 group-hover:bg-gray-300"
                  >
                    <div className="flex items-center gap-x-3">
                      <i>
                        <Plus
                          strokeWidth={2.5}
                          className="w-6 h-6 text-gray-600 group-hover:text-gray-800"
                        />
                      </i>
                      <span className="text-lg font-medium text-gray-600 group-hover:text-gray-800">
                        Upload new Avatar
                      </span>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full text-2xl opacity-70 hover:bg-black/10 flex justify-center items-center group"
                  onClick={handleCancelUploadAvatar}
                >
                  <i>
                    <ChevronLeft
                      strokeWidth={2.75}
                      className="text-gray-500 group-hover:text-gray-950 w-6 h-6"
                    />
                  </i>
                </button>
                <button
                  className="w-10 h-10 rounded-full text-2xl opacity-70 hover:bg-black/10 flex justify-center items-center group"
                  onClick={handleCloseUpdateAvatar}
                >
                  <i>
                    <X
                      strokeWidth={2.75}
                      className="text-gray-500 group-hover:text-gray-950 w-6 h-6"
                    />
                  </i>
                </button>
              </div>
              <form className="mt-2 px-6 flex flex-col gap-y-2">
                <h2 className="text-2xl font-bold">Preview</h2>
                <div className="py-3">
                  <CropImageAvatar image={avatarSrc} onSubmit={handleSubmit} />
                </div>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
