"use client";

import useToast from "@/hooks/use-toast";
import { useEffect } from "react";

export default function OrderSuccessComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { addToast } = useToast();
  useEffect(() => {
    addToast({
      type: "success",
      description:
        "The transaction is successful, the lessor will contact you soon, please wait",
      duration: 3500,
    });
  }, []);

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
