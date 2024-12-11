"use client";

import BoxStatictisMonth from "@/app/(user)/profile/components/box-statistic-month";
import TotalOrderChart from "@/components/chart/total-order-chart";
import useGetBoxLessors from "@/app/(user)/profile/hooks/useGetBoxLessors";
import { useEffect, useState } from "react";
import useGetCountLessors from "@/app/(user)/profile/hooks/useGetCountLessors";
import useGetPercentOrderLessor from "@/app/(user)/profile/hooks/useGetPercentOrderLessor";
import { PercentOrderChart } from "@/components/chart/percent-order-chart";

export default function StatisticLessor() {
  const { getBoxLessorsApi, isPending } = useGetBoxLessors();
  const { getCountLessorApi, isPending: pendingCountLessor } =
    useGetCountLessors();
  const { getPercentOrderByLessorApi, isPending: pendingPercentOrder } =
    useGetPercentOrderLessor();
  const [boxLessors, setBoxLessors] = useState<API.TBoxLessor[]>([]);
  const [countOrders, setCountOrders] = useState<API.TOrderStatistic[]>([]);
  const [percentOrders, setPercentOrders] = useState<API.TOrderPercent | null>(
    null
  );

  const handleFetchGetBoxLessors = async () => {
    const res = await getBoxLessorsApi();
    if (res) setBoxLessors(res.value?.data);
  };

  const handleFetchCountOrderLessor = async () => {
    const res = await getCountLessorApi();
    if (res) setCountOrders(res?.value?.data);
  };

  const handleFetchOrderPercent = async () => {
    const res = await getPercentOrderByLessorApi();
    if (res) setPercentOrders(res?.value?.data);
  };

  useEffect(() => {
    handleFetchGetBoxLessors();
    handleFetchCountOrderLessor();
    handleFetchOrderPercent();
  }, []);

  console.log(percentOrders);

  return (
    <div className="font-montserrat">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6 px-4">
        <BoxStatictisMonth
          type="product"
          valueLastMonth={boxLessors[0]?.valueLastMonth}
          valueThisMonth={boxLessors[0]?.valueThisMonth}
        />
        <BoxStatictisMonth
          type="order-value"
          valueLastMonth={boxLessors[1]?.valueLastMonth}
          valueThisMonth={boxLessors[1]?.valueThisMonth}
        />
        <BoxStatictisMonth
          type="order-success"
          valueLastMonth={boxLessors[2]?.valueLastMonth}
          valueThisMonth={boxLessors[2]?.valueThisMonth}
        />
      </section>

      <section className="grid grid-cols-1 items-center lg:grid-cols-2 gap-6 mb-6">
        <div className="col-span-1">
          <TotalOrderChart
            chartId="hs-single-area-chart-1"
            countOrders={countOrders}
          />
        </div>
        <div className="col-span-1">
          {percentOrders && <PercentOrderChart orderPercent={percentOrders} />}
        </div>
      </section>
    </div>
  );
}
