import { useAppDispatch, useAppSelector } from "@/stores/store";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SettingInformationUser() {
  const dispatch = useAppDispatch();
  //   const profilePrivateState = useAppSelector(
  //     (state) => state.userProfileSlice.profilePrivate
  //   );

  const [emailPopup, setEmailPopup] = useState<boolean>(false);
  const [fullNamePopup, setFullNamePopup] = useState<boolean>(false);
  const [biographyPopup, setBiographyPopup] = useState<boolean>(false);

  const fetchUserData = async () => {
    // await dispatch(getProfilePrivateThunk());
  };

  const handleOpenEmailPopup = () => {
    setEmailPopup(true);
  };

  const handleCloseEmailPopup = () => {
    setEmailPopup(false);
  };

  const handleOpenFullNamePopup = () => {
    setFullNamePopup(true);
  };

  const handleCloseFullNamePopup = () => {
    setFullNamePopup(false);
    fetchUserData();
  };

  const handleOpenBiographyPopup = () => {
    setBiographyPopup(true);
  };

  const handleCloseBiographyPopup = () => {
    setBiographyPopup(false);
    fetchUserData();
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
        <ul>
          <li className="px-4 min-h-16 flex flex-row items-center justify-between border-b-slate-300 border-b-[1px] cursor-pointer hover:bg-zinc-100 select-none">
            <div
              className="w-full flex flex-col gap-x-1"
              onClick={handleOpenEmailPopup}
            >
              <h4 className="text-base font-semibold">Email</h4>
              <p className="text-base text-gray-600">email@gmail.com</p>
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
              onClick={handleOpenFullNamePopup}
            >
              <h4 className="text-base font-semibold">First name</h4>
              <p className="text-base text-gray-600">First name</p>
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
              onClick={handleOpenFullNamePopup}
            >
              <h4 className="text-base font-semibold">Last name</h4>
              <p className="text-base text-gray-600">Last name</p>
            </div>
            <div>
              <button>
                <i>
                  <ChevronRight />
                </i>
              </button>
            </div>
          </li>
          <li className="px-4 min-h-16 flex flex-row items-center justify-between border-b-slate-300 cursor-pointer hover:bg-zinc-100 select-none">
            <div
              className="w-full flex flex-col gap-x-1"
              onClick={handleOpenBiographyPopup}
            >
              <h4 className="text-base font-semibold">Biography</h4>
              <p className="text-base text-gray-600">
                Tui là người siêu dễ thương!!!
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
      </div>
    </section>
  );
}
