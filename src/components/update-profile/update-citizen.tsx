"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  CitizenBody,
  CitizenBodyType,
} from "@/utils/schema-validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useServiceUpdateCitizen, useServiceUpdateProfile } from "@/services/member/services";
import { closeBackdrop, openBackdrop } from "@/stores/stateSlice";
import UpdateCitizenImage from "@/components/update-profile/update-citizen-image";
import useToast from "@/hooks/use-toast";

interface UpdateCitizenProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateCitizen({ open, onClose }: UpdateCitizenProps) {
  const { addToast } = useToast();
  const [citizenFrontImage, setCitizenFrontImage] = useState<
    { file: File; previewUrl: string }[]
  >([]);

  const [citizenBackImage, setCitizenBackImage] = useState<
    { file: File; previewUrl: string }[]
  >([]);

  const profileState = useAppSelector(
    (state) => state.userProfileslice.profile
  );
  const dispatch = useAppDispatch();
  const { mutate } = useServiceUpdateCitizen();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CitizenBodyType>({
    resolver: zodResolver(CitizenBody),
    defaultValues: {
      citizenNumber: profileState?.citizenId || "",
    },
  });

  useEffect(() => {
    if (profileState?.citizenId)
      setValue("citizenNumber", profileState?.citizenId);
  }, [profileState?.firstName]);

  const handleClose = () => {
    onClose();
    setCitizenFrontImage([]);
    setCitizenBackImage([]);
    if (profileState?.citizenId)
      setValue("citizenNumber", profileState?.citizenId);
  };

  const handleSubmitForm = (data: CitizenBodyType) => {
    if (citizenFrontImage.length === 0) {
      addToast({
        type: "error",
        description: "Please upload citizen front image",
      });
      return;
    }

    if (citizenBackImage.length === 0) {
      addToast({
        type: "error",
        description: "Please upload citizen back image",
      });
      return;
    }

    dispatch(openBackdrop());
    const form: REQUEST.TUpdateCitizen = {
      citizenId: data.citizenNumber,
      frontImageCitizen: citizenFrontImage[0].file,
      backImageCitizen: citizenBackImage[0].file,
    };
    mutate(form, {
      onSuccess: (data) => {
        reset();
        handleClose();
        dispatch(closeBackdrop());
      },
      onError: (error) => {
        dispatch(closeBackdrop());
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[600px] px-3 pt-2 pb-7 my-0 overflow-y-auto">
        <div className="px-2 pt-5 pb-6 font-sans">
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
                  Update your citizen
                </h2>
                <p className="text-[15px] opacity-90">
                  Verify identity with citizen
                </p>
              </div>
              <div className="w-full">
                <div className="mt-[5px] flex flex-col gap-y-3 w-full">
                  <label className="text-[14px] font-semibold">
                    Citizen number
                  </label>
                  <Input
                    className={`w-full border border-gray-400 focus-visible:ring-0 focus-visible:none py-5 ${
                      errors?.citizenNumber && "border-red-500"
                    }`}
                    autoComplete="off"
                    placeholder="eg. 123456789"
                    {...register("citizenNumber")}
                  />
                  {errors?.citizenNumber && (
                    <span className="text-red-500">
                      {errors?.citizenNumber?.message}
                    </span>
                  )}
                </div>
                <div className="mt-[5px] flex flex-col gap-y-3 w-full">
                  <label className="text-[14px] font-semibold">
                    Citizen image
                  </label>
                  <div className="grid grid-cols-2 gap-x-2">
                    <UpdateCitizenImage
                      content="Please choose front image"
                      fileList={citizenFrontImage}
                      setFileList={setCitizenFrontImage}
                    />
                    <UpdateCitizenImage
                      content="Please choose back image"
                      fileList={citizenBackImage}
                      setFileList={setCitizenBackImage}
                    />
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
