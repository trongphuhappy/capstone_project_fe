"use client";

import { Fragment } from "react";
// import AddedCartDialog from "@/components/addded-cart-dialog";
// import useAddedCartDialog from "@/hooks/use-added-cart-dialog";
// import QuickViewCart from "@/components/quick-view-cart";
// import useQuickViewProduct from "@/hooks/use-quick-view-product";
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
import UpdateLessor from "@/components/update-profile/update-lessor";
import CensorDialog from "@/components/censor-dialog";
import useCensorProductDialog from "@/hooks/use-censor-product-dialog";
import useQuickViewProduct from "@/hooks/use-quick-view-product";
import QuickViewCard from "@/components/quick-view-card";
import RentDialog from "@/components/rent-dialog";
import useRentDialog from "@/hooks/use-rent-dialog";
import CheckOrderDialog from "@/components/check-order-dialog";
import useCheckOrderProductDialog from "@/hooks/use-check-order-product-dialog";

export default function GlobalContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backdropState = useAppSelector((state) => state.stateSlice.backdrop);

  const { open: isSearchDialogOpen, onCloseSearchDialog } = useSearchDialog();

  const { avatarOpen, onCloseUpdateAvatarProfile } = useUpdateAvatarDialog();

  const {
    openEmail,
    openFirstName,
    openLastName,
    openInfoLessor,
    onCloseUpdateEmail,
    onCloseUpdateFirstName,
    onCloseUpdateLastName,
    onCloseUpdateInfoLessor,
  } = useUpdateProfileDialog();

  const {
    open: isCensorOpenDialog,
    type: isTypeCensor,
    onCloseCensorProductDialog,
  } = useCensorProductDialog();

  const {
    open: isQuickViewProductDialog,
    quickViewProduct,
    onCloseQuickViewProductDialog,
  } = useQuickViewProduct();

  const { open: isRentDialog, onCloseRentProductDialog } = useRentDialog();

  const {
    open: isCheckOrderDialog,
    type: isTypeCheckOrder,
    onCloseOrderProductDialog,
  } = useCheckOrderProductDialog();

  return (
    <Fragment>
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
      <UpdateLessor open={openInfoLessor} onClose={onCloseUpdateInfoLessor} />
      <CensorDialog
        open={isCensorOpenDialog}
        type={isTypeCensor}
        onClose={onCloseCensorProductDialog}
      />
      <QuickViewCard
        product={quickViewProduct}
        open={isQuickViewProductDialog}
        onOpenChange={onCloseQuickViewProductDialog}
      />
      <RentDialog open={isRentDialog} onClose={onCloseRentProductDialog} />
      <CheckOrderDialog
        open={isCheckOrderDialog}
        type={isTypeCheckOrder}
        onClose={onCloseOrderProductDialog}
      />
      <main>{children}</main>
      <Backdrop open={backdropState.status} />
    </Fragment>
  );
}
