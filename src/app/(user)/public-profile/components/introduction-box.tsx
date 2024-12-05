"use client";

import React from "react";

import { CalendarDays, Heart, HeartHandshake } from "lucide-react";

import { useAppSelector } from "@/stores/store";
import { formatTimeSince } from "@/utils/date";

export default function IntroductionBox() {
  const userProfileState = useAppSelector(
    (state) => state.userProfileslice.profile
  );

  return (
    <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
      <h3 className="text-[18px] font-semibold">Introduction</h3>
      <div className="py-3">
        <div>
          <h3 className="mb-2 text-center">
            {userProfileState?.biography &&
            userProfileState?.biography?.length > 0
              ? userProfileState.biography
              : "No biography"}
          </h3>
        </div>
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
      </div>
    </div>
  );
}
