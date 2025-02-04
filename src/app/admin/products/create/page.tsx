import { getCategories } from "@/server/queries/categories";
import PageTitle from "../../_components/page-title";
import ProductForm from "../_components/product-form";

async function AdminProductCreatePage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle>Create Product</PageTitle>
      <hr role="presentation" className="mb-8" />
      <ProductForm categories={categories} />
    </div>
  );
}

export default AdminProductCreatePage;
