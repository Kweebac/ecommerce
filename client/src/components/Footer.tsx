function Newsletter() {
  return (
    <div className="w-[443px]">
      <p className="mb-1 text-2xl font-semibold">Newsletter</p>
      <p>
        Join our family here at PC. Get the latest, greatest, and totally not
        annoying emails every single week!
      </p>
      <div className="mt-6 grid grid-cols-[2fr_1fr] gap-4">
        <input
          type="email"
          placeholder="Email"
          className="placeholder:gray-300 rounded-lg border border-gray-300 px-4 py-3 outline-none"
        />
        <button className="rounded-lg bg-green-3 text-lg font-medium text-white-1">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="flex justify-center bg-green-2">
      <div className="grid w-[--page-margin] justify-center p-8">
        <div className="flex gap-36">
          <div>
            <h1 className="mb-2 text-2xl font-semibold">Follow us</h1>
            <ul className="grid gap-1 text-[#756f69]">
              <li className="cursor-pointer">Twitter</li>
              <li className="cursor-pointer">Instagram</li>
              <li className="cursor-pointer">Facebook</li>
              <li className="cursor-pointer">TikTok</li>
            </ul>
          </div>
          <Newsletter />
        </div>

        <div className="mt-16 flex justify-between border-t border-gray-300 pt-4 text-sm text-[#756f69]">
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
