import PageTitle from "../../_components/page-title";
import CategoryForm from "../_components/category-form";

function AdminCategoryCreatePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle>Create Category</PageTitle>
      <hr role="presentation" className="mb-8" />
      <CategoryForm />
    </div>
  );
}

export default AdminCategoryCreatePage;
