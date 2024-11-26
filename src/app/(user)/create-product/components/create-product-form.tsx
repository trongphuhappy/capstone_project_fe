"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCreateProduct from "@/app/(user)/create-product/hooks/useCreateProduct";
import { CreateProductBodyType } from "@/utils/schema-validations/product.schema";
import { useEffect, useState } from "react";
import IssuranceForm from "@/app/(user)/create-product/components/issurance-form";
import SurchargeForm from "@/app/(user)/create-product/components/surcharge-form";
import useGetSurcharges from "@/hooks/use-get-surcharges";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { createProduct } from "@/stores/productSlice";

interface CreateProductFormProps {
  category: API.Category | null;
}

export default function CreateProductForm({
  category,
}: CreateProductFormProps) {
  const dispatch = useAppDispatch();
  const { register, errors, watch, handleSubmit } = useCreateProduct();
  const [surcharges, setSurcharges] = useState<API.Surcharge[]>([]);
  const [sumbitSurcharges, setSubmitSurcharges] = useState<
    REQUEST.TSurcharge[]
  >([]);
  const createProductState = useAppSelector(
    (state) => state.productSlice.createProduct
  );

  const { getSurchargesApi, isPending } = useGetSurcharges();

  useEffect(() => {
    handleFetchSurcharges();
  }, []);

  const handleFetchSurcharges = async () => {
    const res = await getSurchargesApi();
    if (res) setSurcharges(res.value.data.items);
  };

  const handleSurchargeSubmit = (data: REQUEST.TSurcharge[]) => {
    setSubmitSurcharges(data);
  };

  const handleSubmitForm = (data: CreateProductBodyType) => {
    try {
      dispatch(
        createProduct({
          name: data.name,
          price: data.price,
          value: data.value,
          description: data.description,
          policies: data.policies,
        })
      );
    } catch {
    } finally {
    }
  };

  const handleSubmitData = () => {};

  console.log(createProductState);

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
              <IssuranceForm />
            </div>
          )}
          <div className="mt-2">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold mr-2">Surchage</h3>
              <span>(may or may not be filled in.)</span>
            </div>
            <div className="mt-4">
              {surcharges?.length > 0 && (
                <SurchargeForm
                  surcharges={surcharges}
                  onSubmit={handleSurchargeSubmit}
                />
              )}
            </div>
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
