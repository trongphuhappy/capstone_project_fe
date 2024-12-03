import { useServiceCreateOrder } from "@/services/order/services";
import { closeBackdrop, openBackdrop } from "@/stores/state-slice";
import { useAppDispatch } from "@/stores/store";

export default function useRentNow() {
  const { mutate, isPending } = useServiceCreateOrder();
  const dispatch = useAppDispatch();

  const createOrderApi = async (request: REQUEST.TCreateOder) => {
    try {
      dispatch(openBackdrop());
      mutate(request, {
        onSuccess: () => {
          dispatch(closeBackdrop());
        },
        onError: () => {
          dispatch(closeBackdrop());
        },
      });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return { createOrderApi, isPending };
}
