import { useContext } from "react";
import { CartContext } from "../App";
import { useLocation } from "react-router-dom";

type ButtonProps = {
  itemInfo: object;
};

export function SmallButton({ itemInfo }: ButtonProps) {
  const { setCart } = useContext(CartContext);
  const mainCategory = useLocation().pathname.split("/")[1];
  const category = useLocation().pathname.split("/")[2];

  function handleClick() {
    setCart((prev) =>
      prev?.find((item) => item.info._id === itemInfo._id)
        ? prev.map((item) =>
            item.info._id === itemInfo._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prev, { info: itemInfo, quantity: 1, mainCategory, category }],
    );
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-md bg-green-3 px-2 py-1 text-white-1"
    >
      Add
    </button>
  );
}

export default function Button({ itemInfo }: ButtonProps) {
  const { setCart } = useContext(CartContext);
  const mainCategory = useLocation().pathname.split("/")[1];
  const category = useLocation().pathname.split("/")[2];

  function handleClick() {
    setCart((prev) =>
      prev?.find((item) => item.info._id === itemInfo._id)
        ? prev.map((item) =>
            item.info._id === itemInfo._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prev, { info: itemInfo, quantity: 1, mainCategory, category }],
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-md bg-green-3 py-3 text-xl font-medium text-white-1"
    >
      Add to Cart
    </button>
  );
}

export function CheckoutButton() {
  return (
    <button className="w-full rounded-md bg-green-3 py-3 text-xl font-medium text-white-1">
      Checkout
    </button>
  );
}
