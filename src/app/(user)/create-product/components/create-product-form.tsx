"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCreateProduct from "@/app/(user)/create-product/hooks/useCreateProduct";
import { CreateProductBodyType } from "@/utils/schema-validations/product.schema";
import { useState } from "react";
import IssuranceForm from "@/app/(user)/create-product/components/issurance-form";
import SurchageForm from "@/app/(user)/create-product/components/surchage-form";

interface CreateProductFormProps {
  category: API.Category | null;
}

export default function CreateProductForm({
  category,
}: CreateProductFormProps) {
  const { register, errors, watch, handleSubmit } = useCreateProduct();
  const [isSubmit, setSubmit] = useState<boolean>(false);

  const [insuranceData, setInsuranceData] = useState<{
    issuranceName: string;
    issuranceIssueDate: Date | undefined;
    issuranceExpireDate: Date | undefined;
  } | null>(null);

  const handleInsuranceSubmit = (data: {
    issuranceName: string;
    issuranceIssueDate: Date | undefined;
    issuranceExpireDate: Date | undefined;
  }) => {
    setInsuranceData(data);
  };

  const handleSubmitData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmit(true);
    handleSubmit(handleSubmitForm)();
  };

  const handleSubmitForm = (data: CreateProductBodyType) => {
    try {
      console.log(insuranceData + " " + data);
    } catch {
    } finally {
      setInsuranceData(null);
      setSubmit(false);
    }
    // console.log("Final Form Submit", { insuranceData });
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmitData}>
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
              <IssuranceForm
                submit={isSubmit}
                onSubmit={handleInsuranceSubmit}
              />
            </div>
          )}
          <div className="mt-2">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold mr-2">Surchage</h3>
              <span>(may or may not be filled in.)</span>
            </div>
            <SurchageForm />
          </div>
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
