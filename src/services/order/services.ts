import { useMutation } from "@tanstack/react-query";
import { adminConfirmOrder, createOrder, lessorConfirmOrder, userConfirmOrder, userReportOrder } from "@/services/order/api-services";
import useToast from "@/hooks/use-toast";
import { useAppDispatch } from "@/stores/store";
import { closeBackdrop } from "@/stores/state-slice";

export const useServiceCreateOrder = () => {
  return useMutation<
    TResponseData<API.TCreateOrder>,
    TMeta,
    REQUEST.TCreateOder
  >({
    mutationFn: createOrder,
    onSuccess: (data) => {
      window.open(data.value.data.paymentUrl, "_blank");
    },
  });
};

export const useServiceLessorConfirmOrder = () => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  return useMutation<TResponse, TMeta, REQUEST.TConfirmOrder>({
    mutationFn: lessorConfirmOrder,
    onSuccess: (data) => {
      dispatch(closeBackdrop());
      addToast({
        type: "success",
        description: data.value.message,
        duration: 3500,
      });
    },
    onError: (error) => {
      dispatch(closeBackdrop());
      addToast({
        type: "error",
        description: error.detail,
      });
    },
  });
};

export const useServiceUserConfirmOrder = () => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  return useMutation<TResponse, TMeta, REQUEST.TConfirmOrder>({
    mutationFn: userConfirmOrder,
    onSuccess: (data) => {
      dispatch(closeBackdrop());
      addToast({
        type: "success",
        description: data.value.message,
        duration: 3500,
      });
    },
    onError: (error) => {
      dispatch(closeBackdrop());
      addToast({
        type: "error",
        description: error.detail,
      });
    },
  });
};

export const useServiceUserReportOrder = () => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  return useMutation<TResponse, TMeta, REQUEST.TReportOrder>({
    mutationFn: userReportOrder,
    onSuccess: (data) => {
      dispatch(closeBackdrop());
      addToast({
        type: "success",
        description: data.value.message,
        duration: 3500,
      });
    },
    onError: (error) => {
      dispatch(closeBackdrop());
      addToast({
        type: "error",
        description: error.detail,
      });
    },
  });
};

export const useServiceAdminConfirmOrder = () => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  return useMutation<TResponse, TMeta, REQUEST.TConfirmOrder>({
    mutationFn: adminConfirmOrder,
    onSuccess: (data) => {
      dispatch(closeBackdrop());
      addToast({
        type: "success",
        description: data.value.message,
        duration: 3500,
      });
    },
    onError: (error) => {
      dispatch(closeBackdrop());
      addToast({
        type: "error",
        description: error.detail,
      });
    },
  });
};