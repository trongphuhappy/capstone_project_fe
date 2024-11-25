"use client";

import AvatarProfile from "@/components/avatar-profile";
import UpdateCoverPhoto from "@/components/update-cover-photo";
import { useAppSelector } from "@/stores/store";
import { Camera, Plus } from "lucide-react";
import IntroductionBox from "@/app/(user)/profile/components/introduction-box";
import PostFilterBox from "@/app/(user)/profile/components/post-filter-box";
import useGetProfile from "@/app/(user)/profile/hooks/useGetProfile";
import { useEffect, useState } from "react";

export default function ProfileComponent() {
  const userState = useAppSelector((state) => state.userSlice.profile);

  const { profileState, getProfileApi, isPending } = useGetProfile();

  const handleGetProfile = async () => {
    await getProfileApi();
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <div>
      <div className="font-montserrat mx-auto">
        <div className="bg-gray-100 py-5">
          <div className="relative max-w-[1425px] h-[500px] mx-auto overflow-hidden">
            <div className="absolute w-full">
              <UpdateCoverPhoto />
              <div className="absolute -bottom-[40%] h-full translate-y-1/2 transform w-full pl-[3%] pr-[3%] flex justify-between items-baseline z-30">
                <div className="w-full">
                  <div className="flex items-center gap-x-4 pb-3 border-b">
                    <AvatarProfile />
                    <div className="w-full flex items-end justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold">
                          {profileState.profile?.firstName +
                            " " +
                            profileState.profile?.lastName}
                        </h2>
                        <p className="mt-1 text-base text-gray-600">
                          520 followers
                        </p>
                      </div>
                      <div className="ml-auto flex gap-x-3">
                        <button
                          type="button"
                          className="px-3 py-2 bg-[#e2e5e9] rounded-xl hover:bg-[#00939f] group shadow-header-shadown"
                        >
                          <div className="flex items-center gap-x-3">
                            <i>
                              <Plus className="text-black w-5 h-5 group-hover:text-white" />
                            </i>
                            <span className="text-base font-medium group-hover:text-white">
                              Post now
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="my-3 w-full max-w-[1425px] mx-auto relative">
          <div className="flex items-start gap-x-5">
            <section className="sticky top-[10px] z-20 w-[30%]">
              <IntroductionBox />
            </section>
            <section className="flex-1 sticky w-full flex flex-col gap-y-3">
              <div>
                <PostFilterBox />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
