"use client";

import BreadcrumbComponent from "@/components/breadcrumb";
import { useAppSelector } from "@/stores/store";
import { TBreadcrumb } from "@/typings";
import AvatarComponent from "./avatar-component";
import UpdateProfileDialog from "./update-profile-dialog";
import { useState } from "react";
import useUpdateProfileDialog from "@/hooks/useUpdateProfileDialog";

const breadcrumbs: TBreadcrumb[] = [
  {
    link: "/",
    title: "Home",
    isActive: false,
  },
  {
    link: "/profile",
    title: "Profile",
    isActive: true,
  },
];

export default function ProfileComponent() {
  const userProfile = useAppSelector((state) => state.userSlice);

  const { open, onOpenUpdateProfile, onCloseUpdateProfile } =
    useUpdateProfileDialog();

  return (
    <div className="px-[50px] font-montserrat">
      <div className="mt-4 pb-2 border-b-2">
        <BreadcrumbComponent breadcrumbs={breadcrumbs} />
      </div>
      <div className="flex mt-2 py-2 gap-x-5">
        <div className="w-[30%]">
          <div className="w-full h-[500px] rounded-lg shadow-box-item overflow-hidden">
            <div>
              <AvatarComponent />
              <div className="mt-14 px-4">
                <h3 className="text-xl font-semibold">
                  {userProfile.profile?.fullName}
                </h3>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={onOpenUpdateProfile}
                    className="w-full h-10 border-2 rounded-md hover:bg-slate-100"
                  >
                    <span className="text-base font-normal">Edit profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%]">
          <div className="w-full h-[500px] rounded-lg shadow-box-item overflow-hidden">
            <div className="py-4 border-b-2">
              <div className="w-1/2"></div>
            </div>
            <div>
              <div className="flex justify-center items-center py-10">
                <h4 className="text-2xl">You don't have any information yet</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateProfileDialog open={open} onClose={onCloseUpdateProfile} />
    </div>
  );
}
