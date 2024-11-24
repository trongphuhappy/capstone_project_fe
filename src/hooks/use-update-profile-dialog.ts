import {
  closeUpdateEmailDialog,
  closeUpdateFirstNameDialog,
  closeUpdateLastNameDialog,
  openUpdateEmailDialog,
  openUpdateFirstNameDialog,
  openUpdateLastNameDialog,
} from "@/stores/stateSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";

export default function useUpdateProfileDialog() {
  const dispatch = useAppDispatch();

  const updateProfileDialogState = useAppSelector(
    (state) => state.stateSlice.updateProfileDialog
  );

  const onOpenUpdateEmail = () => {
    dispatch(openUpdateEmailDialog());
  };

  const onCloseUpdateEmail = () => {
    dispatch(closeUpdateEmailDialog());
  };

  const onOpenUpdateFirstName = () => {
    dispatch(openUpdateFirstNameDialog());
  };

  const onCloseUpdateFirstName = () => {
    dispatch(closeUpdateFirstNameDialog());
  };

  const onOpenUpdateLastName = () => {
    dispatch(openUpdateLastNameDialog());
  };

  const onCloseUpdateLastName = () => {
    dispatch(closeUpdateLastNameDialog());
  };

  return {
    openEmail: updateProfileDialogState.openEmail,
    openFirstName: updateProfileDialogState.openFirstName,
    openLastName: updateProfileDialogState.openLastName,
    onOpenUpdateEmail,
    onCloseUpdateEmail,
    onOpenUpdateFirstName,
    onCloseUpdateFirstName,
    onOpenUpdateLastName,
    onCloseUpdateLastName,
  };
}
