"use client";

import React from "react";

import { House, MapPinHouse } from "lucide-react";

import { useAppSelector } from "@/stores/store";
import useUpdateProfileDialog from "@/hooks/use-update-profile-dialog";

export default function IntroductionLessor() {
  const inforLessorState = useAppSelector(
    (state) => state.userProfileslice.lessor
  );

  const { onOpenUpdateInfoLessor } = useUpdateProfileDialog();

  const handleUpdateLessor = () => {
    onOpenUpdateInfoLessor();
  };

  return (
    <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold">Lessor</h3>
        <button
          type="button"
          onClick={handleUpdateLessor}
          className="px-3 py-[3px] bg-[#e2e5e9] rounded-sm hover:bg-[#d1d4d7] group shadow-header-shadown"
        >
          <span className="text-center text-[15px] font-medium text-black">
            {inforLessorState != null ? "Edit" : "Add"}
          </span>
        </button>
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
        <h3 className="my-4">Please update to post rental informations</h3>
      )}
    </div>
  );
}
