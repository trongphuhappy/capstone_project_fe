"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useServiceAdminConfirmOrder,
  useServiceLessorConfirmOrder,
  useServiceUserConfirmOrder,
  useServiceUserReportOrder,
} from "@/services/order/services";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { openBackdrop } from "@/stores/state-slice";
import { CheckOrderStatus } from "@/const/order";
import {
  checkOrderProductProductBody,
  checkOrderProductProductBodyType,
} from "@/utils/schema-validations/order.schema";
import {
  feedbackProductBody,
  feedbackProductBodyType,
} from "@/utils/schema-validations/feedback.schema";
import { useServiceCreateFeedback } from "@/services/feedback/services";

interface CheckOrderDialogProps {
  open: boolean;
  type: CheckOrderStatus;
  onClose: () => void;
}

export default function CheckOrderDialog({
  open,
  type,
  onClose,
}: CheckOrderDialogProps) {
  const userState = useAppSelector((state) => state.userSlice);
  const checkOrderProductState = useAppSelector(
    (state) => state.rentSlice.checkOrderProduct
  );

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm<checkOrderProductProductBodyType>({
    resolver: zodResolver(checkOrderProductProductBody),
    defaultValues: {
      rejectReason: "",
    },
  });

  const {
    register: feedbackRegister,
    watch: feedbackWatch,
    handleSubmit: feedbackHandleSubmit,
    setError: feedbackSetError,
    formState: { errors: feedbackErrors },
    reset: feedbackReset,
    control: feedbackControl,
  } = useForm<feedbackProductBodyType>({
    resolver: zodResolver(feedbackProductBody),
    defaultValues: {
      content: "",
    },
  });

  const dispatch = useAppDispatch();

  const { mutate: mutateUser } = useServiceUserConfirmOrder();
  const { mutate: mutateLessor } = useServiceLessorConfirmOrder();
  const { mutate: mutateReport } = useServiceUserReportOrder();
  const { mutate: mutateAdmin } = useServiceAdminConfirmOrder();
  const { mutate: mutateFeedback } = useServiceCreateFeedback();

  const handleClose = () => {
    reset();
    feedbackReset();
    onClose();
  };

  const handleApprove = () => {
    dispatch(openBackdrop());
    if (checkOrderProductState?.isAdmin === false) {
      if (checkOrderProductState?.isLessor === true) {
        mutateLessor(
          {
            orderId: checkOrderProductState?.order.id || "",
            isApproved: true,
            rejectReason: "",
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
      } else {
        mutateUser(
          {
            orderId: checkOrderProductState?.order.id || "",
            isApproved: true,
            rejectReason: "",
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
      }
    } else {
      mutateAdmin(
        {
          orderId: checkOrderProductState?.order.id || "",
          isApproved: true,
          rejectReason: "",
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
    }
  };

  const handleReject = (data: checkOrderProductProductBodyType) => {
    dispatch(openBackdrop());
    if (checkOrderProductState?.isAdmin === false) {
      if (checkOrderProductState?.isLessor === true) {
        mutateLessor(
          {
            orderId: checkOrderProductState?.order.id || "",
            isApproved: false,
            rejectReason: data.rejectReason,
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
      }
      else {
        mutateUser(
          {
            orderId: checkOrderProductState?.order.id || "",
            isApproved: false,
            rejectReason: data.rejectReason,
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
      }
    } else {
      mutateAdmin(
        {
          orderId: checkOrderProductState?.order.id || "",
          isApproved: false,
          rejectReason: data.rejectReason,
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
    }
  };

  const handleFeedback = (data: feedbackProductBodyType) => {
    dispatch(openBackdrop());
    mutateFeedback(
      {
        accountId: userState.profile?.userId || "",
        orderId: checkOrderProductState?.order.id || "",
        content: data.content,
        productId: checkOrderProductState?.order?.product.id || "",
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

  const handleReport = (data: checkOrderProductProductBodyType) => {
    dispatch(openBackdrop());
    if (checkOrderProductState?.isLessor === false) {
      mutateReport(
        {
          orderId: checkOrderProductState?.order.id || "",
          userReport: data.rejectReason,
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
    }
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
          {type === CheckOrderStatus.Approved && (
            <form>
              <div className="flex flex-col items-start gap-y-2">
                <div>
                  <h2 className="text-[24px] font-semibold">Approve order</h2>
                  <p className="mt-3 text-[15px] opacity-90">
                    Are you sure approve?
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
          {type === CheckOrderStatus.Rejected && (
            <form onSubmit={handleSubmit(handleReject)}>
              <div className="flex flex-col items-start gap-y-2">
                <div>
                  <h2 className="text-[24px] font-semibold">
                    Are you sure reject
                  </h2>
                  <p className="mt-3 text-[15px] opacity-90">
                    Please fill in the reason
                  </p>
                </div>
                <div className="mt-[5px] w-full">
                  <div className="flex flex-col gap-y-2">
                    <Input
                      className={`w-full border border-gray-400 focus-visible:ring-0 focus-visible:none py-5 ${errors?.rejectReason && "border-red-500"
                        }`}
                      autoComplete="off"
                      placeholder="Reason"
                      {...register("rejectReason")}
                    />
                    {errors?.rejectReason && (
                      <span className="text-red-500">
                        {errors?.rejectReason?.message}
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
                        Submit
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          )}
          {type === CheckOrderStatus.Report && (
            <form onSubmit={handleSubmit(handleReport)}>
              <div className="flex flex-col items-start gap-y-2">
                <div>
                  <h2 className="text-[24px] font-semibold">
                    Are you sure report
                  </h2>
                  <p className="mt-3 text-[15px] opacity-90">
                    Please fill in the reason
                  </p>
                </div>
                <div className="mt-[5px] w-full">
                  <div className="flex flex-col gap-y-2">
                    <Input
                      className={`w-full border border-gray-400 focus-visible:ring-0 focus-visible:none py-5 ${errors?.rejectReason && "border-red-500"
                        }`}
                      autoComplete="off"
                      placeholder="Reason"
                      {...register("rejectReason")}
                    />
                    {errors?.rejectReason && (
                      <span className="text-red-500">
                        {errors?.rejectReason?.message}
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
                        Submit
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          )}
          {type === CheckOrderStatus.Feedback && (
            <form onSubmit={feedbackHandleSubmit(handleFeedback)}>
              <div className="flex flex-col items-start gap-y-2">
                <div>
                  <h2 className="text-[24px] font-semibold">Feedback</h2>
                  <p className="mt-3 text-[15px] opacity-90">
                    Please fill content
                  </p>
                </div>
                <div className="mt-[5px] w-full">
                  <div className="flex flex-col gap-y-2">
                    <Input
                      className={`w-full border border-gray-400 focus-visible:ring-0 focus-visible:none py-5 ${feedbackErrors?.content && "border-red-500"
                        }`}
                      autoComplete="off"
                      placeholder="Content"
                      {...feedbackRegister("content")}
                    />
                    {feedbackErrors?.content && (
                      <span className="text-red-500">
                        {errors?.rejectReason?.message}
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
                        Submit
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
