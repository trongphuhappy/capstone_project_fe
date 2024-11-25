"use client";

import { Fragment } from "react";
import AddedCartDialog from "@/components/addded-cart-dialog";
import useAddedCartDialog from "@/hooks/use-added-cart-dialog";
import QuickViewCart from "@/components/quick-view-cart";
import useQuickViewProduct from "@/hooks/use-quick-view-product";
import SearchComponent from "@/components/seach-component";
import useSearchDialog from "@/hooks/use-search-dialog";
import UpdateAvatarProfile from "@/components/update-avatar-profile";
import useUpdateAvatarDialog from "@/hooks/use-update-avatar-dialog";
import { Backdrop } from "@/components/backdrop";
import { useAppSelector } from "@/stores/store";
import UpdateEmail from "@/components/update-profile/update-email";
import useUpdateProfileDialog from "@/hooks/use-update-profile-dialog";
import UpdateFirstName from "@/components/update-profile/update-firstname";
import UpdateLastName from "@/components/update-profile/update-lastname";
import UpdateCitizen from "@/components/update-profile/update-citizen";
import UpdateLessor from "@/components/update-profile/update-lessor";

export default function GlobalContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backdropState = useAppSelector((state) => state.stateSlice.backdrop);

  const { open: isAddedCartDialogOpen, onCloseAddedCartDialog } =
    useAddedCartDialog();

  const {
    open: isQuickviewProduct,
    product,
    onCloseQuickViewProductDialog,
  } = useQuickViewProduct();

  const { open: isSearchDialogOpen, onCloseSearchDialog } = useSearchDialog();

  const { avatarOpen, onCloseUpdateAvatarProfile } = useUpdateAvatarDialog();

  const {
    openEmail,
    openFirstName,
    openLastName,
    openCitizen,
    openInfoLessor,
    onCloseUpdateEmail,
    onCloseUpdateFirstName,
    onCloseUpdateLastName,
    onCloseUpdateCitizen,
    onCloseUpdateInfoLessor,
  } = useUpdateProfileDialog();

  return (
    <Fragment>
      <AddedCartDialog
        open={isAddedCartDialogOpen}
        onClose={onCloseAddedCartDialog}
      />
      <QuickViewCart
        open={isQuickviewProduct}
        onClose={onCloseQuickViewProductDialog}
        product={product}
      />
      <SearchComponent
        open={isSearchDialogOpen}
        onClose={onCloseSearchDialog}
      />
      <UpdateAvatarProfile
        open={avatarOpen}
        onClose={onCloseUpdateAvatarProfile}
      />
      <UpdateEmail open={openEmail} onClose={onCloseUpdateEmail} />
      <UpdateFirstName open={openFirstName} onClose={onCloseUpdateFirstName} />
      <UpdateLastName open={openLastName} onClose={onCloseUpdateLastName} />
      <UpdateCitizen open={openCitizen} onClose={onCloseUpdateCitizen} />
      <UpdateLessor open={openInfoLessor} onClose={onCloseUpdateInfoLessor} />
      <main>{children}</main>
      <Backdrop open={backdropState.status} />
    </Fragment>
  );
}
