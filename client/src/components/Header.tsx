import { Link, Outlet } from "react-router-dom";
import { Logo, CartIcon } from "./Icons";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../App";

export default function Header() {
  const { user } = useContext(UserContext);
  const header = useRef<HTMLHeadingElement>(null);
  const div = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (header.current && div.current) {
        if (window.scrollY > 0) {
          header.current.classList.add("shadow-md");
          header.current.classList.add("bg-[#fffcf9]");
          div.current.classList.remove("border-b-[#e8e3da]");
          div.current.classList.add("border-b-[#fffcf9]");
        } else {
          header.current.classList.remove("shadow-md");
          header.current.classList.remove("bg-[#fffcf9]");
          div.current.classList.remove("border-b-[#fffcf9]");
          div.current.classList.add("border-b-[#e8e3da]");
        }
      }
    }

    addEventListener("scroll", handleScroll);

    () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <header
        ref={header}
        className="sticky top-0 z-10 grid justify-items-center bg-white-1"
      >
        <div
          ref={div}
          className="grid w-4/5 grid-cols-[1fr_auto_1fr] items-center border border-x-0 border-b-[#e8e3da] text-lg"
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
                  <Link to="/">
                    <CartIcon items={0} />
                  </Link>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <div className="grid w-[--page-margin] justify-self-center">
        <Outlet />
      </div>
    </div>
  );
}
