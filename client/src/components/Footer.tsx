function Newsletter() {
  return (
    <div className="w-[320px] sm:w-[443px]">
      <p className="mb-1 text-2xl font-semibold">Newsletter</p>
      <p>
        Get the latest offers on products, the occasional in-depth article, and
        a 10% discount on your next purchase!
      </p>
      <div className="mt-6 grid grid-cols-[auto_auto] justify-start gap-4 sm:grid-cols-[2fr_1fr]">
        <input
          type="email"
          placeholder="Email"
          className="placeholder:gray-300 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none sm:w-max"
        />
        <button className="rounded-lg bg-green-3 px-4 text-lg font-medium text-white-1">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="flex justify-center bg-green-2 shadow-inner">
      <div className="grid justify-center p-4 lg:w-[--page-margin] lg:p-8">
        <div className="grid gap-8 md:grid-flow-col md:gap-36">
          <div>
            <h1 className="mb-2 text-2xl font-semibold">Follow us</h1>
            <ul className="text-md grid grid-flow-col gap-1 text-[#756f69] md:grid-flow-row">
              <li className="cursor-pointer">Twitter</li>
              <li className="cursor-pointer">Instagram</li>
              <li className="cursor-pointer">Facebook</li>
              <li className="cursor-pointer">TikTok</li>
            </ul>
          </div>
          <Newsletter />
        </div>

        <div className="mt-8 grid justify-items-center border-t border-gray-300 pt-4 text-sm text-[#756f69] sm:grid-flow-col sm:justify-between md:mt-16">
          <div className="flex gap-2">
            <div className="cursor-pointer">Privacy policy</div>
            <div>·</div>
            <div className="cursor-pointer">Terms of use</div>
          </div>
          <div>Patent - Copyright @ 2024</div>
        </div>
      </div>
    </footer>
  );
}
