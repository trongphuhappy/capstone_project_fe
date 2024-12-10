"use client";

import IntroductionBox from "@/app/(user)/public-profile/components/introduction-box";
import PostFilterBox from "@/app/(user)/public-profile/components/post-filter-box";
import IntroductionLessor from "@/app/(user)/public-profile/components/introduction-lessor";

interface IPostComponentProps {
  accountId: string;
}

export default function PostComponent({ accountId }: IPostComponentProps) {
  return (
    <div className="flex items-start gap-x-5">
      <section className="sticky top-[10px] z-20 w-[30%]">
        <div className="flex flex-col gap-y-2">
          <IntroductionBox />
          <IntroductionLessor />
        </div>
      </section>
      <section className="flex-1 sticky w-full flex flex-col gap-y-3">
        <div>
          <PostFilterBox accountId={accountId} />
        </div>
      </section>
    </div>
  );
}
