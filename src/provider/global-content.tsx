"use client";

import { Fragment } from "react";
import AddedCartDialog from "@/components/addded-cart-dialog";
import useAddedCartDialog from "@/hooks/useAddedCartDialog";
import QuickViewCart from "@/components/quick-view-cart";
import useQuickViewProduct from "@/hooks/useQuickViewProduct";

export default function GlobalContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { open: isAddedCartDialogOpen, onCloseAddedCartDialog } =
    useAddedCartDialog();

  const { open: isQuickviewProduct, onCloseQuickViewProductDialog } =
    useQuickViewProduct();

  return (
    <Fragment>
      <AddedCartDialog
        open={isAddedCartDialogOpen}
        onClose={onCloseAddedCartDialog}
      />
      <QuickViewCart
        open={isQuickviewProduct}
        onClose={onCloseQuickViewProductDialog}
      />
      <main>{children}</main>
    </Fragment>
  );
}
