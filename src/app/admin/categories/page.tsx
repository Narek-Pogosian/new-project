import PageTitle from "../_components/page-title";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function AdminCategoriesPage() {
  return (
    <>
      <PageTitle>Categories</PageTitle>
      <Button asChild>
        <Link href="/admin/categories/create">Create category</Link>
      </Button>
    </>
  );
}

export default AdminCategoriesPage;
