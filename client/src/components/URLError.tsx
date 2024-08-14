import { Link } from "react-router-dom";

export default function URLError() {
  return (
    <div className="grid h-[calc(100vh-80px-80px-40px)] content-center justify-items-center text-center">
      <h1 className="text-[4rem] text-[#d7d2c8]">404</h1>
      <h2 className="text-[2.5rem] font-semibold">
        Oops! This page doesn't exist.
      </h2>
      <p className="w-[30rem] text-[18px] text-[#171615]">
        Unfortunately, the page you're seeking is unavailable, has been removed,
        or didn't exist in the first place.
      </p>

      <Link to="/">
        <button className="mt-8 h-[52px] w-[165px] rounded-lg bg-green-3 text-[18px] font-semibold text-white-1">
          Shop
        </button>
      </Link>
    </div>
  );
}
