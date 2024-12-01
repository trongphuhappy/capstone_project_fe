import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/services/order/api-services";

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