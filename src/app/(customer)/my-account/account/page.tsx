import { getServerAuthSession } from "@/server/auth";
import { Key, Pencil, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteAccount from "./_components/delete-account";

async function MyDetailsPage() {
  const session = await getServerAuthSession();

  return (
    <>
      <h1 className="text-lg font-bold">Your account</h1>
      <p className="mb-10 text-foreground-muted">
        View and update your information here. Change login options and password
        here.
      </p>

      <section
        aria-label="Your information"
        className="flex flex-col justify-between gap-4 md:flex-row"
      >
        <div className="flex items-center gap-4 md:gap-8">
          <User className="size-6 md:size-10" />
          <div className="flex gap-6">
            <div className="max-md:text-sm">
              <dt className="font-semibold">Name</dt>
              <dd className="text-foreground-muted">{session?.user.name}</dd>
            </div>
            <div className="max-md:text-sm">
              <dt className="font-semibold">Email</dt>
              <dd className="text-foreground-muted">{session?.user.email}</dd>
            </div>
          </div>
        </div>
        <Button variant="outline" className="h-fit [&_svg]:size-4">
          <Pencil /> Edit
        </Button>
      </section>

      <hr className="my-10" />

      <section
        aria-label="Password"
        className="flex flex-col justify-between gap-4 md:flex-row"
      >
        <div className="flex items-center gap-4 md:gap-8">
          <Key className="size-6 md:size-10" />
          <div>
            <dt className="font-semibold">Password</dt>
            <dd className="text-foreground-muted">*******************</dd>
          </div>
        </div>
        <Button variant="outline" className="h-fit [&_svg]:size-4">
          <Pencil /> Edit
        </Button>
      </section>

      <hr className="my-10" />

      <DeleteAccount />
    </>
  );
}

export default MyDetailsPage;
