"use client";

import useToast from "@/hooks/use-toast";
import { useEffect } from "react";

export default function OrderFailComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { addToast } = useToast();
  useEffect(() => {
    addToast({
      type: "error",
      description:
        "Transaction has been canceled, thank you for your interest in this product.",
      duration: 3500,
    });
  }, []);

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
