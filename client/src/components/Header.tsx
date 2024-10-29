// @ts-nocheck

import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Logo,
  CartIcon,
  Close,
  GPUIcon,
  CPUIcon,
  MotherboardIcon,
  MonitorIcon,
  KeyboardIcon,
  MouseIcon,
  HeadphonesIcon,
  WebcamIcon,
  SpeakersIcon,
  RAMIcon,
  StorageIcon,
  PSUIcon,
  CaseIcon,
  CPUCoolerIcon,
  FanIcon,
  OSIcon,
  MenuIcon,
} from "./Icons";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CartContext, RedirectToHomeContext, UserContext } from "../App";
import Cart from "./Cart";
import { useGetScreenWidth } from "../utils";

export const CartVisibleContext = createContext<{
  cartVisible: boolean;
  setCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  cartVisible: false,
  setCartVisible: () => {},
});

export const DropdownVisibleContext = createContext<{
  dropdownVisible: boolean;
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  dropdownVisible: false,
  setDropdownVisible: () => {},
});

export default function Header() {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [cartVisible, setCartVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  let cartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (cartItems > 99) cartItems = 99;
  const header = useRef<HTMLHeadingElement>(null);
  const div = useRef<HTMLDivElement>(null);
  const { setRedirectToHome } = useContext(RedirectToHomeContext);
  const location = useLocation();
  const url = location.pathname.split("/")[1];
  const screen = useGetScreenWidth();

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
      <DropdownVisibleContext.Provider
        value={{ dropdownVisible, setDropdownVisible }}
      >
        {dropdownVisible && (
          <MobileHeaderDropdown setDropdownVisible={setDropdownVisible} />
        )}

        <div className="grid min-h-[calc(100vh-399px)] grid-rows-[auto_1fr] bg-[--background-color] sm:min-h-[calc(100vh-355px)] md:min-h-[calc(100vh-291px)] lg:min-h-[calc(100vh-323px)]">
          {cartVisible && <Cart />}

          <header
            ref={header}
            className="sticky top-0 z-20 grid justify-items-center"
          >
            <div
              ref={div}
              className="grid w-[90%] grid-cols-[auto_1fr] items-center border-b border-b-gray-300 text-lg sm:w-4/5 xl:grid-cols-[1fr_auto_1fr]"
            >
              <Link to="/" className="justify-self-start">
                <Logo />
              </Link>

              {screen.xl && (
                <nav className="justify-self-center">
                  <ul className="flex xl:gap-6 2xl:gap-8">
                    <Link to="/build">Build your own</Link>
                    <Link to="/prebuilt">Prebuilt</Link>
                    <Link to="/components">Components</Link>
                    <Link to="/accessories">Accessories</Link>
                  </ul>
                </nav>
              )}

              <nav className="justify-self-end">
                <ul className="flex items-center gap-3 sm:gap-8">
                  {screen.xl && (
                    <>
                      {user ? (
                        <Link to="/logout">Logout</Link>
                      ) : (
                        <Link to="/login">Login</Link>
                      )}
                    </>
                  )}

                  <CartIcon items={cartItems} />
                  {!screen.xl && (
                    <div onClick={() => setDropdownVisible(true)}>
                      <MenuIcon />
                    </div>
                  )}
                </ul>
              </nav>
            </div>
          </header>

          <div className="grid w-[--page-margin-mobile] justify-self-center sm:w-[--page-margin]">
            <Outlet />
          </div>
        </div>
      </DropdownVisibleContext.Provider>
    </CartVisibleContext.Provider>
  );
}

function MobileHeaderDropdown({ setDropdownVisible }) {
  const { user } = useContext(UserContext);

  return (
    <div className="absolute z-30 grid w-screen grid-cols-[auto_1fr]">
      <aside className="relative grid min-h-screen w-[280px] grid-rows-[auto_1fr] bg-green-3 p-6 text-green-2">
        <div
          onClick={() => setDropdownVisible(false)}
          className="absolute right-3 top-3 w-max cursor-pointer rounded-full"
        >
          <Close color="#f4f0e5" />
        </div>

        <Link
          onClick={() => setDropdownVisible(false)}
          to="/"
          className="justify-self-start"
        >
          <Logo dark={true} fullSize={true} />
        </Link>

        <nav>
          <div className="grid h-full content-between">
            <div className="mt-8 grid gap-4 text-lg">
              <Link
                onClick={() => setDropdownVisible(false)}
                to="/build"
                className="w-max font-semibold"
              >
                Build your own
              </Link>
              <Link
                onClick={() => setDropdownVisible(false)}
                to="/prebuilt"
                className="w-max font-semibold"
              >
                Prebuilt
              </Link>
              <div className="font-semibold">
                <h1>Components</h1>

                <div className="mt-1 flex gap-2">
                  <DropdownComponentLink
                    url="/components/gpu"
                    icon={<GPUIcon />}
                  />

                  <DropdownComponentLink
                    url="/components/cpu"
                    icon={<CPUIcon />}
                  />

                  <DropdownComponentLink
                    url="/components/motherboard"
                    icon={<MotherboardIcon />}
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  <DropdownComponentLink
                    url="/components/ram"
                    icon={<RAMIcon />}
                  />

                  <DropdownComponentLink
                    url="/components/storage"
                    icon={<StorageIcon />}
                  />

                  <DropdownComponentLink
                    url="/components/psu"
                    icon={<PSUIcon />}
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  <DropdownComponentLink
                    url="/components/case"
                    icon={<CaseIcon />}
                  />

                  <DropdownComponentLink
                    url="/components/cpu-cooler"
                    icon={<CPUCoolerIcon />}
                  />

                  <DropdownComponentLink
                    url="/components/fans"
                    icon={<FanIcon />}
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  <DropdownComponentLink
                    url="/components/os"
                    icon={<OSIcon />}
                  />
                </div>
              </div>
              <div className="font-semibold">
                <h1>Accessories</h1>

                <div className="mt-1 flex gap-2">
                  <DropdownComponentLink
                    url="/accessories/monitors"
                    icon={<MonitorIcon />}
                  />

                  <DropdownComponentLink
                    url="/accessories/keyboards"
                    icon={<KeyboardIcon />}
                  />

                  <DropdownComponentLink
                    url="/accessories/mice"
                    icon={<MouseIcon />}
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  <DropdownComponentLink
                    url="/accessories/headphones"
                    icon={<HeadphonesIcon />}
                  />

                  <DropdownComponentLink
                    url="/accessories/webcams"
                    icon={<WebcamIcon />}
                  />

                  <DropdownComponentLink
                    url="/accessories/speakers"
                    icon={<SpeakersIcon />}
                  />
                </div>
              </div>
            </div>

            <div
              onClick={() => setDropdownVisible(false)}
              className="mt-16 flex justify-end border-t text-lg font-semibold"
            >
              {user ? (
                <Link to="/logout" className="pt-2">
                  Logout
                </Link>
              ) : (
                <Link to="/login" className="pt-2">
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </aside>

      <div
        onClick={() => setDropdownVisible(false)}
        className="backdrop-brightness-50"
      ></div>
    </div>
  );
}

function DropdownComponentLink({ url, icon }) {
  const { setDropdownVisible } = useContext(DropdownVisibleContext);

  return (
    <Link onClick={() => setDropdownVisible(false)} to={url}>
      <div className="w-max rounded-lg bg-green-2 p-1">{icon}</div>
    </Link>
  );
}
