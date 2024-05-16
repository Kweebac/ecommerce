import { Link, Outlet } from "react-router-dom";
import { Logo, Cart } from "./Icons";
import { useContext } from "react";
import { UserContext } from "../App";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="grid justify-items-center">
      <header className="grid w-4/5 grid-cols-[1fr_auto_1fr] items-center">
        <Link to="/" className="justify-self-start">
          <Logo />
        </Link>

        <nav className="justify-self-center">
          <ul className="flex gap-8">
            <Link to="/">Build your own</Link>
            <Link to="/">Prebuilt</Link>
            <Link to="/">Components</Link>
            <Link to="/">Accessories</Link>
          </ul>
        </nav>

        <nav className="justify-self-end">
          <ul className="flex items-center gap-8">
            {user ? (
              <>
                <Link to="/logout">Logout</Link>
                <Link to="/">
                  <Cart items={0} />
                </Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </ul>
        </nav>
      </header>

      <main className="p-10">
        <Outlet />
      </main>
    </div>
  );
}
