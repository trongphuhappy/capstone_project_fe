"use client";

import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import useGetProfile from "@/app/(user)/profile/hooks/useGetProfile";
import useUpdateProfileDialog from "@/hooks/use-update-profile-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingInformationUser() {
  const { onOpenUpdateEmail, onOpenUpdateFirstName, onOpenUpdateLastName } =
    useUpdateProfileDialog();

  const { profileState, getProfileApi, isPending } = useGetProfile();

  const fetchUserData = async () => {
    await getProfileApi();
  };

  const handleOpenUpdateEmailPopup = () => {
    onOpenUpdateEmail();
  };

  const handleOpenUpdateFirstNamePopup = () => {
    onOpenUpdateFirstName();
  };

  const handleOpenUpdateLastNamePopup = () => {
    onOpenUpdateLastName();
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <header>
        <div className="mt-[56px] flex flex-col gap-y-4">
          <h2 className="text-3xl font-bold font-sans text-[#1C2B33]">
            Personal information
          </h2>
          <p className="text-base opacity-[0.9]">
            Manage your personal information.
          </p>
        </div>
      </header>
      <div className="mt-9 rounded-xl overflow-hidden bg-white">
        {!profileState?.profile ? (
          <Skeleton className="h-[200px]" />
        ) : (
          <ul>
            <li className="px-4 min-h-16 flex flex-row items-center justify-between border-b-slate-300 border-b-[1px] cursor-pointer hover:bg-zinc-100 select-none">
              <div
                className="w-full flex flex-col gap-x-1"
                onClick={handleOpenUpdateEmailPopup}
              >
                <h4 className="text-base font-semibold">Email</h4>
                <p className="text-base text-gray-600">
                  {profileState.profile?.email}
                </p>
              </div>
              <div>
                <button>
                  <i>
                    <ChevronRight />
                  </i>
                </button>
              </div>
            </li>
            <li className="px-4 min-h-16 flex flex-row items-center justify-between border-b-slate-300 border-b-[1px] cursor-pointer hover:bg-zinc-100 select-none">
              <div
                className="w-full flex flex-col gap-x-1"
                onClick={handleOpenUpdateFirstNamePopup}
              >
                <h4 className="text-base font-semibold">First name</h4>
                <p className="text-base text-gray-600">
                  {profileState?.profile?.firstName}
                </p>
              </div>
              <div>
                <button>
                  <i>
                    <ChevronRight />
                  </i>
                </button>
              </div>
            </li>
            <li className="px-4 min-h-16 flex flex-row items-center justify-between border-b-slate-300 border-b-[1px] cursor-pointer hover:bg-zinc-100 select-none">
              <div
                className="w-full flex flex-col gap-x-1"
                onClick={handleOpenUpdateLastNamePopup}
              >
                <h4 className="text-base font-semibold">Last name</h4>
                <p className="text-base text-gray-600">
                  {profileState?.profile?.lastName}
                </p>
              </div>
              <div>
                <button>
                  <i>
                    <ChevronRight />
                  </i>
                </button>
              </div>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}
