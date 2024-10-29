import { useNavigate } from "react-router-dom";

export default function URLError() {
  const navigate = useNavigate();

  return (
    <div className="mb-8 grid content-center justify-items-center text-center">
      <h1 className="text-5xl text-[#d7d2c8] sm:text-6xl md:text-7xl">404</h1>
      <h2 className="my-2 w-[332px] text-3xl font-semibold sm:w-max sm:text-4xl md:my-3 md:text-5xl">
        Oops! This page doesn't exist.
      </h2>
      <p className="w-[21.5rem] text-[#171615] sm:w-[30rem] md:text-lg">
        Unfortunately, the page you're seeking is unavailable, has been removed,
        or didn't exist in the first place.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-8 h-[52px] w-[165px] rounded-lg bg-green-3 text-sm font-semibold text-white-1 sm:text-base md:text-lg"
      >
        Go back
      </button>
    </div>
  );
}
