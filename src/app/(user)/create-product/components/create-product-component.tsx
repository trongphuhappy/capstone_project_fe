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

export default function CreateProductComponent() {
  const [fileList, setFileList] = useState<
    { file: File; previewUrl: string }[]
  >([]);

  const { isPending, getCategoriesApi } = useGetCategories();

  const [category, setCategory] = useState<API.Category | null>(null);
  const [categories, setCategories] = useState<API.Category[]>([]);

  const handleGetCategories = async () => {
    const res = await getCategoriesApi({ pageIndex: 1, pageSize: 100 });
    if (res?.value?.data.items) setCategories(res.value.data.items);
  };

  const handleChangeCategory = async (value: string) => {
    // const res = await
    if (categories?.length > 0) {
      setCategory(categories[Number.parseInt(value)]);
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

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
                    fileList={fileList}
                    setFileList={setFileList}
                    content="Upload from 1 to 6 images"
                  />
                </div>
              </div>
              {category?.isVehicle === true && (
                <div className="mt-6 flex flex-col gap-y-3">
                  <h2 className="text-xl font-semibold">Insurance images</h2>
                  <UploadImage
                    fileList={fileList}
                    setFileList={setFileList}
                    content="Upload front and back"
                  />
                </div>
              )}
            </div>
            <div className="flex-1 w-full">
              <div>
                <CreateProductForm category={category} />
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