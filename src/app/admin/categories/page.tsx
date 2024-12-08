import CategoryList from "./_components/category-list";
import PageTitle from "../_components/page-title";

import { getCategoriesWithProductsCount } from "@/server/queries/categories";
import { Suspense } from "react";

export default function AdminCategoriesPage() {
  return (
    <>
      <PageTitle>Categories</PageTitle>
      <Suspense fallback={<p>Loading...</p>}>
        <Categories />
      </Suspense>
    </>
  );
}

async function Categories() {
  const categories = await getCategoriesWithProductsCount();

  return <CategoryList categories={categories} />;
}
