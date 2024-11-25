"use client";

import React, { Fragment, useState } from "react";

import {
  CalendarDays,
  Heart,
  HeartHandshake,
  ShieldEllipsis,
} from "lucide-react";

import UpdateBiography from "@/app/(user)/profile/components/update-biography";
import { useAppSelector } from "@/stores/store";
import useUpdateProfile from "@/hooks/use-update-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTimeSince } from "@/utils/date";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function IntroductionBox() {
  const [isUpdateBiography, setIsUpdateBiography] = useState<boolean>(false);
  const userProfileState = useAppSelector(
    (state) => state.userProfileslice.profile
  );

  const { onUpdateProfile, isPending } = useUpdateProfile();

  const openUpdateBiography = () => {
    setIsUpdateBiography(true);
  };

  const closeUpdateBiography = () => {
    setIsUpdateBiography(false);
  };

  const handleSaveBiography = (text: string) => {
    closeUpdateBiography();
    onUpdateProfile({ biography: text });
  };

  return (
    <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
      <h3 className="text-[18px] font-semibold">Introduction</h3>
      <div className="py-3">
        {isUpdateBiography === false ? (
          <Fragment>
            {isPending ? (
              <div>
                <Skeleton className="mb-2 w-full h-2 text-center" />
              </div>
            ) : (
              <div>
                {userProfileState?.biography &&
                  userProfileState?.biography?.length > 0 && (
                    <h3 className="mb-2 text-center">
                      {userProfileState.biography}
                    </h3>
                  )}
                <button
                  type="button"
                  onClick={openUpdateBiography}
                  className="w-full px-3 py-[6px] bg-[#e2e5e9] rounded-sm hover:bg-[#d1d4d7] group shadow-header-shadown"
                >
                  {userProfileState?.biography &&
                  userProfileState?.biography?.length > 0 ? (
                    <span className="text-center text-[15px] font-medium text-black">
                      Edit biography
                    </span>
                  ) : (
                    <span className="text-center text-[15px] font-medium text-black">
                      Add biography
                    </span>
                  )}
                </button>
              </div>
            )}
          </Fragment>
        ) : (
          <UpdateBiography
            biography={userProfileState?.biography || ""}
            onCloseAddBiography={closeUpdateBiography}
            onSaveBiography={handleSaveBiography}
          />
        )}
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <Heart className="w-6 h-6 text-gray-700" />
          <span className="text-[15px] font-normal text-gray-700">
            Following: <b className="font-medium text-black">10</b>
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <HeartHandshake className="w-6 h-6 text-gray-700" />
          <span className="text-[15px] font-normal text-gray-700">
            Followers: <b className="font-medium text-black">10</b>
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <CalendarDays className="w-6 h-6 text-gray-700" />
          <span className="text-[15px] font-normal text-gray-700">
            Participated:{" "}
            <b className="font-medium text-black">
              {userProfileState?.createdDate &&
                formatTimeSince(userProfileState?.createdDate)}
            </b>
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <ShieldEllipsis className="w-6 h-6 text-gray-700" />
          <span className="text-[15px] font-normal text-gray-700">
            Verify:{" "}
            <b className="font-medium text-black">
              {userProfileState?.verifyUser ? "Verified" : "Not yet verified"}
            </b>
          </span>
          {!userProfileState?.verifyUser && (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-red-600">
                    <span className="text-white">!</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-50 shadow-tooltip px-2 py-3 select-none">
                  <span className="text-[#00000d] text-xs font-montserrat font-normal">
                    Please update citizen information to rent
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
}
