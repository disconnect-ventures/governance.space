"use client";
import { MeshProvider } from "@meshsdk/react";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return <MeshProvider>{children}</MeshProvider>;
}
