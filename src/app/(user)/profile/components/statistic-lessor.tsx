"use client";

import BoxStatictisMonth from "@/app/(user)/profile/components/box-statistic-month";
import BubbleChart from "@/components/chart/BubbleChart";
import DoughnutChart from "@/components/chart/DoughnutChart";
import SingleAreaChart from "@/components/chart/SingleChart";

export default function StatisticLessor() {
  return (
    <div className="font-montserrat">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6 px-4">
        <BoxStatictisMonth
          title="Total rent"
          valueLastMoth={1234}
          valueThisMonth={1235}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="col-span-1">
          <SingleAreaChart chartId="hs-single-area-chart-1" />
        </div>
        <div className="col-span-1">
          <SingleAreaChart chartId="hs-single-area-chart-2" />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex justify-center">
          <DoughnutChart />
        </div>
        <div className="flex justify-center">
          <BubbleChart />
        </div>
      </section>
    </div>
  );
}
