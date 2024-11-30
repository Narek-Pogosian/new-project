"use client";

import { useSession } from "next-auth/react";
import UserDropdown from "./user-dropdown";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <div className="container grid grid-cols-3 py-2">
        <div className="flex items-center gap-8">
          <p>Shop Logo</p>
          <nav>
            <ul className="flex gap-4 text-sm font-semibold">
              <li>
                <Link href="#">Shop</Link>
              </li>
              {session && (
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="flex items-center text-sm font-semibold">Searchbar</div>
        <div className="flex justify-end">
          <UserDropdown session={session} />
        </div>
      </div>
    </header>
  );
}

export default Header;
