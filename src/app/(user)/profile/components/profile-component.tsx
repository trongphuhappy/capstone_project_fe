"use client";

import AvatarProfile from "@/components/avatar-profile";
import UpdateCoverPhoto from "@/components/update-cover-photo";
import { useAppSelector } from "@/stores/store";
import { Plus } from "lucide-react";
import useGetProfile from "@/app/(user)/profile/hooks/useGetProfile";
import { useEffect, useState } from "react";
import useGetLessor from "@/app/(user)/profile/hooks/useGetLessor";
import useCheckExsitLessor from "@/hooks/use-check-exist-lessor";
import useToast from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import PostComponent from "@/app/(user)/profile/components/post-component";

interface NavProfile {
  name: string;
  value: string;
}

const NAV: NavProfile[] = [
  {
    name: "Post",
    value: "post",
  },
  {
    name: "Post",
    value: "post",
  },
  {
    name: "Post",
    value: "post",
  },
  {
    name: "Post",
    value: "post",
  },
];

export default function ProfileComponent() {
  const { addToast } = useToast();
  const router = useRouter();
  const userState = useAppSelector((state) => state.userSlice.profile);
  const { profileState, getProfileApi, isPending } = useGetProfile();
  const { getLessorApi } = useGetLessor();
  const [nav, setNav] = useState<number>(0);
  const { checkExistLessorApi } = useCheckExsitLessor();

  const handleGetProfile = async () => {
    await getProfileApi();
  };

  const handleGetInfoLessor = async () => {
    await getLessorApi();
  };

  const handleSetNav = (index: number) => {
    setNav(index);
  };

  useEffect(() => {
    handleGetProfile();
    handleGetInfoLessor();
  }, []);

  const renderNav = () => {
    return NAV?.map((item, index) => {
      return (
        <button key={index} type="button" onClick={() => handleSetNav(index)}>
          <div
            className={`h-[45px] px-4 rounded-md flex items-center mb-1 ${
              nav === index && "bg-[#00939f]"
            }`}
          >
            <span
              className={`text-[15px] ${
                nav === index ? "text-white" : "text-black"
              }`}
            >
              {item.name}
            </span>
          </div>
          {index === nav && (
            <div className="w-full h-[3px] rounded-lg bg-[#00939f]"></div>
          )}
        </button>
      );
    });
  };

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
      <div className="font-montserrat mx-auto">
        <div className="bg-gray-100 pt-5">
          <div className="relative max-w-[1425px] h-[530px] mx-auto overflow-hidden">
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
                          onClick={handlePostNow}
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
                  <div>
                    <div className="pt-1 flex items-baseline">
                      {renderNav()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="my-3 w-full max-w-[1425px] mx-auto relative">
          <PostComponent />
        </main>
      </div>
    </div>
  );
}
