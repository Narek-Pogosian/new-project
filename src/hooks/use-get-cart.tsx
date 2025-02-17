import { type GetCartType } from "@/app/api/cart/route";
import { useQuery } from "@tanstack/react-query";

export function useGetCart() {
  const getCart = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) {
        throw new Error("Failed to fetch cart");
      }

      return res.json() as Promise<GetCartType>;
    },
  });

  return getCart;
}
