import { useContext } from "react";
import { CartContext } from "../App";
import { Close } from "./Icons";
import { CartVisibleContext } from "./Header";
import { CheckoutButton } from "./Buttons";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const { setCartVisible } = useContext(CartVisibleContext);
  const cartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total =
    Math.round(cart.reduce((acc, item) => acc + item.info.price, 0) * 100) /
    100;

  return (
    <div className="fixed z-20 grid h-screen w-screen grid-cols-[1fr_auto]">
      <div
        onClick={() => setCartVisible(false)}
        className="backdrop-brightness-50"
      ></div>
      <div className="grid w-[25rem] grid-rows-[auto_1fr_auto] bg-white-1">
        <div className="flex h-[82px] items-center justify-between border-b border-gray-300 p-4 shadow-md">
          <h1 className="text-lg font-medium">Your cart ({cartItems})</h1>
          <div
            onClick={() => setCartVisible(false)}
            className="cursor-pointer rounded-full bg-green-2 p-1"
          >
            <Close />
          </div>
        </div>

        {cartItems === 0 ? (
          <div className="content-center p-4 text-center">
            Your shopping cart is empty
          </div>
        ) : (
          <div className="p-4"></div>
        )}

        <div className="p-4">
          {cartItems > 0 && (
            <>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="mt-1 flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>£{total}</span>
              </div>
            </>
          )}
          <div className="mt-4">
            <CheckoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
