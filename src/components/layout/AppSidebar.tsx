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

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className=" md:hidden">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {headerNavLinks.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={clsx(
                        pathname === item.href &&
                          "bg-gray-800 text-gray-200 focus:bg-gray-800 focus:text-gray-200"
                      )}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
