function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full lg:grid lg:grid-cols-3">
      <div className="content-center max-lg:hidden">
        <span>Image</span>
      </div>
      <div className="grid w-full place-content-center lg:col-span-2">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
