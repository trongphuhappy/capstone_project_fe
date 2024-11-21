import {
  closeUpdateAvatarProfileDialog,
  openUpdateAvatarProfileDialog,
} from "@/stores/stateSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function useUpdateProfileDialog() {
  const dispatch = useAppDispatch();

  const updateAvatarProfileDialogState = useAppSelector(
    (state) => state.stateSlice.updateAvatarProfileDialog
  );

  const onOpenUpdateAvatarProfile = () => {
    dispatch(openUpdateAvatarProfileDialog());
  };

  const onCloseUpdateAvatarProfile = () => {
    dispatch(closeUpdateAvatarProfileDialog());
  };

  return {
    avatarOpen: updateAvatarProfileDialogState.open,
    onOpenUpdateAvatarProfile,
    onCloseUpdateAvatarProfile,
  };
}
