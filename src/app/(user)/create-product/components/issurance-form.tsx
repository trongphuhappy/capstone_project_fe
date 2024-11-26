"use client";

import { Input } from "@/components/ui/input";
import { DatePicker } from "@/app/(user)/create-product/components/date-picker";
import { useEffect, useState } from "react";

interface IssuranceFormProps {
  submit: boolean;
  onSubmit: (data: {
    issuranceName: string;
    issuranceIssueDate: Date | undefined;
    issuranceExpireDate: Date | undefined;
  }) => void;
}

export default function IssuranceForm({
  submit,
  onSubmit,
}: IssuranceFormProps) {
  const [issuranceName, setInsuranceName] = useState<string>("");
  const [issuranceIssueDate, setInsuranceIssueDate] = useState<Date>();
  const [issuranceExpireDate, setInsuranceExpireDate] = useState<Date>();
  const [insuranceNameError, setInsuranceNameError] = useState<string | null>(
    null
  );
  const [issueDateError, setIssueDateError] = useState<string | null>(null);
  const [expireDateError, setExpireDateError] = useState<string | null>(null);

  const validateAndSubmit = () => {
    let isValid = true;

    setInsuranceNameError(null);
    setIssueDateError(null);
    setExpireDateError(null);

    if (!issuranceName.trim()) {
      setInsuranceNameError("Insurance name cannot be empty.");
      isValid = false;
    }

    if (!issuranceIssueDate) {
      setIssueDateError("Issue date cannot be empty.");
      isValid = false;
    }

    if (!issuranceExpireDate) {
      setExpireDateError("Expiration date cannot be empty.");
      isValid = false;
    }

    if (
      issuranceIssueDate &&
      issuranceExpireDate &&
      issuranceIssueDate >= issuranceExpireDate
    ) {
      setIssueDateError("Issue date must be earlier than expiration date.");
      setExpireDateError("Expiration date must be later than issue date.");
      isValid = false;
    }

    if (isValid) {
      onSubmit({
        issuranceName,
        issuranceIssueDate,
        issuranceExpireDate,
      });
    }
  };

  useEffect(() => {
    if (submit === true) validateAndSubmit();
  }, [submit]);

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
            date={issuranceIssueDate}
            onSelect={setInsuranceIssueDate}
          />
          {issueDateError && (
            <span className="text-red-500">{issueDateError}</span>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full mb-4">
          <label className="text-base font-semibold">Expiration date</label>
          <DatePicker
            date={issuranceExpireDate}
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
