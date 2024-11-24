"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import {
  LastNameBody,
  LastNameBodyType,
} from "@/utils/schema-validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useServiceUpdateProfile } from "@/services/member/services";
import { closeBackdrop, openBackdrop } from "@/stores/stateSlice";

interface UpdateLastNameProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateLastName({ open, onClose }: UpdateLastNameProps) {
  const profileState = useAppSelector(
    (state) => state.userProfileslice.profile
  );
  const dispatch = useAppDispatch();
  const { mutate } = useServiceUpdateProfile();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LastNameBodyType>({
    resolver: zodResolver(LastNameBody),
    defaultValues: {
      lastName: profileState?.lastName || "",
    },
  });

  useEffect(() => {
    if (profileState?.lastName) setValue("lastName", profileState?.lastName);
  }, [profileState?.lastName]);

  const handleClose = () => {
    onClose();
    if (profileState?.lastName) setValue("lastName", profileState?.lastName);
  };

  const handleSubmitForm = (data: LastNameBodyType) => {
    dispatch(openBackdrop());
    const form: REQUEST.TUpdateProfile = {
      lastName: data.lastName,
    };
    mutate(form, {
      onSuccess: (data) => {
        reset();
        handleClose();
        setValue("lastName", data.value.data.lastName || "");
        dispatch(closeBackdrop());
      },
      onError: (error) => {
        dispatch(closeBackdrop());
        setError("lastName", {
          type: "manual",
          message: error.detail,
        });
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
                  Update your last name
                </h2>
                <p className="text-[15px] opacity-90">
                  Your name will be displayed on your profile, and posts.
                </p>
              </div>
              <div className="mt-[5px] flex flex-col gap-y-3 w-full">
                <label className="text-[14px] font-semibold">Last name</label>
                <Input
                  className={`w-full border border-gray-400 focus-visible:ring-0 focus-visible:none py-5 ${
                    errors?.lastName && "border-red-500"
                  }`}
                  autoComplete="off"
                  placeholder="Last name"
                  {...register("lastName")}
                />
                {errors?.lastName && (
                  <span className="text-red-500">
                    {errors?.lastName?.message}
                  </span>
                )}
              </div>
              <div className="ml-auto mr-0 mt-3">
                <button
                  type="button"
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
