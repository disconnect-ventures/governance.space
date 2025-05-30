"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { headerNavLinks, HeaderSearchBar } from "./Header";
import Link from "~/components/features/Link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "../ui/button";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useState } from "react";
import { useEffect } from "react";
import LocaleSwitch from "../features/LocaleSwitch";
import { Dictionary } from "~/config/dictionaries";

type AppSidebarProps = {
  translations: Pick<Dictionary, "header" | "wallet" | "pageDreps">;
};

export function AppSidebar({ translations }: AppSidebarProps) {
  const pathname = usePathname();
  const [balance, setBalance] = useState<string>();
  const { wallet, connected } = useWallet();

  useEffect(() => {
    async function fetchBalance() {
      if (wallet && connected) {
        const balance = await wallet.getLovelace();
        setBalance(balance);
      }
    }
    fetchBalance();
  }, [wallet, connected]);

  return (
    <div className="md:hidden">
      <Sidebar className="bg-sidebar text-sidebar-foreground">
        <SidebarContent className="pb-8">
          <SidebarGroup className="h-full">
            <SidebarGroupContent className="h-full flex flex-col gap-4">
              <HeaderSearchBar translations={translations.pageDreps} />
              <SidebarMenu>
                {headerNavLinks.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={clsx(
                          "hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href &&
                            "bg-primary/10 text-primary focus:bg-primary/10 focus:text-primary"
                        )}
                      >
                        <span>{translations.header[item.label]}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <div className="flex flex-col gap-2 mt-auto">
                <Button
                  variant="ghost"
                  className="hover:bg-accent hover:text-accent-foreground"
                >
                  {translations.header.becomeDrep}
                </Button>
                <div className="dark:text-background">
                  <CardanoWallet label={translations.wallet.connectWallet} />
                </div>
                {connected && (
                  <Button
                    size="sm"
                    className="cursor-default bg-secondary text-secondary-foreground"
                  >
                    {translations.pageDreps.votingPower}: ₳{balance}
                  </Button>
                )}
              </div>
              <div>
                <LocaleSwitch />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
