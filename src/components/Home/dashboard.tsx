"use client"
import { AppSidebar } from "@/components/app-sidebar";


import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell, Home, MoonIcon, Search, SunIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoMdSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
// import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes";

export default function HomePage({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between px-4">
            <div className="mr-4 flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2"
                      asChild
                    >
                      <SidebarTrigger className="-ml-1" />
                      {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-white">
                      Monitor all your projects and tasks here
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <a href="/" className="flex items-center space-x-2">
                {/* Removed "meHeader" text */}
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="ml-auto">
                <IoMdSearch className="h-12 w-h-12" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon">
                <GoBell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

function ThemeToggle() {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => setTheme("light")}>
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  );
}
