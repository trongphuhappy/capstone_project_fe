import { closeAddedCartDialog, openAddedCartDialog } from "@/stores/stateSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function useAddedCartDialog() {
  const dispatch = useAppDispatch();

  const addedCartDialogState = useAppSelector(
    (state) => state.stateSlice.addedCartDialog
  );

  const onOpenAddedCartDialog = () => {
    dispatch(openAddedCartDialog());
  };

  const onCloseAddedCartDialog = () => {
    dispatch(closeAddedCartDialog());
  };

  return {
    open: addedCartDialogState.open,
    onOpenAddedCartDialog,
    onCloseAddedCartDialog,
  };
}
