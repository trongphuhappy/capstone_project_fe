"use client";

import { formatCurrencyVND } from "@/utils/format-currency";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

interface BoxStatictisMonthProps {
  valueThisMonth: number;
  valueLastMonth: number;
  type: "product" | "order-value" | "order-success";
}

export default function BoxStatictisMonth({
  valueThisMonth,
  valueLastMonth,
  type,
}: BoxStatictisMonthProps) {
  const [percentChange, setPercentChange] = useState<number>(0);
  const calculatePercentChange = () => {
    if (valueLastMonth === 0) {
      return valueThisMonth === 0 ? 0 : 100;
    }
    return ((valueThisMonth - valueLastMonth) / valueLastMonth) * 100;
  };

  useEffect(() => {
    setPercentChange(() => {
      return calculatePercentChange();
    });
  }, [valueThisMonth, valueLastMonth]);

  return (
    <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
      <div className="flex items-center gap-x-3">
        {type === "product" && (
          <h3 className="text-xl font-semibold">Total product</h3>
        )}
        {type === "order-value" && (
          <h3 className="text-xl font-semibold">Total order value</h3>
        )}
        {type === "order-success" && (
          <h3 className="text-xl font-semibold">Total order success</h3>
        )}
        <Fragment>
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
        </Fragment>
      </div>
      <Fragment>
        <div className="mt-4 flex flex-col items-baseline gap-2">
          <span className="font-semibold text-xl">
            This month: {type === "product" && valueThisMonth + " products"}
            {type === "order-value" &&
              formatCurrencyVND(parseFloat(valueThisMonth?.toFixed(1)))}
            {type === "order-success" &&
              parseFloat(valueThisMonth?.toFixed(1)) + " order success"}
          </span>
          <span className="font-normal text-[14px] text-gray-400">
            Last month: {type === "product" && valueLastMonth + " products"}
            {type === "order-value" &&
              formatCurrencyVND(parseFloat(valueLastMonth?.toFixed(1)))}
            {type === "order-success" &&
              parseFloat(valueLastMonth?.toFixed(1)) + " order success"}
          </span>
        </div>
        <Fragment>
          <span className="inline-block mt-2 font-normal text-gray-400">
            {percentChange > 0 ? "Increase" : "Decrease"}{" "}
            {type === "product" &&
              parseFloat((valueThisMonth - valueLastMonth).toFixed(1)) +
                " products this month"}
            {type === "order-value" &&
              formatCurrencyVND(
                parseFloat((valueThisMonth - valueLastMonth).toFixed(1))
              ) + " this month"}
            {type === "order-success" &&
              parseFloat((valueThisMonth - valueLastMonth).toFixed(1)) +
                " order success this month"}
          </span>
        </Fragment>
      </Fragment>
    </div>
  );
}
