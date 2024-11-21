"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCreateProduct from "@/app/(user)/create-product/hooks/useCreateProduct";
import { DatePicker } from "@/app/(user)/create-product/components/date-picker";
import { CreateProductBodyType } from "@/utils/schema-validations/product.schema";
import { useState } from "react";

interface CreateProductFormProps {
  category: API.Category | null;
}

export default function CreateProductForm({
  category,
}: CreateProductFormProps) {
  const { register, errors, watch, handleSubmit } = useCreateProduct();

  // State variables for insurance details
  const [issuranceName, setInsuranceName] = useState<string>("");
  const [issuranceIssueDate, setInsuranceIssueDate] = useState<Date>();
  const [issuranceExpireDate, setInsuranceExpireDate] = useState<Date>();
  const [issuranceDescription, setInsuranceDescription] = useState<string>("");

  // State variables for error messages
  const [insuranceNameError, setInsuranceNameError] = useState<string | null>(
    null
  );
  const [issueDateError, setIssueDateError] = useState<string | null>(null);
  const [expireDateError, setExpireDateError] = useState<string | null>(null);

  const handleSubmitForm = (data: CreateProductBodyType) => {
    setInsuranceNameError(null);
    setIssueDateError(null);
    setExpireDateError(null);

    console.log("123");
    if (!issuranceName || issuranceName === "") {
      setInsuranceNameError("Insurance name is required");
    }
    if (!issuranceIssueDate) {
      setIssueDateError("Issue date is required");
    }
    if (!issuranceExpireDate) {
      setExpireDateError("Expire date is required");
    }

    if (!insuranceNameError && !issueDateError && !expireDateError) {
      console.log(data);
    }
  };

  console.log(insuranceNameError);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <h2 className="text-xl font-semibold">Information details</h2>
        <div className="mt-4 flex flex-col">
          <div className="flex flex-col gap-y-2 w-full mb-4">
            <label className="text-base font-semibold">Title</label>
            <Input
              className="border border-gray-400 focus-visible:ring-0 focus-visible:none py-5"
              autoComplete="off"
              placeholder="Title"
              {...register("name")}
            />
            {errors?.name && (
              <span className="text-red-500">{errors?.name?.message}</span>
            )}
          </div>
          <div className="flex items-center gap-x-3">
            <div className="flex flex-col gap-y-2 w-full mb-4">
              <label className="text-base font-semibold">Rent</label>
              <Input
                className="border border-gray-400 focus-visible:ring-0 focus-visible:none py-5"
                autoComplete="off"
                placeholder="Rent"
                {...register("price", {
                  valueAsNumber: true,
                })}
              />
              {errors?.price && (
                <span className="text-red-500">{errors?.price?.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full mb-4">
              <label className="text-base font-semibold">
                Product purchase
              </label>
              <Input
                className="border border-gray-400 focus-visible:ring-0 focus-visible:none py-5"
                autoComplete="off"
                placeholder="Product purchase"
                {...register("value", {
                  valueAsNumber: true,
                })}
              />
              {errors?.value && (
                <span className="text-red-500">{errors?.value?.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 mb-2">
            <label className="text-base font-semibold">Description</label>
            <Textarea
              className="border border-gray-400 h-[200px] focus-visible:ring-0 focus-visible:none py-2 resize-none"
              placeholder="Description"
              {...register("description")}
            />
            <div className="flex items-center justify-between">
              <span className="text-red-500">
                {errors?.description?.message}
              </span>
              <span className="text-[14px] text-gray-600">
                {watch("description").length} character
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 mb-4">
            <label className="text-base font-semibold">Policy</label>
            <Textarea
              className="border border-gray-400 h-[200px] focus-visible:ring-0 focus-visible:none py-2 resize-none"
              placeholder="Policy"
              {...register("policies")}
            />
            <div className="flex items-center justify-between">
              <span className="text-red-500">{errors?.policies?.message}</span>
              <span className="text-[14px] text-gray-600">
                {watch("policies").length} character
              </span>
            </div>
          </div>
          {category?.isVehicle === true && (
            <div>
              <h3 className="text-xl font-semibold">Insurance</h3>
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
                    <label className="text-base font-semibold">
                      Issue date
                    </label>
                    <DatePicker
                      date={issuranceIssueDate}
                      onSelect={setInsuranceExpireDate}
                    />
                    {issueDateError && (
                      <span className="text-red-500">{issueDateError}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-2 w-full mb-4">
                    <label className="text-base font-semibold">
                      Expiration date
                    </label>
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
            </div>
          )}
        </div>
        <div className="text-right">
          <button
            type="button"
            className="mr-3 px-3 py-2 bg-[#e2e5e9] rounded-xl hover:bg-[#00939f] group shadow-header-shadown"
          >
            <span className="text-base font-medium group-hover:text-white">
              Preview
            </span>
          </button>
          <button
            type="submit"
            className="px-3 py-2 bg-[#e2e5e9] rounded-xl hover:bg-[#00939f] group shadow-header-shadown"
          >
            <span className="text-base font-medium group-hover:text-white">
              Post now
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
