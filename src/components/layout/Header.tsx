import React from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "../icons/Logo";
import Link from "next/link";

export const HeaderNavigationLink = ({
  children,
  href = "",
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className="px-3 py-2 hover:text-blue-500 rounded-full border-border border whitespace-nowrap">
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};
export const Header = () => {
  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "DReps Directory",
      href: "/dreps",
    },
    {
      label: "Governance Actions",
      href: "/governance",
    },
    {
      label: "Proposals",
      href: "/proposals",
    },
    {
      label: "Commitees Members",
      href: "/comitee-members",
    },
    {
      label: "Help",
      href: "/help",
    },
    {
      label: "Stats",
      href: "/stats",
    },
    {
      label: "Stats",
      href: "/stats",
    },
    {
      label: "+ More",
      href: "/todo",
    },
  ];

  return (
    <div className="w-full border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-16 gap-4 pb-4 md:pb-0">
          {/* Logo and Search Section */}
          <div className="flex items-center flex-1 gap-4">
            <Logo />

            <div className="hidden md:flex relative max-w-sm">
              <Input type="text" placeholder="Search..." className="pl-8" />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-2">
            <Button variant="ghost">Sign in</Button>
            <Button>Create account</Button>
          </div>

          <div className="lg:flex items-center hidden">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  "https://avatars.githubusercontent.com/t/11181162?s=116&v=4"
                }
              />
              <AvatarFallback>{"DV"}</AvatarFallback>
            </Avatar>
            <ChevronDown></ChevronDown>
          </div>
        </div>
        <div className="hidden md:block py-2 border-t">
          {/* Navigation Section */}
          <div className="h-max-content flex justify-center overflow-x-auto overflow-y-hidden">
            <NavigationMenu>
              <NavigationMenuList className="w-full flex  gap-4 my-4">
                {navLinks.map((link, index) => (
                  <HeaderNavigationLink key={index} href={link.href}>
                    {link.label}
                  </HeaderNavigationLink>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
