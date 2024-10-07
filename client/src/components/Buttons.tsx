import { useContext, useState } from "react";
import { CartContext, RedirectToHomeContext, UserContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { PlainCartIcon } from "./Icons";
import { changeName, handleSetUser } from "../utils";

type ButtonProps = {
  itemInfo: object;
};

export function SmallButton({ itemInfo }: ButtonProps) {
  const { setCart } = useContext(CartContext);

  let paths = useLocation().pathname.split("/");
  paths = paths.slice(1);
  const url = paths.join("/");

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

  let paths = useLocation().pathname.split("/");
  paths = paths.slice(1, paths.length - 1);
  const url = paths.join("/");

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
    <button className="w-full rounded-md bg-green-3 py-3 text-xl font-medium text-white-1 shadow-md">
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
  const { setRedirectToHome } = useContext(RedirectToHomeContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  let componentType = useLocation().pathname.split("/")[2];
  let componentTitle = changeName(`components/${componentType}`);

  if (componentType === "cpu-cooler") componentType = "cpuCooler";

  async function handleClick() {
    if (
      Array.isArray(user.build[componentType]) &&
      user.build[componentType].length >= limit
    ) {
      setError(`You have reached the ${componentTitle} limit.`);
      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    } else if (componentType === "os" && user.build[componentType]) {
      setError(`You have already selected an ${componentTitle}.`);
      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    } else if (
      !Array.isArray(user.build[componentType]) &&
      user.build[componentType]
    ) {
      setError(`You have already selected a ${componentTitle}.`);
      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    const res = await fetch("http://localhost:3000/api/user/build", {
      method: "POST",
      body: JSON.stringify({ componentType, id: itemInfo._id }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.status === 401) {
      setRedirectToHome(false);
      navigate("/login");
    } else if (res.ok) {
      handleSetUser(setUser);
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

export function ButtonPC({ itemInfo }: ButtonPCProps) {
  const { setRedirectToHome } = useContext(RedirectToHomeContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  let componentType = useLocation().pathname.split("/")[2];
  if (componentType === "cpu-cooler") componentType = "cpuCooler";

  async function handleClick() {
    const res = await fetch("http://localhost:3000/api/user/build", {
      method: "POST",
      body: JSON.stringify({ componentType, id: itemInfo._id }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.status === 401) {
      setRedirectToHome(false);
      navigate("/login");
    } else if (res.ok) {
      handleSetUser(setUser);
      navigate("/build");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-md bg-green-2 p-2 text-lg font-medium text-green-3 shadow-md"
    >
      Add to PC
    </button>
  );
}
