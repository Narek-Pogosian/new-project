"use client";

import { Box, Eye, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const items = [
  { label: "Overview", link: "/my-account", icon: Eye },
  { label: "Orders", link: "/my-account/orders", icon: Box },
  { label: "Personal details", link: "/my-account/details", icon: User },
];

function MyAccountNavigation() {
  const pathName = usePathname();

  return (
    <nav aria-describedby="your-account" className="lg:w-64">
      <h3
        id="your-account"
        className="max-lg:sr-only lg:mb-4 lg:text-lg lg:font-bold"
      >
        Your Account
      </h3>
      <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-4">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.link}
              className={cn(
                "flex items-center gap-2 text-nowrap font-semibold hover:text-accent-600 hover:dark:text-accent-400 max-lg:border-r max-lg:px-4 max-lg:py-2 max-lg:text-sm",
                {
                  "text-accent-600 dark:text-accent-400":
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
