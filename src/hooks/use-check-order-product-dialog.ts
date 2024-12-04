import { CheckOrderStatus } from "@/const/order";
import {
  addCheckOrderProduct,
  removeCheckOrderProduct,
} from "@/stores/rent-slice";
import {
  closeCheckOrderProductDialog,
  openCheckOrderProductDialog,
} from "@/stores/state-slice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function useCheckOrderProductDialog() {
  const dispatch = useAppDispatch();

  const checkOrderProductDialog = useAppSelector(
    (state) => state.stateSlice.checkOrderProductDialog
  );

  const onOpenCheckOrderProductDialog = (
    order: API.TOrders,
    isLessor: true | false,
    isAdmin: true | false,
    type: CheckOrderStatus
  ) => {
    dispatch(openCheckOrderProductDialog(type));
    dispatch(
      addCheckOrderProduct({
        order: order,
        isLessor: isLessor,
        isAdmin: isAdmin,
      })
    );
  };

  const onCloseOrderProductDialog = () => {
    dispatch(closeCheckOrderProductDialog());
    dispatch(removeCheckOrderProduct());
  };

  return {
    open: checkOrderProductDialog.open,
    type: checkOrderProductDialog.type,
    onOpenCheckOrderProductDialog,
    onCloseOrderProductDialog,
  };
}
