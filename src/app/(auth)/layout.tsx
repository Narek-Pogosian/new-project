import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full lg:grid lg:grid-cols-3">
      <div className="content-center max-lg:hidden">
        <span>Image</span>
      </div>
      <div className="relative w-full content-center lg:col-span-2">
        <Button variant="outline" asChild>
          <Link href="/" className="absolute left-8 top-8">
            <MoveLeft />
            Home
          </Link>
        </Button>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
