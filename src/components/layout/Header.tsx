"use client";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { Button, buttonVariants } from "~/components/ui/button";
import Logo from "../icons/Logo";
import Link from "~/components/features/Link";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import LocaleSwitch from "../features/LocaleSwitch";

export const headerNavLinks = [
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
    label: "Committees Members",
    href: "/committees",
  },
  {
    label: "Live Events",
    href: "/live-events",
  },
  {
    label: "Analytics",
    href: "/analytics",
  },
  {
    label: "Help",
    href: "/help",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const HeaderNavigationLink = ({
  children,
  href = "",
  active,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) => {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={clsx(
            "px-3 py-2 hover:text-blue-500 rounded-full border-border border whitespace-nowrap",
            active &&
              "bg-blue-50 text-blue-950 focus:bg-blue-50 focus:text-blue-950",
          )}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export const Header = () => {
  const pathname = usePathname();
  const [balance, setBalance] = useState<string>();
  const { wallet, connected } = useWallet();

  useEffect(() => {
    async function fetchBalance() {
      if (wallet && connected) {
        const balance = await wallet.getBalance();
        const ada = (Number(balance[0].quantity) / 1000000).toFixed(2);
        setBalance(ada);
      }
    }

    fetchBalance();
  }, [wallet, connected]);

  return (
    <div className="w-full border-b py-4 md:pb-0 sticky top-0 z-40 bg-background">
      <div className="mx-auto px-4 md:px-8 max-w-7xl">
        <div className="hidden md:flex justify-end">
          <LocaleSwitch />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between md:min-h-16 gap-2">
          <div
            className="w-full grid md:flex items-center gap-2"
            style={{ gridTemplateColumns: ".1fr 1fr .1fr" }}
          >
            <SidebarTrigger className="md:hidden" />
            <div className="mx-auto md:mx-0 md:w-fit">
              <Logo />
            </div>
            {/* <div className="hidden md:flex relative max-w-sm md:w-44">
              <Input type="text" placeholder="Search..." className="pl-8" />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            </div> */}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="https://gov.tools/register_drep"
              target="_blank"
              className={buttonVariants({ variant: "ghost" })}
            >
              Become a DRep
            </Link>

            <CardanoWallet />

            {connected && (
              <Button size="sm" className="cursor-default gap-1">
                Voting power: <b>₳{balance}</b>
              </Button>
            )}
          </div>

          {/* <div className="lg:flex items-center hidden">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  "https://avatars.githubusercontent.com/t/11181162?s=116&v=4"
                }
              />
              <AvatarFallback>{"DV"}</AvatarFallback>
            </Avatar>
            <ChevronDown></ChevronDown>
          </div> */}
        </div>
        <Separator className="hidden md:block w-[100vw] absolute left-0" />
        <div className="hidden md:block">
          <div className="h-max-content flex justify-center overflow-x-auto overflow-y-hidden">
            <NavigationMenu>
              <NavigationMenuList className="w-full flex  gap-4 my-4">
                {headerNavLinks.map((link, index) => (
                  <HeaderNavigationLink
                    key={index}
                    href={link.href}
                    active={pathname === link.href}
                  >
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
