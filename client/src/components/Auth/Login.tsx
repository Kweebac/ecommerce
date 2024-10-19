import { Link, useNavigate } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { RedirectToHomeContext, UserContext } from "../../App";
import { handleSetUser } from "../../utils";
import Input from "./Input";

export default function Login() {
  const { redirectToHome } = useContext(RedirectToHomeContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const { setUser } = useContext(UserContext);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, testUser: boolean = false) => {
      e.preventDefault();

      let formData;
      if (testUser) {
        formData = new FormData();
        formData.append("email", "test@test");
        formData.append("password", "testtest");
      } else {
        formData = new FormData(e.currentTarget);
      }

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        // @ts-expect-error works
        body: new URLSearchParams(formData),
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
          if (redirectToHome) navigate("/");
          else navigate(-1);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [navigate, setUser, redirectToHome],
  );

  return (
    <main className="w-max justify-self-center p-4 sm:p-8">
      <form onSubmit={(e) => handleLogin(e)} className="grid gap-4">
        <h1 className="text-3xl font-semibold">Login</h1>

        <Link to="/register" className="text-green-3">
          Don't have an account? Register here.
        </Link>

        <Input type="email" name="email" errors={errors} />

        <Input type="password" name="password" errors={errors} />

        <div className="grid w-max grid-cols-[2fr_1fr] gap-2 justify-self-end md:w-[20rem]">
          <button className="rounded-xl bg-green-3 px-8 py-3 text-white-1 shadow-md">
            Login
          </button>
          <button
            onClick={(e) => handleLogin(e, true)}
            className="rounded-xl bg-green-2 px-4 py-3 text-green-3 shadow-md"
          >
            Test user
          </button>
        </div>
      </form>
    </main>
  );
}
