import { auth } from "@/server/auth";
import Link from "next/link";

async function Header() {
  const session = await auth();

  return (
    <header>
      <div className="container">
        {session ? (
          <Link href="/api/sign-out">Log out</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
