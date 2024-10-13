import { Link, Outlet, useLocation } from "react-router-dom";
import { Logo, CartIcon } from "./Icons";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CartContext, RedirectToHomeContext, UserContext } from "../App";
import Cart from "./Cart";

export const CartVisibleContext = createContext<{
  cartVisible: boolean;
  setCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  cartVisible: false,
  setCartVisible: () => {},
});

export default function Header() {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [cartVisible, setCartVisible] = useState(false);
  let cartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (cartItems > 99) cartItems = 99;
  const header = useRef<HTMLHeadingElement>(null);
  const div = useRef<HTMLDivElement>(null);

  const { setRedirectToHome } = useContext(RedirectToHomeContext);
  const location = useLocation();
  const url = location.pathname.split("/")[1];

  useEffect(() => {
    if (url === "register" || url === "logout") setRedirectToHome(true);
    else if (
      url === "build" ||
      url === "prebuilt" ||
      url === "components" ||
      url === "accessories"
    )
      setRedirectToHome(false);
  }, [url, setRedirectToHome]);

  useEffect(() => {
    function handleScroll() {
      if (header.current && div.current) {
        if (window.scrollY > 0) {
          header.current.classList.add("shadow-md");
          header.current.classList.add("bg-[#fffcf9]");
          div.current.classList.remove("border-b");
        } else {
          header.current.classList.remove("shadow-md");
          header.current.classList.remove("bg-[#fffcf9]");
          div.current.classList.add("border-b");
        }
      }
    }

    handleScroll();
    addEventListener("scroll", handleScroll);

    () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <CartVisibleContext.Provider value={{ cartVisible, setCartVisible }}>
      <div className="grid min-h-[calc(100vh-323px)] grid-rows-[auto_1fr] bg-[--background-color]">
        {cartVisible && <Cart />}

        <header
          ref={header}
          className="sticky top-0 z-20 grid justify-items-center"
        >
          <div
            ref={div}
            className="grid w-4/5 grid-cols-[1fr_auto_1fr] items-center border-b border-b-gray-300 text-lg"
          >
            <Link to="/" className="justify-self-start">
              <Logo />
            </Link>

            <nav className="justify-self-center">
              <ul className="flex gap-8">
                <Link to="/build">Build your own</Link>
                <Link to="/prebuilt">Prebuilt</Link>
                <Link to="/components">Components</Link>
                <Link to="/accessories">Accessories</Link>
              </ul>
            </nav>

            <nav className="justify-self-end">
              <ul className="flex items-center gap-8">
                {user ? (
                  <>
                    <Link to="/logout">Logout</Link>
                  </>
                ) : (
                  <Link to="/login">Login</Link>
                )}

                <CartIcon items={cartItems} />
              </ul>
            </nav>
          </div>
        </header>

        <div className="grid w-[--page-margin] justify-self-center">
          <Outlet />
        </div>
      </div>
    </CartVisibleContext.Provider>
  );
}
