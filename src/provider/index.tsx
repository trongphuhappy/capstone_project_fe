"use client";

import dynamic from "next/dynamic";
import GlobalContent from "./global-content";

const StoreProvider = dynamic(
  () => import("@/provider/redux-provider").then((mod) => mod.StoreProvider),
  {
    ssr: false,
  }
);

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <GlobalContent>{children}</GlobalContent>
    </StoreProvider>
  );
}
