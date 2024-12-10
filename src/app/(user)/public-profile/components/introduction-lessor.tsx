"use client";

import React from "react";

import { House, MapPinHouse } from "lucide-react";

import { useAppSelector } from "@/stores/store";

export default function IntroductionLessor() {
  const inforLessorState = useAppSelector(
    (state) => state.userProfileslice.lessor
  );

  return (
    <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold">Lessor</h3>
      </div>
      {inforLessorState != null ? (
        <div className="py-3 flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            <House className="w-6 h-6 text-gray-700" />
            <span className="text-[15px] font-normal text-gray-700">
              Shop name:{" "}
              <b className="font-medium text-black">
                {inforLessorState?.shopName}
              </b>
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPinHouse className="w-6 h-6 text-gray-700" />
            <span className="text-[15px] font-normal text-gray-700">
              Address:{" "}
              <b className="font-medium text-black">
                {inforLessorState?.wareHouseAddress}
              </b>
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPinHouse className="w-6 h-6 text-gray-700" />
            <span className="text-[15px] font-normal text-gray-700">
              Location:{" "}
              <b className="font-medium text-black">
                {inforLessorState?.locationType === 1
                  ? "Ho Chi Minh city"
                  : "Ha Noi capital"}
              </b>
            </span>
          </div>
        </div>
      ) : (
        <h3 className="my-4">This user is not registered as a lessor</h3>
      )}
    </div>
  );
}
