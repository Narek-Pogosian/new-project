import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Box, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function UserDropdown({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ size: "icon", variant: "ghost" })}
      >
        <span className="sr-only">Your Account</span>
        <User aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <>
          <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </>
        <DropdownMenuItem asChild className="py-2">
          <Link href="/my-account/orders">
            <Box /> Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-2">
          <Link href="/my-account/account">
            <User /> Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-2" onSelect={() => signOut()}>
          <LogOut /> Signout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
