"use client";

import dynamic from "next/dynamic";
import GlobalContent from "./global-content";

const StoreProvider = dynamic(
  () => import("@/provider/redux-provider").then((mod) => mod.StoreProvider),
  {
    ssr: false,
  }
);

const ReactQueryProvider = dynamic(
  () => import("@/provider/query-provider").then((mod) => mod.default),
  { ssr: false }
);


export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <ReactQueryProvider>
        <GlobalContent>{children}</GlobalContent>
      </ReactQueryProvider>
    </StoreProvider>
  );
}
