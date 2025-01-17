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
import { User } from "lucide-react";
import Link from "next/link";

export default function UserDropdown({ session }: { session: Session | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ size: "icon", variant: "ghost" })}
      >
        <span className="sr-only">Your Account</span>
        <User aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {session?.user.name && (
          <>
            <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <UserDropdownContent session={session} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserDropdownContent({ session }: { session: Session | null }) {
  if (!session) {
    return (
      <>
        <DropdownMenuItem asChild>
          <Link href="/login">Login</Link>
        </DropdownMenuItem>
      </>
    );
  }

  return (
    <>
      <DropdownMenuItem>Overview</DropdownMenuItem>
      <DropdownMenuItem>Orders</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => signOut()}>Signout</DropdownMenuItem>
    </>
  );
}
