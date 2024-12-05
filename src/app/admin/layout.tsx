import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "./_components/app-sidebar";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} />
      <main className="mx-auto w-full max-w-[1800px] p-4 md:px-12 md:py-12 lg:px-28">
        <SidebarTrigger className="mb-4 md:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default AdminLayout;
