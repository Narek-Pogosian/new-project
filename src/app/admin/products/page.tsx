import PageTitle from "../_components/page-title";
import ProductList from "./_components/product-list";

import { getProducts } from "@/server/queries/products";
import { Suspense } from "react";

export default function AdminProductsPage() {
  return (
    <>
      <PageTitle>Products</PageTitle>
      <Suspense fallback={<p>Loading...</p>}>
        <Products />
      </Suspense>
    </>
  );
}

async function Products() {
  const products = await getProducts();

  return <ProductList products={products} />;
}
