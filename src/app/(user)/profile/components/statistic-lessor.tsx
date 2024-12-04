"use client";

import BoxStatictisMonth from "@/app/(user)/profile/components/box-statistic-month";
import SingleAreaChart from "@/components/chart/SingleChart";

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
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2"><SingleAreaChart chartId="hs-single-area-chart-1"/></div>
        <div className="col-span-2"><SingleAreaChart chartId="hs-single-area-chart-2"/></div>
      </div>
    </div>
  );
}
