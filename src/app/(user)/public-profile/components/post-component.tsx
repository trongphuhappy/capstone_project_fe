"use client";

import IntroductionBox from "@/app/(user)/public-profile/components/introduction-box";
import PostFilterBox from "@/app/(user)/public-profile/components/post-filter-box";
import IntroductionLessor from "@/app/(user)/public-profile/components/introduction-lessor";

interface IPostComponentProps {
  accountId: string;
}

export default function PostComponent({ accountId }: IPostComponentProps) {
  return (
    <div className="my-4 flex flex-col md:flex-row items-start gap-y-5 md:gap-x-5">
      <section className="md:sticky md:top-[10px] z-20 w-full md:w-[30%]">
        <div className="flex flex-col gap-y-2">
          <IntroductionBox />
          <IntroductionLessor />
        </div>
      </section>
      <section className="flex-1 md:sticky md:top-[10px] w-full flex flex-col gap-y-3">
        <div>
          <PostFilterBox accountId={accountId} />
        </div>
      </section>
    </div>
  );
}
