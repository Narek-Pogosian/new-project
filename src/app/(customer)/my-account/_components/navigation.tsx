"use client";

import { Box, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const items = [
  { label: "Orders", link: "/my-account/orders", icon: Box },
  { label: "Account", link: "/my-account/account", icon: User },
];

function MyAccountNavigation() {
  const pathName = usePathname();

  return (
    <nav aria-describedby="your-account" className="shrink-0 lg:w-60">
      <h3
        id="your-account"
        className="text-sm font-semibold uppercase tracking-wider text-foreground-muted max-lg:sr-only lg:mb-4"
      >
        Your Account
      </h3>
      <ul className="flex gap-2 overflow-x-auto p-1 lg:flex-col lg:gap-4">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.link}
              className={cn(
                "flex items-center gap-2 text-nowrap text-sm font-semibold text-foreground hover:underline max-lg:border-r max-lg:px-4 max-lg:py-2",
                {
                  "text-accent-700 dark:text-accent-400":
                    pathName === item.link,
                },
              )}
            >
              <item.icon className="size-5" /> {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MyAccountNavigation;
