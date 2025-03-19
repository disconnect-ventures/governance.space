"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { networks, useWallet } from "~/hooks/use-wallet/use-wallet";
import { buttonVariants } from "../ui/button";
import { useMemo, useState } from "react";
import { capitalize, cn, formatAda, formatVotingPower } from "~/lib/utils";
import CopyToClipboard from "./CopyToClipboard";
import { useWalletList } from "@meshsdk/react";
import Image from "next/image";
import { WalletIcon } from "lucide-react";
import { Dictionary } from "~/config/dictionaries";

export type WalletWidgetProps = {
  translations: Dictionary["wallet"];
};

export const WalletWidget = ({ translations }: WalletWidgetProps) => {
  const [open, setOpen] = useState(false);
  const { connected, networkId, balance, ...walletStore } = useWallet();
  const networkName = useMemo(
    () => (typeof networkId === "number" ? networks[networkId]?.name : "Unknown Network"),
    [networkId],
  );
  const wallets = useWalletList();
  const dropdownMenuItemClasses = useMemo(() => "flex gap-2 items-center", []);
  const selectedWalletApp = useMemo(
    () => wallets.find((w) => walletStore.name === w.name),
    [walletStore, wallets],
  );

  const DropdownItems = useMemo(
    () =>
      connected ? (
        <>
          <DropdownMenuItem className={dropdownMenuItemClasses}>
            <CopyToClipboard value={walletStore.address} className="p-0">
              Copy Address
            </CopyToClipboard>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={walletStore.disconnect} className={dropdownMenuItemClasses}>
            Disconnect
          </DropdownMenuItem>
        </>
      ) : wallets.length > 0 ? (
        <>
          {wallets.map((w, index) => (
            <DropdownMenuItem
              key={index}
              className={dropdownMenuItemClasses}
              onClick={() => walletStore.connect(w.name, [], true)}
            >
              <span className="h-6 aspect-square">
                <Image alt={`${w.name} icon`} width={45} height={45} src={w.icon}></Image>
              </span>
              {capitalize(w.name)}
            </DropdownMenuItem>
          ))}
        </>
      ) : (
        "No wallet found."
      ),
    [connected, wallets, walletStore, dropdownMenuItemClasses],
  );

  return (
    <DropdownMenu open={open} onOpenChange={(open) => setOpen(open)} modal={wallets.length > 1}>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "default" }))}>
        <WalletIcon className="h-6" />
        {connected
          ? `${networkName}: ${formatAda(formatVotingPower(parseFloat(balance ?? "0")))}`
          : translations.connectWallet}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className={dropdownMenuItemClasses}>
          {selectedWalletApp && (
            <span className="h-6 aspect-square">
              <Image
                alt={`${selectedWalletApp.name} icon`}
                width={45}
                height={45}
                src={selectedWalletApp.icon}
              ></Image>
            </span>
          )}
          {connected ? `${capitalize(walletStore.name ?? "")} Wallet` : translations.availableWallet}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {DropdownItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
