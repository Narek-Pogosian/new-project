import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-full content-center px-4 lg:col-span-2">
      <Button variant="outline" asChild>
        <Link href="/" className="absolute left-4 top-4 lg:left-8 lg:top-8">
          <MoveLeft />
          Shop
        </Link>
      </Button>

      <div className="mx-auto max-w-lg rounded border bg-background/50 px-8 py-12 shadow-lg backdrop-blur-md dark:shadow-black">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
