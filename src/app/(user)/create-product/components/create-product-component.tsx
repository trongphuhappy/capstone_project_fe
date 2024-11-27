"use client";

import { useEffect, useState } from "react";
import UploadImage from "@/app/(user)/create-product/components/upload-image";
import CreateProductForm from "@/app/(user)/create-product/components/create-product-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetCategories from "@/hooks/use-get-categories";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { create } from "domain";
import { createProductEnd, createProductSuccess } from "@/stores/productSlice";
import useToast from "@/hooks/use-toast";
import { useServiceCreateProduct } from "@/services/product/services";
import { openBackdrop } from "@/stores/stateSlice";

export default function CreateProductComponent() {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const { mutate, isPending } = useServiceCreateProduct();
  const [productImages, setProductImages] = useState<
    { file: File; previewUrl: string }[]
  >([]);

  const [issuranceImages, setIssuranceImages] = useState<
    { file: File; previewUrl: string }[]
  >([]);

  const { getCategoriesApi } = useGetCategories();

  const [category, setCategory] = useState<API.Category | null>(null);
  const [categories, setCategories] = useState<API.Category[]>([]);
  const createProductState = useAppSelector(
    (state) => state.productSlice.createProduct
  );

  useEffect(() => {
    handleGetCategories();
  }, []);

  const handleGetCategories = async () => {
    const res = await getCategoriesApi({ pageIndex: 1, pageSize: 100 });
    if (res?.value?.data.items) setCategories(res.value.data.items);
  };

  const handleChangeCategory = async (value: string) => {
    if (categories?.length > 0) {
      setCategory(categories[Number.parseInt(value)]);
    }
  };

  const handleSubmit = (data: REQUEST.TCreateProduct) => {
    if (productImages?.length > 0) {
      // Case product is vehicle but no insurance images
      if (category?.isVehicle === true && issuranceImages?.length === 0) {
        addToast({
          type: "error",
          description: "Please upload insurance images",
        });
        return;
      }
      dispatch(openBackdrop());
      const formData: REQUEST.TCreateProduct = {
        ...data,
        categoryId: category?.id,
        productImages: productImages.map((image) => image.file),
        insuranceImages: issuranceImages.map((image) => image.file),
      };
      mutate(formData);
    } else {
      if (productImages?.length === 0) {
        addToast({
          type: "error",
          description: "Please upload product images",
        });
      }
    }
  };

  return (
    <div className="py-10 font-montserrat">
      <div className="shadow-box-item max-w-[1250px] mx-auto min-h-[500px] py-5 px-6 rounded-md">
        <div className="flex flex-col gap-y-2 w-full mb-4">
          <Select onValueChange={handleChangeCategory}>
            <SelectTrigger className="w-full border-2 border-gray-500 py-5">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {category != null ? (
          <div className="w-full flex items-start gap-x-12">
            <div className="w-[25%]">
              <div>
                <h2 className="text-xl font-semibold">Product images</h2>
                <div className="mt-6 flex flex-col gap-y-3">
                  <UploadImage
                    fileList={productImages}
                    setFileList={setProductImages}
                    content="Upload from 1 to 6 images"
                  />
                </div>
              </div>
              {category?.isVehicle === true && (
                <div className="mt-6 flex flex-col gap-y-3">
                  <h2 className="text-xl font-semibold">Insurance images</h2>
                  <UploadImage
                    fileList={issuranceImages}
                    setFileList={setIssuranceImages}
                    content="Upload front and back"
                  />
                </div>
              )}
            </div>
            <div className="flex-1 w-full">
              <div>
                <CreateProductForm
                  category={category}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        ) : (
          <h3 className="text-xl">Please choose category</h3>
        )}
      </div>
    </div>
  );
}
