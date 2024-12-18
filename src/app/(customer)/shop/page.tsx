import { productQueryParams } from "@/schemas/product-schemas";
import { discoverProducts } from "@/server/queries/products";
import { redirect } from "next/navigation";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const search = await searchParams;
  const { data, success } = productQueryParams.safeParse(search);

  if (!success) {
    return redirect("/shop");
  }

  const p = await discoverProducts(data);

  return <div>{JSON.stringify(p)}</div>;
}

export default ShopPage;
