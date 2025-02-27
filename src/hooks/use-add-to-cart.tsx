import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type AddCartType } from "@/schemas/cart-schemas";
import { type GetCartType } from "@/app/api/cart/route";
import { type CartItem } from "@prisma/client";

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  const addToCart = useMutation({
    mutationFn: (data: AddCartType) =>
      fetch("/api/cart", { method: "POST", body: JSON.stringify(data) }).then(
        (res) => res.json(),
      ),
    onSuccess: (res: CartItem) => {
      queryClient.setQueryData(["cart"], (prevCartData: GetCartType) => ({
        ...prevCartData,
        items: [...prevCartData.items, res].sort((a, b) => a.id - b.id),
      }));
    },
  });

  return addToCart;
};
