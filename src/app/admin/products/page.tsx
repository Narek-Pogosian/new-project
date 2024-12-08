import { getProducts } from "@/server/queries/products";
import PageTitle from "../_components/page-title";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageTitle>Products</PageTitle>
      <div className="flex gap-4">
        <p>{JSON.stringify(products, null, 2)}</p>
        <Link href="/admin/products/create">Create</Link>
      </div>
    </>
  );
}
