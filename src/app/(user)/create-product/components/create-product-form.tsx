"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCreateProduct from "@/app/(user)/create-product/hooks/useCreateProduct";
import { CreateProductBodyType } from "@/utils/schema-validations/product.schema";
import { useEffect, useState } from "react";
import IssuranceForm from "@/app/(user)/create-product/components/issurance-form";
import SurchargeForm from "@/app/(user)/create-product/components/surcharge-form";
import useGetSurcharges from "@/hooks/use-get-surcharges";

interface CreateProductFormProps {
  category: API.Category | null;
  onSubmit: (data: REQUEST.TCreateProduct) => void;
}

export default function CreateProductForm({
  category,
  onSubmit,
}: CreateProductFormProps) {
  const { register, errors, watch, handleSubmit } = useCreateProduct();
  const [surcharges, setSurcharges] = useState<API.TSurcharge[]>([]);

  const { getSurchargesApi, isPending } = useGetSurcharges();

  // State issurance
  const [issuranceName, setInsuranceName] = useState<string>("");
  const [issuranceIssueDate, setInsuranceIssueDate] = useState<Date | null>();
  const [issuranceExpireDate, setInsuranceExpireDate] = useState<Date | null>();
  const [insuranceNameError, setInsuranceNameError] = useState<string | null>(
    null
  );
  const [issueDateError, setIssueDateError] = useState<string | null>(null);
  const [expireDateError, setExpireDateError] = useState<string | null>(null);

  // State surcharge
  const [selectedSurcharges, setSelectedSurcharges] = useState<{
    [key: string]: number | "";
  }>({});

  useEffect(() => {
    handleFetchSurcharges();
  }, []);

  const handleFetchSurcharges = async () => {
    const res = await getSurchargesApi();
    if (res) setSurcharges(res.value.data.items);
  };

  // Validate issurance
  const validateIssurance = () => {
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
    return isValid;
  };

  const handleSubmitForm = (data: CreateProductBodyType) => {
    try {
      const listSurcharges = Object.entries(selectedSurcharges)
        .filter(([, value]) => value !== "")
        .map(
          ([id, value]) =>
            ({
              SurchargeId: id,
              Price: Number(value),
            } as REQUEST.TSurcharge)
        );
      if (category?.isVehicle === true) {
        const isCheckIssurance = validateIssurance();
        if (isCheckIssurance) {
          onSubmit({
            ...data,
            insuranceName: issuranceName,
            issueDate: issuranceIssueDate?.toDateString(),
            expirationDate: issuranceExpireDate?.toDateString(),
            listSurcharges: listSurcharges,
          } as REQUEST.TCreateProduct);
        }
      } else {
        onSubmit({
          ...data,
          listSurcharges: listSurcharges,
        } as REQUEST.TCreateProduct);
      }
    } catch {}
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <h2 className="text-lg lg:text-xl font-semibold">Information details</h2>
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
          <div className="flex flex-wrap lg:flex-nowrap gap-y-4 lg:gap-x-3">
            <div className="flex flex-col gap-y-2 w-full sm:w-[48%] lg:w-full">
              <label className="text-base font-semibold">Rent</label>
              <div className="relative pr-7 border border-gray-400 rounded-md">
                <Input
                  type="number"
                  className="border-none focus-visible:ring-0 focus-visible:none py-5 bg-transparent"
                  autoComplete="off"
                  placeholder="Rent"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />
                <span className="absolute top-1/2 -translate-y-1/2 right-[1%]">
                  Vnd
                </span>
              </div>

              {errors?.price && (
                <span className="text-red-500">{errors?.price?.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full mb-4">
              <label className="text-base font-semibold">
                Product purchase
              </label>
              <div className="relative pr-7 border border-gray-400 rounded-md">
                <Input
                  type="number"
                  className="border-none focus-visible:ring-0 focus-visible:none py-5 bg-transparent"
                  autoComplete="off"
                  placeholder="Product purchase"
                  {...register("value", {
                    valueAsNumber: true,
                  })}
                />
                <span className="absolute top-1/2 -translate-y-1/2 right-[1%]">
                  Vnd
                </span>
              </div>
              {errors?.value && (
                <span className="text-red-500">{errors?.value?.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full mb-4">
              <label className="text-base font-semibold">
                Maximum rental days
              </label>
              <div className="relative pr-7 border border-gray-400 rounded-md">
                <Input
                  type="number"
                  className="border-none focus-visible:ring-0 focus-visible:none py-5 bg-transparent"
                  autoComplete="off"
                  placeholder="Product purchase"
                  {...register("maximumRentDays", {
                    valueAsNumber: true,
                  })}
                />
                <span className="absolute top-1/2 -translate-y-1/2 right-[1%]">
                  Day
                </span>
              </div>
              {errors?.maximumRentDays && (
                <span className="text-red-500">
                  {errors?.maximumRentDays?.message}
                </span>
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
              <h3 className="text-lg lg:text-xl font-semibold">Insurance</h3>
              <IssuranceForm
                issuranceExpireDate={issuranceExpireDate || null}
                issuranceIssueDate={issuranceIssueDate || null}
                issuranceName={issuranceName || ""}
                issueDateError={issueDateError}
                expireDateError={expireDateError}
                insuranceNameError={insuranceNameError}
                setInsuranceExpireDate={setInsuranceExpireDate}
                setInsuranceIssueDate={setInsuranceIssueDate}
                setInsuranceName={setInsuranceName || null}
              />
            </div>
          )}
          <div className="mt-2">
            <div className="flex items-center">
              <h3 className="text-lg lg:text-xl font-semibold mr-2">Surchage</h3>
              <span>(may or may not be filled in.)</span>
            </div>
            <div className="mt-4">
              {surcharges?.length > 0 && (
                <SurchargeForm
                  surcharges={surcharges}
                  selectedSurcharges={selectedSurcharges}
                  setSelectedSurcharges={setSelectedSurcharges}
                />
              )}
            </div>
          </div>
        </div>
        <div className="text-right mt-4">
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
