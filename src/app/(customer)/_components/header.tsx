import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import SignOut from "./sign-out";

async function Header() {
  const session = await getServerAuthSession();

  return (
    <header>
      <div className="container">
        {session ? <SignOut /> : <Link href="/login">Login</Link>}
      </div>
    </header>
  );
}

export default Header;
