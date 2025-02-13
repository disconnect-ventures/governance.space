"use client";

import { MeshProvider } from "@meshsdk/react";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MeshProvider>{children}</MeshProvider>;
}
