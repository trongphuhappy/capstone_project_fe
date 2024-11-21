"use client";

import React, { useState } from "react";

import {
  Calendar,
  CalendarDays,
  Camera,
  GraduationCap,
  Heart,
  HeartHandshake,
  Plus,
  ShieldEllipsis,
} from "lucide-react";

import UpdateBiography from "@/app/(user)/profile/components/update-biography";

export default function IntroductionBox() {
  const [isUpdateBiography, setIsUpdateBiography] = useState<boolean>(false);

  const openUpdateBiography = () => {
    setIsUpdateBiography(true);
  };

  const closeUpdateBiography = () => {
    setIsUpdateBiography(false);
  };

  return (
    <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
      <h3 className="text-[18px] font-semibold">Introduction</h3>
      <div className="py-3">
        {isUpdateBiography === false ? (
          <button
            type="button"
            onClick={openUpdateBiography}
            className="w-full px-3 py-[6px] bg-[#e2e5e9] rounded-sm hover:bg-[#d1d4d7] group shadow-header-shadown"
          >
            <span className="text-center text-[15px] font-medium text-black">
              Add biography
            </span>
          </button>
        ) : (
          <UpdateBiography
            biography=""
            onCloseAddBiography={closeUpdateBiography}
            onSaveBiography={() => {}}
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
            <b className="font-medium text-black">10 months ago</b>
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <ShieldEllipsis className="w-6 h-6 text-gray-700" />
          <span className="text-[15px] font-normal text-gray-700">
            Verify: <b className="font-medium text-black">Verified</b>
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <CalendarDays className="w-6 h-6 text-gray-700" />
          <span className="text-[15px] font-normal text-gray-700">
            Participated:{" "}
            <b className="font-medium text-black">10 months ago</b>
          </span>
        </div>
      </div>
    </div>
  );
}
