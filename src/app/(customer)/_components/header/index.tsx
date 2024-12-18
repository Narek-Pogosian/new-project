"use client";

import UserDropdown from "./user-dropdown";
import Link from "next/link";
import Logo from "@/components/logo";
import { useSession } from "next-auth/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Logo />
          </Link>
          <nav>
            <ul className="flex gap-8 text-sm font-medium">
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              {session?.user.role === "ADMIN" && (
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="flex">
          <UserDropdown session={session} />
          <ThemeToggle />
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
