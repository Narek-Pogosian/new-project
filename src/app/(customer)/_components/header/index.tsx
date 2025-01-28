"use client";

import UserDropdown from "./user-dropdown";
import Link from "next/link";
import Logo from "@/components/logo";
import { useSession } from "next-auth/react";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Cart from "../cart";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/">
            <Logo />
          </Link>
          {session?.user.role === "ADMIN" && (
            <Link href="/admin" className="text-sm font-semibold">
              Admin
            </Link>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <ThemeToggle />
          {session ? (
            <UserDropdown session={session} />
          ) : (
            <nav>
              <Button size="icon" variant="ghost">
                <Link href="/login">
                  <User />
                  <span className="sr-only">Login</span>
                </Link>
              </Button>
            </nav>
          )}
          <Cart />
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme}>
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
