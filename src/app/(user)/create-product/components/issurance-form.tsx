"use client";

import { Input } from "@/components/ui/input";
import { DatePicker } from "@/app/(user)/create-product/components/date-picker";

interface IssuranceFormProps {
  issuranceName: string;
  issuranceIssueDate: Date | null;
  issuranceExpireDate: Date | null;
  insuranceNameError: string | null;
  issueDateError: string | null;
  expireDateError: string | null;
  setInsuranceName: (name: string) => void;
  setInsuranceIssueDate: (date: Date | null) => void;
  setInsuranceExpireDate: (date: Date | null) => void;
}

export default function IssuranceForm({
  issuranceName,
  issuranceIssueDate,
  issuranceExpireDate,
  insuranceNameError,
  issueDateError,
  expireDateError,
  setInsuranceName,
  setInsuranceIssueDate,
  setInsuranceExpireDate,
}: IssuranceFormProps) {
  return (
    <div className="mt-4 flex flex-col">
      <div className="flex flex-col gap-y-2 w-full mb-4">
        <label className="text-base font-semibold">Name</label>
        <Input
          className="border border-gray-400 focus-visible:ring-0 focus-visible:none py-5"
          autoComplete="off"
          placeholder="Insurance name"
          value={issuranceName}
          onChange={(e) => setInsuranceName(e.target.value)}
        />
        {insuranceNameError && (
          <span className="text-red-500">{insuranceNameError}</span>
        )}
      </div>
      <div className="flex items-center gap-x-3">
        <div className="flex flex-col gap-y-2 w-full mb-4">
          <label className="text-base font-semibold">Issue date</label>
          <DatePicker
            date={issuranceIssueDate || new Date()}
            onSelect={setInsuranceIssueDate}
          />
          {issueDateError && (
            <span className="text-red-500">{issueDateError}</span>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full mb-4">
          <label className="text-base font-semibold">Expiration date</label>
          <DatePicker
            date={issuranceExpireDate || new Date()}
            onSelect={setInsuranceExpireDate}
          />
          {expireDateError && (
            <span className="text-red-500">{expireDateError}</span>
          )}
        </div>
      </div>
    </div>
  );
}
