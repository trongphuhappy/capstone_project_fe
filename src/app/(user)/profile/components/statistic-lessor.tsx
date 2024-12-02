"use client";

import BoxStatictisMonth from "@/app/(user)/profile/components/box-statistic-month";

export default function StatisticLessor() {
  return (
    <div className="font-montserrat">
      <section className="grid grid-cols-3 gap-x-5">
        <BoxStatictisMonth
          title="Total rent"
          valueLastMoth={1234}
          valueThisMonth={1235}
        />
      </section>
    </div>
  );
}
