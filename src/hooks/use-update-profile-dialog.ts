import {
  closeUpdateCitizenDialog,
  closeUpdateEmailDialog,
  closeUpdateFirstNameDialog,
  closeUpdateLastNameDialog,
  openUpdateCitizenDialog,
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

  const onOpenUpdateCitizen = () => {
    dispatch(openUpdateCitizenDialog());
  };

  const onCloseUpdateCitizen = () => {
    dispatch(closeUpdateCitizenDialog());
  };

  return {
    openEmail: updateProfileDialogState.openEmail,
    openFirstName: updateProfileDialogState.openFirstName,
    openLastName: updateProfileDialogState.openLastName,
    openCitizen: updateProfileDialogState.openCitizen,
    onOpenUpdateEmail,
    onCloseUpdateEmail,
    onOpenUpdateFirstName,
    onCloseUpdateFirstName,
    onOpenUpdateLastName,
    onCloseUpdateLastName,
    onOpenUpdateCitizen,
    onCloseUpdateCitizen,
  };
}
