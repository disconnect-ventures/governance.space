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
import { headerNavLinks } from "./Header";
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
      <Sidebar className="bg-sidebar text-sidebar-foreground">
        <SidebarContent className="pb-8">
          <SidebarGroup className="h-full">
            <SidebarGroupContent className="h-full flex flex-col gap-4">
              {/* <div className="relative max-w-sm">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 bg-background text-foreground border-border placeholder:text-muted-foreground"
                  tabIndex={-1}
                />
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              </div> */}
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
                        <span>{item.label}</span>
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
                  {headerTranslations.becomeDrep}
                </Button>
                <CardanoWallet />
                {connected && (
                  <Button
                    size="sm"
                    className="cursor-default bg-secondary text-secondary-foreground"
                  >
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
