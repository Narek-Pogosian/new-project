function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header>Header</header>
      <main className="container grow py-8">{children} </main>
      <footer>Footer</footer>
    </div>
  );
}

export default AdminLayout;
