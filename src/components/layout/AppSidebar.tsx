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
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";

export function AppSidebar() {
  const pathname = usePathname();

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
                <Button variant="ghost">Become a DRep</Button>
                <Button>Connect Wallet</Button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
