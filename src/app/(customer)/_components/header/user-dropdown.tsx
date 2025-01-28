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
import { Box, Eye, LogOut, User } from "lucide-react";

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
        <DropdownMenuItem>
          <Eye /> Overview
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Box /> Orders
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => signOut()}>
          <LogOut /> Signout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
