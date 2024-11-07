// @ts-nocheck

import { Close, Logo } from "../Icons";
import { Link } from "react-router-dom";
import { useDisableScroll } from "../../utils";

export default function FilterDropdown({
  setDropdownVisible,
  dropdownVisible,
  children,
}) {
  useDisableScroll();

  return (
    <div
      style={{ visibility: dropdownVisible ? "visible" : "hidden" }}
      className="absolute top-0 z-30 grid w-screen grid-cols-[auto_1fr]"
    >
      <aside className="relative grid min-h-screen w-max grid-rows-[auto_1fr] bg-white-1 p-6 text-green-3">
        <div
          onClick={() => setDropdownVisible(false)}
          className="absolute right-3 top-3 w-max cursor-pointer rounded-full"
        >
          <Close color="#4b654b" />
        </div>

        <Link
          onClick={() => setDropdownVisible(false)}
          to="/"
          className="justify-self-start"
        >
          <Logo fullSize={true} title="Filter" description="" />
        </Link>

        <nav>
          <div className="grid h-full content-between">
            <div className="mt-8 grid gap-4 text-lg">{children}</div>
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
