"use client";
import {
  useLovelace,
  useWallet as useMeshWallet,
  useNetwork,
} from "@meshsdk/react";
import { useEffect } from "react";

export const networks = {
  0: {
    name: "Testnet",
  },
  1: {
    name: "Mainnet",
  },
};

export function useWallet() {
  const { wallet, connected, connect, ...mesh } = useMeshWallet();
  const balance = useLovelace();
  const networkId = useNetwork();

  useEffect(() => {
    // Persist wallet session
    const persistWallet: { walletName?: string } = JSON.parse(
      window?.localStorage?.getItem("mesh-wallet-persist") ?? "{}"
    );
    if (!connected && persistWallet?.walletName) {
      connect(persistWallet.walletName, [], true);
    }
  }, [connected, connect]);

  useEffect(() => {
    if (!wallet || !wallet.getExtensions) return;
    wallet?.getExtensions().then((e) => console.log(e));
  }, [wallet]);

  return {
    wallet,
    connected,
    connect,
    balance,
    networkId,
    ...mesh,
  };
}
