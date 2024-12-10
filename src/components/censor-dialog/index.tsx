"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { confirmStatus } from "@/const/products";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  censorReviewProductBody,
  censorReviewProductBodyType,
} from "@/utils/schema-validations/censor.schema";
import { useServiceConfirmProduct } from "@/services/product/services";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { openBackdrop } from "@/stores/state-slice";

interface CensorDialogProps {
  open: boolean;
  type: confirmStatus;
  onClose: () => void;
}

export default function CensorDialog({
  open,
  type,
  onClose,
}: CensorDialogProps) {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm<censorReviewProductBodyType>({
    resolver: zodResolver(censorReviewProductBody),
    defaultValues: {
      reason: "",
    },
  });

  const dispatch = useAppDispatch();
  const reviewProductState = useAppSelector(
    (state) => state.productSlice.reviewProduct
  );

  const { mutate } = useServiceConfirmProduct();

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleApprove = () => {
    dispatch(openBackdrop());
    mutate(
      {
        productId: reviewProductState?.id || "",
        confirmStatus: type,
      },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      }
    );
  };

  const handleReject = (data: censorReviewProductBodyType) => {
    dispatch(openBackdrop());
    mutate(
      {
        productId: reviewProductState?.id || "",
        confirmStatus: type,
        rejectReason: data.reason,
      },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      }
    );
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
          {type === confirmStatus.Approved && (
            <form>
              <div className="flex flex-col items-start gap-y-2">
                <div>
                  <h2 className="text-[24px] font-semibold">Approve product</h2>
                  <p className="mt-3 text-[15px] opacity-90">
                    Are you sure you want to browse{" "}
                    <b>{reviewProductState?.name}</b>?
                  </p>
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
                    type="button"
                    onClick={handleApprove}
                    className="px-3 py-2 bg-[#e2e5e9] rounded-md hover:bg-[#00939f] group shadow-header-shadown"
                  >
                    <div className="flex items-center gap-x-3">
                      <span className="text-[14px] font-medium group-hover:text-white">
                        Approve
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          )}
          {type === confirmStatus.Rejected && (
            <form onSubmit={handleSubmit(handleReject)}>
              <div className="flex flex-col items-start gap-y-2">
                <div>
                  <h2 className="text-[24px] font-semibold">Reject product</h2>
                  <p className="mt-3 text-[15px] opacity-90">
                    Are you sure you want to cancel{" "}
                    <b>{reviewProductState?.name}</b>? Please fill in the reason
                  </p>
                </div>
                <div className="mt-[5px] w-full">
                  <div className="flex flex-col gap-y-2">
                    <Input
                      className={`w-full border border-gray-400 focus-visible:ring-0 focus-visible:none py-5 ${
                        errors?.reason && "border-red-500"
                      }`}
                      autoComplete="off"
                      placeholder="Reason"
                      {...register("reason")}
                    />
                    {errors?.reason && (
                      <span className="text-red-500">
                        {errors?.reason?.message}
                      </span>
                    )}
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
                        Approve
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
