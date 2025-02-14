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
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useState } from "react";
import { useEffect } from "react";

export function AppSidebar() {
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
      <Sidebar>
        <SidebarContent className="pb-8">
          <SidebarGroup className="h-full">
            <SidebarGroupContent className="h-full flex flex-col gap-4">
              <div className="relative max-w-sm">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-8"
                  tabIndex={-1}
                />
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              </div>
              <SidebarMenu>
                {headerNavLinks.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={clsx(
                          pathname === item.href &&
                            "bg-blue-50 text-blue-950 focus:bg-blue-50 focus:text-blue-950",
                        )}
                      >
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <div className="flex flex-col gap-2 mt-auto">
                <Button variant="ghost">Become a DRep</Button>
                <CardanoWallet />
                {connected && (
                  <Button size="sm" className="cursor-default">
                    Voting power: ₳{balance}
                  </Button>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
