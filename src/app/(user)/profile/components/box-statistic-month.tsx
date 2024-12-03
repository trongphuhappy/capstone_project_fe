"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface BoxStatictisMonthProps {
  title: string;
  valueThisMonth: number;
  valueLastMoth: number;
}

export default function BoxStatictisMonth({
  title,
  valueThisMonth,
  valueLastMoth,
}: BoxStatictisMonthProps) {
  const [percentChange, setPercentChange] = useState<number>(0);

  const calculatePercentChange = (
    valueThisMonth: number,
    valueLastMoth: number
  ) => {
    return ((valueThisMonth - valueLastMoth) / valueLastMoth) * 100;
  };

  useEffect(() => {
    setPercentChange(() => {
      return calculatePercentChange(valueThisMonth, valueLastMoth);
    });
  }, []);

  return (
    <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
      <div className="flex items-center gap-x-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        {percentChange > 0 ? (
          <div className="bg-[#e6faf0] border border-[#ace4c9] rounded-md text-[#5ecc96] w-max flex items-center gap-x-2 h-[30px] px-3">
            <TrendingUp className="w-5 h-5" />
            <span className="text-[14px]">{percentChange.toFixed(2)}%</span>
          </div>
        ) : (
          <div className="bg-[#fbeff0] border border-[#e58f9a] rounded-md text-[#d43f51] w-max flex items-center gap-x-2 h-[30px] px-3">
            <TrendingDown className="w-5 h-5" />
            <span className="text-[14px]">{percentChange.toFixed(2)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-semibold text-xl">{valueThisMonth}</span>
        <span className="font-normal text-[14px] text-gray-400">
          {valueLastMoth}
        </span>
      </div>
      {percentChange > 0 ? (
        <span className="inline-block mt-2 font-normal text-gray-400">
          Increase {parseFloat((valueThisMonth - valueLastMoth).toFixed(1))}{" "}
          this month
        </span>
      ) : (
        <span className="inline-block mt-2 font-normal text-gray-400">
          Decrease {parseFloat((valueLastMoth - valueThisMonth).toFixed(1))}{" "}
          this month
        </span>
      )}
    </div>
  );
}
