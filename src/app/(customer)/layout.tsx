import { NuqsAdapter } from "nuqs/adapters/next/app";
import Header from "./_components/header";
import QueryProvider from "@/components/query-provider";
import Footer from "./_components/footer";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <QueryProvider>
        <div className="flex min-h-full flex-col">
          <Header />
          <main className="container grow pb-6 pt-3">{children} </main>
          <Footer />
        </div>
      </QueryProvider>
    </NuqsAdapter>
  );
}

export default AdminLayout;
