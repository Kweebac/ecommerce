import { Link, useNavigate } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { RedirectToHomeContext, UserContext } from "../../App";
import { handleSetUser } from "../../utils";
import Input from "./Input";

export default function Login() {
  const { redirectToHome, setRedirectToHome } = useContext(
    RedirectToHomeContext,
  );
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const { setUser } = useContext(UserContext);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        // @ts-expect-error works
        body: new URLSearchParams(new FormData(e.currentTarget)),
        credentials: "include",
      });

      if (res.status === 403) {
        navigate(-1);
      } else if (res.status === 400) {
        const errors = await res.json();
        setErrors(errors);
      } else if (res.ok) {
        try {
          handleSetUser(setUser);
          if (redirectToHome) {
            setRedirectToHome(false);
            navigate("/");
          } else navigate(-1);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [navigate, setUser, redirectToHome, setRedirectToHome],
  );

  return (
    <main className="w-max justify-self-center p-8">
      <form onSubmit={(e) => handleLogin(e)} className="grid gap-4">
        <h1 className="text-3xl font-semibold">Login</h1>

        <Link to="/register" className="text-green-3">
          Don't have an account? Register here.
        </Link>

        <Input type="email" name="email" errors={errors} />

        <Input type="password" name="password" errors={errors} />

        <button className="w-60 justify-self-end rounded-xl bg-green-3 px-8 py-3 text-white-1">
          Login
        </button>
      </form>
    </main>
  );
}
