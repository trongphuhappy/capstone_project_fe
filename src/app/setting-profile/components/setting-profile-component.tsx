"use client";
import styles from "@/app/setting-profile/components/setting-profile.module.css";
import { useState } from "react";
import { Shield, User, X } from "lucide-react";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/stores/store";
import { Toaster } from "sonner";
import Image from "next/image";
import SettingInformationUser from "@/components/setting-information-user";

export default function SettingProfileComponent() {
  const router = useRouter();

  const userState = useAppSelector((state) => state.userSlice);
  const [setting, setSetting] = useState<number>(1);

  const handleChangeSetting = (number: number) => {
    if (number !== setting) {
      setSetting(number);
    }
  };

  const navigateHomePage = () => {
    return router.push("/home");
  };

  const navigateProfilePage = () => {
    return router.push(`/profile`);
  };

  return (
    <div className={`${styles.wrapper}`}>
      <section>
        <Toaster
          position="top-right"
          richColors
          expand={true}
          style={{ marginRight: 28 }}
        />
      </section>
      <div className={`${styles.container}`}>
        <div className={`${styles.row}`}>
          <div className={`${styles.left} ${styles.topLeft}`}>
            <header>
              <div
                className="inline-block p-2 rounded-[8px] font-semibold select-none cursor-pointer"
                onClick={navigateHomePage}
              >
                <figure className="flex items-center gap-x-2">
                  <Image
                    src={"/images/logo.svg"}
                    alt="logo"
                    width={50}
                    height={50}
                  />
                  <span className="text-[#00939F]">-</span>
                  <h1 className="text-black text-lg md:text-2xl font-semibold font-montserrat">
                    Neighbor
                  </h1>
                </figure>
              </div>
              <div className="mt-3 flex flex-col gap-y-4">
                <h2 className="text-xl lg:text-3xl font-bold font-sans text-[#1C2B33]">
                  Setting account
                </h2>
                <p className="text-sm lg:text-base opacity-[0.9]">
                  Manage your account settings like personal information,
                  security settings, notification management, and more.
                </p>
              </div>
              <div className="mt-[20px] flex flex-col gap-[5px]">
                <div
                  className={`flex items-center gap-[16px] p-[14px_18px] cursor-pointer font-medium rounded-[10px] transition-colors duration-[0.1s] select-none ${
                    setting === 1
                      ? "text-white bg-[#00939F] opacity-[0.9]"
                      : "hover:bg-[#0000001a] hover:opacity-[0.9]"
                  }`}
                  onClick={() => handleChangeSetting(1)}
                >
                  <i>
                    <User />
                  </i>
                  <span className="text-sm lg:text-base">Personal information</span>
                </div>
                <div
                  className={`flex items-center gap-[16px] p-[14px_18px] cursor-pointer font-medium rounded-[10px] transition-colors duration-[0.1s] select-none ${
                    setting === 2
                      ? "text-white bg-[#00939F] opacity-[0.9]"
                      : "hover:bg-[#0000001a] hover:opacity-[0.9]"
                  }`}
                  onClick={() => handleChangeSetting(2)}
                >
                  <i>
                    <Shield />
                  </i>
                  <span className="text-sm lg:text-base">Passwords and security</span>
                </div>
              </div>
            </header>
          </div>
          <div className={`${styles.right}`}>
            <button
              type="button"
              className="absolute top-5 right-10 p-2 bg-slate-200 rounded-full hover:bg-slate-300 cursor-pointer group"
              onClick={navigateProfilePage}
            >
              <X className="text-gray-500 group-hover:text-gray-700" />
            </button>
            <div className={`${styles.topRight}`}>
              {setting === 1 && <SettingInformationUser />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
