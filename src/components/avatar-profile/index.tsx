"use client";

import { useAppSelector } from "@/stores/store";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Images, SquareUser } from "lucide-react";
import useUpdateProfileDialog from "@/hooks/use-update-profile-dialog";

export default function AvatarProfile() {
  const userState = useAppSelector((state) => state.userSlice.profile);
  const [avatarTooltip, setAvatarTooltip] = useState<boolean>(false);
  const { onOpenUpdateAvatarProfile } = useUpdateProfileDialog();

  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (userState?.cropAvatarLink) setAvatar(userState?.cropAvatarLink);
  }, [userState]);

  const handleToggleAvatarTooltip = () => {
    setAvatarTooltip((prev) => !prev);
  };

  const handleCloseAvatarTooltip = () => {
    setAvatarTooltip(false);
  };

  const handleOpenAvatarPopup = () => {
    setAvatarTooltip(false);
    onOpenUpdateAvatarProfile();
  };

  const handleViewAvatar = () => {
    handleCloseAvatarTooltip();
  };

  return (
    <div>
      <Popover open={avatarTooltip} onOpenChange={setAvatarTooltip}>
        <PopoverTrigger asChild>
          <figure
            className={`w-[150px] h-[150px] bg-white rounded-full flex items-center justify-center p-2 cursor-pointer ${
              avatar &&
              "hover:bg-[linear-gradient(to_top,_#d16ba5,_#c777b9,_#ba83ca,_#aa8fd8,_#9a9ae1,_#8aa7ec,_#79b3f4,_#69bff8,_#52cffe,_#41dfff,_#46eefa,_#5ffbf1)]"
            }`}
            onClick={handleToggleAvatarTooltip}
          >
            <div
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                width: "140px",
                height: "140px",
              }}
              className="flex items-center justify-between border"
            >
              <img
                src={userState?.cropAvatarLink}
                width={140}
                height={140}
                alt="avatar"
              />
            </div>
          </figure>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="center"
          className="w-auto h-auto rounded-md p-0"
        >
          <div className="py-1 px-2 flex flex-col gap-y-1">
            <div
              className="px-2 py-1 flex items-center gap-x-2 rounded-md hover:bg-slate-200 select-none cursor-pointer"
              onClick={handleViewAvatar}
            >
              <i className="">
                <SquareUser
                  strokeWidth={1}
                  className="w-7 h-7 text-gray-800  opacity-80"
                />
              </i>
              <p className="text-[15px] font-[400] text-[#1b1b1b] opacity-86">
                View avatar
              </p>
            </div>
            <div
              className="px-2 py-1 flex items-center gap-x-2 rounded-md hover:bg-slate-200 select-none cursor-pointer"
              onClick={handleOpenAvatarPopup}
            >
              <i className="">
                <Images
                  strokeWidth={1}
                  className="w-7 h-7 text-gray-800  opacity-80"
                />
              </i>
              <p className="text-[15px] font-[400] text-[#1b1b1b] opacity-86">
                Update avatar
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
