"use client";

import { Book, Settings2, Triangle, Computer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

type SidebarProps = {};

function Sidebar({}: SidebarProps) {
  return (
    <aside className="left-0 z-20 fixed inset-y flex flex-col bg-background border-r h-full">
      <div className="p-2 border-b">
        <Button variant="outline" size="icon" aria-label="Home" asChild>
          <a href="/">
            <Triangle className="fill-foreground size-5" />
          </a>
        </Button>
      </div>

      <nav>
        <NavigationMenu>
          <NavigationMenuList className="flex-col space-x-0">
            <NavigationMenuItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className="bg-muted rounded-lg"
                      aria-label="Documentation"
                      asChild
                    >
                      <Link href="/" className="m-0" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          <Computer className="size-5" />
                        </NavigationMenuLink>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={5}>
                    Devices
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-lg"
                      aria-label="Devices"
                      asChild
                    >
                      <Link href="/records" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          <Book className="size-5" />
                        </NavigationMenuLink>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={5}>
                    Records
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <nav className="flex-col mx-auto mt-auto pb-2 align-middle">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Settings"
                asChild
              >
                <Link href="/settings">
                  <Settings2 className="size-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}

export default Sidebar;
