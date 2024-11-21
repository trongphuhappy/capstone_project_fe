import { closeSearchDialog, openSearchDialog } from "@/stores/stateSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function useSearchDialog() {
  const dispatch = useAppDispatch();

  const searchDialogState = useAppSelector(
    (state) => state.stateSlice.searchDialog
  );

  const onOpenSearchDialog = () => {
    dispatch(openSearchDialog());
  };

  const onCloseSearchDialog = () => {
    dispatch(closeSearchDialog());
  };

  return {
    open: searchDialogState.open,
    onOpenSearchDialog,
    onCloseSearchDialog,
  };
}
