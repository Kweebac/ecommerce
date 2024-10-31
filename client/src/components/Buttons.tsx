// @ts-nocheck

import { useContext } from "react";
import { CartContext, UserContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { PlainCartIcon } from "./Icons";
import { changeName, getUrl, handleSetUser } from "../utils";

type ButtonProps = {
  itemInfo: object;
};

export function SmallButton({ itemInfo }: ButtonProps) {
  const { setCart } = useContext(CartContext);

  const url = getUrl(useLocation);

  function handleClick() {
    setCart((prev) =>
      prev?.find((item) => item.info._id === itemInfo._id)
        ? prev.map((item) =>
            item.info._id === itemInfo._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prev, { info: itemInfo, quantity: 1, url }],
    );
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-green-3 p-1 text-white-1 shadow-md hover:scale-105"
    >
      <PlainCartIcon />
    </button>
  );
}

export default function Button({ itemInfo }: ButtonProps) {
  const { setCart } = useContext(CartContext);

  const url = getUrl(useLocation);

  function handleClick() {
    setCart((prev) =>
      prev?.find((item) => item.info._id === itemInfo._id)
        ? prev.map((item) =>
            item.info._id === itemInfo._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...prev, { info: itemInfo, quantity: 1, url }],
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-md bg-green-3 p-2 text-lg font-medium text-white-1 shadow-md"
    >
      Add to Cart
    </button>
  );
}

export function CheckoutButton() {
  return (
    <button className="w-full rounded-md bg-green-3 px-4 py-3 text-xl font-medium text-white-1 shadow-md">
      Checkout
    </button>
  );
}

type ButtonPCProps = ButtonProps & {
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  icon: JSX.Element;
  limit?: number;
};

export function SmallButtonPC({
  setError,
  error,
  itemInfo,
  icon,
  limit,
}: ButtonPCProps) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  let componentType = useLocation().pathname.split("/")[2];
  const componentTitle = changeName(`components/${componentType}`);

  if (componentType === "cpu-cooler") componentType = "cpuCooler";

  async function handleClick() {
    const res = await fetch(
      "https://kweebac-ecommerce-api.up.railway.app/api/user/build",
      {
        method: "POST",
        body: JSON.stringify({
          componentType,
          componentTitle,
          id: itemInfo._id,
          limit,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );

    if (res.status === 400) {
      const err = await res.json();
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (res.status === 401) {
      navigate("/login");
    } else if (res.ok) {
      await handleSetUser(setUser);
      navigate("/build");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="relative rounded-lg bg-[--background-color] px-1 py-0.5 shadow-md hover:scale-105"
      disabled={error ? true : false}
    >
      {icon}
    </button>
  );
}

export function ButtonPC({ setError, error, itemInfo }: ButtonPCProps) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  let componentType = useLocation().pathname.split("/")[2];
  const componentTitle = changeName(`components/${componentType}`);

  if (componentType === "cpu-cooler") componentType = "cpuCooler";

  let limit;
  if (componentType === "gpu") limit = 2;
  else if (componentType === "ram") limit = 2;
  else if (componentType === "storage") limit = 2;
  else if (componentType === "fans") limit = 4;

  async function handleClick() {
    const res = await fetch(
      "https://kweebac-ecommerce-api.up.railway.app/api/user/build",
      {
        method: "POST",
        body: JSON.stringify({
          componentType,
          componentTitle,
          id: itemInfo._id,
          limit,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );

    if (res.status === 400) {
      const err = await res.json();
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else if (res.status === 401) {
      navigate("/login");
    } else if (res.ok) {
      await handleSetUser(setUser);
      navigate("/build");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-md bg-green-2 p-2 text-lg font-medium text-green-3 shadow-md"
      disabled={error ? true : false}
    >
      Add to PC
    </button>
  );
}
