"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LessorInfoBody,
  LessorInfoBodyType,
} from "@/utils/schema-validations/user.schema";
import useGetProfile from "@/app/(user)/profile/hooks/useGetProfile";
import useGetLessor from "@/app/(user)/profile/hooks/useGetLessor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useServiceUpdateInfoLessor } from "@/services/member/services";

interface UpdateLessorProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateLessor({ open, onClose }: UpdateLessorProps) {
  const { lessorState, getLessorApi } = useGetLessor();
  const [location, setLocation] = useState<string>("HoChiMinh");

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LessorInfoBodyType>({
    resolver: zodResolver(LessorInfoBody),
    defaultValues: {
      ShopName: lessorState?.shopName || "",
      WareHouseAddress: lessorState?.wareHouseAddress || "",
    },
  });

  const { mutate } = useServiceUpdateInfoLessor();

  useEffect(() => {
    if (lessorState?.shopName) setValue("ShopName", lessorState.shopName);
    if (lessorState?.wareHouseAddress)
      setValue("WareHouseAddress", lessorState.wareHouseAddress);
    setLocation("HoChiMinh");
  }, [lessorState?.shopName, lessorState?.wareHouseAddress]);

  const handleClose = () => {
    onClose();
    if (lessorState?.shopName) setValue("ShopName", lessorState.shopName);
    if (lessorState?.wareHouseAddress)
      setValue("WareHouseAddress", lessorState.wareHouseAddress);
    setLocation("HoChiMinh");
  };

  const handleSubmitForm = (data: LessorInfoBodyType) => {
    const form: REQUEST.TUpdateLessorInfo = {
      shopName: data.ShopName,
      wareHouseAddress: data.WareHouseAddress,
      locationType: location === "HoChiMinh" ? 1 : 2,
    };
    mutate(form, {
      onSuccess: async () => {
        handleClose();
        await getLessorApi();
      },
      onError: () => {
        handleClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[600px] px-3 pt-2 pb-7 my-0 overflow-y-auto font-montserrat">
        <div className="px-2 pt-5 pb-6">
          <div className="flex justify-end">
            <button
              className="w-8 h-8 rounded-full text-2xl opacity-70 hover:bg-black/10 flex justify-center items-center group"
              onClick={handleClose}
            >
              <i>
                <X
                  strokeWidth={2.75}
                  className="text-gray-500 group-hover:text-gray-950 w-5 h-5"
                />
              </i>
            </button>
          </div>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="flex flex-col items-start gap-y-2">
              <div>
                <h2 className="text-[24px] font-semibold">
                  Update your lessor information
                </h2>
                <p className="text-[15px] opacity-90">
                  Update to allow renters to view your information
                </p>
              </div>
              <div className="mt-[5px] w-full">
                <div className="flex flex-col gap-y-2">
                  <label className="text-[14px] font-semibold">Shop name</label>
                  <Input
                    className={`w-full border border-gray-400 focus-visible:ring-0 focus-visible:none py-5 ${
                      errors?.ShopName && "border-red-500"
                    }`}
                    autoComplete="off"
                    placeholder="Shop name"
                    {...register("ShopName")}
                  />
                  {errors?.ShopName && (
                    <span className="text-red-500">
                      {errors?.ShopName?.message}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-col gap-y-2">
                  <label className="text-[14px] font-semibold">Address</label>
                  <Input
                    className={`w-full border border-gray-400 focus-visible:ring-0 focus-visible:none py-5 ${
                      errors?.ShopName && "border-red-500"
                    }`}
                    autoComplete="off"
                    placeholder="Address"
                    {...register("WareHouseAddress")}
                  />
                  {errors?.WareHouseAddress && (
                    <span className="text-red-500">
                      {errors?.WareHouseAddress?.message}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-col gap-y-2">
                  <div className="flex justify-between">
                    <label className="text-[14px] font-semibold">
                      Location
                    </label>
                  </div>
                  <div>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger
                        className={`w-full border border-gray-400 focus-visible:ring-0 focus-visible:none py-5`}
                      >
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value={"HoChiMinh"}
                          className="font-montserrat"
                        >
                          Ho Chi Minh city
                        </SelectItem>
                        <SelectItem value={"HaNoi"} className="font-montserrat">
                          Ha Noi capital
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="ml-auto mr-0 mt-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="mr-2 px-3 py-2 bg-[#e2e5e9] rounded-md hover:bg-[#00939f] group shadow-header-shadown"
                >
                  <div className="flex items-center gap-x-3">
                    <span className="text-[14px] font-medium group-hover:text-white">
                      Cancel
                    </span>
                  </div>
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#e2e5e9] rounded-md hover:bg-[#00939f] group shadow-header-shadown"
                >
                  <div className="flex items-center gap-x-3">
                    <span className="text-[14px] font-medium group-hover:text-white">
                      Save
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
