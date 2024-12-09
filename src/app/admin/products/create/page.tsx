import PageTitle from "../../_components/page-title";
import ProductForm from "../_components/product-form";

function AdminProductCreatePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle>Create Product</PageTitle>
      <hr role="presentation" className="mb-8" />
      <ProductForm />
    </div>
  );
}

export default AdminProductCreatePage;
