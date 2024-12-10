"use client";

import { useEffect } from "react";
import useGetLessor from "@/app/(user)/public-profile/hooks/useGetLessorById";
import PostComponent from "@/app/(user)/public-profile/components/post-component";
import useGetProfileById from "@/app/(user)/public-profile/hooks/useGetProfileById";
import Hero from "@/app/(user)/public-profile/components/hero";
import useGetLessorById from "@/app/(user)/public-profile/hooks/useGetLessorById";

interface IPublicProfileComponentProps {
  Id: string;
}

export default function PublicProfileComponent({
  Id,
}: IPublicProfileComponentProps) {
  const { getProfileByIdApi } = useGetProfileById();
  const { getLessorByIdApi } = useGetLessorById();

  const handleGetProfile = async () => {
    await getProfileByIdApi({
      accountId: Id,
    });
  };

  const handleGetInfoLessor = async () => {
    await getLessorByIdApi({
      accountId: Id,
    });
  };

  useEffect(() => {
    handleGetProfile();
    handleGetInfoLessor();
  }, [Id]);

  return (
    <div>
      <div className="font-montserrat mx-auto">
        <Hero />
        <main className="my-3 w-full max-w-[1425px] mx-auto relative">
          <PostComponent accountId={Id} />
        </main>
      </div>
    </div>
  );
}
