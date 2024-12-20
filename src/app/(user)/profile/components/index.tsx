"use client";

import useGetProfile from "@/app/(user)/profile/hooks/useGetProfile";
import { useEffect, useState } from "react";
import useGetLessor from "@/app/(user)/profile/hooks/useGetLessor";
import PostComponent from "@/app/(user)/profile/components/post-component";
import Hero from "@/app/(user)/profile/components/hero";
import { NavBars } from "@/const/profile";
import StatisticLessor from "@/app/(user)/profile/components/statistic-lessor";
import LeaseTracker from "@/app/(user)/profile/components/lease-tracker";

export default function ProfileComponent() {
  const { getProfileApi } = useGetProfile();
  const { getLessorApi } = useGetLessor();

  const [nav, setNav] = useState<number>(0);

  const handleGetProfile = async () => {
    await getProfileApi();
  };

  const handleGetInfoLessor = async () => {
    await getLessorApi();
  };

  useEffect(() => {
    handleGetProfile();
    handleGetInfoLessor();
  }, []);

  return (
    <div className="relative">
      <Hero nav={nav} setNav={setNav} />
      <main className="my-3 w-full max-w-[1425px] mx-auto md:mt-0 mt-[11rem]">
        {NavBars[nav].value === "post" && <PostComponent />}
        {NavBars[nav].value === "lease-tracker" && <LeaseTracker />}
        {NavBars[nav].value === "statistic" && <StatisticLessor />}
      </main>
    </div>

  );
}
