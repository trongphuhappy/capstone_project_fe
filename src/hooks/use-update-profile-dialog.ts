import {
  closeUpdateProfileDialog,
  openUpdateProfileDialog,
} from "@/stores/stateSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function useUpdateProfileDialog() {
  const dispatch = useAppDispatch();

  const updateProfileDialogState = useAppSelector(
    (state) => state.stateSlice.updateProfileDialog
  );

  const onOpenUpdateProfile = () => {
    dispatch(openUpdateProfileDialog());
  };

  const onCloseUpdateProfile = () => {
    dispatch(closeUpdateProfileDialog());
  };

  return {
    profileOpen: updateProfileDialogState.open,
    onOpenUpdateProfile,
    onCloseUpdateProfile,
  };
}
