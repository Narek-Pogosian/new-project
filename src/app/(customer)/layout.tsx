import { NuqsAdapter } from "nuqs/adapters/next/app";
import Header from "./_components/header";
import QueryProvider from "@/components/query-provider";
import SkipToMain from "./_components/skip-to-main";
import Footer from "./_components/footer";

function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <QueryProvider>
        <div className="flex min-h-full flex-col">
          <SkipToMain />
          <Header />
          <main
            id="main"
            tabIndex={-1}
            className="container grow pb-6 pt-3 outline-none"
          >
            {children}
          </main>
          <Footer />
        </div>
      </QueryProvider>
    </NuqsAdapter>
  );
}

export default CustomerLayout;
