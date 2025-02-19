import { getServerAuthSession } from "@/server/auth";
import MyAccountNavigation from "./_components/navigation";
import { redirect } from "next/navigation";

async function MyAccountLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <MyAccountNavigation />
      {children}
    </div>
  );
}

export default MyAccountLayout;
