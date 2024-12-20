import Header from "./_components/header";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="container grow py-6">{children} </main>
      <footer>Footer</footer>
    </div>
  );
}

export default AdminLayout;
