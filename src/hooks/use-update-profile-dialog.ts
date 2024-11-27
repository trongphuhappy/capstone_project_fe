import {
  closeUpdateEmailDialog,
  closeUpdateFirstNameDialog,
  closeUpdateInfoLessorDialog,
  closeUpdateLastNameDialog,
  openUpdateEmailDialog,
  openUpdateFirstNameDialog,
  openUpdateInfoLessorDialog,
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

  const onOpenUpdateInfoLessor = () => {
    dispatch(openUpdateInfoLessorDialog());
  };

  const onCloseUpdateInfoLessor = () => {
    dispatch(closeUpdateInfoLessorDialog());
  };

  return {
    openEmail: updateProfileDialogState.openEmail,
    openFirstName: updateProfileDialogState.openFirstName,
    openLastName: updateProfileDialogState.openLastName,
    openInfoLessor: updateProfileDialogState.openUpdateLessor,
    onOpenUpdateEmail,
    onCloseUpdateEmail,
    onOpenUpdateFirstName,
    onCloseUpdateFirstName,
    onOpenUpdateLastName,
    onCloseUpdateLastName,
    onOpenUpdateInfoLessor,
    onCloseUpdateInfoLessor,
  };
}
