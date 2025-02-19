import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import MyAccountNavigation from "./_components/navigation";

async function MyAccountLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <MyAccountNavigation />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default MyAccountLayout;
