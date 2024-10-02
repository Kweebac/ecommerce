import { useContext, useEffect } from "react";
import { CartContext } from "../App";
import { Close, MinusIcon, PlusIcon } from "./Icons";
import { CartVisibleContext } from "./Header";
import { CheckoutButton } from "./Buttons";
import { useNavigate } from "react-router-dom";

type QuantityProps = {
  info: object;
  quantity: number;
};

type CartItemProps = QuantityProps & {
  url: string;
};

function Quantity({ info, quantity }: QuantityProps) {
  const { setCart } = useContext(CartContext);

  const styles = "w-6 h-6 cursor-pointer";

  function changeQuantity(increase) {
    // Increase or decrease quantity
    setCart((prev) =>
      prev.map((item) =>
        item.info._id === info._id
          ? {
              ...item,
              quantity: increase ? item.quantity + 1 : item.quantity - 1,
            }
          : item,
      ),
    );

    // Remove items with quantity 0
    setCart((prev) => prev.filter((item) => item.quantity > 0));
  }

  return (
    <div className="flex items-center gap-2 rounded-md border border-gray-300 px-1 text-green-3">
      <div onClick={() => changeQuantity(false)}>
        <MinusIcon styles={styles} />
      </div>
      <div>{quantity}</div>
      <div onClick={() => changeQuantity(true)}>
        <PlusIcon styles={styles} />
      </div>
    </div>
  );
}

function changeName(name: string) {
  switch (name) {
    case "components/gpu":
      return "GPU";
    case "components/cpu":
      return "CPU";
    case "components/motherboard":
      return "Motherboard";
    case "components/ram":
      return "RAM";
    case "components/storage":
      return "Storage";
    case "components/psu":
      return "PSU";
    case "components/case":
      return "Case";
    case "components/cpu-cooler":
      return "CPU Cooler";
    case "components/fans":
      return "Fans";
    case "components/os":
      return "OS";
    case "accessories/monitors":
      return "Monitor";
    case "accessories/keyboards":
      return "Keyboard";
    case "accessories/mice":
      return "Mouse";
    case "accessories/headphones":
      return "Headphones";
    case "accessories/webcams":
      return "Webcam";
    case "accessories/speakers":
      return "Speakers";
    case "prebuilt":
      return "Prebuilt";
  }
}

function CartItem({ info, quantity, url }: CartItemProps) {
  const navigate = useNavigate();
  const { setCartVisible } = useContext(CartVisibleContext);

  function navigateToItemPage() {
    navigate(`/${url}/${info._id}`);
    setCartVisible(false);
  }

  console.log(url);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-4">
      <img
        onClick={navigateToItemPage}
        src={info.url}
        alt={info.name}
        className="h-20 w-20 cursor-pointer rounded-lg"
      />
      <div className="grid content-between">
        <div>
          <div
            onClick={navigateToItemPage}
            className="w-max cursor-pointer font-semibold"
          >
            {changeName(url)}
          </div>
          <div
            onClick={navigateToItemPage}
            className="w-max max-w-[250px] cursor-pointer truncate text-sm"
          >
            {info.name}
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <Quantity info={info} quantity={quantity} />
          <div className="font-semibold">
            £{Math.round(info.price * quantity * 100) / 100}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const { cart } = useContext(CartContext);
  const { setCartVisible } = useContext(CartVisibleContext);
  const cartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total =
    Math.round(
      cart.reduce((acc, item) => acc + item.info.price * item.quantity, 0) *
        100,
    ) / 100;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed z-30 grid h-screen w-screen grid-cols-[1fr_auto]">
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
          <div className="grid h-[673px] content-start gap-4 overflow-y-auto p-4">
            {cart.map((item, index) => (
              <CartItem
                key={index}
                info={item.info}
                quantity={item.quantity}
                url={item.url}
              />
            ))}
          </div>
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
