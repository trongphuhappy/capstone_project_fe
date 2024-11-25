"use client";
import { Backdrop } from "@/components/backdrop";
import { useEffect } from "react";
import useUpdateVerifyEmail from "@/app/verify/verify-email/hooks/useUpdateVerifyEmail";

export default function VerifyEmail({
  children,
  userId,
}: Readonly<{
  children: React.ReactNode;
  userId: string;
}>) {
  const { isPending, updateVerifyEmail } = useUpdateVerifyEmail();

  useEffect(() => {
    updateVerifyEmail({
      userId: userId,
    });
  }, []);

  return (
    <div>
      <main>{children}</main>
      <Backdrop open={isPending} />
    </div>
  );
}
