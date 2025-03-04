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
import { useMemo, useState } from "react";
import { useEffect } from "react";
import LocaleSwitch from "../features/LocaleSwitch";
import { useTranslation } from "~/hooks/use-translation/use-translation";

export function AppSidebar() {
  const pathname = usePathname();
  const { dictionary } = useTranslation();
  const headerTranslations = useMemo(() => dictionary.header, [dictionary]);
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
      <Sidebar>
        <SidebarContent className="pb-8">
          <SidebarGroup className="h-full">
            <SidebarGroupContent className="h-full flex flex-col gap-4">
              <HeaderSearchBar />
              <SidebarMenu>
                {headerNavLinks.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={clsx(
                          pathname === item.href &&
                            "bg-blue-50 text-blue-950 focus:bg-blue-50 focus:text-blue-950"
                        )}
                      >
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <div className="flex flex-col gap-2 mt-auto">
                <Button variant="ghost">{headerTranslations.becomeDrep}</Button>
                <CardanoWallet />
                {connected && (
                  <Button size="sm" className="cursor-default">
                    {dictionary.pageDReps.votingPower}: ₳{balance}
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
