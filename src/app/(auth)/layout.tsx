import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-full content-center px-4 lg:col-span-2">
      <Button variant="outline" asChild>
        <Link href="/" className="absolute left-4 top-4 lg:left-8 lg:top-8">
          <MoveLeft />
          Home
        </Link>
      </Button>
      {children}
    </div>
  );
}

export default AuthLayout;
