"use client";

import AvatarProfile from "@/components/avatar-profile";
import UpdateCoverPhoto from "@/components/update-cover-photo";
import { NavBars } from "@/const/profile";
import useCheckExsitLessor from "@/hooks/use-check-exist-lessor";
import useToast from "@/hooks/use-toast";
import { useAppSelector } from "@/stores/store";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const profileState = useAppSelector((state) => state.userProfileslice);
  const { addToast } = useToast();

  const { checkExistLessorApi } = useCheckExsitLessor();

  const handlePostNow = async () => {
    const res = await checkExistLessorApi();
    if (res === false) {
      addToast({
        type: "error",
        description: "Please update information to become a lessor",
      });
    } else {
      router.push("/create-product");
    }
  };

  return (
    <div>
      <div className="bg-gray-100 pt-5">
        <div className="relative max-w-[1425px] h-[530px] mx-auto overflow-hidden">
          <div className="absolute w-full">
            <div>
              <figure className="w-full h-[300px] overflow-hidden rounded-lg">
                <img
                  src={
                    profileState.profile?.cropCoverPhotoUrl ||
                    "/images/banner2.png"
                  }
                  alt="Thumnail"
                  className="w-full h-[300px] object-cover"
                />
              </figure>
            </div>
            <div className="absolute -bottom-[40%] h-full translate-y-1/2 transform w-full pl-[3%] pr-[3%] flex justify-between items-baseline z-30">
              <div className="w-full">
                <div className="flex items-center gap-x-4 pb-3 border-b">
                  <figure
                    className="w-[190px] h-[190px] bg-white rounded-full flex items-center justify-center p-2 cursor-pointer
              hover:bg-[linear-gradient(to_top,_#d16ba5,_#c777b9,_#ba83ca,_#aa8fd8,_#9a9ae1,_#8aa7ec,_#79b3f4,_#69bff8,_#52cffe,_#41dfff,_#46eefa,_#5ffbf1)]"
                  >
                    <div
                      style={{
                        borderRadius: "50%",
                        overflow: "hidden",
                        width: "170px",
                        height: "170px",
                      }}
                      className="flex items-center justify-between"
                    >
                      <img
                        src={
                          profileState.profile?.cropAvatarUrl ||
                          "/images/unknown.webp"
                        }
                        width={170}
                        height={170}
                        alt="avatar"
                      />
                    </div>
                  </figure>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
